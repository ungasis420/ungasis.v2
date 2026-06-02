# UNGASIS Content Module: Beginner Glossary

Purpose: Give Mel John Dimat a simple, reusable glossary for UNGASIS OS, solopreneur app building, ChatGPT Enterprise, Microsoft 365 Copilot, Power Platform, AI-assisted coding, and portfolio/monetization work.

Audience: Beginner, ESL learner, visual learner, no-code/low-code builder, $0 upfront budget.

Use this when:
- A technical word appears in a prompt, SOP, app plan, README, or tutorial.
- You need a fast beginner explanation before deciding or building.
- You want a safer shared vocabulary across ChatGPT, M365 Copilot, Cline, GitHub, and app-building tools.

Important safety note: This glossary is educational, not legal, tax, security, or financial advice. Tool features, prices, limits, and availability can change. Re-check official sources before public launch, monetization, or sensitive-data use.

## Quick Reading Guide

| Column | Meaning | How to use it |
|---|---|---|
| Term | The word you may see in tools, code, docs, or AI answers | Search this first when confused |
| Simple meaning | Plain-English explanation | Read this before asking AI for help |
| Real-world analogy | Everyday comparison | Use this to remember the idea |

## Data Safety Reminder

| Level | Simple meaning | Example |
|---|---|---|
| Level 0 | Public demo data | Fake names, sample tasks, dummy orders |
| Level 1 | Personal non-sensitive data | Learning notes, simple to-do list |
| Level 2 | Private personal data | Personal finances, private journal |
| Level 3 | Company/internal data | Client reports, internal business files |
| Level 4 | Secrets or regulated data | API keys, passwords, tokens, PII, medical, legal, financial data |

Hard rule: Never paste API keys, tokens, passwords, private certificates, service-role keys, or connection strings into AI chats, public GitHub repos, screenshots, HTML manuals, or frontend code.

## Glossary Index

Total terms: 234

| Category | What it covers |
|---|---|
| App and Product Basics | MVP, prototype, scope, roadmap, user stories, product thinking |
| Web and Code Basics | Frontend, backend, APIs, hosting, deployment, code languages and frameworks |
| Security and Data Safety | Auth, secrets, environment variables, privacy, RLS, data levels |
| Git and Project Files | GitHub, commits, branches, README, .gitignore, source of truth |
| UX, UI, and Design | PRD, screens, accessibility, components, states, glassmorphism |
| Automation, Microsoft, and BI | Power Query, Power BI, DAX, workflows, triggers, dashboards |
| AI and Prompting | LLMs, agents, RAG, embeddings, hallucinations, prompts |
| Quality, Launch, and Operations | QA, testing, debugging, analytics, uptime, environments |
| Business and Monetization | Pricing, subscriptions, fees, revenue tests, paid pilots |
| Specific Tools | Supabase, Cloudflare Pages, Lemon Squeezy, PostHog, Bolt.new, Lovable, Cline, and related tools |

## App and Product Basics

| Term | Simple meaning | Real-world analogy |
|---|---|---|
| App | Software people use to do something useful. | A tool in your bag, like scissors for cutting paper. |
| Web app | An app you open in a browser instead of installing from an app store. | A shop you enter through a website door. |
| SaaS | Software as a Service: software used online, often with a subscription. | Renting access to a gym instead of owning the building. |
| MVP | Minimum Viable Product: the smallest useful version that solves one real problem. | A food stall before opening a full restaurant. |
| Prototype | A rough version made to test an idea before building the real thing. | A cardboard model before building a house. |
| Alpha | Very early test version, usually unstable and used by the builder or close testers. | A first recipe draft you taste only at home. |
| Beta | A test version used by real users before full launch. | A soft opening of a restaurant before the grand opening. |
| Private beta | A beta shared only with invited testers. | Letting a few friends try the food before selling publicly. |
| Public MVP | A small but usable product available to the public. | A small store open to customers with a limited menu. |
| Product North Star | One clear sentence that says who the app helps and what result it creates. | A compass that keeps the project pointed in one direction. |
| Use case | A specific situation where someone uses the app. | A reason someone picks a tool from a toolbox. |
| User story | A short sentence describing what a user wants and why. | A customer order: I want this so I can do that. |
| Acceptance criteria | The checklist that proves a feature works. | The pass/fail checklist before serving a dish. |
| Edge case | An unusual situation that can break the normal flow. | A customer ordering food with many allergies. |
| Scope | The boundary of what you will and will not build. | The menu for today, not every dish in the world. |
| Backlog | A list of future tasks or features. | A grocery list for later shopping. |
| Roadmap | A time-based plan for what to build next. | A travel map with stops along the way. |
| Not-building list | A list of things you intentionally delay or skip for now. | A chef saying: today we only cook breakfast, not a full buffet. |
| Scaffold | A starter structure for an app or project. | Construction scaffolding around a building being made. |
| Stub | A placeholder that marks where real logic will be added later. | A cardboard fake door before the real door is installed. |
| Blueprint | A plan for future building, not built yet. | An architect drawing. |

