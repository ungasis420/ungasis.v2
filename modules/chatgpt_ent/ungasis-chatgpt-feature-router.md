# UNGASIS Content Module: ChatGPT Enterprise Feature Router

**Module file:** `ungasis-chatgpt-feature-router.md`  
**Prepared for:** Mel John Dimat, Filipino reporting consultant in Manila  
**Audience:** beginner, no-code/low-code learner, ESL speaker, visual learner, $0 additional upfront budget  
**Date:** 2026-06-01  
**Status:** Standalone repo-ready Markdown module  

## 0. Beginner Promise

This guide explains **which ChatGPT Enterprise feature to use, when to use it, and what not to use it for**.

Think of ChatGPT Enterprise like a workshop:

| Workshop item | ChatGPT feature idea | Simple meaning |
|---|---|---|
| Room | Projects | Keep one workstream together |
| House rules | Global Custom Instructions | Default behavior for all chats |
| Folder rules | Project Instructions | Rules for one project only |
| Specialist helper | Custom GPT | Repeatable assistant for one job |
| Research assistant | Deep Research | Cited research report |
| Supervised intern | Agent Mode | Multi-step task helper |
| Alarm clock | Tasks | Scheduled prompt/reminder |
| Workbench | Canvas | Draft and edit long content |
| Calculator/data desk | Data Analysis | Analyze files and datasets |
| Window to the internet | Web Search | Current public facts |
| Artist | Image Gen | Visual drafts and images |
| Download shelf | Generated files / Library | Save reusable outputs |

## 1. Important Safety Rule

Never paste or upload **Level 4** data into ChatGPT chats, files, prompts, screenshots, generated files, frontend code, or public repos.

| Level | Name | Safe examples | Rule |
|---:|---|---|---|
| 0 | Public demo data | Fake users, sample tasks, demo dashboards | Safe for examples and portfolio |
| 1 | Personal non-sensitive data | Learning notes, simple todo lists | Safe if reviewed before sharing |
| 2 | Private personal data | Private plans, personal files | Use carefully in trusted tools only |
| 3 | Company/internal data | Client reports, employee data, internal metrics | Use only in approved company workspace |
| 4 | Secrets/regulated data | API keys, passwords, tokens, financial/health/legal identifiers | Never paste/upload/share |

**Human approval required before AI or automation:** sends messages, changes records, deletes data, changes permissions, submits forms, publishes content, charges/refunds money, or affects real users.

## 2. Fast Router

| I need to... | Use first | Avoid |
|---|---|---|
| Organize a long project | Projects | One giant chat |
| Set my default style | Global Custom Instructions | Project-specific rules |
| Set rules for one repo/app | Project Instructions | Global Custom Instructions |
| Remember stable project facts | Project Memory, if available | Secrets or changing facts |
| Repeat one workflow often | Custom GPT | Rebuilding the same prompt every time |
| Give a GPT reference docs | Custom GPT Knowledge Files | Messy folders or secret files |
| Connect a GPT to an API | Custom GPT Actions | Beginner first builds or risky writes |
| Verify current facts deeply | Deep Research | Quick memory-based answer |
| Run supervised multi-step work | Agent Mode | Autonomous high-impact actions |
| Schedule a reminder | Tasks | Full automation engine |
| Analyze a source file | File Uploads | Pasting huge text manually |
| Draft/edit long text/code | Canvas | Chat scroll as source of truth |
| Analyze datasets | Data Analysis | Guessing from raw data |
| Get current public info | Web Search | Outdated AI memory |
| Create visuals | Image Gen | Pixel-perfect production UI |
| Create repo-ready files | Artifacts / Generated Files / Library | Unreviewed final outputs |

## 3. Quick Feature Matrix

| Feature | Best use | Best lifecycle stage | Difficulty | Admin dependency | Max data level |
|---|---|---|---:|---|---|
| Projects | Use when the work will last more than one chat: UNGASIS modules, app planning, SOP libraries, research packs, portfolio projects | Idea to Maintenance. Best from personal prototype onward. | 2 | ⚙️ Project availability, sharing, file controls, connectors, and model access can depend on workspace settings. | 2 default; 3 only if approved by your organization; 4 never. |
| Global Custom Instructions | Use for stable preferences that should apply almost everywhere: beginner explanations, ESL-friendly language, direct style, data-safety reminders | All stages. Best as your personal baseline. | 1 | ⚙️ Usually user-controlled, but workspace policy can affect personalization/memory-related features. | 1 maximum recommended. |
| Project Instructions | Use when one project needs its own goal, tone, source rules, data limits, output templates, and workflow | Personal prototype to Commercial. Very useful once a project has repeated work. | 2 | ⚙️ Project availability and sharing can depend on workspace settings. | 2 default; 3 only if approved; 4 never. |
| Project Memory | Use for stable project facts: current stage, chosen stack, naming rules, repeated preferences, decisions already made | Prototype to Maintenance. | 2-3 | ⚙️ Memory can be disabled or governed by workspace/admin settings. | 1-2 only. 3 only in approved enterprise context. 4 never. |
| Custom GPTs | Use when you repeat the same workflow many times and want consistent behavior, instructions, files, starters, and optional capabilities | Prototype to Maintenance. Best after a workflow is proven. | 3 | ⚙️ Owners/admins can govern GPT creation, sharing, third-party GPTs, actions, and apps. | 2 default; 3 only in approved workspace; 4 never. |
| Custom GPT Knowledge Files | Use for stable materials: SOPs, product manuals, glossary, policies, sample templates, repo guidance | Prototype to Maintenance. | 3 | ⚙️ GPT knowledge and sharing can be limited by workspace controls. | 2 default; 3 only with approved enterprise policy; 4 never. |
| Custom GPT Actions | Use when a GPT must safely retrieve or trigger data from a real system, such as checking a database, creating a ticket, or calling your app API | Private beta to Commercial. Usually not needed for early personal prototypes. | 5 | ⚙️ Workspace owners/admins can control GPT Actions, domains, sharing, and external connections. | 1 for design; 2-3 only after security review and approved environment; 4 never in prompts or frontend. |
| Deep Research | Use for decision-grade research: tool comparisons, competitor scans, source verification, pricing/terms checks, technical feasibility | Idea, Validation, Planning, Public MVP, Commercial readiness. | 3 | ⚙️ Web/search/connectors and app access may be controlled by workspace settings. | 0-1 for web research; 2 for personal uploaded docs; 3 only if approved; 4 never. |
| Agent Mode | Use for multi-step workflows: gather sources, compare pages, prepare a report, fill a draft form, or work across files and web pages | Prototype, Private beta, Public MVP support. Not needed for early idea notes. | 4 | ⚙️ Availability, connectors, browsing, and actions can be controlled by workspace settings. | 1-2 default; 3 only in approved workspace; 4 never. |
| Tasks | Use for recurring reminders, weekly project reviews, source refresh reminders, daily learning prompts, or follow-up check-ins | All stages. Best for maintenance and learning loops. | 2 | ⚙️ Availability can depend on plan, workspace settings, and feature rollout. | 1 recommended; 2 only for harmless personal reminders; 3-4 not recommended. |
| File Uploads | Use when the answer must be grounded in your actual file: source playbooks, spreadsheets, PDFs, logs, screenshots, data exports | Research, Planning, Building, QA, Documentation. | 2 | ⚙️ Uploads, retention, and connectors can be governed by workspace settings. | 2 default; 3 only approved; 4 never. |
| Canvas | Use for editing long prompts, Markdown modules, SOPs, code snippets, product specs, and structured documents | Planning, Documentation, Prompt engineering, QA. | 2 | ⚙️ Feature/model availability can depend on workspace settings and rollout. | 1-2 default; 3 only approved; 4 never. |
| Data Analysis | Use for spreadsheets, CSVs, reports, data profiling, charts, QA checks, formulas, and simple statistical summaries | Validation, QA, reporting, dashboard planning, public MVP metrics. | 3 | ⚙️ Advanced tools and file handling can be affected by plan/workspace settings. | 2 default; 3 only in approved workspace; 4 never. |
| Web Search | Use for current tool features, pricing, docs, regulations, product updates, competitor research, and source verification | Idea, Validation, Research, Public launch, Commercial checks. | 2 | ⚙️ Workspace owners/admins can enable/disable search and search-dependent features. | 0-1 recommended; 3 only if using approved enterprise connectors and safe query terms; 4 never. |
| Image Gen | Use for concept art, hero images, workflow diagrams, visual metaphors, portfolio graphics, moodboards, and mock visuals | Idea, Design, Portfolio packaging, Public demo visuals. | 2 | ⚙️ Availability can depend on plan, workspace settings, model, and rollout. | 0-1 recommended; 2 only for private non-sensitive visuals; 3-4 not recommended. |
| Artifacts / Generated Files / Library | Use when you need a reusable output file: Markdown module, CSV, HTML guide, JSON, code file, checklist, or report | All stages. Best for docs, SOPs, templates, prompt libraries, and portable artifacts. | 2 | ⚙️ File creation, Library, retention, and upload/download behavior can depend on plan and workspace settings. | 1-2 default; 3 only approved; 4 never. |

