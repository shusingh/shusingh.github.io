import{j as e}from"./react-vendor-DRnTuPlI.js";import{F as i,L as r,H as o,S as j,a,C as h,I as w,T as y}from"./content-projects-CDOPHMa0.js";import{u as s}from"./mdx-vendor-q2tj1Xgi.js";const b={title:"Agentic systems, explained from first principles",date:"2026-05-15",slug:"agentic-systems-basics",excerpt:"A plain-English map of agents, tools, MCP servers, streaming responses, agent frameworks, runtime infrastructure, memory, state, and the engineering choices that make agentic systems production-ready.",readTime:"13 min read",tags:["agents","architecture","production"]};function l(n){const t={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.p,{children:'Most explanations of agentic systems start in the wrong place. They start with frameworks, model names, or diagrams full of boxes labeled "planner" and "executor."'}),`
`,e.jsx(t.p,{children:"The simpler starting point is this:"}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"An agentic system is a software system where an LLM is allowed to choose the next step inside a controlled loop."})}),`
`,e.jsx(t.p,{children:"That is the whole idea. The rest is engineering."}),`
`,e.jsx(t.p,{children:"A normal LLM call looks like this:"}),`
`,e.jsx(i,{nodes:["Input","Model","Output"]}),`
`,e.jsx(t.p,{children:"An agentic system looks more like this:"}),`
`,e.jsx(r,{steps:["Observe context","Decide next step","Call a tool or model","Update durable state"],decision:"Enough evidence?",yes:"final answer",no:"loop with new state",caption:"The model decides inside a loop, but the application owns execution and state."}),`
`,e.jsx(t.p,{children:"The model is not just producing text. It is helping decide what to do next: search a document store, call an API, ask a clarifying question, draft a section, run a test, critique an answer, or stop because it has enough evidence."}),`
`,e.jsx(t.p,{children:"That extra freedom is what makes agents useful. It is also what makes them risky. A model that can choose actions needs boundaries, state, observability, and a clear runtime contract. Otherwise you have a demo that looks smart until it hits the first ambiguous request."}),`
`,e.jsx(t.p,{children:"This post is a plain-English map of the pieces."}),`
`,e.jsx(t.h2,{id:"agent-workflow-and-assistant",children:e.jsx(t.a,{href:"#agent-workflow-and-assistant",children:"Agent, workflow, and assistant"})}),`
`,e.jsx(t.p,{children:'The word "agent" gets used loosely, so it helps to separate three related ideas.'}),`
`,e.jsx(t.h3,{id:"assistant",children:e.jsx(t.a,{href:"#assistant",children:"Assistant"})}),`
`,e.jsx(t.p,{children:"An assistant answers a user directly. It may have some context, but the basic shape is request and response."}),`
`,e.jsx(i,{nodes:["User asks a question","Model writes the answer","User reads the answer"],direction:"vertical"}),`
`,e.jsx(t.p,{children:"This is enough for summarization, rewriting, brainstorming, explanation, and many lightweight support flows."}),`
`,e.jsx(t.h3,{id:"workflow",children:e.jsx(t.a,{href:"#workflow",children:"Workflow"})}),`
`,e.jsx(t.p,{children:"A workflow is a fixed sequence of steps. The application decides the path, and the model performs narrow jobs inside that path."}),`
`,e.jsx(i,{nodes:["Classify","Retrieve","Generate","Validate","Send"],caption:"The application owns every transition, retry policy, and timeout."}),`
`,e.jsx(t.p,{children:"Workflows are underrated. If the path is known ahead of time, use a workflow. It is easier to test, cheaper to run, and easier to explain in an incident review."}),`
`,e.jsx(t.h3,{id:"agent",children:e.jsx(t.a,{href:"#agent",children:"Agent"})}),`
`,e.jsx(t.p,{children:"An agent has some control over the path. It can choose tools, decide whether it needs more information, loop over intermediate results, and stop when the task is complete."}),`
`,e.jsx(o,{left:{title:"Loaded context",body:"User goal, state, docs, permissions"},center:"Model decision engine",right:[{title:"Answer user"},{title:"Search documents"},{title:"Call safe API"},{title:"Ask clarification"},{title:"Stop"}],caption:"The model chooses from a bounded action surface. The application validates and executes."}),`
`,e.jsx(t.p,{children:'That autonomy should be scoped. A production agent should not be "a model that can do anything." It should be "a model that can choose from a small set of safe actions to accomplish a specific job."'}),`
`,e.jsx(t.p,{children:"The smaller the job, the better the agent."}),`
`,e.jsx(t.h2,{id:"the-agent-loop",children:e.jsx(t.a,{href:"#the-agent-loop",children:"The agent loop"})}),`
`,e.jsx(t.p,{children:"Most agentic systems are variations of the same loop:"}),`
`,e.jsx(r,{steps:["Receive goal","Load context","Choose action","Execute action","Record result"],decision:"Done?",yes:"return final response",no:"load updated context"}),`
`,e.jsx(t.p,{children:"Each step has a different owner. That is the part many diagrams hide."}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Step"}),e.jsx(t.th,{children:"Model owns"}),e.jsx(t.th,{children:"Application owns"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Load context"}),e.jsx(t.td,{children:"Nothing directly"}),e.jsx(t.td,{children:"Fetch state, documents, permissions"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Choose action"}),e.jsx(t.td,{children:"Pick from allowed actions"}),e.jsx(t.td,{children:"Define the allowed actions"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Execute action"}),e.jsx(t.td,{children:"Request a tool call"}),e.jsx(t.td,{children:"Validate, authorize, run, retry"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Record result"}),e.jsx(t.td,{children:"Interpret result"}),e.jsx(t.td,{children:"Persist logs and durable state"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Stop or continue"}),e.jsx(t.td,{children:"Decide if enough evidence exists"}),e.jsx(t.td,{children:"Enforce budgets and loop limits"})]})]})]}),`
`,e.jsx(t.p,{children:'The important phrase is "the application executes." The model should decide from allowed options, but your software should own execution, permissions, retries, timeouts, and state transitions.'}),`
`,e.jsx(t.p,{children:"A good agent loop feels boring in code. That is a compliment."}),`
`,e.jsx(t.h2,{id:"tools",children:e.jsx(t.a,{href:"#tools",children:"Tools"})}),`
`,e.jsx(t.p,{children:"Tools are how agents touch the outside world."}),`
`,e.jsx(t.p,{children:"A tool can be simple:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-text",children:`search_documents(query)
`})}),`
`,e.jsx(t.p,{children:"Or operational:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-text",children:`create_ticket(title, severity, owner)
`})}),`
`,e.jsx(t.p,{children:"Or highly domain-specific:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-text",children:`get_control_applicability(controlId, marketplace)
`})}),`
`,e.jsx(t.p,{children:"The model does not call these functions directly. It asks to call them by producing structured arguments. Your application validates those arguments, checks permissions, executes the tool, and returns the result."}),`
`,e.jsx(t.p,{children:"This matters because tool calling is where agentic systems become real software. Without tools, an agent can only talk. With tools, it can inspect state and take action."}),`
`,e.jsx(t.p,{children:"That is useful. It is also dangerous."}),`
`,e.jsx(t.p,{children:"For production systems, every tool needs:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"A narrow purpose."})," One tool should do one job."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"A typed input schema."})," The model should not invent request shapes."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Permission checks."})," The user may be allowed to read something but not mutate it."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Audit logs."})," You should know who triggered the tool, with what input, and what happened."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Idempotency."})," Retried tool calls should not create duplicate side effects."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Clear failure behavior."})," The agent should know whether to retry, ask for clarification, or stop."]}),`
`]}),`
`,e.jsx(t.p,{children:"If this sounds like normal backend engineering, that is the point. Agents do not remove backend discipline. They raise the cost of not having it."}),`
`,e.jsx(t.h2,{id:"mcp-servers",children:e.jsx(t.a,{href:"#mcp-servers",children:"MCP servers"})}),`
`,e.jsxs(t.p,{children:["MCP stands for ",e.jsx(t.strong,{children:"Model Context Protocol"}),". The easiest way to think about it:"]}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"MCP is a standard way for AI applications to connect to external tools and context."})}),`
`,e.jsx(t.p,{children:"Instead of every AI app inventing its own custom integration format, an MCP server exposes capabilities through a shared protocol. An AI client can connect to that server and discover what it provides."}),`
`,e.jsx(t.p,{children:"MCP servers commonly expose three kinds of things:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Tools:"})," actions the model can ask to run, such as querying a database or calling an API."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Resources:"})," context the model can read, such as files, documents, database records, or generated reports."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Prompts:"}),' reusable task templates, such as "summarize this incident" or "prepare this code review."']}),`
`]}),`
`,e.jsx(t.p,{children:"The key idea is separation. The agent client handles the conversation and model calls. The MCP server owns access to a specific system."}),`
`,e.jsx(t.p,{children:"For example:"}),`
`,e.jsx(o,{left:{title:"Agent client",body:"Conversation and model calls"},center:"MCP protocol",right:[{title:"GitHub server",body:"PRs, issues, branches"},{title:"Docs server",body:"Runbooks, specs, internal docs"},{title:"Deploy server",body:"Rollout status and service health"}]}),`
`,e.jsx(t.p,{children:"Each server exposes a clean contract. The agent does not need hardcoded knowledge of every backend API."}),`
`,e.jsx(t.p,{children:"The mistake is treating MCP as magic. MCP does not make tools safe by itself. A dangerous tool exposed through MCP is still dangerous. You still need auth, allow-lists, confirmation flows, logging, rate limits, and output validation."}),`
`,e.jsx(t.p,{children:"MCP is the connector standard. It is not the safety model."}),`
`,e.jsx(t.h2,{id:"streaming-responses",children:e.jsx(t.a,{href:"#streaming-responses",children:"Streaming responses"})}),`
`,e.jsx(t.p,{children:"Streaming means the system sends partial output while the agent is still working."}),`
`,e.jsx(t.p,{children:"For simple chat, streaming looks like text appearing word by word. In agentic systems, streaming is more useful than that. It can show the shape of the work as it happens."}),`
`,e.jsx(t.p,{children:"A good streamed agent response might include:"}),`
`,e.jsx(j,{leftTitle:"Client UI",rightTitle:"Agent runtime",events:[{side:"left",label:"submit question"},{side:"right",label:"status.reading"},{side:"right",label:"tool.started(search)"},{side:"right",label:"tool.completed(12 hits)"},{side:"right",label:"text.delta"},{side:"right",label:"citation.added"},{side:"right",label:"done"}]}),`
`,e.jsx(t.p,{children:"Streaming is not only a UX improvement. It is also an observability surface."}),`
`,e.jsx(t.p,{children:"Users trust a system more when they can see progress. Engineers debug a system faster when intermediate events are visible. Product teams can design better experiences when tool calls, retrieval steps, and completion events are explicit."}),`
`,e.jsx(t.p,{children:"The engineering rule: stream events, not just tokens."}),`
`,e.jsx(t.p,{children:"Token streaming says:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-text",children:`"The answer is..."
`})}),`
`,e.jsx(t.p,{children:"Event streaming says:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-text",children:`{ type: "tool.started", name: "searchControls" }
{ type: "tool.completed", resultCount: 12 }
{ type: "text.delta", text: "The answer is..." }
{ type: "citation.added", source: "policy-doc-17" }
`})}),`
`,e.jsx(t.p,{children:"That event stream can drive a UI, logs, traces, and analytics. It also lets you separate what the model is saying from what the system is doing."}),`
`,e.jsx(t.h2,{id:"agentic-libraries",children:e.jsx(t.a,{href:"#agentic-libraries",children:"Agentic libraries"})}),`
`,e.jsx(t.p,{children:"Agentic libraries are developer frameworks for building the loop."}),`
`,e.jsx(t.p,{children:"Examples include Strands Agents, LangGraph, CrewAI, LlamaIndex, Semantic Kernel, and the OpenAI Agents SDK. The names change quickly, but the jobs are similar."}),`
`,e.jsx(t.p,{children:"Most agentic libraries help with some combination of:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Defining tools"}),`
`,e.jsx(t.li,{children:"Calling models"}),`
`,e.jsx(t.li,{children:"Maintaining conversation or state"}),`
`,e.jsx(t.li,{children:"Routing between agents"}),`
`,e.jsx(t.li,{children:"Streaming events"}),`
`,e.jsx(t.li,{children:"Handling structured outputs"}),`
`,e.jsx(t.li,{children:"Building multi-step graphs"}),`
`,e.jsx(t.li,{children:"Integrating memory or retrieval"}),`
`]}),`
`,e.jsx(t.p,{children:"The important thing is to know what the library owns and what your application owns."}),`
`,e.jsx(t.p,{children:"A library can help you wire an agent. It should not own your product semantics."}),`
`,e.jsx(t.p,{children:"Your application should still own:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Authorization"}),`
`,e.jsx(t.li,{children:"Business rules"}),`
`,e.jsx(t.li,{children:"Durable state"}),`
`,e.jsx(t.li,{children:"Audit logs"}),`
`,e.jsx(t.li,{children:"Data contracts"}),`
`,e.jsx(t.li,{children:"Evaluation criteria"}),`
`,e.jsx(t.li,{children:"Deployment and rollback"}),`
`,e.jsx(t.li,{children:"User-visible failure behavior"}),`
`]}),`
`,e.jsx(t.p,{children:"The best agent frameworks make the loop easier to express without hiding the loop from you."}),`
`,e.jsx(t.p,{children:"If a framework makes it hard to see what happened, hard to test a step, or hard to bound tool access, it is probably optimizing for demos instead of production."}),`
`,e.jsx(t.h2,{id:"runtime-infrastructure",children:e.jsx(t.a,{href:"#runtime-infrastructure",children:"Runtime infrastructure"})}),`
`,e.jsx(t.p,{children:"Local agents are easy. Production agents are not."}),`
`,e.jsx(t.p,{children:"Once an agent leaves your laptop, you need runtime infrastructure:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Where does the agent code run?"}),`
`,e.jsx(t.li,{children:"How are sessions isolated?"}),`
`,e.jsx(t.li,{children:"How long can a task run?"}),`
`,e.jsx(t.li,{children:"How do you stream partial results?"}),`
`,e.jsx(t.li,{children:"How are tool credentials managed?"}),`
`,e.jsx(t.li,{children:"How do you observe tool calls and model calls?"}),`
`,e.jsx(t.li,{children:"How do you roll out a new version?"}),`
`,e.jsx(t.li,{children:"How do you stop one user's context from leaking into another user's session?"}),`
`]}),`
`,e.jsxs(t.p,{children:["That is the layer services like ",e.jsx(t.strong,{children:"Amazon Bedrock AgentCore Runtime"})," are trying to address."]}),`
`,e.jsx(t.p,{children:"In simple terms, AgentCore Runtime is a managed place to host agent or tool code. It handles concerns like session management, isolation, scaling, streaming, long-running work, protocol support, and observability so teams do not have to assemble all of that from scratch."}),`
`,e.jsx(t.p,{children:"The high-level contract is useful:"}),`
`,e.jsx(a,{groups:[{title:"Developer",items:["Writes agent code","Packages deployment"]},{title:"Runtime",items:["Session isolation","Streaming responses","Long-running tasks"]},{title:"Operations",items:["Observability","Versioned rollout","Rollback path"]}],caption:"A runtime gives the agent a managed place to execute. It does not make the agent good by itself."}),`
`,e.jsx(t.p,{children:"For enterprise agents, this runtime layer matters. Stateful agent workloads are not exactly like stateless HTTP handlers. They may need to preserve session context, perform multi-step work, call external tools, stream progress, and run longer than a typical request-response cycle."}),`
`,e.jsx(t.p,{children:"The runtime does not make the agent good. It gives the agent a safer place to run."}),`
`,e.jsx(t.h2,{id:"memory-context-and-state",children:e.jsx(t.a,{href:"#memory-context-and-state",children:"Memory, context, and state"})}),`
`,e.jsx(t.p,{children:"People use these words interchangeably, but they are different."}),`
`,e.jsx(t.h3,{id:"context",children:e.jsx(t.a,{href:"#context",children:"Context"})}),`
`,e.jsx(t.p,{children:"Context is what the model sees right now. It includes the user request, system instructions, retrieved documents, tool outputs, and any prior messages included in the prompt."}),`
`,e.jsx(t.p,{children:"Context is temporary. It is the model's working set."}),`
`,e.jsx(t.h3,{id:"memory",children:e.jsx(t.a,{href:"#memory",children:"Memory"})}),`
`,e.jsx(t.p,{children:"Memory is information saved across turns or sessions. It might include user preferences, facts the user asked the system to remember, or summaries of prior work."}),`
`,e.jsx(t.p,{children:"Memory should be intentional. Saving everything is not memory. It is clutter with privacy risk."}),`
`,e.jsx(t.h3,{id:"state",children:e.jsx(t.a,{href:"#state",children:"State"})}),`
`,e.jsx(t.p,{children:"State is the durable truth your application owns. A document draft, workflow status, ticket ID, approval decision, retrieved source version, or audit log entry is state."}),`
`,e.jsx(t.p,{children:"State should be queryable, versioned when needed, and controlled by your application."}),`
`,e.jsx(t.p,{children:"The best production pattern is:"}),`
`,e.jsx(a,{groups:[{title:"Context",items:["What the model sees now","Prompt","Retrieved docs","Tool outputs"]},{title:"State",items:["What survives the turn","Drafts","Workflow status","Audit logs"]},{title:"Memory",items:["What may be recalled later","Explicit","Scoped","Permissioned"]}]}),`
`,e.jsx(t.p,{children:"Many agent failures come from confusing these. A chat transcript is not a database. A model's hidden reasoning is not an audit trail. A summary of prior turns is not the same as durable state."}),`
`,e.jsx(t.h2,{id:"planning-and-multi-agent-systems",children:e.jsx(t.a,{href:"#planning-and-multi-agent-systems",children:"Planning and multi-agent systems"})}),`
`,e.jsx(t.p,{children:"Some agents plan before they act. Some systems split work across multiple agents."}),`
`,e.jsx(t.p,{children:"For example:"}),`
`,e.jsx(i,{nodes:["Planner","Researcher","Drafter","Critic","Refiner"],caption:"The value is separation of concerns, not simply having more agents."}),`
`,e.jsx(t.p,{children:"This can be useful when the job has separable responsibilities. A planner can create an outline. A researcher can gather evidence. A drafter can produce text. A critic can check the output against a rubric. A refiner can apply feedback."}),`
`,e.jsx(t.p,{children:'The benefit is not that "more agents equals more intelligence." The benefit is separation of concerns.'}),`
`,e.jsx(t.p,{children:"Each agent should have:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"A narrow role"}),`
`,e.jsx(t.li,{children:"A clear input schema"}),`
`,e.jsx(t.li,{children:"A clear output schema"}),`
`,e.jsx(t.li,{children:"A quality bar"}),`
`,e.jsx(t.li,{children:"A reason to exist"}),`
`]}),`
`,e.jsx(t.p,{children:"If two agents are both vague generalists, you probably do not need both. You need a better workflow."}),`
`,e.jsx(t.h2,{id:"guardrails",children:e.jsx(t.a,{href:"#guardrails",children:"Guardrails"})}),`
`,e.jsx(t.p,{children:"Guardrails are constraints around what the system can do."}),`
`,e.jsx(t.p,{children:"Some guardrails are model-facing:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Instructions"}),`
`,e.jsx(t.li,{children:"Output schemas"}),`
`,e.jsx(t.li,{children:"Refusal rules"}),`
`,e.jsx(t.li,{children:"Citation requirements"}),`
`]}),`
`,e.jsx(t.p,{children:"Some guardrails are application-facing:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Tool allow-lists"}),`
`,e.jsx(t.li,{children:"Auth checks"}),`
`,e.jsx(t.li,{children:"Human approval steps"}),`
`,e.jsx(t.li,{children:"Rate limits"}),`
`,e.jsx(t.li,{children:"Transaction boundaries"}),`
`,e.jsx(t.li,{children:"Retry policies"}),`
`,e.jsx(t.li,{children:"Data-loss prevention checks"}),`
`]}),`
`,e.jsx(t.p,{children:"The application-facing guardrails are usually more important."}),`
`,e.jsx(t.p,{children:'A prompt that says "do not call dangerous tools" is weaker than an application that does not expose dangerous tools. A prompt that says "cite your sources" is weaker than a renderer that refuses to display uncited claims.'}),`
`,e.jsx(t.p,{children:"The strongest systems make the correct behavior the easiest behavior."}),`
`,e.jsx(t.h2,{id:"evaluation",children:e.jsx(t.a,{href:"#evaluation",children:"Evaluation"})}),`
`,e.jsx(t.p,{children:"You cannot ship serious agents by clicking around the UI and seeing if they feel good."}),`
`,e.jsx(t.p,{children:"Agent evaluation needs test sets:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Known-good questions and answers"}),`
`,e.jsx(t.li,{children:"Tool-call expectations"}),`
`,e.jsx(t.li,{children:"Retrieval recall checks"}),`
`,e.jsx(t.li,{children:"Citation correctness checks"}),`
`,e.jsx(t.li,{children:"Regression tests for prompts"}),`
`,e.jsx(t.li,{children:"Latency and cost budgets"}),`
`,e.jsx(t.li,{children:"Human review for judgment-heavy cases"}),`
`]}),`
`,e.jsx(t.p,{children:"The eval should match the job."}),`
`,e.jsx(t.p,{children:"For a compliance Q&A agent, citation correctness matters more than charm. For a coding agent, patch correctness matters more than explanation quality. For a customer support agent, policy compliance and escalation behavior may matter more than answer length."}),`
`,e.jsx(t.p,{children:"Good evals turn agent quality from a vibe into an engineering conversation."}),`
`,e.jsx(t.h2,{id:"a-production-checklist",children:e.jsx(t.a,{href:"#a-production-checklist",children:"A production checklist"})}),`
`,e.jsx(t.p,{children:"If I were reviewing an agentic system design, I would ask these questions first:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"What job is the agent responsible for?"}),`
`,e.jsx(t.li,{children:"Why does this need agency instead of a fixed workflow?"}),`
`,e.jsx(t.li,{children:"What tools can it call?"}),`
`,e.jsx(t.li,{children:"Which tools can mutate state?"}),`
`,e.jsx(t.li,{children:"Where is durable state stored?"}),`
`,e.jsx(t.li,{children:"What is the session boundary?"}),`
`,e.jsx(t.li,{children:"What does the user see while the agent is working?"}),`
`,e.jsx(t.li,{children:"Can we replay what happened?"}),`
`,e.jsx(t.li,{children:"What happens when retrieval finds nothing?"}),`
`,e.jsx(t.li,{children:"What happens when the model produces invalid output?"}),`
`,e.jsx(t.li,{children:"What is the latency budget?"}),`
`,e.jsx(t.li,{children:"What is the cost budget?"}),`
`,e.jsx(t.li,{children:"What is the eval set?"}),`
`,e.jsx(t.li,{children:"Which failure modes require human approval?"}),`
`]}),`
`,e.jsx(t.p,{children:"If those answers are vague, the system is probably not ready."}),`
`,e.jsx(t.h2,{id:"the-simplest-mental-model",children:e.jsx(t.a,{href:"#the-simplest-mental-model",children:"The simplest mental model"})}),`
`,e.jsx(t.p,{children:"Here is the model I keep coming back to:"}),`
`,e.jsx(a,{groups:[{title:"Reasoning",items:["Model","Loop"]},{title:"Action surface",items:["Tools","State","Guardrails"]},{title:"Operation",items:["Runtime","Evals","Telemetry"]}]}),`
`,e.jsx(t.p,{children:"Leave out the model and nothing reasons."}),`
`,e.jsx(t.p,{children:"Leave out the loop and nothing is agentic."}),`
`,e.jsx(t.p,{children:"Leave out tools and nothing happens outside the chat box."}),`
`,e.jsx(t.p,{children:"Leave out state and nothing is durable."}),`
`,e.jsx(t.p,{children:"Leave out guardrails and the system is unsafe."}),`
`,e.jsx(t.p,{children:"Leave out runtime and the system is hard to operate."}),`
`,e.jsx(t.p,{children:"Leave out evals and you do not know whether it works."}),`
`,e.jsx(t.p,{children:"The model is the exciting part. The rest is what makes it shippable."}),`
`,e.jsx(t.h2,{id:"further-reading",children:e.jsx(t.a,{href:"#further-reading",children:"Further reading"})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"https://modelcontextprotocol.io/docs/getting-started/intro",children:"Model Context Protocol: introduction"})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"https://modelcontextprotocol.io/docs/learn/server-concepts",children:"Model Context Protocol: server concepts"})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agents-tools-runtime.html",children:"Amazon Bedrock AgentCore Runtime"})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"https://strandsagents.com/docs/user-guide/concepts/streaming/",children:"Strands Agents SDK: streaming events"})}),`
`]})]})}function v(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(l,{...n})}):l(n)}const B=Object.freeze(Object.defineProperty({__proto__:null,default:v,frontmatter:b},Symbol.toStringTag,{value:"Module"})),T={title:"Designing interfaces for agentic systems",date:"2026-05-17",slug:"designing-interfaces-for-agentic-systems",excerpt:"Agentic products need interfaces for supervision, correction, evidence, and safe control. A practical guide to designing UI surfaces for systems that plan, call tools, revise artifacts, and sometimes need to stop.",readTime:"12 min read",tags:["ui","agents","product-engineering","ux"]};function c(n){const t={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.p,{children:"Most agent interfaces start as chat boxes."}),`
`,e.jsx(t.p,{children:"That is understandable. Chat is the fastest way to prove the model can understand a user, ask a follow-up question, and produce a useful answer. It is also a familiar shape: input at the bottom, answer in the middle, history above."}),`
`,e.jsx(t.p,{children:"But chat is a weak default for production agentic systems."}),`
`,e.jsx(t.p,{children:"An agent is not only answering. It may be searching, planning, calling tools, editing an artifact, waiting on a human decision, retrying a failed step, or refusing because it does not have enough evidence. A single transcript hides most of that work."}),`
`,e.jsx(t.p,{children:"The UI job changes. The interface is not a wrapper around the model. It is the control surface for uncertain automation."}),`
`,e.jsx(h,{left:{eyebrow:"Weak default",title:"Chat skin",items:["One transcript carries every decision","Intermediate work is hidden","Feedback is free text","Trust depends on model confidence"]},right:{eyebrow:"Production shape",title:"Supervision surface",items:["Status, artifact, evidence, and controls are separated","Tool calls and waiting states are visible","Feedback targets a specific object","Trust comes from inspectable sources and history"]},caption:"Agent UI should make supervision easier than scrolling through a transcript."}),`
`,e.jsx(t.p,{children:"The best agent UI does not feel like magic. It feels calm, inspectable, and correctable."}),`
`,e.jsx(t.h2,{id:"the-interface-has-four-jobs",children:e.jsx(t.a,{href:"#the-interface-has-four-jobs",children:"The interface has four jobs"})}),`
`,e.jsx(t.p,{children:"An agentic interface needs to answer four questions at all times:"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"What is the system doing?"}),`
`,e.jsx(t.li,{children:"What has it produced?"}),`
`,e.jsx(t.li,{children:"Why should I trust it?"}),`
`,e.jsx(t.li,{children:"How do I correct it?"}),`
`]}),`
`,e.jsx(t.p,{children:"Those questions map to four UI surfaces."}),`
`,e.jsx(a,{groups:[{title:"Status",items:["Current step","Tool calls","Retries","Waiting states"]},{title:"Artifact",items:["Draft","Answer","Plan","Recommendation"]},{title:"Evidence",items:["Citations","Tool outputs","Diffs","Confidence signals"]}],caption:"A production agent UI separates what is happening, what changed, and why it is believable."}),`
`,e.jsx(t.p,{children:"The fourth surface is control: approve, reject, edit, retry, rollback, ask for more evidence, escalate to a human, or stop the run."}),`
`,e.jsx(t.p,{children:'If those controls are buried inside chat, the user has to translate intent into prose. That creates ambiguity. A button that says "revise this section" is more precise than a message that says "can you make this better?"'}),`
`,e.jsx(t.h2,{id:"supervision-beats-conversation",children:e.jsx(t.a,{href:"#supervision-beats-conversation",children:"Supervision beats conversation"})}),`
`,e.jsx(t.p,{children:"The core design shift is this:"}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"The user is not having a conversation with the agent. The user is supervising work."})}),`
`,e.jsx(t.p,{children:"That does not mean the UI should be cold or mechanical. It means the interface should expose the shape of the work."}),`
`,e.jsx(t.p,{children:"For a document review agent, the user needs to see the plan, the draft, the critic findings, and the source material. For a support agent, the user needs to see what account data was read and what action is about to be taken. For a coding agent, the user needs a diff, test output, and a rollback path."}),`
`,e.jsx(t.p,{children:"A useful product surface might look like this:"}),`
`,e.jsx(w,{title:"Policy draft review",statusItems:["Plan approved","Drafting section 3","Citation check running","Waiting on reviewer"],workspaceTitle:"Artifact",workspaceItems:["Section 3.2: retention exceptions tightened for marketplace launch scope.","Section 3.4: pending reviewer decision on jurisdiction-specific wording.","Critic finding: source coverage missing for deletion request edge case."],evidenceItems:["DSA mapping table v12","Retention policy memo 2026-04","Reviewer note from legal"],actions:["Approve section","Request revision","Add evidence","Rollback"],caption:"The transcript is not the product surface. The artifact, evidence, status, and controls are."}),`
`,e.jsx(t.p,{children:"Notice what is missing: there is no giant chat log asking the user to infer system state."}),`
`,e.jsx(t.p,{children:"The UI gives each object a place. Status lives in the rail. The artifact is central. Evidence is beside the claim it supports. Controls are attached to the thing they change."}),`
`,e.jsx(t.p,{children:"That structure is more important than visual polish. It lets users act without reverse-engineering what the agent thinks happened."}),`
`,e.jsx(t.h2,{id:"streaming-should-explain-progress",children:e.jsx(t.a,{href:"#streaming-should-explain-progress",children:"Streaming should explain progress"})}),`
`,e.jsx(t.p,{children:"Most products treat streaming as a typing effect."}),`
`,e.jsx(t.p,{children:"That is the least interesting version of streaming."}),`
`,e.jsx(t.p,{children:"For agentic systems, streaming should reveal progress and state transitions. The user should see when the agent is searching, when a tool starts, when the tool returns, when a source is attached, when the system hits a retry, and when the agent is waiting for input."}),`
`,e.jsx(y,{steps:[{title:"Task accepted",body:"The system confirms the user goal and shows the starting state."},{title:"Context loaded",body:"Permissions, prior artifact state, and relevant documents are loaded before model work begins."},{title:"Tool running",body:"The UI names the tool, shows the reason for calling it, and distinguishes reading from mutation."},{title:"Evidence attached",body:"Sources are visible before the final prose asks for trust."},{title:"Decision needed",body:"The system stops when human judgment is required instead of pretending certainty."}],caption:"Stream events, not just tokens. The UI should show what the system is doing, not only what it is saying."}),`
`,e.jsx(t.p,{children:"Token streaming is pleasant. Event streaming is useful."}),`
`,e.jsx(t.p,{children:"The difference is product leverage. Token streaming makes the system feel fast. Event streaming makes the system feel understandable."}),`
`,e.jsx(t.p,{children:"Good event streams can power:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Progress indicators"}),`
`,e.jsx(t.li,{children:"Tool-call inspection"}),`
`,e.jsx(t.li,{children:"Debug traces"}),`
`,e.jsx(t.li,{children:"Audit logs"}),`
`,e.jsx(t.li,{children:"Latency breakdowns"}),`
`,e.jsx(t.li,{children:"Cancel and resume behavior"}),`
`]}),`
`,e.jsx(t.p,{children:"The same event model can serve both the user interface and the engineering team. That is a good sign. The product surface and the operational surface are describing the same system."}),`
`,e.jsx(t.h2,{id:"trust-is-a-layout-problem",children:e.jsx(t.a,{href:"#trust-is-a-layout-problem",children:"Trust is a layout problem"})}),`
`,e.jsx(t.p,{children:"Trust is often discussed as a model problem: better model, better prompt, better guardrails."}),`
`,e.jsx(t.p,{children:"In practice, trust is also a layout problem."}),`
`,e.jsx(t.p,{children:"Where do citations appear? Can the user preview the source without losing context? Is the evidence attached to the claim or dumped at the bottom? Can the user tell whether a claim came from retrieval, a tool call, or model inference?"}),`
`,e.jsx(t.p,{children:"A weak answer UI looks like this:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-text",children:`Here is the answer.