## Web and Code Basics

| Term | Simple meaning | Real-world analogy |
|---|---|---|
| Frontend | The visible part of the app: screens, buttons, text, colors. | The dining area customers see in a restaurant. |
| Backend | The hidden part of the app: logic, database, login, server work. | The kitchen customers do not see. |
| Full-stack | Both frontend and backend together. | A restaurant with both dining area and kitchen. |
| Database | A place where an app stores data. | A filing cabinet for app information. |
| Table | A structured group of records inside a database. | One spreadsheet tab. |
| Record | One saved item in a table. | One row in a spreadsheet. |
| Field | One piece of information in a record. | One column in a spreadsheet. |
| Database schema | The plan for database tables, fields, and relationships. | A floor plan for the filing cabinet. |
| Migration | A controlled change to database structure or data. | Renovating shelves without losing files. |
| API | A way for apps to talk to each other. | A waiter carrying requests between customer and kitchen. |
| Endpoint | One specific API address or action. | One service window in a government office. |
| Request | The message sent to an API asking for something. | A food order sent to the kitchen. |
| Response | The answer returned by an API. | The dish or reply brought back by the waiter. |
| API route | A backend path in your app that handles a request. | A special counter that handles one kind of order. |
| Backend service | A hidden function or system that performs app work. | A kitchen station that prepares one dish. |
| Server | A computer or service that runs backend work. | The kitchen equipment that prepares orders. |
| Serverless function | Small backend code that runs only when needed. | A pop-up worker called only for a specific task. |
| Static site | A website made mostly of fixed files, without a live backend for every page. | Printed flyers displayed on a wall. |
| Hosting | The place where your app or website lives online. | Renting space for your shop on the internet street. |
| Deployment | Making your app available to users. | Opening the shop doors. |
| CDN | Content Delivery Network: servers around the world that deliver files faster. | Many mini-warehouses closer to customers. |
| Domain | The human-readable address of a website. | Your shop sign and street address. |
| HTTPS | Secure web connection that encrypts traffic between user and website. | A sealed envelope instead of an open postcard. |
| SSL certificate | A security certificate that helps enable HTTPS. | An ID card proving the website is who it says it is. |
| Local-first | An app design where your data can work locally or stay user-controlled first. | Keeping your notebook at home before copying it to the cloud. |
| Provider-agnostic | Designed so you are not trapped with one vendor or AI provider. | Using standard plugs so you can change appliances later. |
| Vendor lock-in | When it becomes hard or expensive to leave a tool. | Renting a kitchen where you cannot take your equipment if you move. |
| Tech stack | The set of tools and technologies used to build an app. | The kitchen equipment used to cook a meal. |
| Framework | A structured tool that gives you a ready pattern for building. | A house frame you build walls around. |
| Library | Reusable code someone else made to help you build faster. | A ready-made sauce you can use in your dish. |
| Package | A downloadable unit of code or tools. | A boxed ingredient pack. |
| Dependency | A package your project relies on. | A needed ingredient in a recipe. |
| Build | The process of turning code into files that can run or deploy. | Cooking raw ingredients into a finished dish. |
| CLI | Command Line Interface: a text-based way to tell your computer what to do. | Talking to your computer by typed commands. |
| Terminal | The app where you type commands. | A control panel for your computer. |
| Node.js | A tool that lets JavaScript run outside the browser, often for app building. | A kitchen where JavaScript can cook backend tasks. |
| npm | A tool for installing JavaScript packages. | A grocery delivery app for code ingredients. |
| Vite | A fast tool for starting and building modern frontend apps. | A quick-start stove for web projects. |
| React | A JavaScript library for building user interfaces from reusable components. | LEGO blocks for app screens. |
| Tailwind CSS | A styling system that uses small utility classes to design pages. | A box of tiny design stickers for spacing, color, and layout. |
| shadcn/ui | A reusable component collection often used with React and Tailwind. | A starter set of polished buttons, cards, and forms. |
| HTML | The structure of a webpage. | The bones of a house. |
| CSS | The visual styling of a webpage. | Paint, curtains, spacing, and decoration. |
| JavaScript | A programming language that makes web pages interactive. | The electricity that makes buttons and actions work. |
| JS | Short name for JavaScript. | A nickname for the app electricity. |
| TypeScript | JavaScript with extra type checking to catch mistakes earlier. | A recipe with labels that warn if you mix wrong ingredients. |
| TS | Short name for TypeScript. | A nickname for JavaScript with guardrails. |
| Markdown | A simple text format for headings, lists, links, and notes. | Plain notes with simple symbols for formatting. |
| JSON | A structured text format for data, common in APIs. | A labeled lunchbox with compartments. |
| CSV | A simple table file where values are separated by commas. | A spreadsheet saved as plain text. |