## 4. Full Feature Router

### 1. Projects

| Field | Detail |
|---|---|
| Feature name | Projects |
| What it is (analogy) | A project room or binder where one app/research/workstream keeps its chats, files, and rules together. |
| When to use | Use when the work will last more than one chat: UNGASIS modules, app planning, SOP libraries, research packs, portfolio projects. |
| Why it matters | It reduces context loss. You stop repeating the same background every session. |
| Step-by-step how | 1) Create a new Project.<br>2) Name it with a clear pattern, like `UNGASIS - App Builder OS`.<br>3) Add Project Instructions: goal, style, safety rules, data level, output format.<br>4) Upload only safe reference files.<br>5) Start one chat per workstream, such as planning, research, build, QA.<br>6) Keep a small `PROJECT_STATE.md` or summary file updated. |
| What NOT to use it for | Quick one-off questions, dumping all files without structure, or storing secrets. |
| Best lifecycle stage | Idea to Maintenance. Best from personal prototype onward. |
| Difficulty 1-5 | 2 |
| Beginner example | Create one Project for E1-E7 absorption so every generated module follows the same UNGASIS rules. |
| Expected output | Organized project workspace, reusable chats, consistent instructions, safer file context. |
| Safety check | Upload Level 0-2 only by default. Level 3 only inside approved work Enterprise settings. Never upload Level 4 secrets. |
| Common mistake | Using Projects like a junk drawer. Too many unrelated files makes answers noisier. |
| Limitations | Context is still not infinite. Project sharing and availability can depend on workspace plan and settings. File limits still apply. |
| Admin dependency ⚙️ | ⚙️ Project availability, sharing, file controls, connectors, and model access can depend on workspace settings. |
| Max data level 0-4 | 2 default; 3 only if approved by your organization; 4 never. |
| Connections to other features | Project Instructions, Project Memory, File Uploads, Canvas, Data Analysis, Deep Research, Web Search. |
| Upgrade path | Turn repeatable project work into a Custom GPT, SOP, or repo folder with `README.md`, `PROJECT_STATE.md`, and source ledger. |

#### Copy-paste prompt template

```text
Inside this Project, act as my UNGASIS project operator. Use the project instructions and uploaded files. Goal: [GOAL]. Current stage: [STAGE]. Data level allowed: [0-4]. Produce: [OUTPUT]. Before finalizing, check for missing sources, unsafe data, and beginner clarity.
```

### 2. Global Custom Instructions

| Field | Detail |
|---|---|
| Feature name | Global Custom Instructions |
| What it is (analogy) | House rules for ChatGPT. Like telling a helper: always use simple English, tables, and safety checks. |
| When to use | Use for stable preferences that should apply almost everywhere: beginner explanations, ESL-friendly language, direct style, data-safety reminders. |
| Why it matters | It saves repeated setup. Your normal preference layer follows you across chats. |
| Step-by-step how | 1) Open ChatGPT settings.<br>2) Go to Personalization or Custom Instructions.<br>3) Write who you are and how you want answers.<br>4) Add permanent rules only.<br>5) Test with a small prompt.<br>6) Edit when the instruction causes bad output. |
| What NOT to use it for | Project-specific requirements, temporary tasks, source files, API keys, private client details, or long manuals. |
| Best lifecycle stage | All stages. Best as your personal baseline. |
| Difficulty 1-5 | 1 |
| Beginner example | “I am Mel, a beginner Filipino reporting consultant. Use simple English, tables, checklists, and data-safety warnings.” |
| Expected output | A short global preference block that improves almost every chat. |
| Safety check | Keep it generic. Do not include secrets, private client names, company data, passwords, API keys, or regulated data. |
| Common mistake | Putting everything here. Global instructions should be stable, not a whole operating manual. |
| Limitations | Applies broadly, so a bad instruction can hurt unrelated chats. Some tools or third-party integrations may have separate data behavior. |
| Admin dependency ⚙️ | ⚙️ Usually user-controlled, but workspace policy can affect personalization/memory-related features. |
| Max data level 0-4 | 1 maximum recommended. |
| Connections to other features | Works with Projects, Project Instructions, Custom GPTs, Canvas, Data Analysis, Web Search. |
| Upgrade path | Move project-specific rules into Project Instructions. Move repeatable workflows into Custom GPTs or SOPs. |

