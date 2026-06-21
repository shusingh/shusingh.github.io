import{j as e}from"./react-vendor-Dh7AJ6mW.js";import{u as r}from"./mdx-vendor-BzN17NPF.js";const l={title:"Compliance testing orchestrator",slug:"disco-ta",eyebrow:"Amazon · Step Functions Architecture",description:"A Step Functions orchestration layer for end-to-end compliance test execution, with marketplace-level isolation, test-data locking, callback-based execution, and compensation guarantees.",date:"2025-03-01",tech:["Step Functions","Lambda","DynamoDB","EventBridge","Test Executor"],stat:{number:"100%",label:"Marketplace failures tolerated without losing other results"},diagram:{nodes:["acquire data","run tests","release data","aggregate"],caption:"per-marketplace compensation"},order:4};function a(n){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:"This public version focuses on the orchestration model and failure-handling decisions, not internal APIs or data schemas."}),`
`]}),`
`,e.jsx(t.h2,{id:"the-problem",children:e.jsx(t.a,{href:"#the-problem",children:"The problem"})}),`
`,e.jsx(t.p,{children:"The testing automation platform needed to orchestrate end-to-end test execution for Maverick compliance controls. A single test run could span multiple test suites and marketplaces. Each combination needed test data, an asynchronous test execution, result processing, and cleanup."}),`
`,e.jsx(t.p,{children:"The tricky part was not starting tests. The tricky part was preserving isolation."}),`
`,e.jsx(t.p,{children:"If the UK execution failed, US results should still be preserved. If one marketplace could not acquire test data, other marketplaces should continue. If a workflow failed after locking test data, the system had to release only the data it owned. And if the test executor ran for hours, the orchestrator should not burn compute polling for completion."}),`
`,e.jsx(t.p,{children:"The design goal was clear: run combinations in parallel, tolerate partial failure, preserve detailed results, and guarantee test-data cleanup."}),`
`,e.jsx(t.h2,{id:"the-approach",children:e.jsx(t.a,{href:"#the-approach",children:"The approach"})}),`
`,e.jsx(t.p,{children:"The orchestrator is a new Step Functions workflow inside an existing orchestration service. It reuses the shared account, pipeline, and infrastructure, but keeps test-automation Lambdas in separate packages from existing configuration Lambdas."}),`
`,e.jsx(t.p,{children:"That package split was deliberate:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"A faulty test-automation deployment can be rolled back without affecting configuration deployment."}),`
`,e.jsx(t.li,{children:"Test-specific dependencies do not bloat unrelated Lambda packages."}),`
`,e.jsx(t.li,{children:"The blast radius of test execution stays separate from configuration orchestration."}),`
`]}),`
`,e.jsx(t.h3,{id:"map-state-over-test-suite-and-marketplace",children:e.jsx(t.a,{href:"#map-state-over-test-suite-and-marketplace",children:"Map state over test suite and marketplace"})}),`
`,e.jsxs(t.p,{children:["The core workflow uses a Step Functions Map state over the cartesian product of ",e.jsx(t.code,{children:"testSuiteId × marketplace"}),"."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-text",children:`Fetch definitions
  → Map(testSuiteId × marketplace)
      → Acquire test data
      → Trigger test execution
      → Release test data
  → Aggregate results
`})}),`
`,e.jsxs(t.p,{children:["Each Map iteration receives a minimal payload: ",e.jsx(t.code,{children:"testRunId"}),", ",e.jsx(t.code,{children:"testSuiteId"}),", ",e.jsx(t.code,{children:"marketplace"}),", and retry count. Detailed test results live in DynamoDB, not in the workflow payload, so the state machine stays well under Step Functions payload limits."]}),`
`,e.jsx(t.p,{children:"The Map state tolerates individual iteration failures. Failed marketplace executions return standardized failure results to the collector. They do not terminate the whole workflow. This was the key product behavior: a UK timeout should not erase US and DE results."}),`
`,e.jsx(t.h3,{id:"test-data-locking",children:e.jsx(t.a,{href:"#test-data-locking",children:"Test-data locking"})}),`
`,e.jsx(t.p,{children:"Test data is a shared, limited pool. A configuration represents a complete set of concrete bindings for one test suite and marketplace. Two concurrent executions cannot safely use the same data."}),`
`,e.jsx(t.p,{children:"The orchestrator locks test data with DynamoDB conditional writes:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["acquire only if the configuration is ",e.jsx(t.code,{children:"ACTIVE"}),";"]}),`
`,e.jsxs(t.li,{children:["mark it ",e.jsx(t.code,{children:"LOCKED"})," with ",e.jsx(t.code,{children:"lockedBy = testRunId"}),";"]}),`
`,e.jsxs(t.li,{children:["set a ",e.jsx(t.code,{children:"lockExpiresAt"})," safety timestamp;"]}),`
`,e.jsxs(t.li,{children:["release only when ",e.jsx(t.code,{children:"lockedBy"})," matches the current execution."]}),`
`]}),`
`,e.jsx(t.p,{children:"On retry, the acquisition Lambda first checks whether this execution already owns a lock for the same suite and marketplace. If it does, acquisition is idempotent and skips duplicate work."}),`
`,e.jsx(t.p,{children:"Lock contention does not fail immediately. The workflow waits 30 minutes and retries, up to 48 attempts. That gives long-running test executions up to 24 hours to release data before the waiting execution fails with a clear lock-timeout result."}),`
`,e.jsx(t.h3,{id:"callback-over-polling",children:e.jsx(t.a,{href:"#callback-over-polling",children:"Callback over polling"})}),`
`,e.jsxs(t.p,{children:["The orchestrator uses ",e.jsx(t.code,{children:"waitForTaskToken"})," to integrate with the test executor."]}),`
`,e.jsx(t.p,{children:"The flow:"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsxs(t.li,{children:["Step Functions enters ",e.jsx(t.code,{children:"TriggerTestExecution"})," and generates a task token."]}),`
`,e.jsx(t.li,{children:"The Lambda starts the Test Executor state machine and passes the task token."}),`
`,e.jsx(t.li,{children:"Step Functions pauses without consuming compute."}),`
`,e.jsxs(t.li,{children:["The test executor runs the underlying test infrastructure, writes detailed results to DynamoDB, and calls ",e.jsx(t.code,{children:"SendTaskSuccess"})," or ",e.jsx(t.code,{children:"SendTaskFailure"}),"."]}),`
`,e.jsx(t.li,{children:"The orchestrator resumes with a minimal completion payload."}),`
`]}),`
`,e.jsx(t.p,{children:"This avoids a polling loop. For a four-hour run with 60-second polling, one marketplace would require roughly 240 Lambda invocations and hundreds of state transitions. With three to five marketplaces running in parallel, polling cost and complexity multiply quickly. Callback keeps the orchestrator simple and lets DynamoDB remain the source of progress visibility."}),`
`,e.jsx(t.h2,{id:"failure-handling",children:e.jsx(t.a,{href:"#failure-handling",children:"Failure handling"})}),`
`,e.jsx(t.p,{children:"Every failure falls into one of three categories:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Transient:"})," DynamoDB throttling, Lambda service errors, downstream 503s. Retry with bounded exponential backoff."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Deterministic:"})," invalid input, inactive suite, missing test data, missing artifact. Fail immediately with a descriptive result."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Catastrophic:"})," workflow infrastructure failure or unrecoverable release failure. Emit alarms and rely on defense-in-depth cleanup."]}),`
`]}),`
`,e.jsxs(t.p,{children:["The invariant is simple: ",e.jsx(t.strong,{children:"any test data acquired for a marketplace must be released before that marketplace iteration terminates."})]}),`
`,e.jsxs(t.p,{children:["Within each Map iteration, failures after acquisition route through ",e.jsx(t.code,{children:"ReleaseTestDataCompensation"}),". That Lambda queries DynamoDB for locks owned by this ",e.jsx(t.code,{children:"testRunId"}),", ",e.jsx(t.code,{children:"testSuiteId"}),", and ",e.jsx(t.code,{children:"marketplace"}),", then releases only those locks. Other marketplace iterations continue unaffected."]}),`
`,e.jsx(t.p,{children:"There is also a stale-lock cleanup Lambda outside the workflow, triggered by EventBridge. If a workflow is cancelled or compensation itself fails, the cleanup path releases expired locks without deleting the underlying test-data configuration. TTL was not appropriate because the data item must remain available. Only the lock fields should be removed."}),`
`,e.jsx(t.h2,{id:"the-results",children:e.jsx(t.a,{href:"#the-results",children:"The results"})}),`
`,e.jsx(t.p,{children:"The design produced a workflow with clear operational properties:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Marketplace-level isolation."})," A failure in one marketplace does not block results from others."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Precise compensation."})," Failed iterations release only the test data they own."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Long-running execution support."})," Test Executor callbacks allow up to seven-day runs without polling compute."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Result durability."})," Detailed test counts and reports are persisted in DynamoDB during execution; aggregation reads from storage rather than relying on callback payloads."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Observable state transitions."})," Every state emits structured logs and metrics for debugging and alerting."]}),`
`]}),`
`,e.jsx(t.p,{children:"The most important result is not that the workflow can run tests. It is that the workflow can fail without corrupting shared test data or losing unrelated marketplace results."}),`
`,e.jsx(t.h2,{id:"tradeoffs-and-limitations",children:e.jsx(t.a,{href:"#tradeoffs-and-limitations",children:"Tradeoffs and limitations"})}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Map state adds ASL complexity."})," A single bundled test run would have been simpler on paper. The Map design introduces more states and more per-iteration error handling. I accepted that complexity because it buys isolation, compensation precision, and marketplace-level observability."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Multiple test executions can increase orchestration overhead."})," The workflow may start one execution per test suite and marketplace. That is more orchestration than a single bundled run, but each execution is smaller and failures are scoped."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Callback has weak heartbeat semantics."})," If the Test Executor crashes early and never calls back, Step Functions waits until the configured timeout. Progress visibility lives in DynamoDB, not in the callback. That is acceptable, but it means the UI and alarms must read execution progress from storage."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Locking is deliberately simple."})," DynamoDB conditional writes are enough for the current concurrency profile. A dedicated locking service would add operational complexity without clear benefit."]}),`
`,e.jsx(t.h2,{id:"what-i-would-do-differently",children:e.jsx(t.a,{href:"#what-i-would-do-differently",children:"What I would do differently"})}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Design the stale-lock path at the same time as the happy path."})," It is tempting to add cleanup later, but in orchestration systems cleanup is part of correctness. The stale-lock Lambda should be treated as a first-class component from day one."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Make compensation visible in the UI."})," Operators should be able to see that a failed marketplace released its test data cleanly. That turns a scary failure into a known terminal state."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Write failure-category docs before ASL."})," Once failure modes are categorized as transient, deterministic, or catastrophic, the state machine becomes easier to reason about."]}),`
`,e.jsx(t.h2,{id:"what-this-work-taught-me",children:e.jsx(t.a,{href:"#what-this-work-taught-me",children:"What this work taught me"})}),`
`,e.jsx(t.p,{children:"Good orchestration is mostly about bounded failure. The happy path is usually straightforward. The design quality shows up when only one marketplace fails, when a callback never arrives, when test data is scarce, or when cleanup has to run after partial progress."}),`
`,e.jsx(t.p,{children:"Step Functions gave us the right primitives: Map state for isolation, callback tokens for long-running execution, retries for transient failures, and explicit compensation paths for cleanup. The engineering work was deciding where to spend that complexity so the workflow remained debuggable."})]})}function c(n={}){const{wrapper:t}={...r(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(a,{...n})}):a(n)}const x=Object.freeze(Object.defineProperty({__proto__:null,default:c,frontmatter:l},Symbol.toStringTag,{value:"Module"})),d={title:"EU DSA compliance pipeline",slug:"eu-dsa-pipeline",eyebrow:"Amazon · Regulatory Data",description:"A PySpark pipeline processing 30M+ monthly records for EU Digital Services Act transparency reporting, built around schema versioning, replayable error isolation, and audit-grade traceability.",date:"2026-05-15",tech:["PySpark","AWS Glue","Python","Distributed Systems"],stat:{number:"70% ↓",label:"Incident resolution time"},diagram:{nodes:["ingest","validate","transform","aggregate","submit"],caption:"isolate errors, preserve audit state"},featured:!1,order:5};function s(n){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:"This public version keeps sensitive implementation details out of scope, but captures the shape of the system and the engineering decisions behind it."}),`
`]}),`
`,e.jsx(t.h2,{id:"the-problem",children:e.jsx(t.a,{href:"#the-problem",children:"The problem"})}),`
`,e.jsx(t.p,{children:"The EU Digital Services Act requires large online platforms to submit detailed transparency reports about content-moderation decisions on a fixed cadence. The reports are not optional, and the requirements are precise: each reported item needs territorial scope, policy reason codes, decision type, report source, and enough structure for downstream regulatory review."}),`
`,e.jsx(t.p,{children:"The pipeline I led the design for processes moderation events from multiple internal sources, applies DSA-mandated transformations, validates against an evolving rule set, and produces structured monthly reporting outputs."}),`
`,e.jsxs(t.p,{children:["The scale was meaningful, but not the hard part: ",e.jsx(t.strong,{children:"30M+ records per month"})," is well within what a properly tuned PySpark job can process. The harder problem was survivability. A regulatory pipeline has different failure economics than an analytics pipeline. Dropped records are a compliance risk. Silent corruption is worse. A single malformed record cannot be allowed to halt the entire reporting window, but it also cannot disappear."]}),`
`,e.jsx(t.p,{children:"The core tensions:"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Schema evolution is regulated."})," As requirements change, product categories expand, and territorial rules shift, the schema changes. The pipeline needs to process current and historical formats without breaking reconstructability."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Error isolation is mandatory."})," A malformed record cannot halt the batch and cannot be silently discarded. Both fail-fast and drop-and-continue are wrong."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"The audit trail is part of the deliverable."})," When someone asks why a specific event was reported a specific way, the system needs to show which schema version, mapping version, validation rules, and transformation path produced that output."]}),`
`]}),`
`,e.jsx(t.h3,{id:"why-naive-data-pipelines-fail-here",children:e.jsx(t.a,{href:"#why-naive-data-pipelines-fail-here",children:"Why naive data pipelines fail here"})}),`
`,e.jsx(t.p,{children:"Three patterns that are acceptable in ordinary batch pipelines become liabilities in regulated data systems."}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Fail fast is wrong."})," Standard data engineering advice says to validate strictly, fail loudly, fix the source, and replay. That is reasonable when the cost of a failed run is internal delay. For regulatory reporting, one malformed class of records can block the entire monthly submission. The better pattern is: isolate fast, continue, escalate."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Schema-as-code without versioning is wrong."})," Many pipelines define the current schema in code and migrate when the shape changes. That breaks down when historical reports may need to be reconstructed months later. The system needs to understand every schema version it has produced, not just the one currently deployed."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Implicit aggregation is wrong."})," DSA reporting outputs include counts by policy category, geography, decision type, and reporting window. Those aggregations are not incidental implementation details. They are part of the regulatory output. Treating them casually makes audits and amendments painful."]}),`
`,e.jsx(t.h2,{id:"the-approach",children:e.jsx(t.a,{href:"#the-approach",children:"The approach"})}),`
`,e.jsx(t.p,{children:"The pipeline is a PySpark batch system structured around three architectural commitments: per-record schema versioning, replayable error isolation, and composable validation."}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-text",children:`ingest -> validate -> transform -> aggregate -> submit
             ↓            ↓             ↓
       error store   schema route   audit trail
         + replay    per record     per transform
`})}),`
`,e.jsx(t.h3,{id:"per-record-schema-versioning",children:e.jsx(t.a,{href:"#per-record-schema-versioning",children:"Per-record schema versioning"})}),`
`,e.jsx(t.p,{children:"Every record carries an explicit schema version. Transformation logic is selected by lookup:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-text",children:`schema version -> transformation path
`})}),`
`,e.jsx(t.p,{children:"When a new reporting requirement lands, the system adds a new schema version and transformation path. Older transformations remain valid. Older data continues to process under the rules that were active when it was produced."}),`
`,e.jsxs(t.p,{children:["That design has an important consequence: ",e.jsx(t.strong,{children:"the pipeline can run multiple transformation versions in the same monthly batch."})," Records route by version, transform in parallel, and unify at the aggregation layer."]}),`
`,e.jsx(t.p,{children:"This turned schema migration from a breaking cutover into an additive change. A new field gets a new version. The new transformation reads it. The old transformation does not. Nobody needs to coordinate a brittle all-at-once migration across every upstream producer."}),`
`,e.jsx(t.p,{children:"It is the sort of design decision that looks optional until the first regulatory schema change arrives. After that, it becomes the thing that keeps the pipeline alive."}),`
`,e.jsx(t.h3,{id:"error-isolation-with-replay",children:e.jsx(t.a,{href:"#error-isolation-with-replay",children:"Error isolation with replay"})}),`
`,e.jsx(t.p,{children:"Validation splits the batch into two streams:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Compliant records"})," continue through transformation, aggregation, and submission."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Errored records"})," route to a separate persisted store with structured failure reasons, such as missing mandatory fields, invalid territorial scope, or dependent attribute violations."]}),`
`]}),`
`,e.jsxs(t.p,{children:["The critical property is that errored records are ",e.jsx(t.strong,{children:"persisted, classified, and replayable"}),". They are not dropped, and they do not block the clean portion of the batch."]}),`
`,e.jsx(t.p,{children:"An operations surface tracks error counts, error classes, affected sources, and schema versions. When the root cause is fixed, usually an upstream data-quality issue, the errored records can be corrected and replayed as a separate run. The replay output can merge with the original run without losing traceability."}),`
`,e.jsxs(t.p,{children:["This pattern drove most of the ",e.jsx(t.strong,{children:"70% reduction in incident resolution time"}),'. Before this design, a bad record class could halt the run, force a debugging cycle, require a code or mapping fix, and trigger a full rerun. Afterward, compliant records continued downstream while the bad records were isolated with precise failure reasons. The operator path changed from "stop the world" to "triage, fix, replay."']}),`
`,e.jsx(t.h3,{id:"composable-validation",children:e.jsx(t.a,{href:"#composable-validation",children:"Composable validation"})}),`
`,e.jsx(t.p,{children:"Validation is implemented as composable rule classes, each with one responsibility:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"MandatoryFieldCheck"})," verifies required fields are present and non-empty."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"UniqueAttributeValidation"})," enforces uniqueness where the schema requires it."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"DependentAttributesValidation"}),' handles "at least one of this group must be present" constraints.']}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"TerritorialScopeValidation"})," restricts territorial scope to the DSA-supported market set."]}),`
`]}),`
`,e.jsx(t.p,{children:"Each validator returns an annotated result, not a boolean. Errors accumulate instead of short-circuiting. A record can fail multiple validations, and operators see the full failure set rather than the first error encountered."}),`
`,e.jsx(t.p,{children:"New requirements typically add a validator. They do not require rewriting the validation layer. That matters because regulatory systems age by accumulating rules. If every new rule requires editing the core pipeline, the design will eventually collapse under its own change rate."}),`
`,e.jsx(t.h2,{id:"the-infrastructure-that-made-it-shippable",children:e.jsx(t.a,{href:"#the-infrastructure-that-made-it-shippable",children:"The infrastructure that made it shippable"})}),`
`,e.jsx(t.p,{children:"The production value came from the less glamorous parts:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Partitioning by marketplace and region."})," Natural skew across larger markets is handled deliberately instead of letting Spark hide it behind larger clusters."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Salting on heavy partitions."})," The highest-volume regions get additional distribution so a few hot keys do not dominate job time."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Broadcast joins for small lookup tables."})," Policy reason mappings and territorial reference data move to executors cheaply, cutting shuffle cost."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Caching at expensive boundaries."})," Intermediate outputs are cached where multiple downstream aggregations reuse the same transformed data."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Executor right-sizing."})," Spark will happily spend whatever cluster you give it. Cost is monitored at executor and stage level, not just at job level."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Idempotent batch boundaries."})," A rerun of a given reporting window produces the same output, aside from explicitly replayed error records."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Alarms on the actual risk signals."})," Validation failure rate, output volume drift, schema-version mismatch, partition skew, and submission acknowledgment latency all matter more than a generic job-failed alarm."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Audit logging per transformation."})," The pipeline records which schema version applied, which mapping table version was active, which validators ran, which records were isolated, and when."]}),`
`]}),`
`,e.jsx(t.p,{children:"None of that is flashy. All of it determines whether a monthly regulatory pipeline survives contact with real data."}),`
`,e.jsx(t.h2,{id:"the-results",children:e.jsx(t.a,{href:"#the-results",children:"The results"})}),`
`,e.jsxs(t.p,{children:["The pipeline sustained ",e.jsx(t.strong,{children:"30M+ records processed monthly"})," against evolving reporting requirements, schema versions, and validation rules."]}),`
`,e.jsxs(t.p,{children:["The headline result was a ",e.jsx(t.strong,{children:"70% reduction in incident resolution time"}),". The reduction came from three sources:"]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Error isolation."})," Clean records continued downstream while malformed records were isolated for triage and replay."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Schema versioning."})," Changes that previously risked emergency code patches became additive transformation paths."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Queryable audit state."})," Debugging no longer required reconstructing a run from scattered logs. The trace was explicit."]}),`
`]}),`
`,e.jsx(t.p,{children:"The broader win was operational. Monthly reporting stopped behaving like a recurring fire drill and started behaving like infrastructure. The team could spend more time improving the system and less time recovering from the reporting window."}),`
`,e.jsx(t.h2,{id:"tradeoffs-and-limitations",children:e.jsx(t.a,{href:"#tradeoffs-and-limitations",children:"Tradeoffs and limitations"})}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"The system optimizes for correctness over latency."})," This is a batch architecture, not a streaming decisioning system. For monthly DSA reporting, that is the right tradeoff. For use cases where decisions need to happen in seconds, the architecture would need to change."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Schema versioning has carrying cost."})," Every retained transformation path is code that must keep working. The escape valve is deliberate version retirement: backfill or reconcile the affected historical data, then sunset old transformations. That needs planning. It is not free."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Error isolation can hide systemic upstream problems."})," A pipeline that gracefully isolates errors can also normalize them if alerting is weak. Error-rate alarms need careful calibration. Too sensitive and on-call gets noise. Too loose and a real upstream regression reaches reporting time."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Skew can turn into cost quickly."})," Spark can mask skew by throwing compute at it. That keeps the job green while the bill climbs. Partition-size monitoring matters as much as runtime monitoring."]}),`
`,e.jsx(t.h2,{id:"what-i-would-do-differently",children:e.jsx(t.a,{href:"#what-i-would-do-differently",children:"What I would do differently"})}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Build the error-handling path before the happy path."})," The system's resilience comes from malformed records, late-arriving data, schema mismatches, and replay. Those are exactly the parts teams are tempted to defer in a prototype. They should not be deferred in regulated systems."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Treat audit traceability as an output, not telemetry."})," For regulatory pipelines, the audit trail is not only for debugging. It is part of what the system produces. Every transformation should emit traceable facts from the beginning."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Invest in synthetic data earlier."})," Real regulatory data carries access restrictions, audit overhead, and reproducibility constraints. A synthetic corpus that preserves structure, skew, schema versions, and error classes makes iteration dramatically faster."]}),`
`,e.jsx(t.h2,{id:"what-this-work-taught-me",children:e.jsx(t.a,{href:"#what-this-work-taught-me",children:"What this work taught me"})}),`
`,e.jsx(t.p,{children:"Regulatory data engineering inverts several familiar instincts. Fail fast becomes isolate fast. Schema migration becomes schema versioning. Aggregations become deliverables. Audit trails become outputs."}),`
`,e.jsx(t.p,{children:"The engineering is not necessarily harder than ordinary data engineering. The cost of being wrong is different. In most domains, bad data creates operational pain. In regulated domains, bad data can create regulatory liability."}),`
`,e.jsx(t.p,{children:'The other lesson: a 30M-record monthly run that "succeeds" without instrumentation is not trustworthy. Every transformation needs to be countable, comparable across runs, and explainable after the fact. The boring parts are the product.'}),`
`,e.jsxs(t.p,{children:["If you are building data infrastructure for regulated domains or want to compare notes on schema evolution at scale, ",e.jsx(t.a,{href:"mailto:shubh.singh.dev@gmail.com",children:"get in touch"}),"."]})]})}function h(n={}){const{wrapper:t}={...r(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(s,{...n})}):s(n)}const y=Object.freeze(Object.defineProperty({__proto__:null,default:h,frontmatter:d},Symbol.toStringTag,{value:"Module"})),u={title:"MaverickIQ: agentic Q&A for compliance",slug:"maverick-iq",eyebrow:"Amazon · Architect & Tech Lead",description:"An agentic Q&A system that lets engineering teams self-serve compliance questions instead of filing tickets, built on hybrid BM25 plus kNN retrieval, citation-grounded answers, and compliance-grade auditability.",date:"2026-05-15",tech:["Strands Agents SDK","AWS Bedrock","AgentCore","OpenSearch","BM25 + kNN","Bedrock KB","Python"],stat:{number:"90% ↓",label:"Manual ticket volume across 5 partner teams"},diagram:{nodes:["router","BM25","kNN","answer"],caption:"hybrid retrieval with fail-closed grounding"},featured:!0,order:2};function i(n){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:"This public version keeps sensitive implementation details out of scope, but captures the shape of the system and the engineering decisions behind it."}),`
`]}),`
`,e.jsx(t.h2,{id:"the-problem",children:e.jsx(t.a,{href:"#the-problem",children:"The problem"})}),`
`,e.jsx(t.p,{children:`Compliance teams at Amazon's scale are inherently bottlenecks, not because the people are slow, but because the knowledge is theirs. Every product team launching a feature, every engineer wiring up a new integration, every PM scoping a new region has the same kind of question: "Does control X apply here? What does this clause actually mean? How does GDPR Article 17 interact with our retention policy?"`}),`
`,e.jsx(t.p,{children:"Multiply that by hundreds of partner teams and you get a queue. The queue gets answered by the same handful of compliance experts. Those experts spend their week answering tickets instead of doing the work only they can do: control design, regulatory interpretation, and audit prep. Everyone loses."}),`
`,e.jsx(t.p,{children:'The naive fix is "build a chatbot." That fix has a perfect failure rate in regulated domains, and it is worth being precise about why.'}),`
`,e.jsx(t.h3,{id:"why-a-naive-llm-chatbot-fails-here",children:e.jsx(t.a,{href:"#why-a-naive-llm-chatbot-fails-here",children:"Why a naive LLM chatbot fails here"})}),`
`,e.jsx(t.p,{children:"Three failure modes show up immediately:"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Hallucinated citations."})," An LLM asked about a regulation will happily invent one. It can produce confident output that cites GDPR Article 17(3) when no such subsection exists, or attribute a clause to the wrong jurisdiction entirely. In a regulated domain this is not a quirk. It is a liability. Compliance teams cannot trust a system that produces plausible wrong answers, even occasionally."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"No provenance."})," Even when the model is right, a plain LLM response is unauditable. A user gets an answer, but nobody can show which paragraph of which regulation the answer is grounded in. For compliance work, an answer without provenance is worth very little. The user has to verify it manually anyway, which defeats the purpose."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"No separation between structured and unstructured knowledge."})," Compliance knowledge is bimodal. There is structured data: internal control taxonomies, applicability matrices, and region-by-region rule tables. It is clean, queryable, and authoritative. There is also unstructured data: regulation text, legal interpretation memos, and policy guidance documents. It is verbose, overlapping, and full of context. A single retrieval strategy cannot serve both well."]}),`
`,e.jsx(t.p,{children:"A working system has to give grounded answers with citations from the right kind of source for the question being asked. That is the design problem."}),`
`,e.jsx(t.h2,{id:"the-approach",children:e.jsx(t.a,{href:"#the-approach",children:"The approach"})}),`
`,e.jsxs(t.p,{children:["MaverickIQ is an agentic Q&A system built with ",e.jsx(t.strong,{children:"Strands Agents SDK"})," on ",e.jsx(t.strong,{children:"AWS Bedrock AgentCore"}),", with ",e.jsx(t.strong,{children:"hybrid BM25 plus kNN retrieval"})," over structured control metadata and approved internal documentation. Citation-grounded responses were a hard architectural constraint, not a prompt preference."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-text",children:`question  ->  router  ->  retrieve  ->  ground  ->  answer
                          ↓                       ↓
                    [BM25 + kNN]           [with citations]
`})}),`
`,e.jsx(t.p,{children:"The agent does not generate factual claims without retrieved evidence. The system is engineered to make that constraint enforceable, not just hopeful."}),`
`,e.jsx(t.h3,{id:"hybrid-retrieval-bm25-plus-knn",children:e.jsx(t.a,{href:"#hybrid-retrieval-bm25-plus-knn",children:"Hybrid retrieval: BM25 plus kNN"})}),`
`,e.jsx(t.p,{children:'The most common architectural shortcut in RAG systems is "embed everything, search with kNN." For compliance work, this is the wrong default. A lot of the most useful compliance knowledge is not prose. It is tables, taxonomies, and rules like "in marketplace X, control Y applies to seller category Z if and only if condition W."'}),`
`,e.jsx(t.p,{children:'That kind of knowledge is damaged by chunking and embedding. The semantic similarity of "does control Y apply in Germany" to a row in a 2,000-row applicability table is poor. You might retrieve adjacent rows that have nothing to do with Germany and miss the row that does.'}),`
`,e.jsx(t.p,{children:"The fix was hybrid retrieval, with each path tuned for the data shape it actually served:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"BM25 over structured control metadata."})," Control IDs, marketplace filters, applicability matrices, deployment states, version history, and nested configuration details belong in lexical and filtered search. DynamoDB Streams feed a sync Lambda that joins source records into one denormalized OpenSearch document per control. The implementation exposes this path through a constrained ",e.jsx(t.code,{children:"SearchControls"})," tool, so the agent can ask precise questions without constructing arbitrary backend queries."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"kNN over unstructured policy and workflow knowledge."})," Regulation text, interpretation memos, SOPs, and launch documentation belong in semantic retrieval. The implementation exposes this path through an ",e.jsx(t.code,{children:"ExplainConcept"}),' tool backed by a Bedrock Knowledge Base, where vector search is useful because users ask "what does this mean?" questions rather than exact key lookups.']}),`
`]}),`
`,e.jsx(t.p,{children:'A router decides which retrieval path, or both paths, to invoke based on the question shape. "Which controls target the US marketplace?" is BM25-heavy. "What does this launch state mean?" is kNN-heavy. "Why did this control fail launch in this region?" usually hits both.'}),`
`,e.jsx(t.p,{children:"The agent is constrained to ground every factual claim in verified retrieval output and surface source metadata directly in the answer. Control-data answers include deep links back into the internal control UI. Documentation answers include the source system and entity references needed for verification."}),`
`,e.jsx(t.h3,{id:"citation-grounding-as-an-architectural-constraint",children:e.jsx(t.a,{href:"#citation-grounding-as-an-architectural-constraint",children:"Citation grounding as an architectural constraint"})}),`
`,e.jsx(t.p,{children:"The system enforces citation grounding at the schema layer, not the prompt layer."}),`
`,e.jsx(t.p,{children:'The agent does not produce a free-text answer. It produces a structured response: a sequence of claims, each tied to one or more retrieval results. The presentation layer assembles those claims into prose with inline citations. If a claim has no supporting retrieval, the system either reformulates the answer to drop the unsupported claim or returns an "I do not have evidence to answer that" response.'}),`
`,e.jsxs(t.p,{children:["The user-facing effect: every answer comes with ",e.jsx(t.strong,{children:"clickable citations"})," that link to the specific document and section the claim came from. The user can verify the answer in seconds instead of having to take it on faith."]}),`
`,e.jsx(t.p,{children:'The architectural effect: hallucinations are structurally inhibited, not merely discouraged. A claim with no citation cannot render. A wrong citation is verifiable. The system fails visibly by saying "I do not know" instead of invisibly returning wrong but confident prose.'}),`
`,e.jsx(t.h3,{id:"tool-calling-with-audit-boundaries",children:e.jsx(t.a,{href:"#tool-calling-with-audit-boundaries",children:"Tool calling with audit boundaries"})}),`
`,e.jsxs(t.p,{children:["The agent has access to a small set of tools: ",e.jsx(t.code,{children:"SearchControls"})," for BM25-backed filtered search and direct lookup over the control index, ",e.jsx(t.code,{children:"ExplainConcept"})," for kNN-backed documentation retrieval, and a Phase 1 path for mutation tools through MCP Gateway. Each tool call is structured, logged, and audit-traceable."]}),`
`,e.jsx(t.p,{children:"Tool calls are gated by an explicit allow-list. The agent cannot invent tools, construct arbitrary backend calls, or reach data it does not have explicit permission for. The constraint is enforced at the SDK and gateway layer, not at the prompt layer. Relying on a prompt to keep an LLM out of trouble is not a strategy."}),`
`,e.jsx(t.h2,{id:"the-infrastructure-that-made-it-shippable",children:e.jsx(t.a,{href:"#the-infrastructure-that-made-it-shippable",children:"The infrastructure that made it shippable"})}),`
`,e.jsx(t.p,{children:"The parts of this system that determined whether it would actually be trusted in production:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Audit logging on every query."})," Who asked, what they asked, which retrieval paths fired, what was retrieved, which claims were grounded in which sources, what the final answer was, which model version produced it, and which prompt template version was in effect."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Explicit latency budgets."})," Simple single-source lookups target p90 under 3 seconds; complex multi-source questions target p90 under 6 seconds. Each stage has its own budget: UI/network, agent routing, OpenSearch lookup, KB retrieval, generation, and citation assembly."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Idempotent query handling."})," The same question asked twice produces the same answer, given the same retrieval index state. This sounds obvious until you realize most LLM systems trivially fail this property."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Versioned retrieval indices."}),' When a regulation updates or a control taxonomy changes, the index is rebuilt as a new version, not mutated in place. Answers can be reproduced against the index state at the time they were given, which matters when someone asks, "the system told me X three weeks ago, was that correct?"']}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Near-real-time freshness."})," Source changes flow from DynamoDB Streams through a sync Lambda into OpenSearch, with a target of reflecting control configuration changes in the search index within 60 seconds."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Permission-aware retrieval."})," Different teams have access to different policy documents. The retrieval layer filters results by the requesting user's permissions before they reach the agent, so the agent cannot surface or reason over data the user is not entitled to see."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Guardrails for fail-closed behavior."})," If a tool returns no usable evidence, the system asks for a more specific control ID or refined query instead of fabricating an answer. Guardrails and schema checks make the refusal path an intended product behavior."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Continuous evaluation against a held-out question set."})," Real compliance questions with known-good answers run nightly. Quality regressions get caught against the eval set before users see them."]}),`
`]}),`
`,e.jsx(t.p,{children:"None of this is the interesting part of a demo. All of it is the part that determined whether compliance leadership would let the system near a real user."}),`
`,e.jsx(t.h2,{id:"the-results",children:e.jsx(t.a,{href:"#the-results",children:"The results"})}),`
`,e.jsxs(t.p,{children:["Across five partner teams piloting the system, MaverickIQ deflected approximately ",e.jsx(t.strong,{children:"90% of manual control-interpretation tickets"}),". Teams stopped filing tickets to compliance for routine questions because the answers were already accessible: grounded, cited, and verifiable in seconds."]}),`
`,e.jsx(t.p,{children:"Specific patterns worth noting:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Time-to-answer"})," for routine questions dropped from typical multi-day ticket turnaround to seconds."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Compliance team capacity"})," shifted toward high-judgment work: regulatory interpretation, audit prep, and control design."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Citation engagement is high."})," Users actually click citations and verify against source documents. That is the strongest signal that the trust model is working. Users do not take answers on faith, but the system makes verification fast enough that they use it anyway."]}),`
`]}),`
`,e.jsx(t.p,{children:'The deflection is not because the LLM is smart. It is because retrieval is matched to the shape of the knowledge and the citations are real. The model is doing translation work: turning "show controls with deployment failures" into the right BM25-backed control-index query, or turning "what does this launch state mean?" into a kNN-grounded explanation from approved documentation. That is the right job for the LLM in this system.'}),`
`,e.jsx(t.h2,{id:"tradeoffs-and-limitations",children:e.jsx(t.a,{href:"#tradeoffs-and-limitations",children:"Tradeoffs and limitations"})}),`
`,e.jsx(t.p,{children:"A few honest things."}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Retrieval recall is the ceiling."})," When MaverickIQ fails, it is almost never because the agent reasoned badly. It is because the right control document, configuration row, or knowledge-base passage was not retrieved. Improving the read model, query construction, chunking, embeddings, and reranking has a higher ceiling than improving the model. Most of the win is upstream of the LLM."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"The system is conservative by design."}),' It is much more likely to say "I do not have evidence to answer that" than to answer wrongly. This is the right calibration for compliance. False negatives are recoverable, false positives are not. It does mean users sometimes get refusals on questions a human expert would have answered confidently. Reducing the refusal rate without breaking the trust model is an ongoing tension.']}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Ambiguous regulatory questions are hard."}),' "What does this regulation mean?" is often a question without a single right answer. It is a legal interpretation question that real compliance experts debate. The system handles this by surfacing the relevant text and any internal interpretation memos that touch on it, but it deliberately does not synthesize an opinion. That is a feature, not a bug. The user applies judgment with the relevant context in front of them.']}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Index freshness matters more than usual."})," A six-month-stale index is fine for many enterprise search use cases. It is not fine for compliance. Regulations change, internal policies update, and an answer based on a stale index can be confidently wrong. Continuous re-indexing on policy updates is non-negotiable."]}),`
`,e.jsx(t.h2,{id:"what-i-would-do-differently",children:e.jsx(t.a,{href:"#what-i-would-do-differently",children:"What I would do differently"})}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Build the eval set before building the agent."})," The first version of MaverickIQ shipped with subjective spot-checks for quality. A structured eval set with known-good Q&A pairs would have caught a class of regressions earlier and given the team a more defensible way to talk about quality changes with stakeholders."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Invest in query planning and re-ranking earlier."})," The router and retrieval tools work, but quality depends heavily on mapping the user's natural-language question to the right filters and source plane. A learned re-ranker for documentation relevance and a stronger query planner for control-index filters would meaningfully improve recall@5. Recall is the actual bottleneck."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Treat the citation UX as a product surface, not a footnote."})," Citation grounding is the trust mechanism that makes the whole system usable. Initially the citations were rendered as a list at the end of answers. That was passable, but not engaging. Inline citation rendering with hover-preview of source text dramatically increased verification behavior. Trust is a UX problem as much as a retrieval problem."]}),`
`,e.jsx(t.h2,{id:"what-this-work-taught-me",children:e.jsx(t.a,{href:"#what-this-work-taught-me",children:"What this work taught me"})}),`
`,e.jsx(t.p,{children:"The interesting design problem in RAG-style systems is not the R or the AG. It is the boundary between them. Retrieval that is too aggressive surfaces noise, and the agent confidently reasons over irrelevant context. Retrieval that is too conservative misses the right document, and the agent has nothing useful to ground against. Most of the engineering work is in calibrating that boundary and making failure modes legible to users when it inevitably miscalibrates."}),`
`,e.jsxs(t.p,{children:["The other lesson: for high-stakes Q&A, ",e.jsx(t.strong,{children:"constraint is a feature"}),'. The system that says "I do not have evidence to answer that" is more trustworthy than the system that always has an answer. Users adapt to a system they can trust faster than they adapt to a system that is brilliant but occasionally hallucinates. The first one becomes infrastructure. The second one stays a demo.']}),`
`,e.jsxs(t.p,{children:["If you are building agentic retrieval systems in a regulated or high-stakes domain and want to compare notes, ",e.jsx(t.a,{href:"mailto:shubh.singh.dev@gmail.com",children:"get in touch"}),"."]})]})}function p(n={}){const{wrapper:t}={...r(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}const j=Object.freeze(Object.defineProperty({__proto__:null,default:p,frontmatter:u},Symbol.toStringTag,{value:"Module"})),m={title:"ZeroTouch / RISC Central UI",slug:"zero-touch",eyebrow:"Amazon · Sole HLD Author",description:"A redesigned control launch portal for dynamic DAG workflows, multi-tenant artifact management, role-gated actions, and lock-aware review flows across workflow and content backends.",date:"2025-08-01",tech:["React","TypeScript","RTK Query","Step Functions","Artifact APIs"],stat:{number:"2,000+",label:"Control launches targeted in 2026"},diagram:{nodes:["Workflow API","Content API","Agent platform"],separator:"+",caption:"one operator surface"},featured:!0,order:3};function o(n){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:"This public version generalizes internal names and integration details, but preserves the architecture and product decisions I owned."}),`
`]}),`
`,e.jsx(t.h2,{id:"the-problem",children:e.jsx(t.a,{href:"#the-problem",children:"The problem"})}),`
`,e.jsx(t.p,{children:"ZeroTouch was moving from a rigid linear workflow to a config-driven DAG model for launching safety and compliance controls. The old RISC Central UI had been built around the old assumption: a fixed wizard, hardcoded sub-steps, limited visibility into in-flight work, and no clean way to reuse or bring user-provided artifacts."}),`
`,e.jsx(t.p,{children:"That model broke down as soon as the backend became dynamic. Controls could now have different graph shapes, skippable steps, rewind behavior, generated artifacts, user-uploaded artifacts, and approval paths that varied by control type. At the same time, artifact storage was moving out of the workflow service into a separate multi-tenant content service."}),`
`,e.jsx(t.p,{children:"The UI had to become the operator surface across two backends:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"The workflow service"})," owned workflow state: which steps exist, how they depend on each other, what state each step is in, and which action is currently legal."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"The content service"})," owned content state: artifact versions, comments, refinement, upload/download, approval status, and artifact locks."]}),`
`]}),`
`,e.jsx(t.p,{children:"The hard part was not drawing a workflow tree. The hard part was preventing users from taking the wrong action while two backend planes evolved asynchronously."}),`
`,e.jsx(t.h2,{id:"the-approach",children:e.jsx(t.a,{href:"#the-approach",children:"The approach"})}),`
`,e.jsx(t.p,{children:"I authored the high-level design for a complete RISC Central UI redesign and drove the product architecture with three constraints:"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Render workflows dynamically from backend configuration."})," The UI cannot assume a fixed sequence or a known set of steps. It consumes ",e.jsx(t.code,{children:"ListSteps"})," and renders the backend-authored group hierarchy, per-step metadata, dependencies, and available actions."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Treat workflow and content as separate sources of truth."})," The UI does not pretend there is one backend. It orchestrates reads and writes across both, and it makes the handoff between workflow state and artifact state visible to users."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Make every mutation lock-aware and role-gated."})," The interface must remain readable while work is in flight, but it must not offer stale or illegal actions."]}),`
`]}),`
`,e.jsx(t.h3,{id:"dynamic-dag-workflows",children:e.jsx(t.a,{href:"#dynamic-dag-workflows",children:"Dynamic DAG workflows"})}),`
`,e.jsx(t.p,{children:"The new workflow model is a DAG, not a wizard. A user can select any available step, review generated artifacts, provide feedback, approve, reject, upload a replacement artifact, or rewind a step when content needs correction."}),`
`,e.jsx(t.p,{children:"The UI renders this as a grouped workflow tree rather than a generic graph. That was a deliberate product tradeoff. A full node-link DAG looked impressive but made routine work harder to scan. A nested indentation view gave operators the information they needed: group, step, current state, waiting-on labels, and action affordances."}),`
`,e.jsx(t.p,{children:"The important rule: the UI does not infer the workflow graph. It reads backend-authored visualization metadata. If a step depends on another step, or if a step is skipped, locked, waiting, generating, in review, pending approval, archived, or complete, the UI renders from server state rather than local reasoning."}),`
`,e.jsx(t.h3,{id:"two-backends-one-interaction-model",children:e.jsx(t.a,{href:"#two-backends-one-interaction-model",children:"Two backends, one interaction model"})}),`
`,e.jsx(t.p,{children:"Almost every meaningful action touches both the workflow service and the content service, but not in the same way."}),`
`,e.jsx(t.p,{children:"Before a step starts, the UI may write user input to the workflow service. Once a step has started and artifacts exist, artifact mutations go through the content service. Refinement, comments, inline edits, uploads, version selection, and approval status changes are content-owned. The workflow service learns about those changes through backend notifications and reflects the new workflow state on the next poll."}),`
`,e.jsx(t.p,{children:"This separation created a class of UX edge cases:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"The content service may mark an artifact approved while the workflow service is still processing downstream routing."}),`
`,e.jsx(t.li,{children:"A step may be in user review while an artifact is temporarily locked by the content service."}),`
`,e.jsx(t.li,{children:"A control may be globally locked while another user's mutation is propagating."}),`
`,e.jsx(t.li,{children:"A user may rewind a step and need to understand which artifacts are preserved versus regenerated."}),`
`]}),`
`,e.jsx(t.p,{children:"The design handles those cases with explicit gates rather than scattered conditionals."}),`
`,e.jsx(t.h2,{id:"the-gating-model",children:e.jsx(t.a,{href:"#the-gating-model",children:"The gating model"})}),`
`,e.jsx(t.p,{children:"The core UX design is a five-part gating model:"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Step state gate."})," ",e.jsx(t.code,{children:"stepStatus"}),", ",e.jsx(t.code,{children:"currentPhase"}),", and ",e.jsx(t.code,{children:"userActionList"})," determine the base screen and available actions."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Control-level lock."})," The entire control becomes read-only while a global mutation is processing."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Step-level lock."})," One step can become inert while other steps remain interactive."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Artifact-level lock."})," The content service can lock a specific artifact while edit or refinement is in flight."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Cross-plane pending gate."})," If the content and workflow services disagree temporarily during downstream routing, the UI disables terminal actions and explains the pending state."]}),`
`]}),`
`,e.jsx(t.p,{children:"These gates are UX safety rails, not security boundaries. Both backends still revalidate every mutation server-side. The point of the UI gates is to prevent users from walking into known-bad states and to explain why an action is not available."}),`
`,e.jsx(t.h3,{id:"lock-aware-ui",children:e.jsx(t.a,{href:"#lock-aware-ui",children:"Lock-aware UI"})}),`
`,e.jsx(t.p,{children:"Locks exist at three scopes:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Control lock:"})," all mutating actions across the control are disabled, but users can still navigate and read."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Step lock:"})," a single step is locked independently of the rest of the workflow."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Artifact lock:"})," edit/refine actions on one artifact are paused while the content service processes a transition."]}),`
`]}),`
`,e.jsx(t.p,{children:"The UI composes those scopes into one decision model. Components do not manually check every field. They consume a derived lock view and render banners, disabled actions, or read-only surfaces accordingly."}),`
`,e.jsx(t.p,{children:'That sounds small. It is not. Lock clarity is the difference between "the system is broken" and "the system is processing a change from another user."'}),`
`,e.jsx(t.h2,{id:"state-management",children:e.jsx(t.a,{href:"#state-management",children:"State management"})}),`
`,e.jsx(t.p,{children:"The low-level design split UI state across clear owners:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"URL state"})," owns where the user is: route, control ID, selected step."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"RTK Query"})," owns server state: controls, steps, artifacts, comments, locks, versions."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Redux session state"})," owns authenticated user and active program selection."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Local component state"})," owns form drafts, modal state, editor buffers, and optimistic flags."]}),`
`]}),`
`,e.jsx(t.p,{children:"The critical decision was to keep backend-authored state in RTK Query, not duplicate it in custom Redux slices. Locks, artifact versions, step phases, and workflow status are all server state. Duplicating them creates a second source of truth and almost guarantees stale UI."}),`
`,e.jsx(t.p,{children:"Polling is also deliberate. Control state, step state, and artifact state each have their own cadence. Polling continues while locks are active because polling is how the UI detects that a lock has cleared. Background fetches are deduped to avoid no-op rerenders."}),`
`,e.jsx(t.h2,{id:"what-made-the-design-hard",children:e.jsx(t.a,{href:"#what-made-the-design-hard",children:"What made the design hard"})}),`
`,e.jsx(t.p,{children:"The hard parts were all at the edges:"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Rewind preview."})," Rewinding a step can regenerate downstream artifacts. The user needs a preview of what will be preserved, what will be regenerated, and what work may be invalidated before they commit."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"BYOA."})," Bring Your Own Artifact sounds simple until you decide where the artifact reference lives before a step starts, where versions live after a step starts, and which backend owns completion."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"External approval exception."})," Most approval flows move through the content service. Some control types require an external approval workflow initiated by the workflow service. The UI needs to surface the difference without making users learn backend topology."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Cross-tab correctness."})," Users can open the same control in two tabs. Lock state and polling need to keep both tabs honest so a stale page does not imply access that no longer exists."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Role-gated navigation."})," System Admins, Program Admins, Risk Managers, and Ops users have different capabilities. The UI hides or disables actions based on role context, while backends remain the source of enforcement."]}),`
`,e.jsx(t.h2,{id:"the-results",children:e.jsx(t.a,{href:"#the-results",children:"The results"})}),`
`,e.jsx(t.p,{children:"The design gave three partner teams a shared implementation contract:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"One user journey from dashboard to dynamic workflow detail to step-level review."}),`
`,e.jsx(t.li,{children:"One gate model for locks, pending states, artifacts, and role constraints."}),`
`,e.jsx(t.li,{children:"One state-management model for workflow state, content state, and local UI state."}),`
`,e.jsx(t.li,{children:"One set of API sequences for generate, refine, edit, approve, reject, upload, rewind, and approval workflows."}),`
`]}),`
`,e.jsx(t.p,{children:"The value was not only the final UI. The value was removing ambiguity across teams. Backend owners, content-service owners, and frontend implementers could reason from the same document about who owned which state, when the UI should poll, which backend receives which mutation, and what the user sees during every in-flight transition."}),`
`,e.jsx(t.h2,{id:"what-i-would-do-differently",children:e.jsx(t.a,{href:"#what-i-would-do-differently",children:"What I would do differently"})}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Prototype the workflow tree earlier."})," The biggest product risk was not API wiring. It was whether operators could understand a DAG workflow without a full graph visualization. A clickable prototype would have exposed the scanability tradeoff earlier."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Write the gate matrix before the page specs."})," Most complexity in this system came from action availability. Writing the step-state and lock-state matrix first would have simplified the later page design."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Name the two-plane ownership model sooner."}),' Once we had the sentence "workflow owns step state; content owns artifact state," many debates got easier. That phrase should have been on page one.']}),`
`,e.jsx(t.h2,{id:"what-this-work-taught-me",children:e.jsx(t.a,{href:"#what-this-work-taught-me",children:"What this work taught me"})}),`
`,e.jsx(t.p,{children:"Complex internal tools fail when they hide state. Operators can tolerate waiting, locks, pending transitions, and backend constraints if the UI tells the truth about what is happening."}),`
`,e.jsx(t.p,{children:"The best design work here was not visual polish. It was making distributed state legible: which backend owns the truth, which actions are legal right now, what is still processing, and what the user can do next."})]})}function g(n={}){const{wrapper:t}={...r(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o(n)}const b=Object.freeze(Object.defineProperty({__proto__:null,default:g,frontmatter:m},Symbol.toStringTag,{value:"Module"}));export{x as _,y as a,j as b,b as c};