## Security and Data Safety

| Term | Simple meaning | Real-world analogy |
|---|---|---|
| Auth | Short word for authentication and authorization. | The security desk at a building. |
| Authentication | Checking who the user is, usually through login. | Showing your ID at the entrance. |
| Authorization | Checking what the user is allowed to do. | A staff badge that opens only certain doors. |
| User role | A permission group such as admin, member, or viewer. | Different access cards for manager, staff, and guest. |
| OAuth | A login method that lets users sign in with another trusted provider. | Using your company ID to enter a partner office. |
| Environment variable | A setting stored outside the main code, often for configuration or secrets. | A locked drawer for important settings. |
| .env file | A local file that stores environment variables for your computer. | A private sticky note kept off the public wall. |
| Token | A small piece of text used to represent access, identity, or AI text units depending on context. | A ticket that proves you can enter or a small puzzle piece of text. |
| API key | A secret-like code that lets an app use a service. | A key card for an online service. |
| Secret | Private information that must not be shared publicly. | A password written in a locked notebook. |
| Service role key | A powerful backend key that can bypass normal user restrictions in some systems. | A master key for the building. |
| Anon key | A public client key used by some systems for limited access, usually protected by rules. | A visitor pass that still needs security rules. |
| PII | Personally Identifiable Information: data that can identify a person. | A name tag plus address and phone number. |
| Dummy data | Fake safe data used for demos and testing. | Toy money used for practice. |
| Demo data | Safe example data shown in a public demo. | Sample food on display, not a real customer order. |
| Seed data | Starter data loaded into an app for testing. | Ingredients placed in the kitchen before cooking starts. |
| Data Level 0 | Public demo data safe for screenshots and examples. | Plastic toy coins in a classroom. |
| Data Level 1 | Personal non-sensitive data, still not for careless sharing. | A personal grocery list. |
| Data Level 2 | Private personal data that should stay in trusted or local tools. | A private diary. |
| Data Level 3 | Company or internal data that belongs in approved work systems only. | Office files kept in the company cabinet. |
| Data Level 4 | Secrets or regulated data that should never be pasted into random tools. | The master key and bank PIN. |
| Compliance | Following required rules, laws, standards, or policies. | Following building safety rules before opening a shop. |
| GDPR | European privacy law that protects personal data. | A strict rulebook for handling customer information. |
| Data Privacy Act | A privacy law, such as the Philippines Data Privacy Act, that governs personal data handling. | Local house rules for protecting people information. |
| Privacy policy | A page explaining what data you collect and how you use it. | A notice on the wall explaining how customer info is handled. |
| Terms | Rules users agree to when using an app. | House rules before entering a gym. |
| Row Level Security (RLS) | Database rules that control which rows each user can access. | Each customer can only see their own bill. |
| Security review | A check for exposed secrets, unsafe permissions, and risky code. | Checking locks before opening the store. |
| Rollback | Returning to the last working version after something breaks. | Undoing a bad recipe change and going back to the old recipe. |