#### Copy-paste prompt template

```text
Rewrite my global custom instructions. Context: [WHO I AM]. Style I want: [STYLE]. Always do: [RULES]. Never do: [LIMITS]. Keep it short enough to avoid conflicts. Output only the final custom instructions.
```

### 3. Project Instructions

| Field | Detail |
|---|---|
| Feature name | Project Instructions |
| What it is (analogy) | Rules written on the cover of one project folder. |
| When to use | Use when one project needs its own goal, tone, source rules, data limits, output templates, and workflow. |
| Why it matters | They keep one project consistent without affecting all your other chats. |
| Step-by-step how | 1) Open the target Project.<br>2) Find Project Instructions.<br>3) Add goal, audience, constraints, data level, source rules, output format.<br>4) Keep instructions short and prioritized.<br>5) Test with one normal task.<br>6) Update only when the project rules change. |
| What NOT to use it for | Global identity, temporary reminders, secret storage, or giant pasted books. |
| Best lifecycle stage | Personal prototype to Commercial. Very useful once a project has repeated work. |
| Difficulty 1-5 | 2 |
| Beginner example | For a UNGASIS repo module project: “Create standalone Markdown files, use simple English, add source ledger, no fake citations.” |
| Expected output | A project-specific instruction block that guides all chats in that project. |
| Safety check | Do not put credentials, API keys, customer data, or anything you would not want repeated across future chats. |
| Common mistake | Adding too many rules so the model follows stale instructions instead of the current task. |
| Limitations | Still needs clear task prompts. Instructions can conflict with global settings or current requests; safety rules win. |
| Admin dependency ⚙️ | ⚙️ Project availability and sharing can depend on workspace settings. |
| Max data level 0-4 | 2 default; 3 only if approved; 4 never. |
| Connections to other features | Projects, Project Memory, File Uploads, Canvas, Custom GPTs. |
| Upgrade path | Convert stable Project Instructions into a reusable Custom GPT instruction set or a repo `CONTRIBUTING.md` style guide. |

#### Copy-paste prompt template

```text
Create Project Instructions for this project. Project: [NAME]. Goal: [GOAL]. Audience: [AUDIENCE]. Data allowed: [LEVEL]. Required outputs: [FORMAT]. Safety rules: [RULES]. Source rules: [RULES]. Keep it compact and conflict-free.
```

### 4. Project Memory

| Field | Detail |
|---|---|
| Feature name | Project Memory |
| What it is (analogy) | A small notebook inside one project, if your workspace has it. |
| When to use | Use for stable project facts: current stage, chosen stack, naming rules, repeated preferences, decisions already made. |
| Why it matters | It reduces repeated explanations and helps long-running projects continue smoothly. |
| Step-by-step how | 1) Confirm memory is available and enabled.<br>2) Tell ChatGPT what to remember for this project.<br>3) Keep memories short and durable.<br>4) Ask “What do you remember for this project?” to audit.<br>5) Delete or correct stale memory.<br>6) Keep critical state in a Markdown file too. |
| What NOT to use it for | Secrets, private IDs, raw customer data, legal evidence, or anything that changes daily. |
| Best lifecycle stage | Prototype to Maintenance. |
| Difficulty 1-5 | 2-3 |
| Beginner example | “Remember for this project: E1-E7 modules must be standalone `.md` files, beginner-friendly, with source ledgers.” |
| Expected output | Project continuity notes that can help future chats. |
| Safety check | Audit memory regularly. Do not rely on memory as your legal, financial, or project source of truth. |
| Common mistake | Letting old memory override new facts. Correct stale memory immediately. |
| Limitations | ⚠️ Availability and “project-only” behavior can vary by workspace, rollout, and settings. Memory is not a database or changelog. |
| Admin dependency ⚙️ | ⚙️ Memory can be disabled or governed by workspace/admin settings. |
| Max data level 0-4 | 1-2 only. 3 only in approved enterprise context. 4 never. |
| Connections to other features | Projects, Project Instructions, Custom Instructions, File Uploads, generated handoff files. |
| Upgrade path | Use `PROJECT_STATE.md`, `DECISIONS.md`, and `CHANGELOG.md` as durable memory outside ChatGPT. |

#### Copy-paste prompt template

```text
For this project only, remember this stable context: [PROJECT FACT]. Do not remember secrets or private data. After saving, summarize what you will remember in one sentence.
```

### 5. Custom GPTs

| Field | Detail |
|---|---|
| Feature name | Custom GPTs |
| What it is (analogy) | A custom-trained helper for one repeatable job, like “UNGASIS SOP Writer” or “Source Checker.” |
| When to use | Use when you repeat the same workflow many times and want consistent behavior, instructions, files, starters, and optional capabilities. |
| Why it matters | It packages a repeatable process so you do not rebuild the prompt every time. |
| Step-by-step how | 1) Open GPT builder or Create GPT.<br>2) Define the job and audience.<br>3) Add instructions, conversation starters, and safe capabilities.<br>4) Add knowledge files only if needed.<br>5) Test with real examples.<br>6) Share only with the right people. |
| What NOT to use it for | One-off prompts, sensitive data without approval, unsupervised high-impact decisions, or work needing fresh source checks every time. |
| Best lifecycle stage | Prototype to Maintenance. Best after a workflow is proven. |
| Difficulty 1-5 | 3 |
| Beginner example | Create a “UNGASIS Module Generator” GPT that turns source sections into standalone `.md` repo files. |
| Expected output | A reusable assistant with instructions, starters, optional files, and test prompts. |
| Safety check | Review every instruction and knowledge file. Remove secrets and private data. Test for hallucination and overreach. |
| Common mistake | Building a Custom GPT before the workflow is clear. First prove the process in normal chats. |
| Limitations | Creation/editing and sharing can depend on plan, role, and workspace settings. GPTs may retrieve knowledge imperfectly. |
| Admin dependency ⚙️ | ⚙️ Owners/admins can govern GPT creation, sharing, third-party GPTs, actions, and apps. |
| Max data level 0-4 | 2 default; 3 only in approved workspace; 4 never. |
| Connections to other features | Knowledge Files, Actions, Web Search, Data Analysis, Image Gen, Projects. |
| Upgrade path | Add Actions after the GPT is stable. Later convert into a formal internal tool or app. |

