# Kafka — Detailed Code Examples (Spring Boot)

These examples are meant to be **copy/paste friendly** and match what teams do in production: keys, offsets, idempotency, retries, DLQ, and outbox.

---

## 1) The Core Contract: Events

A good event has:

- `eventId` (UUID): idempotency key
- `type`: what happened
- `occurredAt`: when it happened
- business identifiers (`orderId`, `userId`)

```json
{
  "eventId": "7f2c6e2b-1c5a-4b0f-a9d5-0d2f9f2a0c1e",
  "type": "OrderCreated",
  "orderId": "ORD-102394",
  "userId": "U-88412",
  "total": 2499.0,
  "currency": "INR",
  "occurredAt": "2025-12-18T08:45:02Z"
}
```

**Key rule:** publish with key = `orderId` so all events for an order stay ordered within one partition.

---

## 2) Producer (Spring Boot): publish `orders.created`

```java
@Service
@RequiredArgsConstructor
public class OrderService {
  private final KafkaTemplate<String, OrderCreatedEvent> kafkaTemplate;
  private final OrderRepository orderRepository;

  private static final String TOPIC = "orders.created";

  @Transactional
  public Order createOrder(CreateOrderRequest req) {
    Order order = orderRepository.save(Order.from(req));

    OrderCreatedEvent event = OrderCreatedEvent.builder()
      .eventId(UUID.randomUUID().toString())
      .type("OrderCreated")
      .orderId(order.getOrderId())
      .userId(order.getUserId())
      .total(order.getTotal())
      .currency(order.getCurrency())
      .occurredAt(Instant.now())
      .build();

    // key=orderId => ordering per order
    kafkaTemplate.send(TOPIC, order.getOrderId(), event);
    return order;
  }
}
```

### Producer config (safe defaults)

```yaml
spring:
  kafka:
    producer:
      acks: all
      retries: 3
      properties:
        enable.idempotence: true
        delivery.timeout.ms: 120000
        request.timeout.ms: 30000
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer
```

---

## 3) Consumer (Spring Boot): payment service with idempotency

### Why idempotency?
Kafka consumers are commonly **at-least-once**, so duplicates can happen (retries, crashes before commit, rebalances).

```java
@Service
@RequiredArgsConstructor
public class PaymentConsumer {
  private final ProcessedEventRepository processedEventRepository;
  private final PaymentGateway paymentGateway;
  private final KafkaTemplate<String, PaymentEvent> kafkaTemplate;

  @KafkaListener(topics = "orders.created", groupId = "payment-service")
  public void onOrderCreated(OrderCreatedEvent event, Acknowledgment ack) {
    if (processedEventRepository.existsByEventId(event.getEventId())) {
      ack.acknowledge();
      return;
    }

    PaymentResult result = paymentGateway.authorize(event.getOrderId(), event.getTotal(), event.getCurrency());

    PaymentEvent out = result.isSuccess()
      ? PaymentEvent.authorized(event.getOrderId(), result.getTransactionId())
      : PaymentEvent.failed(event.getOrderId(), result.getErrorCode());

    kafkaTemplate.send("payments.processed", event.getOrderId(), out);

    processedEventRepository.save(new ProcessedEvent(event.getEventId(), Instant.now()));
    ack.acknowledge();
  }
}
```

### Consumer config (manual commit)

```yaml
spring:
  kafka:
    consumer:
      enable-auto-commit: false
      auto-offset-reset: earliest
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.springframework.kafka.support.serializer.JsonDeserializer
      properties:
        spring.json.trusted.packages: "*"
    listener:
      ack-mode: manual
```

---

## 4) DLQ + Retries (Spring Kafka)

Goal: retry transient errors, then push poison messages to a DLQ.

```java
@Configuration
public class KafkaErrorHandlingConfig {

  @Bean
  public CommonErrorHandler commonErrorHandler(KafkaTemplate<Object, Object> template) {
    DeadLetterPublishingRecoverer recoverer = new DeadLetterPublishingRecoverer(
      template,
      (record, ex) -> new TopicPartition(record.topic() + ".DLQ", record.partition())
    );

    // 3 retries with 1s backoff
    DefaultErrorHandler handler = new DefaultErrorHandler(recoverer, new FixedBackOff(1000L, 3L));
    return handler;
  }
}
```

---

## 5) Outbox Pattern (prevents “DB saved but event lost”)

### The problem (dual write)

- You save to DB ✅
- You publish to Kafka ❌ (app crashes)

Result: DB state exists, downstream services never react.

### The fix
Store the event in an **outbox table** in the same DB transaction as the business write. A background publisher flushes outbox rows to Kafka.

```java
@Transactional
public Order createOrder(CreateOrderRequest req) {
  Order order = orderRepository.save(Order.from(req));
  OutboxEvent row = OutboxEvent.from("orders.created", order.getOrderId(), toJson(orderCreatedEvent(order)));
  outboxRepository.save(row);
  return order;
}

@Scheduled(fixedDelay = 1000)
public void publishOutbox() {
  List<OutboxEvent> batch = outboxRepository.findTop100ByPublishedFalseOrderByCreatedAtAsc();
  for (OutboxEvent row : batch) {
    kafkaTemplate.send(row.getTopic(), row.getKey(), row.getPayload());
    row.markPublished();
    outboxRepository.save(row);
  }
}
```

---

## 6) “Real-time” E‑commerce story: what runs when

- `orders.created` → Payment + Inventory
- `payments.processed` + `inventory.reserved` → Shipping
- Email + Analytics consume in parallel

```text
OrderCreated (orders.created)
  -> PaymentService (payments.processed)
  -> InventoryService (inventory.reserved)
  -> ShippingService waits for both then publishes (shipping.shipped)
  -> Email + Analytics consume independently
```

---

## 7) Checklist (what teams forget)

- Use a stable key (e.g., `orderId`) for ordering
- Make consumers idempotent (eventId table or unique constraints)
- Manual commits for critical flows
- Retries + DLQ
- Outbox for DB + Kafka atomicity
- Monitor consumer lag + DLQ volume