## Git and Project Files

| Term | Simple meaning | Real-world analogy |
|---|---|---|
| Git | A tool that tracks changes in code and files. | Save points in a video game. |
| GitHub | An online place to store Git projects and collaborate. | A cloud safe box for code. |
| Repo | Short name for repository: a project folder tracked by Git. | A project binder. |
| Repository | A Git-tracked project folder. | A labeled storage box for one project. |
| Branch | A separate path for changes without touching the main version. | Trying a new recipe on a side plate. |
| Commit | A saved checkpoint in Git. | Saving your game before a boss fight. |
| Pull request | A request to review and merge changes into the main code. | Asking the chef to approve your recipe change. |
| PR | Short name for pull request. | A nickname for the review request. |
| Merge | Combining changes from one branch into another. | Adding approved recipe notes into the main cookbook. |
| Clone | Copying a repository to your computer. | Photocopying a project binder so you can work locally. |
| README | The main instruction file for a project. | The welcome note and user manual in a box. |
| .gitignore | A file that tells Git what not to save. | A do-not-pack list before moving house. |
| Changelog | A record of what changed over time. | A diary of recipe updates. |
| License | The rule that says how others may use your code or content. | A permission slip. |
| CI/CD | Automatic checks and deployment pipelines. | A conveyor belt that tests and delivers products. |
| Source of truth | The main trusted place for current project information. | The official recipe book, not random sticky notes. |
| Source ledger | A table that records claims and the sources supporting them. | A receipt folder for your facts. |

## UX, UI, and Design

| Term | Simple meaning | Real-world analogy |
|---|---|---|
| PRD | Product Requirements Document: a simple plan for what the product must do. | A recipe card for the app. |
| UX | User Experience: how easy and useful the app feels. | How pleasant it is to shop in a store. |
| UI | User Interface: the visible screens, buttons, forms, and layout. | The signs, counters, and shelves customers touch. |
| Wireframe | A rough screen sketch showing layout before final design. | A pencil drawing of a room before buying furniture. |
| Mockup | A more polished visual design of a screen. | A realistic picture of the future room. |
| Design system | Reusable design rules for colors, fonts, spacing, and components. | A brand cookbook for how every screen should look. |
| Component | A reusable piece of UI such as a button, card, or form. | A LEGO piece used in many places. |
| Responsive design | Design that works on phone, tablet, and desktop. | A table that folds or expands depending on room size. |
| Responsive | Able to adjust to different screen sizes. | Clothes with stretch fabric. |
| Accessibility | Making the app usable by more people, including people with disabilities. | Building ramps, clear signs, and wide doors. |
| WCAG | Web Content Accessibility Guidelines: a standard for accessible web design. | A checklist for making the store easier for everyone to enter. |
| Component state | A condition of a UI part, such as loading, disabled, error, or success. | A traffic light showing what is happening. |
| Empty state | What users see when there is no data yet. | An empty basket with instructions on what to add. |
| Loading state | What users see while the app is working. | A cooking timer while food is still being prepared. |
| Error state | What users see when something goes wrong. | A clear sign saying the elevator is out of service. |
| Success state | What users see when an action worked. | A receipt after payment. |
| Glassmorphism | A visual style using translucent, glass-like panels. | Frosted glass cards on a clean dashboard. |
| Visual hierarchy | The order that tells users what to look at first. | Big signs for important aisles, small labels for details. |

## Automation, Microsoft, and BI