#### Copy-paste prompt template

```text
Help me design a Custom GPT. Job: [REPEATABLE JOB]. Audience: [USER]. Knowledge files: [FILES OR NONE]. Capabilities needed: [WEB/DATA/CANVAS/IMAGE/ACTIONS]. Forbidden actions: [LIMITS]. Output: instructions, starters, safety rules, test prompts.
```

### 6. Custom GPT Knowledge Files

| Field | Detail |
|---|---|
| Feature name | Custom GPT Knowledge Files |
| What it is (analogy) | A reference bookshelf for one Custom GPT. |
| When to use | Use for stable materials: SOPs, product manuals, glossary, policies, sample templates, repo guidance. |
| Why it matters | They let a GPT answer from your approved material instead of relying only on general model knowledge. |
| Step-by-step how | 1) Clean the files first.<br>2) Remove secrets and private data.<br>3) Use clear names and headings.<br>4) Upload to the Custom GPT knowledge area.<br>5) Tell the GPT when and how to use each file.<br>6) Test with questions that require file details. |
| What NOT to use it for | Fast-changing data, confidential raw records, huge messy folders, or facts that need current web verification. |
| Best lifecycle stage | Prototype to Maintenance. |
| Difficulty 1-5 | 3 |
| Beginner example | Upload UNGASIS prompt rules, glossary, SOP style guide, and source-ledger template into a repo-helper GPT. |
| Expected output | Cleaned knowledge-file plan and safer GPT retrieval instructions. |
| Safety check | Treat knowledge files as durable reference. Remove passwords, tokens, customer data, confidential company data, and regulated data. |
| Common mistake | Uploading too much. A focused knowledge set beats a giant pile of mixed documents. |
| Limitations | Retrieval is not perfect. Knowledge files may be stale. Use citations/source checks for current claims. |
| Admin dependency ⚙️ | ⚙️ GPT knowledge and sharing can be limited by workspace controls. |
| Max data level 0-4 | 2 default; 3 only with approved enterprise policy; 4 never. |
| Connections to other features | Custom GPTs, Projects, File Uploads, Canvas, Deep Research. |
| Upgrade path | For larger or dynamic knowledge, move to approved connected sources, SharePoint/Drive, or a proper RAG system later. |

#### Copy-paste prompt template

```text
Prepare these files for Custom GPT Knowledge: [FILE LIST]. For each file, tell me: keep, split, rename, summarize, remove sensitive data, and suggested GPT instruction for using it.
```

### 7. Custom GPT Actions

| Field | Detail |
|---|---|
| Feature name | Custom GPT Actions |
| What it is (analogy) | A locked remote control that lets a GPT call an approved external tool or API. |
| When to use | Use when a GPT must safely retrieve or trigger data from a real system, such as checking a database, creating a ticket, or calling your app API. |
| Why it matters | Actions move a GPT from “answering” to “doing,” but only through defined API doors. |
| Step-by-step how | 1) Define the exact action and risk level.<br>2) Create or identify the API endpoint.<br>3) Prepare an OpenAPI schema.<br>4) Choose authentication: none, API key, or OAuth.<br>5) Add safety instructions and approval gates.<br>6) Test with fake data before real data. |
| What NOT to use it for | Beginner first builds, payments, deleting records, changing permissions, contacting users, or secret-heavy workflows without expert review. |
| Best lifecycle stage | Private beta to Commercial. Usually not needed for early personal prototypes. |
| Difficulty 1-5 | 5 |
| Beginner example | A Custom GPT action that reads approved demo project status from a local API. |
| Expected output | Action schema plan, authentication decision, risk controls, approval gates, and test cases. |
| Safety check | High-impact actions need explicit human approval, logs, rollback, and least-privilege access. |
| Common mistake | Giving the action too much power. Start read-only and demo-data first. |
| Limitations | Needs API design skill. Actions may be restricted by domain, workspace settings, authentication limits, or mode limitations. |
| Admin dependency ⚙️ | ⚙️ Workspace owners/admins can control GPT Actions, domains, sharing, and external connections. |
| Max data level 0-4 | 1 for design; 2-3 only after security review and approved environment; 4 never in prompts or frontend. |
| Connections to other features | Custom GPTs, APIs, Agent Mode, Projects, Human Approval Gates. |
| Upgrade path | Start with manual prompts, then read-only action, then controlled write action, then formal app integration with audit logs. |

#### Copy-paste prompt template

```text
Review this proposed GPT Action for safety. Action goal: [GOAL]. API endpoint: [ENDPOINT]. Data touched: [DATA]. Auth method: [AUTH]. Possible harm: [RISKS]. Require approval before: [ACTIONS]. Output a safe OpenAPI/action checklist and red flags.
```

### 8. Deep Research

| Field | Detail |
|---|---|
| Feature name | Deep Research |
| What it is (analogy) | A research assistant that searches, reads, plans, and writes a cited report. |
| When to use | Use for decision-grade research: tool comparisons, competitor scans, source verification, pricing/terms checks, technical feasibility. |
| Why it matters | It is better than a quick answer when you need sources, contradictions, and confidence levels. |
| Step-by-step how | 1) State the decision you need to make.<br>2) Specify scope: date, geography, tools, source types.<br>3) Ask for official sources first.<br>4) Review the research plan before it runs if offered.<br>5) Read the final report and citations.<br>6) Move key claims into a source ledger. |
| What NOT to use it for | Simple questions, private secrets, confidential files unless allowed, or tasks needing instant output. |
| Best lifecycle stage | Idea, Validation, Planning, Public MVP, Commercial readiness. |
| Difficulty 1-5 | 3 |
| Beginner example | Verify current ChatGPT Enterprise features before writing a feature router. |
| Expected output | Cited research report with findings, source table, caveats, and recommendations. |
| Safety check | Do not paste Level 4 data. For Level 3, use only approved enterprise-connected sources and follow company policy. |
| Common mistake | Accepting citations without checking that each citation supports the exact claim. |
| Limitations | Usage limits vary by plan. Reports can still miss sources or misread details. Always spot-check high-impact claims. |
| Admin dependency ⚙️ | ⚙️ Web/search/connectors and app access may be controlled by workspace settings. |
| Max data level 0-4 | 0-1 for web research; 2 for personal uploaded docs; 3 only if approved; 4 never. |
| Connections to other features | Web Search, File Uploads, Projects, Data Analysis, Custom GPTs. |
| Upgrade path | Turn repeated research into a Research OS workflow with claim ledger, evidence matrix, and refresh schedule. |