Sources:
1. policy-doc-17
2. regulation-note-4
3. internal-memo-9
`})}),`
`,e.jsx(t.p,{children:"That is technically cited, but operationally weak. The user still has to map each sentence back to a source."}),`
`,e.jsx(t.p,{children:"A stronger interface attaches evidence to claims:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-text",children:`Claim: Control 4.2 applies to seller onboarding in DE.
Evidence: applicability matrix row 214, marketplace scope table v7
Status: verified against current index
Action: accept, ask for more evidence, flag as disputed
`})}),`
`,e.jsx(t.p,{children:"The citation is not a footnote. It is part of the object."}),`
`,e.jsx(t.p,{children:"That is especially important in regulated or high-stakes systems. The user should not have to trust the agent's tone. They should be able to inspect the support behind the claim."}),`
`,e.jsx(t.h2,{id:"feedback-should-target-objects",children:e.jsx(t.a,{href:"#feedback-should-target-objects",children:"Feedback should target objects"})}),`
`,e.jsx(t.p,{children:"Free-text feedback is flexible, but it is imprecise."}),`
`,e.jsx(t.p,{children:'"Make this stricter" might mean:'}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Change the tone"}),`
`,e.jsx(t.li,{children:"Narrow the scope"}),`
`,e.jsx(t.li,{children:"Add a citation"}),`
`,e.jsx(t.li,{children:"Remove an exception"}),`
`,e.jsx(t.li,{children:"Escalate to legal"}),`
`,e.jsx(t.li,{children:"Rewrite one section"}),`
`,e.jsx(t.li,{children:"Reject the whole draft"}),`
`]}),`
`,e.jsx(t.p,{children:"When the UI has no structure, the model has to guess."}),`
`,e.jsx(t.p,{children:"Structured feedback reduces that ambiguity. Instead of one big chat box, give the user controls attached to the artifact:"}),`
`,e.jsx(h,{left:{eyebrow:"Ambiguous",title:"Text feedback only",items:["User says make this stricter","Model guesses target and intent","Revision is hard to audit","Rollback depends on transcript history"]},right:{eyebrow:"Operational",title:"Object-level feedback",items:["User selects section 3.2","Intent is revise exception language","Reason is stored with reviewer identity","Diff and rollback are available"]}}),`
`,e.jsx(t.p,{children:"This is not about removing natural language. It is about giving natural language a target."}),`
`,e.jsx(t.p,{children:"A better feedback record looks like:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-text",children:`target: section 3.2
operation: revise
intent: tighten retention exception
reason: current language allows unsupported marketplace case
actor: reviewer id
source_version: draft v5
`})}),`
`,e.jsx(t.p,{children:"The user may still type a note. The product should store that note as part of a structured operation."}),`
`,e.jsx(t.p,{children:"That distinction matters later, when someone asks why the artifact changed."}),`
`,e.jsx(t.h2,{id:"design-for-interruptibility",children:e.jsx(t.a,{href:"#design-for-interruptibility",children:"Design for interruptibility"})}),`
`,e.jsx(t.p,{children:"Agentic systems run longer than ordinary UI actions."}),`
`,e.jsx(t.p,{children:"They search, call tools, validate outputs, retry failures, and sometimes wait for human approval. A user who starts a task may need to pause it, inspect a partial result, cancel it, resume later, or hand it to another reviewer."}),`
`,e.jsx(t.p,{children:"That means the UI needs a task model, not just a loading spinner."}),`
`,e.jsx(t.p,{children:"A task model includes:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Current step"}),`
`,e.jsx(t.li,{children:"Started time"}),`
`,e.jsx(t.li,{children:"Owner"}),`
`,e.jsx(t.li,{children:"Inputs"}),`
`,e.jsx(t.li,{children:"Outputs so far"}),`
`,e.jsx(t.li,{children:"Cancellation state"}),`
`,e.jsx(t.li,{children:"Resume state"}),`
`,e.jsx(t.li,{children:"Error state"}),`
`,e.jsx(t.li,{children:"Next required action"}),`
`]}),`
`,e.jsx(t.p,{children:"The worst possible agent UI is a spinner that lasts 45 seconds and then either prints a wall of text or fails."}),`
`,e.jsx(t.p,{children:"The better UI gives users confidence that the system is alive, bounded, and interruptible."}),`
`,e.jsx(t.h2,{id:"use-progressive-control",children:e.jsx(t.a,{href:"#use-progressive-control",children:"Use progressive control"})}),`
`,e.jsx(t.p,{children:"Different users want different levels of control."}),`
`,e.jsx(t.p,{children:"An executive reading a summary may only need the final answer plus citations. A compliance reviewer needs claim-level evidence and revision history. An engineer operating the system needs tool traces, model versions, and failure reasons."}),`
`,e.jsx(t.p,{children:"The mistake is showing everyone the most detailed view by default."}),`
`,e.jsx(t.p,{children:"Progressive control works better:"}),`
`,e.jsx(a,{groups:[{title:"Default",items:["Final artifact","Primary status","Top citations"]},{title:"Inspect",items:["Claim evidence","Tool calls","Diffs"]},{title:"Operate",items:["Traces","Prompt version","Index version"]}],caption:"The interface should reveal depth when the user needs it, not drown every user in internals."}),`
`,e.jsx(t.p,{children:"This is how you keep the product usable without hiding the system."}),`
`,e.jsx(t.p,{children:"The default view should be calm. The inspection view should be precise. The operations view should be complete."}),`
`,e.jsx(t.h2,{id:"make-refusal-useful",children:e.jsx(t.a,{href:"#make-refusal-useful",children:"Make refusal useful"})}),`
`,e.jsx(t.p,{children:"Refusal is part of the interface."}),`
`,e.jsx(t.p,{children:'If an agent says "I cannot answer that," the UI should explain what is missing and what the user can do next.'}),`
`,e.jsx(t.p,{children:"Bad refusal:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-text",children:`I do not have enough information to answer.
`})}),`
`,e.jsx(t.p,{children:"Better refusal:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-text",children:`I could not find current evidence for this claim.

