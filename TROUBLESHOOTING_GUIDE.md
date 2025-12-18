# Kafka — Troubleshooting Guide (Real Scenarios)

Focus: what breaks in production, how to detect it, and what to change.

---

## 1) “Consumer lag is growing”

### What it means
Consumers are processing slower than producers are writing.

```text
lag = log_end_offset - consumer_committed_offset
```

### Common causes
- slow downstream dependency (DB / payment gateway)
- too few partitions (can’t scale consumers)
- too few consumer instances
- large batches / memory pressure

### Fixes
- scale consumer group (more instances) up to partition count
- add partitions if you need more parallelism
- optimize handler (batch IO, async calls, caching)
- reduce `max.poll.records` if memory spikes

---

## 2) “Duplicates happened”

### Why it happens
At-least-once delivery + retries.

### Fix
Make consumers **idempotent**:

- store `eventId` in DB and skip if seen
- use unique constraint on a natural idempotency key

```java
if (processedEventRepo.existsByEventId(event.getEventId())) return;
```

---

## 3) “Events are out of order”

### Why it happens
Kafka orders only within a partition.

### Fix
Use a consistent key for related events:

```text
key = orderId
```

Also: don’t process a single partition concurrently if ordering matters.

---

## 4) “Poison message blocks the stream”

### Symptom
Consumer keeps failing on the same record.

### Fix
- retries with backoff
- after max retries, publish to `topic.DLQ` and continue

---

## 5) “DB saved but no one reacted”

### Root cause
App crashed between DB commit and Kafka publish.

### Fix
Use the **outbox pattern** (transactional outbox).

---

## 6) “Frequent rebalances”

### Why
A consumer stops heartbeating (long processing) or instances flap.

### Fix
- reduce per-message work
- tune `max.poll.interval.ms` / `session.timeout.ms`
- avoid blocking the poll thread with long operations

---

## 7) Production checklist

- `acks=all` + idempotent producer for critical topics
- replication factor 3 (common) + monitor under-replicated partitions
- idempotent consumers
- retries + DLQ + alerts on DLQ volume
- monitor consumer lag, error rate, and processing latency