#### Copy-paste prompt template

```text
Use Deep Research to answer: [RESEARCH QUESTION]. Decision supported: [DECISION]. Prefer official sources first. Scope: [TIMEFRAME/REGION/TOOLS]. Output: summary, evidence matrix, contradictions, source ledger, confidence, and what would change the answer.
```

### 9. Agent Mode

| Field | Detail |
|---|---|
| Feature name | Agent Mode |
| What it is (analogy) | A supervised intern that can browse, analyze, prepare files, and take some actions while you watch. |
| When to use | Use for multi-step workflows: gather sources, compare pages, prepare a report, fill a draft form, or work across files and web pages. |
| Why it matters | It can reduce manual clicking and switching between tools, but you stay the owner. |
| Step-by-step how | 1) Define the goal and success criteria.<br>2) List allowed websites, files, and tools.<br>3) List forbidden actions.<br>4) Require approval before submit/send/delete/pay/publish.<br>5) Monitor progress and correct mistakes.<br>6) Review final output and logs. |
| What NOT to use it for | Autonomous money movement, legal/tax submissions, security changes, deleting data, contacting customers, or sensitive work without review. |
| Best lifecycle stage | Prototype, Private beta, Public MVP support. Not needed for early idea notes. |
| Difficulty 1-5 | 4 |
| Beginner example | Ask Agent Mode to gather official OpenAI docs for a feature router, but require approval before downloading or submitting anything. |
| Expected output | Completed supervised workflow, draft report/file, source notes, and action log. |
| Safety check | Human approval is mandatory before anything affects users, accounts, records, public content, or money. |
| Common mistake | Treating Agent Mode like a fully autonomous employee. It is a supervised tool. |
| Limitations | Can fail, misclick, misunderstand sites, or hit access limits. Availability and tools can depend on workspace settings. |
| Admin dependency ⚙️ | ⚙️ Availability, connectors, browsing, and actions can be controlled by workspace settings. |
| Max data level 0-4 | 1-2 default; 3 only in approved workspace; 4 never. |
| Connections to other features | Web Search, Deep Research, File Uploads, Data Analysis, Tasks, Custom GPT Actions. |
| Upgrade path | For recurring safe workflows, convert to Tasks, Power Automate, or a controlled app workflow with logs. |

#### Copy-paste prompt template

```text
Use Agent Mode for this supervised task: [TASK]. Allowed sources/tools: [ALLOWLIST]. Forbidden actions: [FORBIDDEN]. Ask for approval before [RISKY ACTIONS]. Data level allowed: [LEVEL]. Output: steps taken, sources used, result, risks, and next action.
```

### 10. Tasks

| Field | Detail |
|---|---|
| Feature name | Tasks |
| What it is (analogy) | An alarm clock that runs a prompt later or on a schedule. |
| When to use | Use for recurring reminders, weekly project reviews, source refresh reminders, daily learning prompts, or follow-up check-ins. |
| Why it matters | It creates rhythm without relying on memory or manual reminders. |
| Step-by-step how | 1) Write the task in natural language.<br>2) Specify one-time or recurring schedule.<br>3) Include timezone, such as Asia/Manila.<br>4) Keep the prompt short and safe.<br>5) Review task settings.<br>6) Pause, edit, or delete when no longer needed. |
| What NOT to use it for | Critical compliance alerts, secret handling, file-upload workflows, GPT-specific workflows, or actions that affect real users/systems. |
| Best lifecycle stage | All stages. Best for maintenance and learning loops. |
| Difficulty 1-5 | 2 |
| Beginner example | Every Friday at 5 PM Manila time, remind me to update `PROJECT_STATE.md` and `CHANGELOG.md`. |
| Expected output | Scheduled reminder or recurring ChatGPT prompt. |
| Safety check | Keep tasks low-risk. Do not schedule actions that send, delete, update, charge, publish, or submit without review. |
| Common mistake | Using Tasks as an automation engine. It is better for reminders and safe recurring prompts. |
| Limitations | Task count and capabilities are limited. Official docs note active task limits and exclusions such as file uploads/GPTs/voice for tasks. |
| Admin dependency ⚙️ | ⚙️ Availability can depend on plan, workspace settings, and feature rollout. |
| Max data level 0-4 | 1 recommended; 2 only for harmless personal reminders; 3-4 not recommended. |
| Connections to other features | Projects, Calendar-like workflows, Agent Mode, maintenance checklists. |
| Upgrade path | Use Microsoft Outlook/Planner/Power Automate when the reminder must integrate with work systems or approvals. |

#### Copy-paste prompt template

```text
Create a recurring task: every [SCHEDULE] in Asia/Manila, remind me to [ACTION]. Include a short checklist: [CHECKLIST]. Do not use private data or take any external action.
```

### 11. File Uploads

| Field | Detail |
|---|---|
| Feature name | File Uploads |
| What it is (analogy) | Handing ChatGPT a document, spreadsheet, image, or PDF to inspect. |
| When to use | Use when the answer must be grounded in your actual file: source playbooks, spreadsheets, PDFs, logs, screenshots, data exports. |
| Why it matters | It prevents generic answers and lets ChatGPT summarize, extract, compare, analyze, or transform real material. |
| Step-by-step how | 1) Check the data level first.<br>2) Remove secrets and sensitive fields.<br>3) Upload the file.<br>4) Ask a narrow task, like summarize, profile, extract, compare, or convert.<br>5) Ask for uncertainty and line/source references when needed.<br>6) Save the output into your repo or project notes. |
| What NOT to use it for | API keys, passwords, service-role keys, regulated data, private company data in unapproved contexts, or dumping files without a question. |
| Best lifecycle stage | Research, Planning, Building, QA, Documentation. |
| Difficulty 1-5 | 2 |
| Beginner example | Upload the AI Builder prompt and playbook, then ask for missing UNGASIS modules. |
| Expected output | File-grounded summary, extraction, analysis, conversion, or QA report. |
| Safety check | Use dummy or redacted data first. Never upload Level 4 secrets. For Level 3, use only approved Enterprise workspace rules. |
| Common mistake | Uploading a file and asking “analyze this” without a clear question or output format. |
| Limitations | File size and token limits apply. Some file types are parsed imperfectly. Images/PDF visuals may require careful review. |
| Admin dependency ⚙️ | ⚙️ Uploads, retention, and connectors can be governed by workspace settings. |
| Max data level 0-4 | 2 default; 3 only approved; 4 never. |
| Connections to other features | Projects, Deep Research, Data Analysis, Canvas, Custom GPT Knowledge Files, Library. |
| Upgrade path | Move stable files into Project files or Custom GPT Knowledge. Move structured data into Excel/Power BI/database when serious. |