Searched:
- control taxonomy v18
- policy memos through 2026-05
- marketplace applicability tables

Next actions:
- broaden search scope
- attach a source
- ask compliance reviewer
`})}),`
`,e.jsx(t.p,{children:"That turns a dead end into a workflow."}),`
`,e.jsx(t.p,{children:"For high-stakes systems, this is critical. A trustworthy agent is not one that always answers. A trustworthy agent knows when the evidence is insufficient and makes the next step clear."}),`
`,e.jsx(t.h2,{id:"the-ui-should-encode-the-safety-model",children:e.jsx(t.a,{href:"#the-ui-should-encode-the-safety-model",children:"The UI should encode the safety model"})}),`
`,e.jsx(t.p,{children:"If a tool mutates state, the UI should treat it differently from a read-only tool."}),`
`,e.jsx(t.p,{children:"Reading a document can stream quietly. Updating a ticket, submitting a report, changing a policy draft, or sending an email needs stronger affordances:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Preview before mutation"}),`
`,e.jsx(t.li,{children:"Explicit confirmation"}),`
`,e.jsx(t.li,{children:"Visible target"}),`
`,e.jsx(t.li,{children:"Permission boundary"}),`
`,e.jsx(t.li,{children:"Idempotency or duplicate warning"}),`
`,e.jsx(t.li,{children:"Post-action receipt"}),`
`,e.jsx(t.li,{children:"Undo or compensating action where possible"}),`
`]}),`
`,e.jsx(t.p,{children:"The interface should make dangerous actions feel different."}),`
`,e.jsx(t.p,{children:"This is not only about user protection. It is about system honesty. The UI should teach the user what kind of action is happening."}),`
`,e.jsx(t.p,{children:"If every agent action looks like a chat message, the product hides risk. If the UI distinguishes read, draft, validate, submit, and rollback, the product exposes control."}),`
`,e.jsx(t.h2,{id:"a-practical-checklist",children:e.jsx(t.a,{href:"#a-practical-checklist",children:"A practical checklist"})}),`
`,e.jsx(t.p,{children:"When I review an agentic UI, I ask:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Can the user tell what the agent is doing right now?"}),`
`,e.jsx(t.li,{children:"Can the user distinguish model output from retrieved evidence?"}),`
`,e.jsx(t.li,{children:"Are tool calls visible at the right level of detail?"}),`
`,e.jsx(t.li,{children:"Is mutation handled differently from reading?"}),`
`,e.jsx(t.li,{children:"Can the user stop, retry, resume, or rollback?"}),`
`,e.jsx(t.li,{children:"Is feedback attached to an object, not just appended to chat?"}),`
`,e.jsx(t.li,{children:"Can a reviewer reconstruct why something changed?"}),`
`,e.jsx(t.li,{children:"Does the UI show refusal as a useful state?"}),`
`,e.jsx(t.li,{children:"Are citations close to the claims they support?"}),`
`,e.jsx(t.li,{children:"Does the default view stay calm while deeper inspection remains available?"}),`
`]}),`
`,e.jsx(t.p,{children:"If the answer is no, the interface is probably still demo-shaped."}),`
`,e.jsx(t.h2,{id:"the-main-idea",children:e.jsx(t.a,{href:"#the-main-idea",children:"The main idea"})}),`
`,e.jsx(t.p,{children:"Agentic UI is not about making the model look smart."}),`
`,e.jsx(t.p,{children:"It is about helping the user supervise work that is partly automated, partly uncertain, and sometimes consequential."}),`
`,e.jsx(t.p,{children:"The best interfaces for agents make three things visible:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Progress:"})," what the system is doing"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Grounding:"})," why the output is believable"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Control:"})," how the user can correct or stop it"]}),`
`]}),`
`,e.jsx(t.p,{children:"That is the difference between a chat demo and a product surface."}),`
`,e.jsx(t.p,{children:"The chat box is a useful input. It should not be the whole interface."})]})}function k(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(c,{...n})}):c(n)}const U=Object.freeze(Object.defineProperty({__proto__:null,default:k,frontmatter:T},Symbol.toStringTag,{value:"Module"})),I={title:"Error isolation for batch pipelines: when fail-fast is wrong",date:"2026-05-16",slug:"error-isolation-batch-pipelines",excerpt:"Standard data-engineering advice says validate strictly, fail loudly, and replay. That advice is wrong for any pipeline where one bad record cannot be allowed to block the run. Here is the pattern that replaces it.",readTime:"9 min read",tags:["distributed-systems","data-pipelines","production"]};function d(n){const t={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.p,{children:"The standard advice for batch pipelines is fail-fast."}),`
`,e.jsx(t.p,{children:"Validate strictly. If a record does not match the schema, throw. The principle is that bad data should not silently corrupt downstream systems, and the cheapest place to catch the problem is at the boundary. Fix the source, replay the batch, move on."}),`
`,e.jsx(t.p,{children:"This advice is correct for analytics pipelines, internal dashboards, and most data engineering work. It is wrong for any pipeline where one malformed record cannot be allowed to halt the entire run."}),`
`,e.jsx(t.p,{children:"That second category is bigger than people expect. Regulated reporting, compliance systems, payment processing, customer-facing event ingestion, fraud detection, audit logging: in all of these, a single bad record stopping the batch is a worse outcome than processing the rest while quarantining the bad one. Fail-fast in those domains is not engineering rigor. It is engineering negligence."}),`
`,e.jsxs(t.p,{children:["This post is about the pattern that replaces fail-fast: ",e.jsx(t.strong,{children:"isolate-fast, persist-and-classify, replay-separately"}),". It is the design decision that drove most of the operational improvement on a regulatory data pipeline at Amazon, and the pattern generalizes far beyond compliance."]}),`
`,e.jsx(t.h2,{id:"why-fail-fast-breaks-in-these-systems",children:e.jsx(t.a,{href:"#why-fail-fast-breaks-in-these-systems",children:"Why fail-fast breaks in these systems"})}),`
`,e.jsx(t.p,{children:"The fail-fast philosophy assumes three things that often are not true."}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Assumption 1: failed batches can be replayed cheaply."})," In an analytics pipeline, this is mostly fine. The dashboard is one day out of date, the team fixes the source data, the batch replays, the world moves on. In regulatory reporting, the batch has a submission deadline. Missing the deadline is the failure, not the bad record."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Assumption 2: the source of bad data can be fixed quickly."}),' This is true when "the source" is a single upstream producer that you control. It is false when the source is fifty upstream producers, each with their own schema evolution path, each owned by a different team, each with their own deployment cadence. The bad record may be a six-month-old data quality issue that nobody is going to fix this quarter.']}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Assumption 3: it is acceptable to drop the batch and start over."})," This is the deepest assumption, and the one that breaks first. Many regulated and operational pipelines have to demonstrate that every record was either processed, classified as errored, or explicitly excluded. Silently dropping the batch and replaying it leaves no audit trail for the failed run. The fact that the second run succeeded does not erase the fact that the first run ended in an unknown state."]}),`
`,e.jsx(t.p,{children:"In domains where audit trail is part of the deliverable, fail-fast is incompatible with the contract."}),`
`,e.jsx(t.h2,{id:"the-isolate-fast-pattern",children:e.jsx(t.a,{href:"#the-isolate-fast-pattern",children:"The isolate-fast pattern"})}),`
`,e.jsx(t.p,{children:"The replacement pattern has three commitments."}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Isolate fast."})," When validation fails for a record, the rest of the batch keeps moving. The failure is recorded against that specific record, not the run."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Persist and classify."})," The errored record goes to a durable store with a structured failure reason. Not a log line. A row in a table with the failure category, the offending value, the schema version, and a correlation ID."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Replay separately."})," Once the root cause is fixed (or the bad record is exempted), the persisted errors are replayed as a separate run. The replay output is reconcilable with the original run so the audit trail is intact."]}),`
`,e.jsx(i,{nodes:["Batch","Validate","Split","Process clean stream","Persist error stream"],caption:"The validation step splits into two streams. The clean stream continues. The error stream lands in durable storage."}),`
`,e.jsx(t.p,{children:"This sounds simple. The implementation details are where the design earns its keep."}),`
`,e.jsx(t.h2,{id:"the-error-store",children:e.jsx(t.a,{href:"#the-error-store",children:"The error store"})}),`
`,e.jsx(t.p,{children:'The most important piece is the error store. It is what turns a "failed record" from an exception to a row.'}),`
`,e.jsx(t.p,{children:"The schema is opinionated. Each errored record carries:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"The original record (raw payload, however it arrived)"}),`
`,e.jsx(t.li,{children:"The schema version it was validated against"}),`
`,e.jsx(t.li,{children:"The validator class that rejected it"}),`
`,e.jsx(t.li,{children:"A structured failure reason (an enum, not a free-form string)"}),`
`,e.jsx(t.li,{children:"The execution ID it came from"}),`
`,e.jsx(t.li,{children:"The timestamp"}),`
`,e.jsxs(t.li,{children:["A replay state (",e.jsx(t.code,{children:"pending"}),", ",e.jsx(t.code,{children:"replayed"}),", ",e.jsx(t.code,{children:"exempted"}),", ",e.jsx(t.code,{children:"manually_fixed"}),")"]}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-json",children:`{
  "original_payload": { },
  "schema_version": "v17",
  "validator": "TerritorialScopeValidation",
  "failure_reason": "UNSUPPORTED_MARKETPLACE",
  "execution_id": "exec_2026_05_15_run_001",
  "timestamp": "2026-05-15T03:14:22Z",
  "replay_state": "pending"
}
`})}),`
`,e.jsx(t.p,{children:'That structure is the difference between "we failed on something" and "we failed on this specific class of issue, here are the 247 records that hit it, here is the validator that rejected them, here is the replay path."'}),`
`,e.jsxs(t.p,{children:["The structured failure reason is the part that gets cut from most implementations. A string like ",e.jsx(t.code,{children:'"validation failed: missing field"'})," is not actionable at scale. An enum value like ",e.jsx(t.code,{children:"MANDATORY_FIELD_MISSING"})," plus the field name in a separate column lets you query for the distribution: 90% of today's errors are missing ",e.jsx(t.code,{children:"policy_category"})," for marketplace X. That tells you where to fix the source."]}),`
`,e.jsx(t.h2,{id:"composable-validation",children:e.jsx(t.a,{href:"#composable-validation",children:"Composable validation"})}),`
`,e.jsx(t.p,{children:"The validators themselves are worth being deliberate about."}),`
`,e.jsx(t.p,{children:"The naive shape is one big validation function that throws on the first error. The better shape is composable validators, each with one responsibility, that accumulate errors rather than short-circuit."}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-python",children:`class MandatoryFieldCheck:
    def validate(self, record): ...

class TerritorialScopeValidation:
    def validate(self, record): ...

class DependentAttributesValidation:
    def validate(self, record): ...
