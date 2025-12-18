import type React from 'react'

type SectionDef = { id: string; title: string; level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All' }

const levelPillClass = (level?: SectionDef['level']) => {
  switch (level) {
    case 'Beginner':
      return 'bg-emerald-50 text-emerald-700 ring-emerald-200'
    case 'Intermediate':
      return 'bg-indigo-50 text-indigo-700 ring-indigo-200'
    case 'Advanced':
      return 'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200'
    default:
      return 'bg-slate-50 text-slate-700 ring-slate-200'
  }
}

const Pill = ({ level }: { level?: SectionDef['level'] }) => (
  <span
    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${levelPillClass(level)}`}
  >
    {level ?? 'All'}
  </span>
)

const Callout = ({
  tone,
  title,
  children,
}: {
  tone: 'info' | 'good' | 'warn' | 'dev'
  title: string
  children: React.ReactNode
}) => {
  const toneClass =
    tone === 'good'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
      : tone === 'warn'
        ? 'border-amber-200 bg-amber-50 text-amber-950'
        : tone === 'dev'
          ? 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-950'
          : 'border-indigo-200 bg-indigo-50 text-indigo-950'

  return (
    <div className={`rounded-xl border p-4 ${toneClass}`}>
      <p className="text-sm font-semibold">{title}</p>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-slate-800">{children}</div>
    </div>
  )
}

const Section = ({
  id,
  title,
  level,
  children,
}: {
  id: string
  title: string
  level?: SectionDef['level']
  children: React.ReactNode
}) => (
  <section id={id} className="scroll-mt-28">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">{title}</h2>
          <Pill level={level} />
        </div>
      </div>
      <a
        href={`#${id}`}
        className="shrink-0 rounded-md px-2 py-1 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        aria-label={`Link to ${title}`}
        title="Copy link"
      >
        #
      </a>
    </div>
    <div className="mt-4 space-y-4 text-slate-700 leading-relaxed">{children}</div>
  </section>
)

function App() {
  const sections: SectionDef[] = [
    { id: 'what-is-kafka', title: 'Kafka in one minute', level: 'All' },
    { id: 'glossary', title: 'Glossary (the words you’ll hear)', level: 'Beginner' },
    { id: 'beginner', title: 'Beginner: core concepts', level: 'Beginner' },
    { id: 'ecommerce-flow', title: 'E‑commerce flow (end-to-end)', level: 'Beginner' },
    { id: 'intermediate', title: 'Intermediate: reliability + scaling', level: 'Intermediate' },
    { id: 'advanced', title: 'Advanced: internals + tooling', level: 'Advanced' },
    { id: 'use-cases', title: 'Use cases (where Kafka shines)', level: 'All' },
    { id: 'advantages', title: 'Advantages & trade-offs', level: 'All' },
    { id: 'implementation', title: 'How dev teams implement it (Spring)', level: 'All' },
    { id: 'getting-started', title: 'Getting started (local checklist)', level: 'All' },
  ]

  return (
    <div className="min-h-full bg-gradient-to-b from-slate-50 to-white">
      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Single-page Guide</p>
            <h1 className="truncate text-lg font-semibold tracking-tight text-slate-950 sm:text-xl">
              Apache Kafka — Beginner → Intermediate → Advanced
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Built for a mixed audience: general + developers, using one consistent e‑commerce story.
            </p>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <a
              href="#ecommerce-flow"
              className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              E‑commerce flow
            </a>
            <a
              href="#getting-started"
              className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Get started
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 lg:flex lg:gap-10">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-950">Contents</p>
            <nav className="mt-3 space-y-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                >
                  <span className="min-w-0 truncate">{s.title}</span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${levelPillClass(s.level)}`}>
                    {s.level ?? 'All'}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-900 px-5 py-6 sm:px-8">
              <p className="text-xs font-medium uppercase tracking-wide text-indigo-200">A mental model that scales</p>
              <p className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl">Kafka = a durable event log + scalable readers</p>
              <p className="mt-2 max-w-3xl text-sm text-indigo-100">
                If you remember only one thing: producers append facts to topics; consumers read those facts independently; the log is retained so you can process now or replay later.
              </p>
            </div>

            <div className="p-5 sm:p-8">
              <div className="grid gap-3 md:grid-cols-3">
                <Callout tone="good" title="For everyone">
                  <p>
                    Kafka helps when many things need to react to the same business event (order placed, payment confirmed, shipment sent).
                  </p>
                </Callout>
                <Callout tone="info" title="For teams">
                  <p>
                    It reduces coupling: producers don’t call every downstream service; teams subscribe to events they care about.
                  </p>
                </Callout>
                <Callout tone="dev" title="For developers">
                  <p>
                    You design for retries + duplicates (idempotency). You scale via partitions + consumer groups.
                  </p>
                </Callout>
              </div>

              <div className="mt-10 space-y-14">
                <Section id="what-is-kafka" title="Kafka in one minute" level="All">
                  <p>
                    Apache Kafka is a distributed <span className="font-medium">event streaming</span> platform.
                    Applications publish events to <span className="font-medium">topics</span>, and one or many independent consumers read them at their own pace.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Callout tone="info" title="General-audience translation">
                      <p>
                        It’s like a shared “activity feed” for your business that is reliable and fast. Different teams can follow the same feed for their own purpose.
                      </p>
                    </Callout>
                    <Callout tone="dev" title="Developer translation">
                      <p>
                        It’s a replicated, partitioned commit log. Ordering is guaranteed per partition; consumers track progress with offsets.
                      </p>
                    </Callout>
                  </div>
                </Section>

                <Section id="glossary" title="Glossary (the words you’ll hear)" level="Beginner">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { k: 'Event', v: 'A fact that happened (OrderCreated, PaymentAuthorized).' },
                      { k: 'Topic', v: 'A named stream of events (orders.created).' },
                      { k: 'Producer', v: 'Writes events to Kafka.' },
                      { k: 'Consumer', v: 'Reads events from Kafka.' },
                      { k: 'Partition', v: 'A topic is split into partitions for scale + ordering per partition.' },
                      { k: 'Offset', v: 'A consumer group’s position in a partition (how far it has read).' },
                      { k: 'Consumer group', v: 'A logical subscriber; partitions are divided among members for parallelism.' },
                      { k: 'Broker', v: 'A Kafka server that stores partitions and serves reads/writes.' },
                    ].map((item) => (
                      <div key={item.k} className="rounded-xl border border-slate-200 bg-white p-4">
                        <p className="font-semibold text-slate-950">{item.k}</p>
                        <p className="mt-1 text-sm text-slate-700">{item.v}</p>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section id="beginner" title="Beginner: core concepts" level="Beginner">
                  <Callout tone="good" title="Beginner mental model">
                    <p>
                      Producers <span className="font-medium">append</span> events. Consumers <span className="font-medium">read</span> events.
                      Kafka stores events for a retention period, so consumers can be fast, slow, offline, or replay later.
                    </p>
                  </Callout>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-950">The simplest picture</p>
                    <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-100">{`Producer service
  -> Topic (split into partitions)
     -> Consumer Group A (email)
     -> Consumer Group B (analytics)
     -> Consumer Group C (reports)`}</pre>
                    <p className="mt-3 text-sm text-slate-700">
                      Ordering is guaranteed <span className="font-medium">within a partition</span>. To keep related events ordered, choose a good message key.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Callout tone="info" title="How to explain “partitions” to non-devs">
                      <p>
                        A topic is like a highway. Partitions are lanes. More lanes = more cars can move at once.
                      </p>
                    </Callout>
                    <Callout tone="dev" title="How to explain “keys” to devs">
                      <p>
                        The message key determines the partition. Key by <span className="font-medium">orderId</span> to keep an order’s events in order.
                      </p>
                    </Callout>
                  </div>
                </Section>

                <Section id="ecommerce-flow" title="E‑commerce flow (end-to-end)" level="Beginner">
                  <p>
                    We’ll use one story from start to finish: <span className="font-medium">a customer places an order</span>.
                    The order triggers payment, inventory, shipping, customer notifications, and analytics.
                  </p>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-semibold text-slate-950">Services + topics (typical)</p>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="font-semibold text-slate-950">Topics</p>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                          <li><span className="font-medium">orders.created</span></li>
                          <li><span className="font-medium">payments.authorized</span> / <span className="font-medium">payments.failed</span></li>
                          <li><span className="font-medium">inventory.reserved</span> / <span className="font-medium">inventory.out_of_stock</span></li>
                          <li><span className="font-medium">shipping.requested</span> / <span className="font-medium">shipping.shipped</span></li>
                          <li><span className="font-medium">notifications.email.requested</span></li>
                        </ul>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="font-semibold text-slate-950">Who consumes?</p>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                          <li>Payment service consumes <span className="font-medium">orders.created</span></li>
                          <li>Inventory service consumes <span className="font-medium">orders.created</span></li>
                          <li>Shipping service consumes <span className="font-medium">payments.authorized</span> + <span className="font-medium">inventory.reserved</span></li>
                          <li>Email service consumes <span className="font-medium">orders.created</span> + <span className="font-medium">shipping.shipped</span></li>
                          <li>Analytics consumes everything (its own consumer group)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-950">Flow diagram (what happens when an order is placed)</p>
                    <div className="mt-3 grid gap-2 text-sm text-slate-700">
                      <div className="rounded-xl border border-slate-200 bg-white p-3">
                        <span className="font-medium text-slate-950">1) Order service</span> publishes <span className="font-medium">OrderCreated</span> → topic <span className="font-medium">orders.created</span>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white p-3">
                        <span className="font-medium text-slate-950">2) Payment service</span> consumes and publishes <span className="font-medium">PaymentAuthorized</span> or <span className="font-medium">PaymentFailed</span>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white p-3">
                        <span className="font-medium text-slate-950">3) Inventory service</span> consumes and publishes <span className="font-medium">StockReserved</span> or <span className="font-medium">OutOfStock</span>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white p-3">
                        <span className="font-medium text-slate-950">4) Shipping service</span> waits until it sees both “paid” and “reserved”, then ships
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white p-3">
                        <span className="font-medium text-slate-950">5) Email + analytics</span> consume in parallel (no extra calls from Order service)
                      </div>
                    </div>
                  </div>

                  <Callout tone="warn" title="Important real-world detail: duplicates can happen">
                    <p>
                      Kafka is commonly used with <span className="font-medium">at-least-once</span> processing: a consumer may see a message twice during retries.
                      That’s why consumers should be <span className="font-medium">idempotent</span> (safe if re-run).
                    </p>
                  </Callout>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-semibold text-slate-950">Example event payload (dev-friendly)</p>
                    <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-100">{`Topic: orders.created
Key:   orderId

{
  "eventId": "7f2c6e2b-1c5a-4b0f-a9d5-0d2f9f2a0c1e",
  "type": "OrderCreated",
  "orderId": "ORD-102394",
  "userId": "U-88412",
  "total": 2499.00,
  "currency": "INR",
  "createdAt": "2025-12-18T08:45:02Z"
}`}</pre>
                  </div>
                </Section>

                <Section id="intermediate" title="Intermediate: reliability + scaling" level="Intermediate">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="font-semibold text-slate-950">Consumer groups + parallelism</p>
                      <p className="mt-2 text-sm text-slate-700">
                        Within one consumer group, each partition is processed by at most one consumer instance. To scale reads, add partitions and/or group members.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="font-semibold text-slate-950">Offsets + replay</p>
                      <p className="mt-2 text-sm text-slate-700">
                        Offsets are the “bookmark” per partition per group. Resetting offsets lets you replay history (useful for rebuilding reports, backfills, or new consumers).
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="font-semibold text-slate-950">Retention vs compaction</p>
                      <p className="mt-2 text-sm text-slate-700">
                        Retention keeps events for a time window. Compaction keeps the latest value per key (great for “current state” topics like user profile or inventory snapshot).
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="font-semibold text-slate-950">Failures: retries, DLQ, backoff</p>
                      <p className="mt-2 text-sm text-slate-700">
                        Handle transient failures with retries + backoff. Put poison messages into a dead-letter topic (DLQ) to avoid blocking the entire stream.
                      </p>
                    </div>
                  </div>

                  <Callout tone="dev" title="Intermediate checklist (what to do in real services)">
                    <ul className="list-disc space-y-1 pl-5">
                      <li>Add an <span className="font-medium">eventId</span> for dedupe/idempotency.</li>
                      <li>Choose keys intentionally (e.g., <span className="font-medium">orderId</span>).</li>
                      <li>Monitor <span className="font-medium">consumer lag</span> + error rates.</li>
                      <li>Use a DLQ for poison messages; alert on DLQ volume.</li>
                      <li>Version event schemas carefully (backward compatibility).</li>
                    </ul>
                  </Callout>
                </Section>

                <Section id="advanced" title="Advanced: internals + tooling" level="Advanced">
                  <p>
                    Advanced Kafka is less about “what is a topic” and more about guarantees, scaling limits, and operational safety.
                    These are the topics that matter when you run Kafka in production.
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="font-semibold text-slate-950">Replication, ISR, durability</p>
                      <p className="mt-2 text-sm text-slate-700">
                        Partitions are replicated across brokers. Writes are durable when acknowledged by the leader (and optionally enough in-sync replicas, depending on config).
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="font-semibold text-slate-950">Producer acks + idempotence</p>
                      <p className="mt-2 text-sm text-slate-700">
                        Tuning <span className="font-medium">acks</span> and enabling idempotent producer behavior reduces duplicates and increases safety under retries.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="font-semibold text-slate-950">Transactions + exactly-once (where needed)</p>
                      <p className="mt-2 text-sm text-slate-700">
                        When you need atomic “consume + produce” workflows (especially with Kafka Streams), transactions can provide end-to-end exactly-once processing semantics.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="font-semibold text-slate-950">Schema Registry + compatibility</p>
                      <p className="mt-2 text-sm text-slate-700">
                        For long-lived topics, you treat event schemas like APIs. A schema registry + compatibility rules prevent breaking changes.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="font-semibold text-slate-950">Kafka Connect</p>
                      <p className="mt-2 text-sm text-slate-700">
                        Managed connectors to move data in/out of Kafka (databases, S3, Elasticsearch, etc.). Great for CDC and integrations.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="font-semibold text-slate-950">Kafka Streams</p>
                      <p className="mt-2 text-sm text-slate-700">
                        Stream processing as code: joins, aggregations, windowing, and state stores (materialized views) built directly from topics.
                      </p>
                    </div>
                  </div>

                  <Callout tone="warn" title="Advanced truth: Kafka is easy to start, hard to operate">
                    <ul className="list-disc space-y-1 pl-5">
                      <li>Capacity planning matters (partitions, throughput, disk, retention).</li>
                      <li>Operational metrics matter (broker health, under-replicated partitions, request latency, consumer lag).</li>
                      <li>Security matters (TLS, SASL, ACLs) in real environments.</li>
                    </ul>
                  </Callout>
                </Section>

                <Section id="use-cases" title="Use cases (where Kafka shines)" level="All">
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      {
                        t: 'Event-driven microservices',
                        d: 'Publish business events once; many independent services react (payments, shipping, notifications).',
                      },
                      {
                        t: 'Analytics in near real time',
                        d: 'Dashboards, funnels, anomaly detection, and operational metrics from the same event stream.',
                      },
                      {
                        t: 'CDC (Change Data Capture)',
                        d: 'Stream database changes (via connectors) to keep systems in sync without heavy polling.',
                      },
                      {
                        t: 'Log & audit streams',
                        d: 'Central, durable event history for audits, troubleshooting, and replay.',
                      },
                      {
                        t: 'Stream processing',
                        d: 'Real-time transformations, joins, and aggregations (Kafka Streams) to build materialized views.',
                      },
                      {
                        t: 'Integration backbone',
                        d: 'Connect SaaS + databases + internal services via standardized topics and contracts.',
                      },
                    ].map((x) => (
                      <div key={x.t} className="rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="font-semibold text-slate-950">{x.t}</p>
                        <p className="mt-2 text-sm text-slate-700">{x.d}</p>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section id="advantages" title="Advantages & trade-offs" level="All">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="font-semibold text-slate-950">Advantages</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                        <li>Decouples services: publish once, many consumers.</li>
                        <li>Handles spikes better than synchronous chains.</li>
                        <li>Replay enables backfills, audits, rebuilding views.</li>
                        <li>Scales via partitions + consumer groups.</li>
                        <li>Enables stream processing (real-time) and batch-like reprocessing.</li>
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="font-semibold text-slate-950">Trade-offs</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                        <li>Operational complexity (brokers, configs, monitoring).</li>
                        <li>Async means eventual consistency and new failure modes.</li>
                        <li>Duplicates/retries are normal; consumers must be robust.</li>
                        <li>Schema/versioning discipline is required.</li>
                        <li>Partitioning decisions can be hard to change later.</li>
                      </ul>
                    </div>
                  </div>
                </Section>

                <Section id="implementation" title="How dev teams implement it (Spring)" level="All">
                  <p>
                    A common pattern in Spring Boot: produce with <span className="font-medium">KafkaTemplate</span>, consume with{' '}
                    <span className="font-medium">@KafkaListener</span>. The key is not the annotation — it’s the behavior: idempotency, retries, and observability.
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="font-semibold text-slate-950">Producer (pseudocode)</p>
                      <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-100">{`// kafkaTemplate.send("orders.created", orderId, payload);

eventId = UUID
payload = { eventId, type: "OrderCreated", orderId, userId, total, createdAt }
publish topic: orders.created (key = orderId)`}</pre>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="font-semibold text-slate-950">Consumer (pseudocode)</p>
                      <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-100">{`@KafkaListener(topics = "orders.created", groupId = "payment-service")
handle(event):
  if alreadyProcessed(event.eventId): return
  authorizePayment(event.orderId)
  publish payments.authorized | payments.failed
  markProcessed(event.eventId)`}</pre>
                      <p className="mt-2 text-sm text-slate-700">
                        This is “at-least-once safe” because a retry won’t double-charge if your handler is idempotent.
                      </p>
                    </div>
                  </div>

                  <Callout tone="info" title="The Outbox pattern (very common)">
                    <p>
                      If your service writes to a DB and publishes an event, use a transactional outbox so you don’t lose events when a crash happens between DB commit and publish.
                    </p>
                  </Callout>
                </Section>

                <Section id="getting-started" title="Getting started (local checklist)" level="All">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-950">Quick checklist</p>
                    <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
                      <li>Start Kafka locally (your team’s preferred method, often Docker Compose).</li>
                      <li>Create topics (start small): <span className="font-medium">orders.created</span>, <span className="font-medium">payments.authorized</span>, <span className="font-medium">inventory.reserved</span>.</li>
                      <li>Run one producer and one consumer group; publish a test event; confirm offsets advance.</li>
                      <li>Simulate failure: restart consumer; verify idempotency and retry behavior.</li>
                      <li>Watch lag and errors so you learn what “healthy” looks like.</li>
                    </ol>
                  </div>

                  <p className="text-sm text-slate-600">
                    If you want, tell me whether you prefer Docker Compose or local installs and I’ll wire the repo accordingly.
                  </p>
                </Section>
              </div>
            </div>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            Presenting tip: explain the e‑commerce story first (everyone understands it), then zoom into intermediate/advanced reliability topics for the dev audience.
          </p>
        </main>
      </div>

      <footer className="border-t border-slate-200 py-6">
        <div className="mx-auto max-w-6xl px-4 text-xs text-slate-500">Built with React + Tailwind for internal learning.</div>
      </footer>
    </div>
  )
}

export default App