#### Copy-paste prompt template

```text
I uploaded [FILE NAME]. Task: [TASK]. Use only this file unless I ask for web research. Output: [FORMAT]. Cite exact parts when possible. Flag missing, unclear, or unsafe items.
```

### 12. Canvas

| Field | Detail |
|---|---|
| Feature name | Canvas |
| What it is (analogy) | A shared whiteboard or draft document beside the chat. |
| When to use | Use for editing long prompts, Markdown modules, SOPs, code snippets, product specs, and structured documents. |
| Why it matters | It lets you revise a document without losing the whole draft inside chat scroll. |
| Step-by-step how | 1) Ask ChatGPT to open Canvas or create a draft.<br>2) Put one document or code artifact in the Canvas.<br>3) Select sections for targeted edits.<br>4) Ask for specific changes.<br>5) Review the final text.<br>6) Export or copy into your repo. |
| What NOT to use it for | Final source of truth, secret storage, large spreadsheet analysis, or complex version control. |
| Best lifecycle stage | Planning, Documentation, Prompt engineering, QA. |
| Difficulty 1-5 | 2 |
| Beginner example | Draft `ungasis-chatgpt-feature-router.md`, then edit the Deep Research and Agent Mode sections. |
| Expected output | Editable document or code draft in a side workspace. |
| Safety check | Do not put secrets or sensitive raw data in Canvas. Copy final files to your repo or OneDrive for durable storage. |
| Common mistake | Using Canvas as the only storage. Treat it as a drafting space, not your archive. |
| Limitations | Canvas availability and behavior can vary by model/plan/rollout. It is not Git version control. |
| Admin dependency ⚙️ | ⚙️ Feature/model availability can depend on workspace settings and rollout. |
| Max data level 0-4 | 1-2 default; 3 only approved; 4 never. |
| Connections to other features | Projects, File Uploads, Custom Instructions, generated files, Data Analysis. |
| Upgrade path | Move finished content into Markdown files, GitHub, Word, SharePoint, or a docs site. |

#### Copy-paste prompt template

```text
Create a Canvas draft for [DOCUMENT NAME]. Audience: [AUDIENCE]. Structure: [SECTIONS]. Style: simple English, tables, checklists. After drafting, suggest 5 review checks.
```

### 13. Data Analysis

| Field | Detail |
|---|---|
| Feature name | Data Analysis |
| What it is (analogy) | A data helper with a calculator, chart maker, and code notebook. |
| When to use | Use for spreadsheets, CSVs, reports, data profiling, charts, QA checks, formulas, and simple statistical summaries. |
| Why it matters | It helps you turn messy data into decisions, not just text summaries. |
| Step-by-step how | 1) Upload a safe dataset.<br>2) State the business question.<br>3) Ask for a data dictionary and quality check first.<br>4) Ask for analysis, charts, or tables.<br>5) Verify row counts and sample records.<br>6) Export results or save to Excel/Markdown. |
| What NOT to use it for | Unverified legal/financial decisions, secret datasets, private company data outside approved workspaces, or black-box conclusions. |
| Best lifecycle stage | Validation, QA, reporting, dashboard planning, public MVP metrics. |
| Difficulty 1-5 | 3 |
| Beginner example | Upload beta feedback CSV and ask for top themes, pain points, and next feature priorities. |
| Expected output | Data profile, charts, tables, insights, caveats, and optional generated files. |
| Safety check | Check data classification first. Remove PII. Validate formulas, totals, and sample rows before trusting results. |
| Common mistake | Jumping straight to insights without checking data quality. |
| Limitations | File limits apply. Analysis code can contain mistakes. Complex BI is often better in Excel, Power Query, or Power BI. |
| Admin dependency ⚙️ | ⚙️ Advanced tools and file handling can be affected by plan/workspace settings. |
| Max data level 0-4 | 2 default; 3 only in approved workspace; 4 never. |
| Connections to other features | File Uploads, Projects, Canvas, generated files, Power BI/Excel workflows. |
| Upgrade path | Move repeatable data work to Excel Power Query, Power BI semantic models, or a documented Python notebook. |

#### Copy-paste prompt template

```text
Analyze this dataset for [DECISION]. First profile columns and data quality. Then answer: [QUESTIONS]. Output: summary, table, chart suggestions, caveats, and next actions. Do not invent missing data.
```

### 14. Web Search

| Field | Detail |
|---|---|
| Feature name | Web Search |
| What it is (analogy) | A window to current public information. |
| When to use | Use for current tool features, pricing, docs, regulations, product updates, competitor research, and source verification. |
| Why it matters | AI memory gets stale. Web Search helps avoid outdated or invented claims. |
| Step-by-step how | 1) Ask for web search explicitly when facts may be current.<br>2) Tell it to prefer official sources.<br>3) Ask for citations near claims.<br>4) Compare sources if the claim matters.<br>5) Record source name, link, date accessed, confidence.<br>6) Mark unverified claims. |
| What NOT to use it for | Private company questions, confidential data, secrets, or bypassing paywalls/logins/access controls. |
| Best lifecycle stage | Idea, Validation, Research, Public launch, Commercial checks. |
| Difficulty 1-5 | 2 |
| Beginner example | Search official OpenAI docs to verify whether Tasks support file uploads. |
| Expected output | Current sourced answer with links/citations and confidence labels. |
| Safety check | Do not include sensitive data in web-search queries. Treat volatile web results as evidence, not automatic truth. |
| Common mistake | Citing a source that does not actually support the claim. |
| Limitations | Search can miss pages, retrieve stale pages, or be disabled. For Enterprise/Edu, search behavior and role access can depend on workspace settings. |
| Admin dependency ⚙️ | ⚙️ Workspace owners/admins can enable/disable search and search-dependent features. |
| Max data level 0-4 | 0-1 recommended; 3 only if using approved enterprise connectors and safe query terms; 4 never. |
| Connections to other features | Deep Research, Agent Mode, Projects, Source Ledger, Custom GPTs. |
| Upgrade path | Use Deep Research when you need multiple sources, contradictions, and a formal report. |