| Term | Simple meaning | Real-world analogy |
|---|---|---|
| Automation | A process that runs repeated tasks with less manual work. | A washing machine instead of hand-washing clothes. |
| Workflow | A sequence of steps from start to finish. | A recipe with steps. |
| Trigger | The event that starts an automation. | A doorbell that starts the action. |
| Action | One task performed in a workflow. | One recipe step, like chop onions. |
| Connector | A ready bridge between tools or services. | An adapter plug between appliances. |
| Webhook | A message one system sends to another when something happens. | A doorbell that rings another house. |
| Power Query | A Microsoft tool for importing, cleaning, and reshaping data. | A kitchen prep station that washes and cuts ingredients. |
| Power BI | A Microsoft tool for dashboards, reports, and data visuals. | A dashboard in a car showing speed, fuel, and warnings. |
| DAX | Formula language used in Power BI and Power Pivot for calculations. | Excel formulas for business dashboards. |
| Power Pivot | Excel data modeling feature for relationships and measures. | A mini data warehouse inside Excel. |
| Semantic model | A business-friendly data model with relationships and measures. | A translated map that makes raw data easier to understand. |
| Dashboard | A visual page showing important metrics. | A car dashboard for your business or app. |
| Metric | A number used to measure progress or performance. | A scoreboard. |
| KPI | Key Performance Indicator: an important metric tied to a goal. | The main score that tells if the team is winning. |
| Report | A structured view or summary of data. | A school report card. |
| Refresh | Updating data from its source. | Refilling a water bottle from the tap. |
| Power Automate | Microsoft tool for creating workflows and approvals. | A robot helper for office tasks. |
| Power Apps | Microsoft tool for building business apps with low code. | LEGO blocks for office apps. |
| Dataverse | Microsoft business database platform used with Power Platform. | A structured office filing room. |
| SharePoint List | A Microsoft list for structured business records. | A shared team spreadsheet with stricter columns. |
| Office Script | A script that automates tasks in Excel on the web. | A recorded macro-like office helper. |
| Tenant | A company or organization space in Microsoft 365 or similar cloud systems. | A rented building where your company tools live. |
| Admin | A person who controls settings, permissions, and access. | The building manager with master settings. |
| Rollout | Gradual release of a feature to users or tenants. | Opening a new shop branch by branch. |
| Workspace | A place where related files, chats, apps, or reports live together. | A project room. |

## AI and Prompting

| Term | Simple meaning | Real-world analogy |
|---|---|---|
| LLM | Large Language Model: AI trained to understand and generate text. | A very advanced autocomplete trained on many examples. |
| Prompt | The instruction you give to AI. | Your order at a restaurant. |
| Prompt engineering | Writing clearer AI instructions to get better results. | Learning how to order food so the chef gets it right. |
| Context window | The amount of information AI can hold in one conversation at a time. | The size of the desk where papers can fit. |
| Hallucination | When AI says something that sounds true but is wrong or unsupported. | A confident student guessing an answer. |
| RAG | Retrieval-Augmented Generation: AI answers using retrieved documents as context. | Asking a librarian to fetch the right book before answering. |
| Vector database | A database that stores meaning-based representations for search. | A library organized by meaning, not just alphabet. |
| Vector DB | Short name for vector database. | A nickname for the meaning library. |
| Embedding | A numeric representation of text or data meaning. | A fingerprint of meaning. |
| Agent | An AI system that can plan steps and use tools under rules. | An assistant who can make a to-do list and use approved tools. |
| Custom GPT | A customized ChatGPT with its own instructions, knowledge, and optional actions. | A trained assistant for one job. |
| Copilot agent | A Microsoft Copilot assistant configured for a specific task or workflow. | An office helper trained for one department. |
| GPT Action | A custom GPT connection that lets the GPT call an external API. | A phone line from the assistant to another service. |
| Model | The AI brain used for a task. | Different workers with different skills. |
| Local model | An AI model running on your own computer. | A helper working inside your house instead of calling the cloud. |
| Ollama | A tool for running local AI models on your computer. | A local engine room for AI helpers. |
| OpenRouter | A service that can route requests to different AI models. | A switchboard for many AI providers. |
| Temperature | A model setting that affects creativity versus consistency. | A stove knob for creativity heat. |
| Structured output | AI output forced into a specific shape such as JSON or a table. | A form with boxes the AI must fill in. |
| Eval | A test used to check if AI output is good enough. | A quiz for the AI result. |
| Grounding | Giving AI trusted sources or data to reduce guessing. | Letting the student use the textbook. |
| Rate limit | A limit on how fast or how often you can use a service. | A traffic speed limit for API calls. |
| Quota | The total amount of usage allowed in a period. | A monthly water allowance. |