`})}),`
`,e.jsx(t.p,{children:"Each validator returns a list of findings (possibly empty). The pipeline runs every validator on every record. A record can fail multiple validations and the failure record captures all of them."}),`
`,e.jsxs(t.p,{children:["The benefit shows up during triage. If ",e.jsx(t.code,{children:"MANDATORY_FIELD_MISSING"})," and ",e.jsx(t.code,{children:"INVALID_TERRITORIAL_SCOPE"})," always co-occur for marketplace X, that is a different upstream problem than if they appear independently. You cannot see that pattern if validation short-circuits on the first failure."]}),`
`,e.jsx(t.p,{children:"New requirements add a validator. They do not require editing the central validation function. Regulatory systems age by accumulating rules, and the validation layer has to age with them. Composable validators make that aging cheap."}),`
`,e.jsx(t.h2,{id:"the-replay-loop",children:e.jsx(t.a,{href:"#the-replay-loop",children:"The replay loop"})}),`
`,e.jsx(t.p,{children:"The replay path is what makes the error store useful."}),`
`,e.jsx(r,{steps:["Operator inspects error store","Diagnoses root cause","Fixes source or marks exempted","Triggers replay execution","Replay run processes only errored records"],decision:"Replay successful?",yes:"merge with original run",no:"record new failure reasons"}),`
`,e.jsx(t.p,{children:"Three properties matter."}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"The replay is its own execution."})," It has its own execution ID. The relationship to the original run is recorded (the replay's metadata points back to the original), but the replay is a first-class run with its own audit trail. Two reasons: regulators can see both attempts cleanly, and the system can replay the same errored records against an updated rule set without confusing the audit log."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"The replay can only touch records flagged for replay."}),' It is not a "rerun everything" path. The clean records from the original run are already downstream. A second pass over them risks double-counting. The replay path is scoped to the errored set.']}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Partial replay is normal."})," If 100 records errored and 87 of them are now fixed, the replay processes those 87. The remaining 13 update their failure reasons. The system does not assume that all failures will eventually clear, because some of them will not."]}),`
`,e.jsx(t.h2,{id:"the-operator-surface",children:e.jsx(t.a,{href:"#the-operator-surface",children:"The operator surface"})}),`
`,e.jsx(t.p,{children:"The operator surface for error isolation is usually undersold."}),`
`,e.jsx(t.p,{children:"A pipeline that produces structured errors but has no UI for inspecting them is barely better than one that throws. The errors might as well be in CloudWatch."}),`
`,e.jsx(t.p,{children:"The minimal operator surface is:"}),`
`,e.jsx(a,{groups:[{title:"Aggregates",items:["Errors per failure_reason","Errors per source","Errors per schema version"]},{title:"Drill-down",items:["Recent error records","Original payload","Validator findings"]},{title:"Actions",items:["Mark exempted","Trigger replay","Add note for auditor"]}]}),`
`,e.jsx(t.p,{children:"Aggregates tell the operator what is wrong. Drill-down lets them confirm. Actions let them resolve. This is not magic. It is the same shape as a good incident-response console for any operational system."}),`
`,e.jsx(t.p,{children:"The mistake is treating the error store as a write-only sink that someone might query later with SQL. By the time someone is querying it with SQL, the deadline has already moved."}),`
`,e.jsx(t.h2,{id:"the-metric-that-improved",children:e.jsx(t.a,{href:"#the-metric-that-improved",children:"The metric that improved"})}),`
`,e.jsx(t.p,{children:"On the regulatory data pipeline I helped lead, the isolate-fast pattern drove a 70% reduction in incident resolution time over the year following the migration."}),`
`,e.jsx(t.p,{children:"The before-and-after is not subtle. Before: a malformed record class causes the validation Lambda to throw. The batch DLQs. The on-call engineer pages, triages from CloudWatch logs, identifies the bad records, writes a one-off fix or exemption, redeploys the validation Lambda, replays the batch, and stays on call until it clears. Median resolution time: several hours."}),`
`,e.jsx(t.p,{children:"After: a malformed record class causes those specific records to land in the error store with a structured failure reason. The clean records continue downstream and the batch completes on time. The operations dashboard shows the new error class. The on-call engineer triages from the dashboard, either fixes the upstream source or marks the records exempted with a justification, and triggers a replay. Median resolution time: tens of minutes."}),`
`,e.jsx(t.p,{children:"The 70% reduction is not from a magic primitive. It is from moving error handling out of the on-call's head and into the system."}),`
`,e.jsx(t.h2,{id:"when-fail-fast-is-still-right",children:e.jsx(t.a,{href:"#when-fail-fast-is-still-right",children:"When fail-fast is still right"})}),`
`,e.jsx(t.p,{children:"Fail-fast is the right pattern in real cases. Three to keep in mind:"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Internal analytics where freshness is not the contract."})," If the dashboard can be a day late while the source gets fixed, fail-fast is operationally simpler."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Schema migrations."})," When you are intentionally rejecting old-shape records to force upstream producers to update, fail-fast is the mechanism. Quarantining the old records is the wrong message."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Development environments."})," The whole point of the dev pipeline is to surface issues loudly so they get fixed before production."]}),`
`,e.jsx(t.p,{children:'The principle is "fail-fast when failures are signal you want to amplify; isolate-fast when failures are inevitable noise the system has to absorb without losing them."'}),`
`,e.jsx(t.p,{children:"For production pipelines in regulated, operational, or customer-facing domains, the failure mode is the second one. The design decision is whether the team admits that to itself early or learns it during the first major incident."}),`
`,e.jsx(t.h2,{id:"the-takeaway",children:e.jsx(t.a,{href:"#the-takeaway",children:"The takeaway"})}),`
`,e.jsx(t.p,{children:"The most underrated thing about a batch pipeline is not its throughput. It is what happens when things go wrong."}),`
`,e.jsx(t.p,{children:"Fail-fast says: things will not go wrong, and if they do, we will catch it cleanly at the boundary. That is a beautiful story."}),`
`,e.jsx(t.p,{children:"Isolate-fast says: things will go wrong, often, in ways we cannot fully predict, and the system has to keep working anyway. That is the production story."}),`
`,e.jsx(t.p,{children:"The shift from one to the other is mostly mechanical. It is an error store, a set of structured failure reasons, a replay path, and an operator surface. None of these are hard to build. The hard part is admitting they are necessary before the first incident proves they are."}),`
`,e.jsx(t.p,{children:'The teams that admit it early ship pipelines that age well. The teams that wait write a four-page runbook and call it "operational maturity."'}),`
`,e.jsx(t.p,{children:"For systems that have to demonstrate they processed every record, classified every failure, and preserved the audit trail of both, fail-fast is not engineering rigor. It is engineering nostalgia for a simpler world that the production version does not inhabit."})]})}function A(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(d,{...n})}):d(n)}const z=Object.freeze(Object.defineProperty({__proto__:null,default:A,frontmatter:I},Symbol.toStringTag,{value:"Module"})),S={title:"From chained Lambdas to Step Functions",date:"2026-03-09",slug:"from-chained-lambdas-to-step-functions",excerpt:"A migration retrospective: why brittle orchestration patterns fail at scale, how Map states unlocked per-marketplace parallelism, and what we would do differently.",readTime:"12 min read",tags:["aws","step-functions","migrations"]};function u(n){const t={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.p,{children:"Most AWS orchestration starts as chained Lambdas."}),`
`,e.jsx(t.p,{children:"The first version of the pipeline has one Lambda that does the work. The second version has two Lambdas, glued together by an SNS topic. The third version has four Lambdas, glued together by two SNS topics, an SQS queue, and a DynamoDB table that nobody is quite sure who owns. It works. It is in production. It would be embarrassing to migrate it because the team has bigger problems."}),`
`,e.jsx(t.p,{children:'Then the fan-out grows. The pipeline that used to process hundreds of items now processes tens of thousands. The retries that nobody noticed start to show up as cost. The "transient" errors start to show up as data quality issues. The on-call playbook for "rerun the third Lambda for marketplace X between 9pm and midnight" gets longer.'}),`
`,e.jsx(t.p,{children:"That is when you migrate to Step Functions."}),`
`,e.jsx(t.p,{children:"This is a retrospective on doing that migration for a regulatory data pipeline at Amazon. The shape of the system shifted from chained Lambdas with SNS hops to a Step Functions state machine with Map states and explicit retry policies. The lessons generalize beyond AWS."}),`
`,e.jsx(t.h2,{id:"what-the-original-architecture-looked-like",children:e.jsx(t.a,{href:"#what-the-original-architecture-looked-like",children:"What the original architecture looked like"})}),`
`,e.jsx(t.p,{children:"The old system had grown organically. Each Lambda did one logical thing. SNS topics connected them. An external scheduler kicked off the first Lambda on a cron."}),`
`,e.jsx(i,{nodes:["Cron","Ingest","Validate","Transform","Aggregate","Submit"],caption:"Each box is a Lambda. The transitions are SNS publish-and-subscribe hops."}),`
`,e.jsx(t.p,{children:"This shape is common. It looks reasonable on a whiteboard. It has real problems in production."}),`
`,e.jsx(t.h3,{id:"failure-recovery-is-implicit",children:e.jsx(t.a,{href:"#failure-recovery-is-implicit",children:"Failure recovery is implicit"})}),`
`,e.jsx(t.p,{children:'When the Validate Lambda fails halfway through processing a batch, the SNS hop to Transform never happens for the unprocessed records. There is no record of "we got partway through and stopped." Recovery means looking at CloudWatch, figuring out where the run died, and manually triggering the downstream Lambda with the right payload.'}),`
`,e.jsx(t.p,{children:`The team's runbook for this was four pages long. Most of it was "look at the logs and figure out what stopped."`}),`
`,e.jsx(t.h3,{id:"retries-are-global-not-per-record",children:e.jsx(t.a,{href:"#retries-are-global-not-per-record",children:"Retries are global, not per-record"})}),`
`,e.jsx(t.p,{children:"The Lambda's retry policy applies to the whole invocation. If one record in a batch of 500 throws, the whole batch retries. The 499 records that were fine get processed twice on the retry. The 1 record that was broken throws again, and now the whole batch is in DLQ with no signal about which record caused it."}),`
`,e.jsx(t.h3,{id:"payload-size-is-a-recurring-crisis",children:e.jsx(t.a,{href:"#payload-size-is-a-recurring-crisis",children:"Payload size is a recurring crisis"})}),`
`,e.jsx(t.p,{children:"SNS messages are limited to 256KB. The pipeline's natural payload was a list of record IDs and metadata. Once the list got long enough, SNS started rejecting publishes. The team worked around this by chunking, but the chunking logic lived in each producer Lambda, with its own bugs."}),`
`,e.jsx(t.h3,{id:"execution-history-is-fragmented",children:e.jsx(t.a,{href:"#execution-history-is-fragmented",children:"Execution history is fragmented"})}),`
`,e.jsx(t.p,{children:"To understand a single end-to-end run, you had to correlate logs across five Lambdas, two SNS topics, one SQS queue, and a DynamoDB table. The correlation ID was a UUID that someone added in version 2. Logs older than 14 days were gone because nobody had budgeted for log retention."}),`
`,e.jsx(t.h3,{id:"concurrency-is-uncontrolled",children:e.jsx(t.a,{href:"#concurrency-is-uncontrolled",children:"Concurrency is uncontrolled"})}),`
`,e.jsx(t.p,{children:'The pipeline naturally fanned out by marketplace. Each marketplace produced its own batch of records. The Lambdas processed them in parallel because SNS fanout is parallel by default. There was no central place to say "do not exceed 200 concurrent invocations against the downstream API" because there was no central anything.'}),`
`,e.jsx(t.p,{children:"When the downstream API rate-limited us, every Lambda saw the same 429s at roughly the same time. The error rate spiked, the team got paged, and the fix was to scale down the pipeline by hand."}),`
`,e.jsx(t.h2,{id:"what-step-functions-changed",children:e.jsx(t.a,{href:"#what-step-functions-changed",children:"What Step Functions changed"})}),`
`,e.jsx(t.p,{children:"The migration moved the pipeline to a Step Functions state machine. The Lambdas remained, mostly with the same internal logic. What changed was the connective tissue."}),`
`,e.jsx(i,{nodes:["State machine","Map state","Per-record tasks","Result aggregation"],caption:"The Map state runs a sub-workflow per record, with bounded concurrency and explicit failure handling."}),`
`,e.jsx(t.p,{children:"Four things became cleaner."}),`
`,e.jsx(t.h3,{id:"per-record-execution-with-the-map-state",children:e.jsx(t.a,{href:"#per-record-execution-with-the-map-state",children:"Per-record execution with the Map state"})}),`
`,e.jsx(t.p,{children:"Map is the feature that made the migration worth doing."}),`
`,e.jsx(t.p,{children:"A Map state takes a list and runs a sub-workflow for each item, in parallel, with a configurable concurrency limit. Critically, each item's execution is tracked independently. If item 247 fails, item 248 keeps running. The failure is recorded against item 247 specifically, not against the whole batch."}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-json",children:`{
  "Type": "Map",
  "ItemsPath": "$.records",
  "MaxConcurrency": 200,
  "Iterator": {
    "StartAt": "Validate",
    "States": {
      "Validate": { },
      "Transform": { },
      "Aggregate": { }
    }
  }
}
`})}),`
`,e.jsx(t.p,{children:"The marketplace fan-out turned into a Map over marketplaces. Within each marketplace's iteration, a nested Map iterated over the records for that marketplace. Concurrency was bounded at both levels. The downstream API rate limiting stopped being a paging event because the state machine controlled the parallelism."}),`
`,e.jsx(t.h3,{id:"retry-and-catch-as-first-class-concepts",children:e.jsx(t.a,{href:"#retry-and-catch-as-first-class-concepts",children:"Retry and catch as first-class concepts"})}),`
`,e.jsx(t.p,{children:"Step Functions has built-in retry and catch. You write them as state-machine config, not as Lambda code."}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-json",children:`"Retry": [
  {
    "ErrorEquals": ["RateLimitExceeded"],
    "IntervalSeconds": 5,
    "MaxAttempts": 6,
    "BackoffRate": 2.0
  }
],
"Catch": [
  {
    "ErrorEquals": ["ValidationError"],
    "ResultPath": "$.error",
    "Next": "QuarantineRecord"
  }
]
`})}),`
`,e.jsx(t.p,{children:"The retry is on the specific error class. Rate-limit errors back off exponentially. Validation errors go to a quarantine state where the record is persisted with its failure reason. The Lambda itself no longer has to know anything about retry semantics. It throws the right exception class and the state machine handles the rest."}),`
`,e.jsx(t.p,{children:'This moved retry policy from "implicit in Lambda configuration, with a six-month-old default" to "explicit in version-controlled state machine definition."'}),`
`,e.jsx(t.h3,{id:"execution-history-is-one-record",children:e.jsx(t.a,{href:"#execution-history-is-one-record",children:"Execution history is one record"})}),`
`,e.jsx(t.p,{children:"Every state machine execution has an execution ID. Every transition between states is recorded against that execution. Looking at one execution shows the whole run: which inputs went into which states, which retries happened, where the failure was, and which output came out."}),`
`,e.jsx(t.p,{children:"CloudWatch logs are still there if you need them, but you rarely need them for the orchestration. The state machine UI is the operational surface. When the on-call engineer gets paged, they open the failed execution, see the state that errored, see the input that produced the error, and decide what to do."}),`
`,e.jsx(t.p,{children:"The four-page runbook became a half-page runbook."}),`
`,e.jsx(t.h3,{id:"payload-references-not-payloads",children:e.jsx(t.a,{href:"#payload-references-not-payloads",children:"Payload references, not payloads"})}),`
`,e.jsxs(t.p,{children:["For large data, Step Functions integrates with S3. The state machine passes references (",e.jsx(t.code,{children:"s3://bucket/key"}),") instead of inlining the data. The Map state can iterate over an S3-backed list, processing tens of thousands of items without hitting the 256KB inline limit."]}),`
`,e.jsx(t.p,{children:"The chunking-by-hand logic disappeared. The new pattern is: write the data to S3, pass the key, fetch the data inside the Lambda. It is more boring. It also works."}),`
`,e.jsx(t.h2,{id:"the-migration-mechanics",children:e.jsx(t.a,{href:"#the-migration-mechanics",children:"The migration mechanics"})}),`
`,e.jsx(t.p,{children:"The migration was incremental. We did not rewrite the pipeline in one cutover."}),`
`,e.jsx(r,{steps:["Pick one stage of the old pipeline","Build a Step Functions equivalent","Run both in shadow for one cycle","Compare outputs","Cut over when matched"],decision:"Match rate at 100%?",yes:"cut over",no:"diagnose and adjust"}),`
`,e.jsx(t.p,{children:"Three things made this work."}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Per-stage shadow runs."})," We migrated the Validate stage first, running the new Step Functions version in shadow alongside the old Lambda chain. Both produced output. We compared outputs for one full reporting cycle. The matches were 99.7%. The 0.3% delta was a Lambda timeout issue in the old version that the new version did not hit, which counts as a quiet win."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"An adapter at the SNS boundary."})," The old pipeline's downstream stages expected to be triggered by SNS messages. The new state machine could publish those messages, or it could call the downstream Lambda directly. We kept the SNS interface during the transition so the unmigrated downstream stages did not need to change. This is the kind of decision that feels ugly during the migration and looks correct in retrospect."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Feature flags on stage selection."})," Each stage had a flag that selected the old or new implementation. Cutover was a flag flip, not a code deploy. Rollback was a flag flip back. We never had to do a code deploy under pressure to fix a migration issue."]}),`
`,e.jsx(t.p,{children:"The total migration took about six weeks of part-time work. The first two stages took four of those weeks. The remaining stages took two weeks combined, because the patterns repeated and the team had built confidence."}),`
`,e.jsx(t.h2,{id:"what-we-would-do-differently",children:e.jsx(t.a,{href:"#what-we-would-do-differently",children:"What we would do differently"})}),`
`,e.jsx(t.p,{children:"Hindsight is the only honest framing for migrations."}),`
`,e.jsx(t.h3,{id:"type-the-boundaries-first",children:e.jsx(t.a,{href:"#type-the-boundaries-first",children:"Type the boundaries first"})}),`
`,e.jsx(t.p,{children:"The biggest source of subtle bugs during the migration was implicit assumptions about payload shape. The old Lambdas had grown up with informal contracts. Each producer knew what each consumer expected, but the contract was not written down anywhere. When we rebuilt the orchestration, we discovered that several Lambdas were tolerating malformed inputs because they had been getting malformed inputs for years."}),`
`,e.jsx(t.p,{children:'We should have written explicit JSON Schema contracts for every stage boundary before starting the migration. Then the migration would have been "make the new implementation conform to the schema" instead of "match the undocumented behavior of the old implementation."'}),`
`,e.jsx(t.h3,{id:"build-the-error-isolation-layer-earlier",children:e.jsx(t.a,{href:"#build-the-error-isolation-layer-earlier",children:"Build the error-isolation layer earlier"})}),`
`,e.jsx(t.p,{children:"The migration unlocked per-record error isolation through the Map state. We did not actually use it well until several months later, when we built out the proper error-store and replay mechanism. The Map state can route errored items to a dedicated stage, persist them with structured failure reasons, and allow replay as a separate execution. We treated this as a follow-up. It should have been part of the migration scope."}),`
`,e.jsx(t.h3,{id:"observability-from-day-one",children:e.jsx(t.a,{href:"#observability-from-day-one",children:"Observability from day one"})}),`
`,e.jsx(t.p,{children:"The first version of the new state machine emitted enough metrics for the team to operate it. It did not emit enough metrics for downstream consumers to know which records had been processed. We added that observability later, after a regulatory review asked questions we could not answer crisply."}),`
`,e.jsx(t.p,{children:"If you are migrating a pipeline that other systems depend on, treat the observability surface as part of the migration scope. Counts in, counts out, error counts, latency per stage, last-successful-run timestamp. All of it."}),`
`,e.jsx(t.h3,{id:"resist-the-urge-to-combine-stages",children:e.jsx(t.a,{href:"#resist-the-urge-to-combine-stages",children:"Resist the urge to combine stages"})}),`
`,e.jsx(t.p,{children:'There was a moment during the migration when consolidating two stages looked attractive. Step Functions makes it cheap to call multiple Lambdas in one state, and the two stages were "always" run together.'}),`
`,e.jsx(t.p,{children:"We did not consolidate them. That turned out to be correct. The two stages had different failure modes, different retry policies, and different observability requirements. Keeping them separate gave us per-stage retry and per-stage error classification. When one of them started failing six months later, the diagnosis was instant because the failure was localized."}),`
`,e.jsx(t.p,{children:"Migrations are when the temptation to refactor is highest and the cost of getting it wrong is also highest. Resisting that temptation is part of doing the migration well."}),`
`,e.jsx(t.h2,{id:"the-bigger-lesson",children:e.jsx(t.a,{href:"#the-bigger-lesson",children:"The bigger lesson"})}),`
`,e.jsx(t.p,{children:"The migration was not really about Lambda or Step Functions."}),`
`,e.jsx(t.p,{children:"The migration was about moving orchestration from implicit (logs, retries-by-configuration, ad-hoc DynamoDB tables) to explicit (state machine definitions, declarative retry policies, execution history as a first-class object)."}),`
`,e.jsx(t.p,{children:"Implicit orchestration is fast to write and slow to operate. Explicit orchestration is slower to write and fast to operate. For a pipeline that is going to run for years and be touched by people who did not build it, that tradeoff is the right one."}),`
`,e.jsx(t.p,{children:'The same lesson applies to most "we will migrate to a real orchestrator someday" decisions. The right time to migrate is when the implicit orchestration has gotten complex enough that nobody on the team can confidently say what happens when a specific stage fails on a specific record. Once that point arrives, the migration pays for itself in the first major incident the new system handles cleanly.'}),`
`,e.jsx(t.p,{children:"In our case, it paid for itself in the first month."})]})}function M(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(u,{...n})}):u(n)}const V=Object.freeze(Object.defineProperty({__proto__:null,default:M,frontmatter:S},Symbol.toStringTag,{value:"Module"})),W={title:"Writing an HLD that survives cross-team review",date:"2026-05-17",slug:"hld-cross-team-review",excerpt:"Most high-level design documents are skimmed, signed, and forgotten. The ones that survive are written for specific readers, not a generic reviewer. Here is what changes when you take that seriously.",readTime:"10 min read",tags:["hld","design-docs","cross-team"]};function p(n){const t={a:"a",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.p,{children:"The most undervalued artifact in engineering is the high-level design document."}),`
`,e.jsx(t.p,{children:'People treat it as a gate to clear. Write the doc, get the sign-offs, start coding. Six months later, when someone asks why the system makes a specific decision, nobody can find the doc, and the answer is "I think we discussed that in a meeting?"'}),`
`,e.jsx(t.p,{children:"The few HLDs that survive are different. They get cited in code reviews. They get linked from runbooks. They get pulled up in incident retrospectives. New engineers read them and start contributing within a week instead of three months. They are referenced in interviews, in budgeting conversations, and in regulatory audits."}),`
`,e.jsx(t.p,{children:"That difference is not about formatting or template choice. It is about who you are writing for."}),`
`,e.jsx(t.p,{children:"This post is about what changes when you treat the HLD as a document that has to survive, and what that looks like in practice. Most of the lessons come from authoring the HLD for ZeroTouch, an internal launch platform at Amazon, as the sole HLD author across three partner teams and three timezones."}),`
`,e.jsx(t.h2,{id:"the-reader-is-not-a-reviewer",children:e.jsx(t.a,{href:"#the-reader-is-not-a-reviewer",children:'The reader is not a "reviewer"'})}),`
`,e.jsx(t.p,{children:"The mistake almost every HLD makes is writing for the abstract reviewer."}),`
`,e.jsx(t.p,{children:"The abstract reviewer is the engineering manager who reads the doc to decide whether to approve it. That person exists. They are not your primary reader."}),`
`,e.jsx(t.p,{children:"Your real readers are:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Each partner team's tech lead, who needs to know what their team is being asked to do"}),`
`,e.jsx(t.li,{children:"The security reviewer, who has a small set of questions and limited patience"}),`
`,e.jsx(t.li,{children:"The operations engineer, who is going to wear the pager when this ships"}),`
`,e.jsx(t.li,{children:"The product owner, who is reading for scope and timeline"}),`
`,e.jsx(t.li,{children:"Future you, who will read it six months from now to remember why a specific decision was made"}),`
`]}),`
`,e.jsx(t.p,{children:"Each of these readers has a different question. Each of them will spend a different amount of time on the doc. None of them will read it linearly from top to bottom."}),`
`,e.jsx(t.p,{children:"A good HLD is structured for non-linear reading. A great HLD is structured so the right reader can find their answer in 90 seconds."}),`
`,e.jsx(t.h2,{id:"the-90-second-test",children:e.jsx(t.a,{href:"#the-90-second-test",children:"The 90-second test"})}),`
`,e.jsx(t.p,{children:"Pick the most senior reader you can think of. Imagine they have 90 seconds and an HLD-shaped document on their screen. Can they:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Tell what is being proposed"}),`
`,e.jsx(t.li,{children:"Tell why it is being proposed now"}),`
`,e.jsx(t.li,{children:"Tell what the major risks are"}),`
`,e.jsx(t.li,{children:"Tell what they specifically need to decide"}),`
`]}),`
`,e.jsx(t.p,{children:"If yes, the doc is structured. If no, the doc is going to require a meeting to be understood, which means the doc has failed at its job."}),`
`,e.jsx(t.p,{children:"The 90-second test is not about reducing length. The ZeroTouch HLD was around 25 pages. It passed the 90-second test because the structure was disciplined: the first three paragraphs answered the four questions above, the next page had the one-diagram architecture, and the rest of the document was depth that readers could opt into based on their role."}),`
`,e.jsx(t.p,{children:"The structure that worked, in order:"}),`
`,e.jsx(a,{groups:[{title:"First page",items:["Problem","Proposal","Why now","Key risks","Decision asks"]},{title:"Architecture",items:["One canonical diagram","Component responsibilities","Data flow"]},{title:"Detail",items:["Alternatives considered","Data model","API contracts","Rollout plan"]},{title:"Operating",items:["Observability","Failure modes","On-call surface","Migration risk"]}]}),`
`,e.jsx(t.p,{children:"The first section is the only one most readers will finish. Optimize accordingly."}),`
`,e.jsx(t.h2,{id:"sections-that-earn-their-keep",children:e.jsx(t.a,{href:"#sections-that-earn-their-keep",children:"Sections that earn their keep"})}),`
`,e.jsx(t.p,{children:"Some sections survive every HLD I have seen go well. Some sections cause more damage than they prevent. Both lists are short."}),`
`,e.jsx(t.h3,{id:"the-sections-that-earn-their-keep",children:e.jsx(t.a,{href:"#the-sections-that-earn-their-keep",children:"The sections that earn their keep"})}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Problem statement."}),' Not "what we are building." Why does this exist as a problem? Who has this problem right now? What does it cost them today? If the problem statement is "we want to build X," the reader cannot evaluate whether X is the right answer. If the problem statement is "team A spends 12 hours a week reconciling launch state across three systems because nobody owns the canonical view," the reader can argue with the diagnosis instead of the solution.']}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Alternatives considered."})," This is the single most important section for cross-team work. Three or four alternatives, each with a one-paragraph description and a one-paragraph reason for not picking it. Including the alternatives that were obviously wrong, because the reader was probably going to suggest them. The alternatives section is what tells the reader you did the work and saves them from having to suggest things you already ruled out."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Rollout plan with explicit phases."}),' Not "we will roll this out gradually." A list of phases with entry and exit criteria. Phase 1 includes these features for these users with these guardrails. Phase 2 expands to these additional users when Phase 1 has hit these metrics. Phase 3 is the general availability state. Each phase should be safely revertable.']}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Failure modes and recovery."}),' What happens when each major component fails. Not a generic "we will have monitoring." Concrete: "if the policy lookup service is unavailable, the launch console falls back to the cached snapshot from the last successful sync, with a banner indicating the data may be stale. Launches are blocked on cache age more than 4 hours."']}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:'The "what changes for each team" section.'}),' This is the cross-team-specific one. For each partner team, what does this proposal ask of them? What code do they have to write? What permissions do they have to grant? What do they get in return? When written well, this section is the answer to the most common cross-team review question, which is "what is this doing to us."']}),`
`,e.jsx(t.h3,{id:"the-sections-that-cause-damage",children:e.jsx(t.a,{href:"#the-sections-that-cause-damage",children:"The sections that cause damage"})}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Future work."}),' Almost every HLD has a "future work" section that lists things the team thought about but is not committing to. This section is usually a trap. It either becomes a backlog of unkept promises or it gets quoted by stakeholders as if it were a roadmap. If you must include it, frame it explicitly as "things we deliberately deferred and the reason."']}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Implementation details that change weekly."}),' The HLD is not the place for "we will use library X with config Y." Those details will be wrong by the time the doc is read in six months. Keep the HLD at the architectural altitude: which component is responsible for which capability, what the major data flows are, what the contracts between components look like. If you need to capture implementation-level decisions, do it in an architectural decision record that lives close to the code.']}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Pseudocode in the body."})," It is almost always a tell that the author is not sure how the design works at the architectural level. If you need pseudocode to explain the design, the design is not done."]}),`
`,e.jsx(t.h2,{id:"the-one-diagram-rule",children:e.jsx(t.a,{href:"#the-one-diagram-rule",children:"The one-diagram rule"})}),`
`,e.jsx(t.p,{children:"Every HLD should have exactly one canonical architecture diagram."}),`
`,e.jsx(t.p,{children:"Not zero. Not three. Not six."}),`
`,e.jsx(t.p,{children:"The temptation is to have one diagram per audience: a high-level one for executives, a detailed one for engineers, a sequence diagram for the security review, a data flow diagram for the product owner. Resist this. Multiple diagrams of the same system always end up inconsistent. Reviewers cite the diagram that supports their preferred argument. The doc reads as if it is describing four different systems."}),`
`,e.jsx(t.p,{children:"One diagram. Annotated. Sized to be readable when printed. It is the canonical view. Other diagrams in the doc exist only to add a specific detail (a sequence, a failure mode, a data shape) that does not fit on the canonical view."}),`
`,e.jsx(t.p,{children:"This is harder than it sounds. The discipline of fitting the system into one diagram is itself a design exercise. If you cannot draw it, you cannot explain it."}),`
`,e.jsx(i,{nodes:["Producer team A","Launch platform","Consumer team B"],caption:"The one-diagram rule does not mean simple. It means canonical. The annotations carry the complexity."}),`
`,e.jsx(t.h2,{id:"writing-for-the-absent-reader",children:e.jsx(t.a,{href:"#writing-for-the-absent-reader",children:"Writing for the absent reader"})}),`
`,e.jsx(t.p,{children:"The hardest reader to write for is the one who is not in the room."}),`
`,e.jsx(t.p,{children:"The HLD will outlive the people who reviewed it. Six months from now, a new engineer will join the team and need to understand the system. A year from now, an auditor will ask why a specific design decision was made. Two years from now, the system will need a significant change and the current team will want to understand the reasoning."}),`
`,e.jsx(t.p,{children:"Writing for the absent reader means:"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Explain the constraints, not just the answer."}),' "We chose Step Functions over a custom orchestrator because the team had no headcount for orchestration infrastructure work and the existing AWS support contract covered Step Functions operationally." That sentence answers more future questions than "we chose Step Functions."']}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Name the rejected alternatives."}),' Not just in the alternatives section. In line, where it matters. "We considered exposing this as a tool callable by the agent. We did not, because the tool would require write access to production data and the eval coverage for write paths is too immature."']}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Date your assumptions."}),' "As of 2026-05, the OpenSearch managed offering does not support the rerank API we need; if that changes, the cost of reranking drops materially." Then when someone reads the doc in 2027, they know which assumptions to re-check.']}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Link to artifacts."}),' Not "see the discussion in Slack." Link to the doc, the ticket, the metric dashboard, the postmortem. Slack threads disappear. Linked artifacts survive.']}),`
`,e.jsx(t.h2,{id:"the-cross-team-review-mechanics",children:e.jsx(t.a,{href:"#the-cross-team-review-mechanics",children:"The cross-team review mechanics"})}),`
`,e.jsx(t.p,{children:"A cross-team HLD has different review mechanics than a single-team one."}),`
`,e.jsx(t.p,{children:"The single-team HLD goes through a few people who all share context. The cross-team HLD goes through a chain of reviewers who each have different priors, different priorities, and different reasons to push back. Coordinating that review is part of writing the doc well."}),`
`,e.jsx(t.p,{children:"Three things made the ZeroTouch review work."}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"One author, multiple consultations."})," I wrote the doc. I had structured conversations with each partner team's tech lead before the doc went to formal review, so the doc reflected their constraints. Their feedback during those conversations shaped the alternatives section. By the time the doc went to formal review, no team was reading a proposal that surprised them."]}),`
`,e.jsx(t.p,{children:"This is the part most cross-team HLDs skip. The doc lands cold in front of partner teams. They are surprised. The surprise becomes objection. The objection becomes a months-long review cycle that erodes momentum."}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"A pre-decided decision rubric."})," Before the doc went to review, the partner teams' leads agreed on what the doc had to demonstrate to be approved. Not the architecture (that was up to me). The rubric: each team's API surface must remain stable, the rollout must be revertable, the on-call workload must not increase for any team, the eval coverage must be agreed before launch. Four items."]}),`
`,e.jsx(t.p,{children:'The review then had a clear question to answer: does this doc meet the rubric? Not "is this the best possible design," which is unanswerable. "Does it meet the rubric," which is.'}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Explicit dissent capture."}),` When a reviewer disagreed with a design decision and could not be convinced, the disagreement was captured in the doc itself. "Team B's tech lead prefers approach X for reason Y; the author chose approach Z because of constraint W. Both parties agree to revisit if metric M does not improve within two quarters."`]}),`
`,e.jsx(t.p,{children:"This is uncomfortable to write. It also resolves the disagreement instead of leaving it as a latent objection. Six months later, when metric M came up in a review, the relevant context was right there in the original doc."}),`
`,e.jsx(t.h2,{id:"the-doc-is-software",children:e.jsx(t.a,{href:"#the-doc-is-software",children:"The doc is software"})}),`
`,e.jsx(t.p,{children:"The deepest mental shift is treating the HLD as software."}),`
`,e.jsx(t.p,{children:"Software has versions. The HLD should too. Major changes get a new version with a changelog. The previous version is preserved for historical reference. Comments and review history are preserved."}),`
`,e.jsx(t.p,{children:"Software is read by future maintainers. The HLD should be readable by people who were not in the original conversation. That is the absent reader principle from earlier."}),`
`,e.jsx(t.p,{children:"Software has known users. The HLD has known users. The same engineering rigor that goes into thinking about API consumers should go into thinking about the doc's readers."}),`
`,e.jsx(t.p,{children:"Software has failure modes. The HLD has failure modes too. A doc that gets the structure wrong, that fails the 90-second test, that surprises partner teams in formal review, that does not survive past the launch, is a failed artifact. The team that produced it did not just lose time. They burned cross-team trust that is harder to rebuild than the doc itself."}),`
`,e.jsx(t.p,{children:"The good news is that this is all learnable. The HLDs that survive are not the product of inherent talent. They are the product of treating the doc as the thing it actually is: the most leveraged piece of writing the team produces, and the one that the team will live with longest."}),`
`,e.jsx(t.p,{children:"If a team has 40 hours to spend, dividing it as 30 hours of writing and 10 hours of coding will almost always produce a better outcome than the reverse. The coding is easier when the design is clear. The design becomes clear by writing it down for readers who will actually read it."}),`
`,e.jsx(t.p,{children:"That is the whole craft. Most of the rest is execution."})]})}function L(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(p,{...n})}):p(n)}const J=Object.freeze(Object.defineProperty({__proto__:null,default:L,frontmatter:W},Symbol.toStringTag,{value:"Module"})),C={title:"Human feedback is not a chat message",date:"2026-05-15",slug:"human-feedback-is-not-a-chat-message",excerpt:"In production agent systems, human feedback should be modeled as a structured state transition, not appended to a conversation transcript.",readTime:"10 min read",tags:["agents","human-in-the-loop","architecture"]};function m(n){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.p,{children:"The easiest way to add human feedback to an agent is to append it to the chat."}),`
`,e.jsx(t.p,{children:'The model produces a draft. The user says, "make section 3 stricter on data retention." The system adds that sentence to the conversation history. The model reads the prior draft plus the new message and writes another version.'}),`
`,e.jsx(t.p,{children:"For a demo, this feels natural. It is fast, flexible, and impressive."}),`
`,e.jsx(t.p,{children:"For production systems, it is usually the wrong abstraction."}),`
`,e.jsx(t.p,{children:"If human feedback changes the artifact, approval, recommendation, or workflow state, it should not live only as a chat message. It should become a structured operation against durable state."}),`
`,e.jsx(t.p,{children:"That is the whole argument:"}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"Human feedback is a state transition, not a transcript append."})}),`
`,e.jsx(t.h2,{id:"the-common-pattern",children:e.jsx(t.a,{href:"#the-common-pattern",children:"The common pattern"})}),`
`,e.jsx(t.p,{children:"Most chat-based refinement loops look like this:"}),`
`,e.jsx(r,{steps:["Model produces artifact","User writes feedback","Feedback joins chat history","Model rewrites from transcript"],decision:"User satisfied?",yes:"ship the latest answer",no:"append another message"}),`
`,e.jsx(t.p,{children:"This works when the stakes are low. If you are rewriting a paragraph, polishing an email, or brainstorming names, there is nothing wrong with this loop. The transcript is the product surface, and the output can be judged by the user in the moment."}),`
`,e.jsx(t.p,{children:"The problem starts when the artifact matters after the conversation ends."}),`
`,e.jsx(t.p,{children:"Examples:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"A policy document that needs review history"}),`
`,e.jsx(t.li,{children:"A compliance answer that needs citations"}),`
`,e.jsx(t.li,{children:"A support recommendation that affects a customer"}),`
`,e.jsx(t.li,{children:"A workflow step that requires approval"}),`
`,e.jsx(t.li,{children:"A generated config that will be deployed"}),`
`,e.jsx(t.li,{children:"A risk decision that needs an owner"}),`
`]}),`
`,e.jsx(t.p,{children:"In those cases, the artifact has a life outside the chat. The system needs to know what changed, why it changed, who changed it, and which version is canonical."}),`
`,e.jsx(t.p,{children:"Conversation history is a poor place to store that."}),`
`,e.jsx(t.h2,{id:"why-chat-feedback-breaks",children:e.jsx(t.a,{href:"#why-chat-feedback-breaks",children:"Why chat feedback breaks"})}),`
`,e.jsx(t.p,{children:"There are five failure modes I see over and over."}),`
`,e.jsx(t.h3,{id:"no-target",children:e.jsx(t.a,{href:"#no-target",children:"No target"})}),`
`,e.jsx(t.p,{children:'"Make this stricter" is meaningful to a human reading the screen. It is ambiguous to a system.'}),`
`,e.jsx(t.p,{children:"Which section? Which clause? Which evidence? Which recommendation? Which approval step?"}),`
`,e.jsx(t.p,{children:"When feedback is stored as plain text in a transcript, the target has to be inferred later. That may work for one revision. It gets brittle after ten."}),`
`,e.jsx(t.h3,{id:"no-ownership",children:e.jsx(t.a,{href:"#no-ownership",children:"No ownership"})}),`
`,e.jsx(t.p,{children:"Production systems need to know who requested a change."}),`
`,e.jsx(t.p,{children:'Not just "the user." Which reviewer? Acting in which role? With what permission? Was the person approving, commenting, overriding, or asking for a draft suggestion?'}),`
`,e.jsx(t.p,{children:"The difference matters."}),`
`,e.jsx(t.h3,{id:"no-durable-audit-trail",children:e.jsx(t.a,{href:"#no-durable-audit-trail",children:"No durable audit trail"})}),`
`,e.jsx(t.p,{children:"A transcript can show that someone typed something. It usually cannot answer the audit question cleanly:"}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:"Which specific change to which artifact version did this feedback produce?"}),`
`]}),`
`,e.jsx(t.p,{children:"If the answer requires reading a conversation and reconstructing intent manually, the system is not audit-ready."}),`
`,e.jsx(t.h3,{id:"compounding-drift",children:e.jsx(t.a,{href:"#compounding-drift",children:"Compounding drift"})}),`
`,e.jsx(t.p,{children:"Long conversations accumulate model outputs, user corrections, partial rewrites, abandoned directions, and stale assumptions."}),`
`,e.jsx(t.p,{children:"By turn fifteen, the model is often reasoning over its own earlier mistakes. Each new revision is influenced by the full mess, not just the current canonical artifact and the specific operation requested."}),`
`,e.jsx(t.h3,{id:"hard-evaluation",children:e.jsx(t.a,{href:"#hard-evaluation",children:"Hard evaluation"})}),`
`,e.jsx(t.p,{children:"If feedback is unstructured, evaluation becomes fuzzy."}),`
`,e.jsx(t.p,{children:"Did the agent apply the feedback? Did it touch the right section? Did it preserve citations? Did it change unrelated content? Did it introduce unsupported claims?"}),`
`,e.jsx(t.p,{children:"Those questions are much easier to test when feedback is a structured operation."}),`
`,e.jsx(t.h2,{id:"the-better-model",children:e.jsx(t.a,{href:"#the-better-model",children:"The better model"})}),`
`,e.jsx(t.p,{children:"The better model separates three things:"}),`
`,e.jsx(a,{groups:[{title:"Conversation",items:["Natural user input","Clarifying questions","UI affordance"]},{title:"Operation",items:["Target","Intent","Actor","Justification"]},{title:"State",items:["Canonical artifact","Version history","Audit log"]}]}),`
`,e.jsx(t.p,{children:"The user can still type naturally. The system should parse that feedback into a structured operation before it changes the artifact."}),`
`,e.jsx(t.p,{children:"For example:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-json",children:`{
  "actor": "reviewer_123",
  "role": "policy_reviewer",
  "target": {
    "artifactId": "policy_456",
    "version": 4,
    "section": "3.2"
  },
  "intent": "tighten_retention_exception_language",
  "instruction": "Make the exception language stricter for unsupported retention cases.",
  "justification": "Current wording allows an exception without evidence.",
  "createdAt": "2026-05-15T10:30:00Z"
}
`})}),`
`,e.jsx(t.p,{children:"That record is not the final answer. It is the operation the system will apply."}),`
`,e.jsx(t.p,{children:"Now the refiner agent has a clean job:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Read the canonical artifact version"}),`
`,e.jsx(t.li,{children:"Read the structured feedback operation"}),`
`,e.jsx(t.li,{children:"Apply the smallest valid change"}),`
`,e.jsx(t.li,{children:"Produce a diff"}),`
`,e.jsx(t.li,{children:"Preserve or update citations"}),`
`,e.jsx(t.li,{children:"Run validation"}),`
`,e.jsx(t.li,{children:"Write a new artifact version"}),`
`]}),`
`,e.jsx(t.p,{children:"The loop becomes:"}),`
`,e.jsx(i,{nodes:["Natural feedback","Parse operation","Apply to state","Validate diff","Commit new version"]}),`
`,e.jsx(t.p,{children:"This is a much better production boundary. The chat is still useful, but it is not the source of truth."}),`
`,e.jsx(t.h2,{id:"what-the-refiner-agent-should-do",children:e.jsx(t.a,{href:"#what-the-refiner-agent-should-do",children:"What the refiner agent should do"})}),`
`,e.jsx(t.p,{children:"A refiner agent should not be a general-purpose rewriter."}),`
`,e.jsx(t.p,{children:"It should be a narrow worker that applies one structured operation to one canonical artifact version."}),`
`,e.jsx(t.p,{children:"Good refiner inputs:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Current artifact version"}),`
`,e.jsx(t.li,{children:"Target section or object"}),`
`,e.jsx(t.li,{children:"Feedback operation"}),`
`,e.jsx(t.li,{children:"Relevant source evidence"}),`
`,e.jsx(t.li,{children:"Output schema"}),`
`,e.jsx(t.li,{children:"Validation rubric"}),`
`]}),`
`,e.jsx(t.p,{children:"Good refiner outputs:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Proposed patch or diff"}),`
`,e.jsx(t.li,{children:"Updated section text"}),`
`,e.jsx(t.li,{children:"Preserved citations"}),`
`,e.jsx(t.li,{children:"New citations if needed"}),`
`,e.jsx(t.li,{children:"Explanation of changes"}),`
`,e.jsx(t.li,{children:"Validation status"}),`
`,e.jsx(t.li,{children:"Reasons if it refused"}),`
`]}),`
`,e.jsx(t.p,{children:"The key is locality. A request to tighten section 3.2 should not casually rewrite section 7. The refiner needs permission to change the target and a high bar for touching anything else."}),`
`,e.jsx(t.p,{children:"This makes the system easier to trust and easier to evaluate."}),`
`,e.jsx(t.h2,{id:"the-critic-becomes-more-useful",children:e.jsx(t.a,{href:"#the-critic-becomes-more-useful",children:"The critic becomes more useful"})}),`
`,e.jsx(t.p,{children:"Structured feedback also makes the critic agent more useful."}),`
`,e.jsx(t.p,{children:"If the critic only sees a rewritten document, it can judge the document. That is helpful, but broad."}),`
`,e.jsx(t.p,{children:"If the critic sees the operation plus the diff, it can ask sharper questions:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Did the patch address the stated intent?"}),`
`,e.jsx(t.li,{children:"Did it modify the requested target?"}),`
`,e.jsx(t.li,{children:"Did it preserve unrelated sections?"}),`
`,e.jsx(t.li,{children:"Did it preserve required citations?"}),`
`,e.jsx(t.li,{children:"Did it introduce unsupported claims?"}),`
`,e.jsx(t.li,{children:"Did it violate tone or policy rules?"}),`
`]}),`
`,e.jsx(t.p,{children:"That is a better validation surface."}),`
`,e.jsx(r,{steps:["Feedback operation","Refiner proposes diff","Critic validates diff","Application commits version"],decision:"Patch valid?",yes:"new canonical version",no:"return findings"}),`
`,e.jsx(t.p,{children:"The critic is no longer giving vague writing feedback. It is validating a state transition."}),`
`,e.jsx(t.h2,{id:"the-ux-can-still-feel-conversational",children:e.jsx(t.a,{href:"#the-ux-can-still-feel-conversational",children:"The UX can still feel conversational"})}),`
`,e.jsx(t.p,{children:"None of this means the user experience has to become a form."}),`
`,e.jsx(t.p,{children:"The user can still type:"}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:"Make the data-retention exception stricter. It should require evidence from the regional policy owner."}),`
`]}),`
`,e.jsx(t.p,{children:"The interface can still feel like chat."}),`
`,e.jsx(t.p,{children:"Underneath, the system should do the structured work:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Identify the target section"}),`
`,e.jsx(t.li,{children:"Ask a clarifying question if the target is ambiguous"}),`
`,e.jsx(t.li,{children:"Convert the request into an operation"}),`
`,e.jsx(t.li,{children:"Apply the operation to canonical state"}),`
`,e.jsx(t.li,{children:"Show the diff"}),`
`,e.jsx(t.li,{children:"Let the reviewer accept, reject, or revise"}),`
`]}),`
`,e.jsx(t.p,{children:"The point is not to make humans speak JSON. The point is to avoid pretending that natural language feedback is enough of a system record."}),`
`,e.jsx(t.p,{children:"Good product design hides structure from the user. Good system design preserves it underneath."}),`
`,e.jsx(t.h2,{id:"when-chat-feedback-is-fine",children:e.jsx(t.a,{href:"#when-chat-feedback-is-fine",children:"When chat feedback is fine"})}),`
`,e.jsx(t.p,{children:"There are cases where transcript feedback is fine."}),`
`,e.jsx(t.p,{children:"If feedback only affects the next response, keep it in context."}),`
`,e.jsx(t.p,{children:"Examples:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:'"Explain that more simply."'}),`
`,e.jsx(t.li,{children:'"Use a shorter answer."'}),`
`,e.jsx(t.li,{children:'"Give me another example."'}),`
`,e.jsx(t.li,{children:'"Switch to bullet points."'}),`
`]}),`
`,e.jsx(t.p,{children:"Those instructions do not necessarily change durable state. They shape the interaction."}),`
`,e.jsx(t.p,{children:"If feedback changes an artifact, a workflow, an approval, a recommendation, or a durable decision, it belongs in state."}),`
`,e.jsx(t.p,{children:"That is the rule of thumb:"}),`
`,e.jsx(a,{groups:[{title:"Context feedback",items:["Tone","Length","Format","Clarification"]},{title:"State feedback",items:["Artifact edits","Approvals","Risk decisions","Workflow changes"]},{title:"System response",items:["Keep context light","Commit state deliberately","Log transitions"]}]}),`
`,e.jsx(t.h2,{id:"what-this-unlocks",children:e.jsx(t.a,{href:"#what-this-unlocks",children:"What this unlocks"})}),`
`,e.jsx(t.p,{children:"Once feedback is structured, a lot of useful things become possible."}),`
`,e.jsx(t.p,{children:"You can show clean diffs. You can replay a refinement step. You can measure whether feedback was applied correctly. You can analyze which sections get the most reviewer edits. You can route different feedback types to different agents. You can ask humans to approve exactly the changed lines, not reread the whole artifact."}),`
`,e.jsx(t.p,{children:"Most importantly, you can explain the system."}),`
`,e.jsx(t.p,{children:"When someone asks why a document says what it says, you can show:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"The source version"}),`
`,e.jsx(t.li,{children:"The feedback operation"}),`
`,e.jsx(t.li,{children:"The actor"}),`
`,e.jsx(t.li,{children:"The refiner output"}),`
`,e.jsx(t.li,{children:"The critic findings"}),`
`,e.jsx(t.li,{children:"The final committed version"}),`
`]}),`
`,e.jsx(t.p,{children:'That is a real production story. "The user told the chatbot to change it" is not.'}),`
`,e.jsx(t.h2,{id:"the-production-lesson",children:e.jsx(t.a,{href:"#the-production-lesson",children:"The production lesson"})}),`
`,e.jsx(t.p,{children:"Human feedback is not dangerous because humans are unclear. Humans are allowed to be natural, partial, and imprecise. That is the whole reason the interface is useful."}),`
`,e.jsx(t.p,{children:"The danger is letting that imprecision become the system of record."}),`
`,e.jsx(t.p,{children:"Production agents need a boundary where natural language becomes structured intent. For human feedback, that boundary is the difference between a helpful demo and a system people can review, audit, and trust."}),`
`,e.jsx(t.p,{children:"Let the user speak naturally."}),`
`,e.jsx(t.p,{children:"Make the system commit deliberately."})]})}function q(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(m,{...n})}):m(n)}const X=Object.freeze(Object.defineProperty({__proto__:null,default:q,frontmatter:C},Symbol.toStringTag,{value:"Module"})),D={title:"Hybrid retrieval at scale: BM25 + kNN tradeoffs",date:"2026-04-18",slug:"hybrid-retrieval-bm25-knn-tradeoffs",excerpt:"When to reach for vector search, when keyword retrieval still wins, and the architectural decisions behind a citation-grounded compliance Q&A system.",readTime:"11 min read",tags:["retrieval","search","opensearch"]};function g(n){const t={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.p,{children:'The default answer to retrieval has become "embed it and use a vector store."'}),`
`,e.jsx(t.p,{children:"That default is wrong often enough that it is worth taking seriously. Vectors are not retrieval. They are one tool inside retrieval. Treating them as the whole pipeline trades real recall and real latency for a story that is easy to put on a slide."}),`
`,e.jsx(t.p,{children:"This post is a working engineer's view of when BM25 still beats vectors, when vectors actually earn the complexity, and how to fuse them in a way that survives production. It draws on building a citation-grounded compliance Q&A system on OpenSearch, where hybrid retrieval was the architectural decision that mattered most."}),`
`,e.jsx(t.h2,{id:"the-shape-of-the-problem",children:e.jsx(t.a,{href:"#the-shape-of-the-problem",children:"The shape of the problem"})}),`
`,e.jsx(t.p,{children:"A retrieval system has one job: given a query, return the chunks that should support the next step. That next step might be a generated answer, a ranked search results page, an agent's tool call, or a human reviewer's evidence list. The mechanics shift with the consumer, but the contract is the same."}),`
`,e.jsx(i,{nodes:["Query","Retrieval","Ranking","Consumer"],caption:"Retrieval is upstream of everything. If it is wrong, the rest cannot recover."}),`
`,e.jsx(t.p,{children:'Most production retrieval failures are not "the model said something dumb." They are "the model said something reasonable given what retrieval handed it, and what retrieval handed it was wrong."'}),`
`,e.jsx(t.p,{children:"That is why the choice between BM25 and kNN is consequential. Picking the wrong default at this layer means every downstream system inherits the failure mode."}),`
`,e.jsx(t.h2,{id:"when-bm25-is-still-the-right-answer",children:e.jsx(t.a,{href:"#when-bm25-is-still-the-right-answer",children:"When BM25 is still the right answer"})}),`
`,e.jsx(t.p,{children:"BM25 is the old workhorse: a lexical scoring function that ranks documents by term frequency, inverse document frequency, and length normalization. People treat it as the boring baseline. In several common cases, it is also the right baseline to stay on."}),`
`,e.jsx(t.h3,{id:"exact-match-queries",children:e.jsx(t.a,{href:"#exact-match-queries",children:"Exact-match queries"})}),`
`,e.jsxs(t.p,{children:["If a user types ",e.jsx(t.code,{children:"CCPA section 1798.105"}),', the right document is the one that contains those exact tokens. A vector model will return documents that are semantically related to "California consumer privacy data deletion." Many of those will be wrong. BM25 will return the one that mentions the section.']}),`
`,e.jsx(t.p,{children:"This is not a niche case. Regulated domains are full of statute numbers, policy IDs, control codes, and ticket references. Engineering corpora are full of error codes, API names, and stack traces. Internal docs are full of acronyms that mean something specific. None of those are paraphrased well."}),`
`,e.jsx(t.h3,{id:"named-entities-and-jargon",children:e.jsx(t.a,{href:"#named-entities-and-jargon",children:"Named entities and jargon"})}),`
`,e.jsxs(t.p,{children:["A user searching for ",e.jsx(t.code,{children:"Bedrock AgentCore"})," wants documents that mention Bedrock AgentCore. Not documents about agent orchestration in general. Embedding models learn statistical similarity in a representation space. They tend to over-generalize on names and acronyms, especially recent ones the embedding model was not trained on."]}),`
`,e.jsx(t.h3,{id:"short-intent-bearing-queries",children:e.jsx(t.a,{href:"#short-intent-bearing-queries",children:"Short, intent-bearing queries"})}),`
`,e.jsx(t.p,{children:"When the query is two or three tokens, BM25 has more signal per character than a vector model does. The vector model averages over a sparse signal and produces an embedding that is close to many documents. BM25 ranks on the tokens you typed."}),`
`,e.jsx(t.h3,{id:"latency-sensitive-paths",children:e.jsx(t.a,{href:"#latency-sensitive-paths",children:"Latency-sensitive paths"})}),`
`,e.jsx(t.p,{children:"A well-tuned BM25 query on a properly sized inverted index returns in single-digit milliseconds. A vector search over a non-trivial corpus, even with HNSW, is rarely faster than tens of milliseconds and often slower. For interactive systems with strict p99 budgets, the lexical path is not optional."}),`
`,e.jsx(t.h3,{id:"audit-and-explainability",children:e.jsx(t.a,{href:"#audit-and-explainability",children:"Audit and explainability"})}),`
`,e.jsx(t.p,{children:"Lexical retrieval is inspectable. You can show a reviewer which terms hit which documents and why a score landed where it did. Vector similarity is a number that came out of a model. For systems that need to defend their retrieval decisions to a human reviewer or an auditor, that distinction is not cosmetic."}),`
`,e.jsx(t.h2,{id:"where-vectors-actually-help",children:e.jsx(t.a,{href:"#where-vectors-actually-help",children:"Where vectors actually help"})}),`
`,e.jsx(t.p,{children:"Vectors are not the wrong tool. They are the right tool for a specific failure mode that BM25 cannot fix."}),`
`,e.jsx(t.h3,{id:"paraphrase-recall",children:e.jsx(t.a,{href:"#paraphrase-recall",children:"Paraphrase recall"})}),`
`,e.jsx(t.p,{children:'A user asks: "what do we do when a customer asks us to forget their data?" The relevant document is titled "Right-to-erasure handling procedures." There is no lexical overlap. BM25 misses this entirely. A vector model trained on natural language understands they are about the same thing.'}),`
`,e.jsx(t.p,{children:"This is the canonical case for vector retrieval, and it is genuinely important. It is also the case that gets cited as if it were every case."}),`
`,e.jsx(t.h3,{id:"cross-formulation-cross-language",children:e.jsx(t.a,{href:"#cross-formulation-cross-language",children:"Cross-formulation, cross-language"})}),`
`,e.jsx(t.p,{children:"When the corpus and the query are formulated differently (one is conversational, one is formal; one is English, one is mixed multilingual), vectors handle the gap more gracefully. BM25 collapses if the vocabulary distributions differ."}),`
`,e.jsx(t.h3,{id:"long-natural-language-queries",children:e.jsx(t.a,{href:"#long-natural-language-queries",children:"Long natural-language queries"})}),`
`,e.jsx(t.p,{children:"If a user types two sentences explaining their situation, the lexical signal is noisy. A vector model can ignore stop-word patterns and capture the substantive content. The longer and more conversational the query, the more vectors earn their cost."}),`
`,e.jsx(t.h3,{id:"semantic-similarity-over-surface-form",children:e.jsx(t.a,{href:"#semantic-similarity-over-surface-form",children:"Semantic similarity over surface form"})}),`
`,e.jsx(t.p,{children:`For finding "similar tickets to this one" or "documents like this draft," there is no query at all in the lexical sense. Vector similarity is the entire mechanism. This is the underrated use case for embeddings inside retrieval systems: not the user-facing search box, but the analyst's "find me more like this" surface.`}),`
`,e.jsx(t.h2,{id:"the-fusion-question",children:e.jsx(t.a,{href:"#the-fusion-question",children:"The fusion question"})}),`
`,e.jsx(t.p,{children:'The right answer in most production systems is not "BM25 or vectors." It is "BM25 and vectors, fused well."'}),`
`,e.jsx(t.p,{children:'That word "well" hides the design space. There are two main shapes.'}),`
`,e.jsx(t.h3,{id:"parallel-retrieval-with-score-fusion",children:e.jsx(t.a,{href:"#parallel-retrieval-with-score-fusion",children:"Parallel retrieval with score fusion"})}),`
`,e.jsx(t.p,{children:"Run both retrievers, get back two ranked lists, fuse them into a single ranked list before passing to the consumer."}),`
`,e.jsx(i,{nodes:["Query","BM25 + kNN in parallel","Score fusion","Top-k"],caption:"Each retriever runs to completion. The fusion step decides what wins."}),`
`,e.jsxs(t.p,{children:["The classic fusion method is Reciprocal Rank Fusion. For each document, you sum a function of its rank in each list (typically ",e.jsx(t.code,{children:"1 / (k + rank)"}),"). RRF works well as a default because it does not require calibrating scores between retrievers that produce them on different scales."]}),`
`,e.jsx(t.p,{children:"The downside: you pay the latency of both retrievers on every query."}),`
`,e.jsx(t.h3,{id:"cascading-retrieval-with-rerank",children:e.jsx(t.a,{href:"#cascading-retrieval-with-rerank",children:"Cascading retrieval with rerank"})}),`
`,e.jsx(t.p,{children:"Use the cheaper retriever to fetch a broad candidate set, then rerank the top-N with the more expensive method."}),`
`,e.jsx(i,{nodes:["Query","BM25 top-100","kNN rerank top-25","Consumer"],caption:"A funnel. The first stage maximizes recall. The second stage maximizes precision."}),`
`,e.jsx(t.p,{children:'This pattern is what most production systems eventually converge to. BM25 has high recall and low cost. It is excellent at "get me the 100 documents that are plausibly relevant." Vector reranking is good at "of these 100, which 25 actually answer the question." You can also reverse the cascade in some shapes, but BM25 first tends to be more efficient because the inverted-index path is so much cheaper per candidate.'}),`
`,e.jsx(t.p,{children:"A third pattern, increasingly common, is to add a cross-encoder reranker on top of the vector rerank. That is heavier still, but for citation-grounded systems where precision matters more than throughput, it earns the latency."}),`
`,e.jsx(t.h2,{id:"what-this-looks-like-in-production",children:e.jsx(t.a,{href:"#what-this-looks-like-in-production",children:"What this looks like in production"})}),`
`,e.jsx(t.p,{children:"The MaverickIQ Q&A platform runs hybrid retrieval over a compliance corpus. The architecture has the shape above but with specific commitments that came from production lessons."}),`
`,e.jsx(a,{groups:[{title:"Index",items:["BM25 on OpenSearch","kNN (HNSW) on OpenSearch","Shared schema"]},{title:"Query",items:["Parallel retrieval","RRF fusion","Cross-encoder rerank"]},{title:"Output",items:["Top-k chunks","Source IDs","Provenance metadata"]}]}),`
`,e.jsx(t.p,{children:"Three decisions were structural."}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"One index, two views."})," Both the BM25 and the kNN paths read from the same indexed documents with the same chunk identifiers. That means a document chunk has exactly one ID, regardless of which retriever surfaced it. Fusion at the rank-list level is trivial because the IDs are shared. Provenance does not have to reconcile two different ID spaces."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Retrieval returns IDs and provenance, not text."})," The retrieval layer returns chunk IDs plus enough metadata to reconstruct where they came from (source document, section, version, last-indexed timestamp). The text content is fetched separately. This lets the downstream consumer make decisions about freshness, caching, and authorization without re-running retrieval."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Citation grounding is enforced downstream, not in the retriever."})," The retriever does not know which chunks the answer will cite. It returns candidates. The answer assembly stage is responsible for ensuring that every claim in the generated text maps to at least one retrieved chunk, with the chunk's source ID surfaced to the reader. This separation matters: it lets the retriever optimize for recall, and the assembly stage optimize for precision."]}),`
`,e.jsx(t.h2,{id:"the-latency-budget",children:e.jsx(t.a,{href:"#the-latency-budget",children:"The latency budget"})}),`
`,e.jsx(t.p,{children:"Hybrid retrieval has a real cost."}),`
`,e.jsxs(t.p,{children:["In the parallel pattern, query latency is ",e.jsx(t.code,{children:"max(BM25, kNN) + fusion + rerank"}),". In practice, kNN dominates unless the index is small. With a well-tuned HNSW index on the order of a few million chunks, kNN tends to land in the 20-50ms range. BM25 lands under 10ms. RRF fusion is free. Cross-encoder rerank on 25 candidates is the biggest variable: 100-300ms depending on the model."]}),`
`,e.jsx(t.p,{children:"End-to-end retrieval budget in our system: ~400ms p95. That is acceptable for an interactive Q&A surface where the LLM call that follows is going to take 2-5 seconds anyway. It would be unacceptable for a typeahead."}),`
`,e.jsx(t.p,{children:"The budget is the constraint that decides whether you can afford the rerank step. If you cannot, you ship without it, and the answer-assembly stage has to be more conservative about citation precision."}),`
`,e.jsx(t.h2,{id:"index-sizing-and-refresh",children:e.jsx(t.a,{href:"#index-sizing-and-refresh",children:"Index sizing and refresh"})}),`
`,e.jsx(t.p,{children:"The architectural decision people forget to think about is index lifecycle."}),`
`,e.jsx(t.p,{children:"A vector index is more expensive to rebuild than an inverted index. For corpora that change frequently (policy documents that get reviewed monthly, incident postmortems that accumulate continuously), the rebuild cadence matters. Vectors that are weeks stale produce subtly wrong answers in a way that is hard to detect from a user's seat."}),`
`,e.jsx(t.p,{children:"The pattern we landed on:"}),`
`,e.jsx(r,{steps:["New or updated document arrives","Compute chunks","Write BM25 index (immediate)","Enqueue vector embed (async)","Vector index updated when complete"],decision:"Both indexes current?",yes:"serve from hybrid",no:"serve from BM25 only, log degradation"}),`
`,e.jsx(t.p,{children:"The BM25 path is always current. The vector path may lag by minutes. If the vector index is behind for a specific document, we serve from BM25 only for queries that hit that document, and we log the degradation so it shows up in the operational dashboard."}),`
`,e.jsx(t.p,{children:"This is not elegant. It is honest about the fact that vector indexes have a real refresh cost and that pretending otherwise gets you stale answers."}),`
`,e.jsx(t.h2,{id:"when-to-skip-vectors-entirely",children:e.jsx(t.a,{href:"#when-to-skip-vectors-entirely",children:"When to skip vectors entirely"})}),`
`,e.jsx(t.p,{children:"For some retrieval problems, vectors are not worth the operational weight."}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"The corpus is small enough that BM25 with good chunking and field weighting handles it."})," Under a few thousand chunks, the lexical baseline often wins on both quality and operational simplicity."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"The query distribution is dominated by exact-match or named-entity queries."})," Vectors add cost without recall."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:'The application can tolerate "no answer found" as a frequent path.'})," If the system is allowed to refuse on low-confidence retrieval, BM25 alone with a strict recall threshold gets you a long way."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"The freshness constraint is tight."})," If documents need to be searchable within seconds of being indexed, the vector pipeline becomes the bottleneck."]}),`
`]}),`
`,e.jsx(t.p,{children:'These are not unusual cases. They are the majority of search problems inside enterprises. The interesting question is not "do we need vectors" but "what do we lose if we do not have them, and can we tolerate that loss."'}),`
`,e.jsx(t.h2,{id:"what-this-means-for-system-design",children:e.jsx(t.a,{href:"#what-this-means-for-system-design",children:"What this means for system design"})}),`
`,e.jsx(t.p,{children:"The substantive design takeaway is that retrieval is a pipeline, not a single decision."}),`
`,e.jsx(t.p,{children:"The pipeline has at least four layers: indexing, retrieval, fusion or cascade, and consumer assembly. Each layer has its own failure modes. BM25 fails on paraphrase. Vectors fail on exact-match. Fusion fails when score scales drift. Assembly fails when retrieved chunks are good but the generator hallucinates anyway."}),`
`,e.jsx(t.p,{children:"A production retrieval system is the engineering choices about how each layer fails and how those failures are made visible."}),`
`,e.jsx(t.p,{children:"The vector-first default treats retrieval as if it is one decision: which index. That framing is what produces systems that work well in demos and degrade quietly in production."}),`
`,e.jsx(t.p,{children:"The hybrid-first default treats retrieval as a stack with explicit failure modes, where the layers are chosen to compensate for each other's weaknesses, and where the failure cases are observable rather than hidden inside a similarity score."}),`
`,e.jsx(t.p,{children:"That second framing is the production one. It is also the more boring one. Both of those things are true at once."})]})}function P(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(g,{...n})}):g(n)}const $=Object.freeze(Object.defineProperty({__proto__:null,default:P,frontmatter:D},Symbol.toStringTag,{value:"Module"})),_={title:"The schema problem in LLM outputs",date:"2026-05-16",slug:"schema-problem-llm-outputs",excerpt:"Structured output from LLMs is treated as a solved problem. It is not. The JSON looks right, but the contract underneath is fragile in ways that only show up under volume. Here is what actually has to be true at the boundary.",readTime:"10 min read",tags:["llm","validation","api-design"]};function f(n){const t={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.p,{children:"The pitch for structured output from LLMs is clean: tell the model the schema, get JSON back, parse it, use it. The provider APIs make this look easy. OpenAI's response format, Anthropic's tool use, the various OSS shims around them. The demos work. The first 1,000 calls in production work."}),`
`,e.jsx(t.p,{children:"The trouble starts later."}),`
`,e.jsx(t.p,{children:"A field that is supposed to be a string comes back as a string-shaped JSON value. An enum that has five allowed values returns a sixth one that the model invented. An array of objects has one object missing a required field. The JSON parses successfully but the contract is wrong in a way that only shows up downstream."}),`
`,e.jsx(t.p,{children:"This is the schema problem. It is not solved. It is one of the layers where production AI systems leak."}),`
`,e.jsx(t.p,{children:"This post is about the schema problem at the boundary between an LLM and the rest of your application. What actually fails, what defenses help, and where the right boundary actually sits."}),`
`,e.jsx(t.h2,{id:"what-structured-output-actually-does",children:e.jsx(t.a,{href:"#what-structured-output-actually-does",children:'What "structured output" actually does'})}),`
`,e.jsx(t.p,{children:"When you ask an LLM for structured output, three things happen."}),`
`,e.jsx(t.p,{children:"First, the model is conditioned by the schema. The system prompt or tool definition tells the model what shape is expected. The model's output distribution is shifted toward outputs that match that shape."}),`
`,e.jsx(t.p,{children:"Second, the decoding may be constrained. Some providers enforce the schema during sampling: the model can only emit tokens that keep the output on a path that ends in a valid schema-conforming string. This is real schema enforcement, not prompting."}),`
`,e.jsx(t.p,{children:"Third, the provider parses the result and may surface failures. If the model produced something that does not parse, the API may return an error rather than the raw text."}),`
`,e.jsx(t.p,{children:"This sounds airtight. It is not."}),`
`,e.jsx(i,{nodes:["Prompt + schema","Constrained decoding","JSON parse","Your application"],caption:"Each step reduces the failure surface but does not eliminate it."}),`
`,e.jsx(t.p,{children:"The constrained decoding only enforces structural validity. The JSON parse only catches syntax errors. Everything past the JSON parse is your problem, and the failure modes that matter most are semantic, not syntactic."}),`
`,e.jsx(t.h2,{id:"the-failure-modes",children:e.jsx(t.a,{href:"#the-failure-modes",children:"The failure modes"})}),`
`,e.jsx(t.p,{children:"Five failure modes are worth naming separately because the mitigation for each is different."}),`
`,e.jsx(t.h3,{id:"structural-failure",children:e.jsx(t.a,{href:"#structural-failure",children:"Structural failure"})}),`
`,e.jsx(t.p,{children:"The output is not valid JSON. Brackets do not match. A string is not closed. With constrained decoding, this is rare. Without it, it is common, especially with smaller or older models."}),`
`,e.jsx(t.p,{children:'The defense is straightforward: parse and catch. If parsing fails, retry the call with an explicit "your previous output was not valid JSON" message, possibly with the failed output included. Cap the retries.'}),`
`,e.jsx(t.p,{children:"This is the failure mode that gets the most attention because it is the most visible. It is also the easiest to fix."}),`
`,e.jsx(t.h3,{id:"type-drift",children:e.jsx(t.a,{href:"#type-drift",children:"Type drift"})}),`
`,e.jsxs(t.p,{children:["The output is valid JSON, but a field that should be a number comes back as a string. ",e.jsx(t.code,{children:'"price": "12.99"'})," instead of ",e.jsx(t.code,{children:'"price": 12.99'}),". An array that should be of integers contains a string. An object that should be ",e.jsx(t.code,{children:"{ name: string }"})," is just ",e.jsx(t.code,{children:'"name"'}),"."]}),`
`,e.jsx(t.p,{children:"Type drift slips past JSON parsing because the JSON itself is fine. It is caught by schema validation in the next stage."}),`
`,e.jsx(t.p,{children:"The defense is a real validator: Pydantic on the Python side, Zod on the TypeScript side, JSON Schema if you want a language-agnostic contract. The validator runs after the parse and rejects the output if the types do not match. Then either retry or escalate."}),`
`,e.jsx(t.h3,{id:"missing-required-fields",children:e.jsx(t.a,{href:"#missing-required-fields",children:"Missing required fields"})}),`
`,e.jsxs(t.p,{children:["The schema says a field is required. The output omits it. Sometimes the model includes it as ",e.jsx(t.code,{children:"null"})," instead. Sometimes it just leaves it out."]}),`
`,e.jsx(t.p,{children:'This is annoyingly common when the field is optional in spirit but required by the schema for downstream consumers. The model "decides" the field does not apply and skips it. Schema validation catches this. The retry has to be explicit: "you must include field X even if you do not have a value for it; use null if so."'}),`
`,e.jsx(t.h3,{id:"extra-fields",children:e.jsx(t.a,{href:"#extra-fields",children:"Extra fields"})}),`
`,e.jsx(t.p,{children:"The model invents fields that are not in the schema. This is mostly harmless for the consumer if your validator is strict about ignoring unknown fields. It becomes a real problem if you forward the output to another system that does not expect those fields, or if you store the output without normalization."}),`
`,e.jsx(t.p,{children:`The defense is a validator that strips unknown fields explicitly, or that fails closed when unknown fields appear. Choose based on whether unknown fields are "data we didn't ask for" (strip) or "evidence the model is going off-script" (fail).`}),`
`,e.jsx(t.h3,{id:"enum-hallucination",children:e.jsx(t.a,{href:"#enum-hallucination",children:"Enum hallucination"})}),`
`,e.jsx(t.p,{children:"This is the worst one because it looks like success."}),`
`,e.jsxs(t.p,{children:["The schema says a field is one of ",e.jsx(t.code,{children:'["LOW", "MEDIUM", "HIGH"]'}),". The model returns ",e.jsx(t.code,{children:'"CRITICAL"'}),". JSON parses fine. The field is a string. If your validator only checks types, it passes. The downstream system gets a value it does not know how to handle."]}),`
`,e.jsx(t.p,{children:"Constrained decoding can prevent this if the provider supports JSON Schema with enum constraints during sampling. Many do not, or do not for all schema features. If you are relying on this defense, verify it actually works against the API you are calling. The way you verify is to construct a prompt that pressures the model to invent an enum value and check whether the constrained decoding actually rejects it."}),`
`,e.jsx(t.p,{children:"If constrained decoding does not enforce enums, your validator has to. Treat enum membership as a first-class validation step, not a string check."}),`
`,e.jsx(t.h2,{id:"the-layers-that-should-exist",children:e.jsx(t.a,{href:"#the-layers-that-should-exist",children:"The layers that should exist"})}),`
`,e.jsx(t.p,{children:"A production boundary between an LLM and the rest of your system has more layers than people initially write."}),`
`,e.jsx(a,{groups:[{title:"Model boundary",items:["Prompt with schema","Constrained decoding (if available)","Raw output"]},{title:"Parse boundary",items:["JSON parse","Retry on syntactic failure"]},{title:"Validation boundary",items:["Schema validation","Enum membership","Required fields","Type coercion rules"]},{title:"Application boundary",items:["Domain validation","Business rules","Permission checks"]}]}),`
`,e.jsxs(t.p,{children:['The temptation is to collapse these. Validators get treated as "the same thing as parsing." Domain rules get checked inside the JSON-shaped Pydantic model. Enum checks get done in ',e.jsx(t.code,{children:"if"})," statements scattered through the application code."]}),`
`,e.jsx(t.p,{children:"This collapses badly. When a failure happens, you cannot tell at which layer it failed. Did the model produce wrong types? Did the validator accept something it should have rejected? Did the domain logic miss a case?"}),`
`,e.jsx(t.p,{children:"Each layer has a different failure response. The parse layer retries with a clarifying message. The validation layer rejects and either retries or escalates. The domain layer is your application logic and a failure here is a real bug, not a model issue."}),`
`,e.jsx(t.p,{children:"Keeping the layers distinct is what lets you build operational visibility into which one is failing."}),`
`,e.jsx(t.h2,{id:"a-concrete-example-json-validity-in-giskard",children:e.jsx(t.a,{href:"#a-concrete-example-json-validity-in-giskard",children:"A concrete example: JSON validity in Giskard"})}),`
`,e.jsxs(t.p,{children:["I recently contributed a ",e.jsx(t.code,{children:"JsonValid"})," check to ",e.jsx(t.a,{href:"/projects/giskard-oss",children:"Giskard"}),", an open-source library for testing AI systems. The check validates whether a value is a valid JSON string or a JSON-compatible object, with optional JSON Schema validation."]}),`
`,e.jsxs(t.p,{children:["The interesting design decision was distinguishing ",e.jsx(t.strong,{children:"schema configuration errors"})," from ",e.jsx(t.strong,{children:"validation failures"}),"."]}),`
`,e.jsx(t.p,{children:"A schema configuration error means the schema itself is malformed. The author wrote a schema that does not parse as JSON Schema, or has an internal contradiction. The check cannot validate anything until that is fixed. This is a setup bug."}),`
`,e.jsx(t.p,{children:"A validation failure means the schema is fine but the value does not conform. This is a data bug, and the actionable response is different (look at the input, not the schema)."}),`
`,e.jsx(t.p,{children:"Most libraries conflate these. They throw the same exception type for both, with a message that does not distinguish them. The operator sees a failure and does not know whether to look at their schema or their data."}),`
`,e.jsx(t.p,{children:"The Giskard implementation surfaces them as separate failure types. The operator gets:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"SchemaConfigurationError: jsonschema rejected the schema definition"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"JsonValidationError: value does not conform to schema, field X failed at Y"})}),`
`]}),`
`,e.jsx(t.p,{children:"That distinction matters at scale. When you are validating thousands of LLM outputs against a set of schemas, you need to know whether the schema is broken (rare, fix once) or whether the model is producing bad outputs (common, ongoing tuning work)."}),`
`,e.jsx(t.p,{children:"This is the kind of design detail that does not show up in the README but determines whether the validation layer is operationally useful."}),`
`,e.jsx(t.h2,{id:"pydantic-zod-json-schema-where-each-shines",children:e.jsx(t.a,{href:"#pydantic-zod-json-schema-where-each-shines",children:"Pydantic, Zod, JSON Schema: where each shines"})}),`
`,e.jsx(t.p,{children:"There is no universal answer for which validator to use. They have different strengths."}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Pydantic (Python)."})," Strong on data shaping. Coerces types when it can, rejects when it cannot. Excellent error messages. The natural choice when the LLM output flows into Python code. Pairs well with FastAPI for API boundaries. Costs: schemas are Python classes, which means they are not portable to other languages without code generation."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Zod (TypeScript)."})," Strong on runtime types that match TypeScript types. Schemas double as type definitions, so the inferred types flow through the rest of the codebase. Excellent for frontend or Node backend code that needs to validate LLM output before using it. Costs: TypeScript-only. JSON Schema export is a separate compile step."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"JSON Schema."})," Language-agnostic. Portable. The lingua franca for cross-team contracts. If two services (one Python, one Node) both need to validate the same LLM output shape, JSON Schema is what they share. Costs: the developer experience is worse than either Pydantic or Zod. The error messages are technical. Tooling varies in quality across languages."]}),`
`,e.jsx(t.p,{children:"The common pattern in production: write the schema in one of these and use codegen or compile-time conversion to produce the others. Pydantic models that compile to JSON Schema. Zod schemas that derive from JSON Schema. The validator at each language boundary is generated from the canonical contract."}),`
`,e.jsx(t.h2,{id:"when-schemas-are-the-wrong-tool",children:e.jsx(t.a,{href:"#when-schemas-are-the-wrong-tool",children:"When schemas are the wrong tool"})}),`
`,e.jsx(t.p,{children:"Schemas are not always the right answer."}),`
`,e.jsx(t.p,{children:"If the LLM output is feeding into another LLM call, structured output may actively hurt. The downstream model needs context, not constrained shape. Forcing the upstream output into a JSON shape can strip nuance that the downstream model would have used."}),`
`,e.jsx(t.p,{children:"If the output is going directly to a user, free-form text with optional structured metadata is often better than pure structured output. The user reads the text. The metadata flows into the analytics or the rendering layer."}),`
`,e.jsx(t.p,{children:"If the output is one of many fan-out paths and the schemas would differ per path, sometimes the right boundary is upstream of the schema: route first, then constrain the output for the routed path."}),`
`,e.jsx(t.p,{children:"The principle is that schemas live at boundaries where the next consumer needs structured input. Inside LLM-to-LLM flows, structure is sometimes loss of information."}),`
`,e.jsx(t.h2,{id:"the-boundary-more-carefully",children:e.jsx(t.a,{href:"#the-boundary-more-carefully",children:"The boundary, more carefully"})}),`
`,e.jsx(t.p,{children:'The deepest design decision is not "should we use structured output." It is "where does structure enter, and how is it enforced."'}),`
`,e.jsx(t.p,{children:"The naive shape is structure-at-the-model: ask the model to produce JSON, validate it, pass to the application. This is the default and is fine for many cases."}),`
`,e.jsx(t.p,{children:"The more robust shape is structure-at-the-seam: the model produces something close to structured, and a dedicated normalization step produces the canonical structured form. The normalization step can do retries, coercions, smart defaults, and explicit rejection."}),`
`,e.jsx(i,{nodes:["Model output","Normalize","Validate","Application"],caption:"The normalize step is where messy model behavior gets shaped into a clean contract."}),`
`,e.jsx(t.p,{children:"Why split normalize and validate?"}),`
`,e.jsxs(t.p,{children:["The normalize step is allowed to be lenient. It can coerce ",e.jsx(t.code,{children:'"12.99"'})," to ",e.jsx(t.code,{children:"12.99"}),". It can map ",e.jsx(t.code,{children:'"critical"'})," to ",e.jsx(t.code,{children:'"HIGH"'})," if there is an obvious mapping. It can fill missing fields with explicit ",e.jsx(t.code,{children:"null"}),". It is application-aware."]}),`
`,e.jsx(t.p,{children:"The validate step is strict. After normalization, the contract is what the rest of the application expects. Any failure here is escalated, not retried."}),`
`,e.jsx(t.p,{children:'This split prevents the worst pattern, which is validators that quietly coerce things in ways the application did not intend. If your validator is "fixing" model outputs invisibly, you have lost the signal about where the model is unreliable.'}),`
`,e.jsx(t.h2,{id:"what-this-means-in-practice",children:e.jsx(t.a,{href:"#what-this-means-in-practice",children:"What this means in practice"})}),`
`,e.jsx(t.p,{children:"The practical takeaways:"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Treat structured output as a first-class production interface."}),' Not as "JSON the model gave us." It is the contract between an unreliable producer and the rest of your system. Design accordingly.']}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Layer your validation."})," Parse, validate types, validate enums, validate domain. Keep the layers distinct so you can tell which one is failing."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Distinguish schema bugs from data bugs."})," Different remediation paths, different operational responses."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Watch for enum hallucination specifically."})," It is the most invisible failure mode and the one that produces the worst downstream effects."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Pick the validator that matches the language at the seam."})," Pydantic for Python, Zod for TS, JSON Schema for cross-language contracts."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Consider the normalize-then-validate split."})," It is more work upfront and pays off when the model's behavior drifts."]}),`
`,e.jsx(t.p,{children:"The schema problem is not solved. It is managed. The teams that take it seriously build systems that age well as the underlying models change. The teams that treat it as a checkbox build systems that work in the first quarter and break in the second."}),`
`,e.jsx(t.p,{children:"The good news is the engineering is not exotic. It is the same kind of boundary-design work that has always made the difference between code that works on a happy path and code that works in production. The fact that an LLM sits on one side of the boundary does not change the principles. It just makes the boundary more important."})]})}function N(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(f,{...n})}):f(n)}const Y=Object.freeze(Object.defineProperty({__proto__:null,default:N,frontmatter:_},Symbol.toStringTag,{value:"Module"})),R={title:"What production agents need that demos do not",date:"2026-05-15",slug:"what-production-agents-need",excerpt:"The gap between an impressive agent demo and a trustworthy production system is not model intelligence. It is state, tools, evals, permissions, observability, retries, and human feedback design.",readTime:"11 min read",tags:["agents","production","architecture"]};function x(n){const t={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.p,{children:"Agent demos are easy to enjoy."}),`
`,e.jsx(t.p,{children:"The model reads a request, calls a tool, streams a confident answer, and the room nods. For five minutes, it feels like software has become fluid. The agent can search, plan, write, explain, maybe even update something on your behalf."}),`
`,e.jsx(t.p,{children:"Then someone asks the production questions:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Who is allowed to run that tool?"}),`
`,e.jsx(t.li,{children:"What happens if the tool call times out after mutating state?"}),`
`,e.jsx(t.li,{children:"Can we replay the decision?"}),`
`,e.jsx(t.li,{children:"Which prompt version produced this output?"}),`
`,e.jsx(t.li,{children:"Why did the agent choose that source?"}),`
`,e.jsx(t.li,{children:"What happens when retrieval returns nothing?"}),`
`,e.jsx(t.li,{children:"How do we know the next model version did not make quality worse?"}),`
`]}),`
`,e.jsx(t.p,{children:"That is where most demos end."}),`
`,e.jsx(t.p,{children:"The gap between an agent demo and a production agent is not usually model intelligence. It is the engineering around the model: state, tools, evals, permissions, observability, retries, and human feedback design."}),`
`,e.jsx(t.p,{children:"The model is the interesting part. The system is the important part."}),`
`,e.jsx(t.h2,{id:"the-demo-shape",children:e.jsx(t.a,{href:"#the-demo-shape",children:"The demo shape"})}),`
`,e.jsx(t.p,{children:"A demo agent usually has a shape like this:"}),`
`,e.jsx(i,{nodes:["User asks","Model reasons","Tool runs","Answer streams"],caption:"A good demo optimizes for visible intelligence."}),`
`,e.jsx(t.p,{children:"This is a useful prototype. It proves the model can follow the task, the tool can be called, and the user experience can feel interactive."}),`
`,e.jsx(t.p,{children:"But production is not a longer demo. It is a different contract."}),`
`,e.jsx(t.p,{children:"A production agent needs to survive repeat usage, bad inputs, partial outages, permission boundaries, ambiguous goals, audit requests, cost pressure, and model drift. It needs to be understandable to the team operating it after the original builder has moved on."}),`
`,e.jsx(t.p,{children:"That means the architecture has to answer questions the demo never had to face."}),`
`,e.jsx(t.h2,{id:"state-is-the-product-boundary",children:e.jsx(t.a,{href:"#state-is-the-product-boundary",children:"State is the product boundary"})}),`
`,e.jsx(t.p,{children:"The first production mistake is treating conversation history as state."}),`
`,e.jsx(t.p,{children:"Chat history is useful context. It is not a database. It is not a workflow record. It is not an audit trail. It is not the canonical version of a document, a ticket, a policy, an approval, or a business decision."}),`
`,e.jsx(t.p,{children:"Production agents need durable state owned by the application."}),`
`,e.jsx(a,{groups:[{title:"Context",items:["What the model sees","Temporary","Prompt-shaped"]},{title:"State",items:["What the app owns","Durable","Versioned when needed"]},{title:"Audit",items:["What happened","Who triggered it","Why it changed"]}]}),`
`,e.jsx(t.p,{children:"This distinction matters most during refinement."}),`
`,e.jsx(t.p,{children:'Suppose a reviewer says, "make section 3 stricter on retention exceptions." In a demo, that feedback becomes another chat message. The model sees the old draft, the user comment, and produces a new draft.'}),`
`,e.jsx(t.p,{children:"In production, that feedback should become a state transition:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Which section changed?"}),`
`,e.jsx(t.li,{children:"Who requested the change?"}),`
`,e.jsx(t.li,{children:"What was the intent?"}),`
`,e.jsx(t.li,{children:"What was the prior version?"}),`
`,e.jsx(t.li,{children:"What validation ran after the change?"}),`
`,e.jsx(t.li,{children:"Which output became canonical?"}),`
`]}),`
`,e.jsx(t.p,{children:'If the answer is "read the transcript and infer it," the system is not production-ready.'}),`
`,e.jsx(t.p,{children:"The clean pattern is simple: the model sees context, but the application owns state. Every meaningful change updates durable state with enough metadata to reconstruct what happened."}),`
`,e.jsx(t.h2,{id:"tools-are-backend-apis-not-magic",children:e.jsx(t.a,{href:"#tools-are-backend-apis-not-magic",children:"Tools are backend APIs, not magic"})}),`
`,e.jsx(t.p,{children:"Tool calling is where agents stop being chat and start being software."}),`
`,e.jsx(t.p,{children:"That is also where risk enters."}),`
`,e.jsx(t.p,{children:"A tool is not just a function the model can call. It is a capability exposed to an uncertain decision-maker. The model may choose the wrong tool, choose the right tool with wrong arguments, retry at the wrong time, or interpret a partial failure as success."}),`
`,e.jsx(t.p,{children:"Production tools need boring contracts:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Typed inputs"}),`
`,e.jsx(t.li,{children:"Permission checks"}),`
`,e.jsx(t.li,{children:"Idempotency keys"}),`
`,e.jsx(t.li,{children:"Timeouts"}),`
`,e.jsx(t.li,{children:"Retries"}),`
`,e.jsx(t.li,{children:"Safe failure modes"}),`
`,e.jsx(t.li,{children:"Structured outputs"}),`
`,e.jsx(t.li,{children:"Audit logs"}),`
`]}),`
`,e.jsx(t.p,{children:"The tool surface should be small and domain-specific."}),`
`,e.jsx(t.p,{children:"Bad tool:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-text",children:`query_database(sql)
`})}),`
`,e.jsx(t.p,{children:"Better tool:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-text",children:`find_applicable_controls(marketplace, product_type, launch_date)
`})}),`
`,e.jsx(t.p,{children:"The second tool has a business boundary. It can validate inputs, enforce permissions, log intent, and return a typed result. The model does not need arbitrary database access. It needs a safe way to ask a domain question."}),`
`,e.jsxs(t.p,{children:["This is the basic rule: ",e.jsx(t.strong,{children:"make tools match business actions, not infrastructure primitives."})]}),`
`,e.jsx(t.h2,{id:"human-feedback-is-not-a-chat-turn",children:e.jsx(t.a,{href:"#human-feedback-is-not-a-chat-turn",children:"Human feedback is not a chat turn"})}),`
`,e.jsx(t.p,{children:"Human-in-the-loop is one of those phrases that sounds safe until you inspect what it means."}),`
`,e.jsx(t.p,{children:"In many agent systems, human feedback is just appended to the conversation:"}),`
`,e.jsx(r,{steps:["Model produces output","Human gives feedback","Feedback joins chat history","Model revises from transcript"],decision:"Reliable enough?",yes:"maybe, for low-stakes work",no:"not for audit-heavy systems"}),`
`,e.jsx(t.p,{children:"That works for low-stakes drafting. It fails when the output needs provenance."}),`
`,e.jsx(t.p,{children:"Human feedback should be modeled as an operation against state. A reviewer is not merely chatting with the model. They are changing a document, approving a recommendation, rejecting a claim, narrowing scope, or adding evidence."}),`
`,e.jsx(t.p,{children:"Those are product events. Treat them that way."}),`
`,e.jsx(t.p,{children:"A better feedback record looks like:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-text",children:`actor: reviewer id
target: section 3.2
operation: tighten exception language
reason: current wording allows unsupported retention case
source_version: draft v4
created_at: timestamp
`})}),`
`,e.jsx(t.p,{children:"Now the refiner agent can run against canonical state, not a growing transcript. The critic can validate the revised section. The audit log can explain why the change happened."}),`
`,e.jsx(t.p,{children:"The user experience can still feel conversational. The underlying system should not be."}),`
`,e.jsx(t.h2,{id:"retrieval-needs-failure-behavior",children:e.jsx(t.a,{href:"#retrieval-needs-failure-behavior",children:"Retrieval needs failure behavior"})}),`
`,e.jsx(t.p,{children:'Retrieval-augmented generation is often described as "give the model relevant context."'}),`
`,e.jsx(t.p,{children:"That is true, but incomplete."}),`
`,e.jsx(t.p,{children:"Production retrieval needs to define what happens when context is missing, stale, conflicting, unauthorized, or too broad."}),`
`,e.jsx(t.p,{children:"The common failure mode is quiet overconfidence. Retrieval returns something adjacent to the question, the model reasons over it, and the answer sounds plausible. The user does not see the miss."}),`
`,e.jsx(t.p,{children:"For high-stakes systems, retrieval should fail visibly."}),`
`,e.jsx(t.p,{children:"Good retrieval systems answer:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"What corpus was searched?"}),`
`,e.jsx(t.li,{children:"Which filters were applied?"}),`
`,e.jsx(t.li,{children:"What was the index version?"}),`
`,e.jsx(t.li,{children:"Which sources were used?"}),`
`,e.jsx(t.li,{children:"Which claims cite which source?"}),`
`,e.jsx(t.li,{children:"What happens when no source supports a claim?"}),`
`]}),`
`,e.jsx(t.p,{children:'In regulated or operational domains, "I do not have evidence to answer that" is not a weak answer. It is a trust-preserving answer.'}),`
`,e.jsx(t.p,{children:"The retrieval layer should make unsupported claims hard to render, not merely discouraged by prompt text."}),`
`,e.jsx(t.h2,{id:"evals-are-the-release-gate",children:e.jsx(t.a,{href:"#evals-are-the-release-gate",children:"Evals are the release gate"})}),`
`,e.jsx(t.p,{children:"You cannot ship a serious agent by asking a few people whether it feels good."}),`
`,e.jsx(t.p,{children:"Agent quality needs evaluation sets."}),`
`,e.jsx(a,{groups:[{title:"Task quality",items:["Known-good answers","Rubrics","Human review"]},{title:"System behavior",items:["Tool-call expectations","Refusal paths","Retry behavior"]},{title:"Operational budgets",items:["Latency","Cost","Failure rate"]}]}),`
`,e.jsx(t.p,{children:"The eval should match the job."}),`
`,e.jsx(t.p,{children:"For a Q&A agent, citation correctness and retrieval recall matter more than eloquence. For a policy-generation agent, structured findings and traceable edits matter more than pretty prose. For an operational agent, safe failure behavior matters more than always having an answer."}),`
`,e.jsx(t.p,{children:'The best evals become a shared language with stakeholders. Instead of arguing whether the agent "seems better," you can say:'}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Recall@5 improved on policy questions."}),`
`,e.jsx(t.li,{children:"Unsupported claims dropped."}),`
`,e.jsx(t.li,{children:"Refusal rate went up, but false positives went down."}),`
`,e.jsx(t.li,{children:"p90 latency regressed after adding reranking."}),`
`,e.jsx(t.li,{children:"The new prompt version broke two approval-edge cases."}),`
`]}),`
`,e.jsx(t.p,{children:"That is how agent quality becomes an engineering conversation instead of a vibe."}),`
`,e.jsx(t.h2,{id:"observability-is-the-trust-surface",children:e.jsx(t.a,{href:"#observability-is-the-trust-surface",children:"Observability is the trust surface"})}),`
`,e.jsx(t.p,{children:"In normal software, observability tells engineers what happened."}),`
`,e.jsx(t.p,{children:"In agentic systems, observability also tells users and reviewers why they should trust the output."}),`
`,e.jsx(t.p,{children:"At minimum, a production agent should record:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"User request"}),`
`,e.jsx(t.li,{children:"Session or task id"}),`
`,e.jsx(t.li,{children:"Prompt template version"}),`
`,e.jsx(t.li,{children:"Model and model version"}),`
`,e.jsx(t.li,{children:"Tool calls and arguments"}),`
`,e.jsx(t.li,{children:"Tool outputs or summaries"}),`
`,e.jsx(t.li,{children:"Retrieved source ids and index versions"}),`
`,e.jsx(t.li,{children:"State transitions"}),`
`,e.jsx(t.li,{children:"Validation results"}),`
`,e.jsx(t.li,{children:"Final output"}),`
`,e.jsx(t.li,{children:"Error and retry behavior"}),`
`]}),`
`,e.jsx(t.p,{children:"This is not only for debugging. It is for accountability."}),`
`,e.jsx(t.p,{children:'When an agent produces a wrong answer, "the model did it" is not an incident report. You need to know whether the failure came from retrieval, tool selection, permissions, state, prompt wording, model behavior, or UI presentation.'}),`
`,e.jsx(t.p,{children:"Without traces, every agent failure looks like model weirdness. With traces, many failures become ordinary software bugs."}),`
`,e.jsx(t.h2,{id:"runtime-matters-more-than-people-expect",children:e.jsx(t.a,{href:"#runtime-matters-more-than-people-expect",children:"Runtime matters more than people expect"})}),`
`,e.jsx(t.p,{children:"Agents are awkward workloads."}),`
`,e.jsx(t.p,{children:"They can run longer than a normal request. They may need session isolation. They may stream progress. They may call tools with different credentials. They may need cancellation. They may need human approval halfway through. They may need to resume after waiting."}),`
`,e.jsx(t.p,{children:"That is why runtime infrastructure matters."}),`
`,e.jsx(t.p,{children:"A useful production runtime gives you:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Session boundaries"}),`
`,e.jsx(t.li,{children:"Streaming events"}),`
`,e.jsx(t.li,{children:"Tool execution boundaries"}),`
`,e.jsx(t.li,{children:"Secrets handling"}),`
`,e.jsx(t.li,{children:"Concurrency controls"}),`
`,e.jsx(t.li,{children:"Timeouts"}),`
`,e.jsx(t.li,{children:"Cancellation"}),`
`,e.jsx(t.li,{children:"Logs and traces"}),`
`,e.jsx(t.li,{children:"Versioned deployment"}),`
`]}),`
`,e.jsx(t.p,{children:"The runtime does not make the agent intelligent. It makes the agent operable."}),`
`,e.jsx(t.p,{children:"That difference matters. A brilliant local notebook is not an enterprise system. A slightly less clever agent with clean runtime boundaries, evals, and observability is much closer to something a team can depend on."}),`
`,e.jsx(t.h2,{id:"the-production-shape",children:e.jsx(t.a,{href:"#the-production-shape",children:"The production shape"})}),`
`,e.jsx(t.p,{children:"The production shape looks less magical and more like normal distributed systems:"}),`
`,e.jsx(a,{groups:[{title:"Decision loop",items:["Model","Planner","Router","Critic"]},{title:"Control plane",items:["Tools","Auth","State","Guardrails"]},{title:"Operations",items:["Runtime","Evals","Telemetry","Rollbacks"]}]}),`
`,e.jsx(t.p,{children:"That is the point."}),`
`,e.jsx(t.p,{children:"Production agents are mostly distributed systems with an LLM in the decision loop. The LLM changes the interaction model, but it does not remove the need for state management, type contracts, idempotency, retries, security, monitoring, and release discipline."}),`
`,e.jsx(t.p,{children:"If anything, it makes those things more important."}),`
`,e.jsx(t.h2,{id:"a-useful-checklist",children:e.jsx(t.a,{href:"#a-useful-checklist",children:"A useful checklist"})}),`
`,e.jsx(t.p,{children:"When I look at an agent design, I want answers to these questions:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"What is the agent's job?"}),`
`,e.jsx(t.li,{children:"Why does this need agency instead of a fixed workflow?"}),`
`,e.jsx(t.li,{children:"What state does the application own?"}),`
`,e.jsx(t.li,{children:"Which tools can the model request?"}),`
`,e.jsx(t.li,{children:"Which tools mutate state?"}),`
`,e.jsx(t.li,{children:"What is the permission boundary?"}),`
`,e.jsx(t.li,{children:"What happens on timeout?"}),`
`,e.jsx(t.li,{children:"What happens on retry?"}),`
`,e.jsx(t.li,{children:"What happens when retrieval finds nothing?"}),`
`,e.jsx(t.li,{children:"Which claims require citations?"}),`
`,e.jsx(t.li,{children:"How does human feedback update state?"}),`
`,e.jsx(t.li,{children:"Can we replay the task?"}),`
`,e.jsx(t.li,{children:"What is the eval set?"}),`
`,e.jsx(t.li,{children:"What are the latency and cost budgets?"}),`
`,e.jsx(t.li,{children:"What would make us roll back a prompt or model change?"}),`
`]}),`
`,e.jsx(t.p,{children:"If those answers are crisp, the agent may be production-shaped."}),`
`,e.jsx(t.p,{children:'If the answers are "the model will figure it out," it is still a demo.'}),`
`,e.jsx(t.h2,{id:"the-real-lesson",children:e.jsx(t.a,{href:"#the-real-lesson",children:"The real lesson"})}),`
`,e.jsx(t.p,{children:"The agent demo asks: can the model do the task once?"}),`
`,e.jsx(t.p,{children:"The production system asks: can the team trust it repeatedly, operate it safely, explain its behavior, and improve it without breaking users?"}),`
`,e.jsx(t.p,{children:"That second question is the real work."}),`
`,e.jsx(t.p,{children:"The future of agents will not be won by the systems with the fanciest demos. It will be won by the systems that make intelligent behavior boring enough to operate."})]})}function O(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(x,{...n})}):x(n)}const G=Object.freeze(Object.defineProperty({__proto__:null,default:O,frontmatter:R},Symbol.toStringTag,{value:"Module"}));export{B as _,U as a,z as b,V as c,J as d,X as e,$ as f,Y as g,G as h};