#### Copy-paste prompt template

```text
Search the web using official sources first. Claim to verify: [CLAIM]. Output: verified yes/no, citation, date accessed, confidence, caveat, and action.
```

### 15. Image Gen

| Field | Detail |
|---|---|
| Feature name | Image Gen |
| What it is (analogy) | A design sketch artist inside ChatGPT. |
| When to use | Use for concept art, hero images, workflow diagrams, visual metaphors, portfolio graphics, moodboards, and mock visuals. |
| Why it matters | It helps visual learners and speeds up design exploration before using Figma or a real design system. |
| Step-by-step how | 1) Describe the image purpose.<br>2) Specify audience, style, layout, colors, and text needs.<br>3) Ask for 1-4 variations if useful.<br>4) Review for accuracy, readability, and brand risk.<br>5) Edit with focused instructions.<br>6) Save only safe, approved assets. |
| What NOT to use it for | Exact production UI, official logos/trademark imitation, private person likeness without permission, sensitive images, or replacing design QA. |
| Best lifecycle stage | Idea, Design, Portfolio packaging, Public demo visuals. |
| Difficulty 1-5 | 2 |
| Beginner example | Create a glassmorphism infographic showing the UNGASIS lifecycle ladder. |
| Expected output | Generated or edited image for learning, design, or presentation use. |
| Safety check | Avoid copyrighted/trademarked lookalikes, sensitive data in screenshots, and private people without consent. |
| Common mistake | Expecting perfect text or pixel-perfect UI. Use it for direction, not final implementation. |
| Limitations | Text, exact layout, and precise edits may be imperfect. Editing tools may not allow pixel-perfect selection. |
| Admin dependency ⚙️ | ⚙️ Availability can depend on plan, workspace settings, model, and rollout. |
| Max data level 0-4 | 0-1 recommended; 2 only for private non-sensitive visuals; 3-4 not recommended. |
| Connections to other features | Canvas, Projects, Portfolio docs, slides, design system planning. |
| Upgrade path | Use Figma/Canva/PowerPoint/Designer for final brand assets and editable layouts. |

#### Copy-paste prompt template

```text
Generate an image for [PURPOSE]. Audience: [AUDIENCE]. Style: [STYLE]. Must include: [ELEMENTS]. Avoid: [BRAND/PRIVATE/SENSITIVE ITEMS]. Make it readable, clean, and beginner-friendly.
```

### 16. Artifacts / Generated Files / Library

| Field | Detail |
|---|---|
| Feature name | Artifacts / Generated Files / Library |
| What it is (analogy) | A download shelf for files ChatGPT creates or stores for you. |
| When to use | Use when you need a reusable output file: Markdown module, CSV, HTML guide, JSON, code file, checklist, or report. |
| Why it matters | A downloadable file is easier to add to your repo, share, print, or archive than chat text. |
| Step-by-step how | 1) Ask for a specific file name and format.<br>2) State the required first heading and footer.<br>3) Ask ChatGPT to create the file.<br>4) Open or inspect the file before trusting it.<br>5) Download and add it to your repo/OneDrive.<br>6) Keep a changelog entry. |
| What NOT to use it for | Secret storage, final legal records, private raw data, or outputs you have not reviewed. |
| Best lifecycle stage | All stages. Best for docs, SOPs, templates, prompt libraries, and portable artifacts. |
| Difficulty 1-5 | 2 |
| Beginner example | Generate `ungasis-chatgpt-feature-router.md` as a standalone repo module. |
| Expected output | A downloadable generated file saved in the chat/library experience when available. |
| Safety check | Open generated files before using them. Scan for hallucinated facts, hidden private data, broken code, or unsafe instructions. |
| Common mistake | Assuming a generated file is correct because it exists. File creation is not QA. |
| Limitations | ⚠️ Naming note: I could not verify “Artifacts” as an official OpenAI feature name from official help pages. Official docs describe uploaded and generated files being saved/browsable in Library. Availability and retention can vary. |
| Admin dependency ⚙️ | ⚙️ File creation, Library, retention, and upload/download behavior can depend on plan and workspace settings. |
| Max data level 0-4 | 1-2 default; 3 only approved; 4 never. |
| Connections to other features | File Uploads, Data Analysis, Canvas, Projects, Library, repo/OneDrive storage. |
| Upgrade path | Move important files into GitHub, OneDrive, SharePoint, or a docs site. Add version, source ledger, and QA checklist. |

#### Copy-paste prompt template

```text
Create a downloadable [FORMAT] file named `[FILENAME]`. It must start with `[FIRST HEADING]` and end with `[FOOTER]`. Include sections: [SECTIONS]. Use simple English. No secrets. After creating it, tell me what checks you performed.
```

## 5. Beginner Decision Rules

| Rule | Use this decision |
|---|---|
| If it is a one-off question | Use a normal chat. Do not create a project. |
| If it will continue for weeks | Create a Project. |
| If the same workflow repeats 5+ times | Consider a Custom GPT. |
| If you need current facts | Use Web Search or Deep Research. |
| If you need citations and confidence | Use Deep Research. |
| If you need to edit a long document | Use Canvas or generated Markdown file. |
| If you need data tables/charts | Use Data Analysis first, then Excel/Power BI if repeatable. |
| If an action changes real systems | Require human approval. |
| If data is Level 4 | Do not paste/upload it. Use safe placeholders. |

## 6. Copy-Paste Master Router Prompt

Use this when you are unsure which ChatGPT feature to use.

```text
Act as my ChatGPT Enterprise feature router and UNGASIS operator.

My task: [DESCRIBE TASK]
My lifecycle stage: [IDEA / PERSONAL / PROTOTYPE / PRIVATE BETA / PUBLIC MVP / COMMERCIAL]
Data involved: [LEVEL 0-4]
Output I need: [CHAT ANSWER / MARKDOWN FILE / RESEARCH REPORT / DATA ANALYSIS / IMAGE / PLAN]
Risky actions involved: [NONE / SEND / DELETE / UPDATE / PUBLISH / PAYMENT / USER CONTACT]

Please recommend:
1. Best ChatGPT Enterprise feature to use
2. Why this feature fits
3. What not to use
4. Step-by-step beginner workflow
5. Safety check
6. Copy-paste prompt for the chosen feature
7. What I should review before trusting the output

Use simple English. Ask only blocking questions. If unclear, make safe assumptions and label them.
```