## Quality, Launch, and Operations

| Term | Simple meaning | Real-world analogy |
|---|---|---|
| QA | Quality Assurance: checking that something works and meets standards. | Taste-testing food before serving. |
| Test | A check to prove something works. | Pressing every button before opening the shop. |
| Debugging | Finding and fixing errors. | Finding the broken wire in an appliance. |
| Bug | A mistake or problem in the app. | A loose screw in a machine. |
| Smoke test | A quick basic test after changes or deployment. | Checking if the lights turn on before inspecting the whole house. |
| Regression | A new change accidentally breaks something that worked before. | Fixing the sink but breaking the shower. |
| Logging | Recording events and errors from an app. | A security guard writing an incident notebook. |
| Observability | Being able to understand what is happening inside a system from logs, metrics, and traces. | A hospital monitor for your app. |
| Analytics | Measuring how users behave in your app. | Counting store visitors and what aisles they visit. |
| Uptime | How often your website or app is online and available. | How often the shop is open when customers arrive. |
| Error tracking | Collecting and reporting app crashes or errors. | A complaint box that catches broken experiences. |
| Monitoring | Watching the app after launch for problems. | Security cameras and alarms for a shop. |
| Activation | When a user reaches the first useful result. | A customer tasting the dish and understanding why it is good. |
| Retention | Users coming back after first use. | Customers returning next week. |
| Churn | Users who stop using or paying. | Customers who cancel their membership. |
| Conversion | A user taking a desired action, such as signup or payment. | A visitor becoming a buyer. |
| Waitlist | A list of people interested before launch. | People lining up before the store opens. |
| Launch | Making a product available to users. | Opening day. |
| Staging | A test environment that looks like production but is not public. | A rehearsal stage before the real show. |
| Production | The real live environment used by real users. | The actual restaurant serving customers. |
| Environment | A place or setup where software runs, such as local, staging, or production. | Different kitchens: home kitchen, test kitchen, real restaurant. |
| Caching | Saving results so the app does not repeat the same work. | Keeping leftovers so you do not cook the same dish again. |

## Business and Monetization

| Term | Simple meaning | Real-world analogy |
|---|---|---|
| Monetization | Turning a product or service into revenue. | Charging for your best dish. |
| Subscription | A recurring payment for ongoing access. | Monthly gym membership. |
| Transaction fee | A fee taken from each sale or payment. | A cashier taking a small cut per sale. |
| Freemium | A model with a free version and paid upgrades. | Free taste sample, paid full meal. |
| Pricing | Choosing how much to charge. | Setting the menu price. |
| Paid pilot | A small paid test with early customers before full launch. | A paid trial catering job before opening a restaurant. |
| Refund policy | Rules for when users can get money back. | A store return policy. |
| Merchant of Record | A company that sells on your behalf and may handle payment and tax responsibilities depending on terms. | A cashier who also handles some paperwork. |
| Revenue test | A small experiment to see if people will pay. | Selling one dish at a weekend market before renting a restaurant. |
| ICP | Ideal Customer Profile: the best-fit target customer. | The exact type of person your dish is made for. |
| Willingness to pay | Evidence that users may pay for the solution. | Someone asking the price before you build the store. |
| Concierge MVP | A version where you manually do some work behind the scenes. | Taking orders manually before buying a full ordering system. |

## Specific Tools

