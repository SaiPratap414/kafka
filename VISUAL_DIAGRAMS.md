# Kafka — Visual Diagrams

ASCII diagrams you can use to explain Kafka to anyone on the team.

---

## 1) Kafka mental model

```text
Kafka = durable log + scalable readers

Producer(s) append facts -> Topic (partitioned log) -> Consumer group(s) read
```

---

## 2) Topic + partitions

```text
Topic: orders.created

Partition 0: [0][1][2][3]...
Partition 1: [0][1][2]...
Partition 2: [0][1]...

Ordering is guaranteed only within a partition.
```

### Keying strategy

```text
key = orderId

ORD-1 events -> always same partition -> ordered for ORD-1
ORD-2 events -> may go to a different partition
```

---

## 3) Consumer group parallelism

```text
Topic has 3 partitions
Consumer group has 3 instances

P0 -> Consumer A
P1 -> Consumer B
P2 -> Consumer C

Max active consumers in a group = number of partitions.
```

If you run 4 consumers with 3 partitions:

```text
P0 -> A
P1 -> B
P2 -> C
D  -> idle
```

---

## 4) Offsets = bookmarks

```text
Partition 1 log:
[0][1][2][3][4][5][6]...
            ^
         committed offset = 4

Meaning: consumer group has processed up to 3, next read starts at 4
```

---

## 5) Replication (durability)

```text
Replication factor = 3

Broker 1: Partition 0 (Leader)
Broker 2: Partition 0 (Follower)
Broker 3: Partition 0 (Follower)

Producer writes to leader; followers replicate.
acks=all => producer waits until enough replicas confirm.
```

---

## 6) DLQ flow

```text
orders.created
  -> consumer fails
  -> retry (backoff)
  -> still fails
  -> send to orders.created.DLQ

DLQ is not “ignore errors”; it’s “quarantine for investigation”.
```

---

## 7) Outbox pattern

```text
Without outbox:
DB commit ✅   Kafka publish ❌ (crash)

With outbox:
DB transaction saves:
  - business row
  - outbox row

Publisher later flushes outbox to Kafka.
```

---

## 8) E‑commerce end-to-end view

```text
Customer places order
  OrderService -> orders.created

In parallel:
  PaymentService   consumes orders.created -> payments.processed
  InventoryService consumes orders.created -> inventory.reserved

Then:
  ShippingService waits for (paid + reserved) -> shipping.shipped

Also:
  EmailService + Analytics consume independently
```