## 7. Source Ledger

| Claim | Source Name | Source Link | Date Accessed | Confidence | Notes/Limitations |
|---|---|---|---|---|---|
| Projects group chats, files, and instructions; team sharing can be available in Business/Enterprise/Edu. | OpenAI Help - Using Projects in ChatGPT | https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt | 2026-06-01 | 🟢 High | Workspace and model behavior can change. |
| Custom instructions are user-level personalization for ChatGPT behavior. | OpenAI Help - ChatGPT custom instructions | https://help.openai.com/en/articles/8096356-chatgpt-custom-instructions | 2026-06-01 | 🟢 High | Do not include sensitive data. |
| Memory stores details from chats and can be managed by users/settings. | OpenAI Help - Memory in ChatGPT | https://help.openai.com/en/articles/8590148-memory-in-chatgpt-remembering-what-you-chat-about | 2026-06-01 | 🟢 High | Project-specific memory availability may vary by rollout/workspace. |
| GPTs are custom versions of ChatGPT with instructions, knowledge, capabilities, and optional actions/apps. | OpenAI Help - GPTs in ChatGPT | https://help.openai.com/en/articles/8554407-gpts-in-chatgpt | 2026-06-01 | 🟢 High | Creation/sharing can depend on plan and admin settings. |
| Custom GPT Actions connect GPTs to external APIs using schema/auth configuration. | OpenAI Help - Configuring Actions in GPTs | https://help.openai.com/en/articles/9442513-configuring-actions-in-gpts | 2026-06-01 | 🟢 High | Requires API design and security review. |
| Deep Research creates sourced reports using web, uploaded files, and connected sources where available. | OpenAI Help - Deep Research FAQ | https://help.openai.com/en/articles/10500283-deep-research-faq | 2026-06-01 | 🟢 High | Usage limits vary by plan. |
| ChatGPT Agent can perform supervised multi-step tasks with tools, browser, files, and connected data sources. | OpenAI Help - ChatGPT Agent | https://help.openai.com/en/articles/11752874-chatgpt-agent | 2026-06-01 | 🟢 High | Human approval needed for risky actions. |
| Tasks can run scheduled one-off or recurring prompts, with limits and unsupported capabilities. | OpenAI Help - Scheduled Tasks in ChatGPT | https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt | 2026-06-01 | 🟢 High | Not a full automation engine. |
| File Uploads allow users to work with documents and data; file limits apply. | OpenAI Help - File Uploads FAQ | https://help.openai.com/en/articles/8555545-file-uploads-faq | 2026-06-01 | 🟢 High | Limits vary by file type and plan. |
| Uploaded and generated files can be saved and browsed in ChatGPT Library. | OpenAI Help - File Storage and Library in ChatGPT | https://help.openai.com/en/articles/20001052-file-storage-and-library-in-chatgpt | 2026-06-01 | 🟢 High | Used as closest official support for “Artifacts / generated files.” |
| Canvas is a workspace for drafting and editing documents/code with ChatGPT. | OpenAI Help - Using Canvas in ChatGPT | https://help.openai.com/en/articles/9930697-using-canvas-in-chatgpt | 2026-06-01 | 🟢 High | Availability can vary by model/rollout. |
| Data Analysis lets ChatGPT inspect data, write/run code-backed analysis, and create tables/charts. | OpenAI Help - Data Analysis with ChatGPT | https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt | 2026-06-01 | 🟢 High | Users must verify output. |
| ChatGPT Search provides web-based answers with links and is controllable by Enterprise/Edu workspace settings. | OpenAI Help - ChatGPT Search for Enterprise and Edu | https://help.openai.com/en/articles/10093903-chatgpt-search-for-enterprise-and-edu | 2026-06-01 | 🟢 High | Search queries may be sent to third-party providers per docs. |
| Images in ChatGPT supports generation and editing with limitations. | OpenAI Help - Images in ChatGPT | https://help.openai.com/en/articles/11084440-images-in-chatgpt | 2026-06-01 | 🟢 High | Not pixel-perfect design implementation. |
| ChatGPT Enterprise includes admin/security/workspace controls and feature access varies by settings. | OpenAI Help - ChatGPT Enterprise overview and workspace settings | https://help.openai.com/en/articles/8265053-chatgpt-enterprise-overview | 2026-06-01 | 🟢 High | Also checked workspace settings and Enterprise model/limits docs. |
| The exact product name “Artifacts” could not be verified as an official OpenAI Help feature name. | OpenAI Help search / Library docs | https://help.openai.com/en/articles/20001052-file-storage-and-library-in-chatgpt | 2026-06-01 | 🔴 Unverified | This module treats it as generated files / Library / downloadable outputs. |

## 8. QA Checklist for This Module

- [x] Starts with required heading.
- [x] Covers all 16 requested ChatGPT Enterprise features.
- [x] Includes every requested field for each feature.
- [x] Uses simple English, analogies, steps, and copy-paste prompts.
- [x] Marks uncertain “Artifacts” naming with ⚠️.
- [x] Includes admin dependency notes with ⚙️.
- [x] Includes max data level guidance.
- [x] Includes source ledger.
- [x] Contains no API keys, passwords, tokens, or private company data.

## 9. UNGASIS Trace

Mode: Execution / Artifact Build  
Rigor: Personal/prototype default with Enterprise/admin caveats  
Domain: ChatGPT Enterprise, AI operating model, solopreneur app workflow  
Dimensions: Router, Tools/Integrations, Knowledge, Guardrails, Evaluation, Artifacts  
Lenses: ChatGPT Enterprise workflow architect, product operator, beginner teacher, security reviewer  
Intelligences: Technical, AI, Product, Risk, Learning, Practicality  
Frameworks: Rigor Dial, Good Prompt Formula, Source Quality Rubric, Systems Thinking  
Engines: Workflow Designer, Prompt Architect, R&D/Evidence, QA/Security  
Tools/Files: Uploaded UNGASIS playbooks, official OpenAI help sources, generated Markdown file  
Guardrails: No secrets, no unsafe automation, source-first for current facts, admin dependency flagged  
Template: Feature Router Markdown Module  

---

**Version:** 1.0  
**Date:** 2026-06-01  
**Owner:** Mel John Dimat / UNGASIS OS  
**Module:** E1 — ChatGPT Enterprise Feature Router  
**Next module:** E2 — Full Prompt Template Library  