| Term | Simple meaning | Real-world analogy |
|---|---|---|
| Supabase | A backend platform often used for database, authentication, and storage. | A ready-made kitchen plus filing cabinet for your app. |
| Cloudflare Pages | A platform for hosting websites and frontend apps. | A place to put your shop sign on the internet. |
| Netlify | A platform for hosting and deploying websites/apps. | Another online shop space for your site. |
| Vercel | A platform often used for deploying frontend and Next.js apps. | A fast launch pad for web apps. |
| Lemon Squeezy | A payments platform often used for digital products and SaaS. | A checkout counter for digital goods. |
| PayMongo | A payments platform commonly used for Philippine payment methods. | A local cashier option for PH customers. |
| Stripe | A payments platform for online cards and subscriptions where supported. | A global card payment counter. |
| PostHog | A product analytics tool for understanding user behavior. | CCTV plus counters for app usage. |
| Tally | A form tool for surveys, waitlists, and feedback. | A clipboard form online. |
| Bolt.new | An AI app builder that can create prototypes from prompts. | Telling a builder what room you want and getting a draft. |
| Lovable | An AI app builder for prompt-to-app prototyping. | A design assistant that drafts an app from plain English. |
| v0.dev | A UI generation tool often used for React-style interface drafts. | A quick sketch artist for app screens. |
| Cline | An AI coding agent inside VS Code that can help edit and run code with approval. | A coding apprentice sitting beside you. |
| GitHub Copilot | An AI coding helper that suggests code and answers coding questions. | Autocomplete with a senior developer nearby. |
| Figma | A design tool for screens, prototypes, and visual planning. | A digital sketchpad for app screens. |
| Excalidraw | A simple tool for sketch-style diagrams and wireframes. | A digital whiteboard with marker drawings. |
| Notion | A note and database workspace for planning and documentation. | A digital notebook with tables and pages. |

## Beginner Usage Prompts

Use these when a term still feels confusing.

### Prompt 1: Explain one term

```text
Explain this term like I am a beginner and ESL learner: [TERM]
Use:
1. Simple meaning
2. Everyday analogy
3. Small app-building example
4. What mistake beginners make
5. One sentence I can remember
```

### Prompt 2: Compare two confusing terms

```text
Compare these two terms in simple English: [TERM 1] vs [TERM 2]
Output as a table:
| Term | Meaning | Analogy | When I use it | Beginner mistake |
Then give me one mini example using my solopreneur app-building workflow.
```

### Prompt 3: Turn jargon into beginner English

```text
Rewrite this technical text for me as a beginner, ESL Filipino learner.
Define every technical term in parentheses the first time it appears.
Keep sentences short. Use a table if useful.

Text:
[PASTE TEXT]
```

## Source Notes

| Source | How it shaped this glossary |
|---|---|
| AI Builder's Master Workflow Prompt v4.0 | Provided the required E7 glossary term list and beginner-friendly output rules. |
| Unified Beginner Solopreneur App Building Workflow Playbook v3.0 | Provided the starter beginner glossary and data-safety posture. |
| UNGASIS knowledge files | Reinforced simple language, Rigor Dial, safety guardrails, and no fake current claims. |

## QA Checklist

- [x] File starts with the required module title.
- [x] Includes more than 60 glossary terms.
- [x] Includes 234 terms total.
- [x] Merges and expands the Playbook starter glossary.
- [x] Includes all user-requested required terms or direct aliases.
- [x] Uses simple English and real-world analogies.
- [x] Avoids pricing, quota, or current feature claims unless marked as needing verification.
- [x] Includes secret-safety reminder.
- [x] Ends with version/date footer.

## UNGASIS Trace

Mode: Execution / Artifact Build
Rigor: Personal/prototype learning module
Domain: Glossary, app building, AI tools, Microsoft/Power Platform, safety
Dimensions: Knowledge, Templates, Guardrails, Artifacts, Evaluation
Lenses: Beginner teacher, product architect, AI workflow architect, safety reviewer
Intelligences: Learning, technical, product, risk, practicality
Frameworks: Beginner explanation, source-first caution, anti-overbuilding
Engines: Documentation, glossary generation, QA/evaluation
Tools/Files: Uploaded source playbooks and generated Markdown artifact
Guardrails: No secrets, no fake current claims, simple English, data safety
Template: Glossary module

---
Version: v1.0 | Date: 2026-06-01 | Module: E7 Beginner Glossary | Prepared for: Mel John Dimat / UNGASIS OS