# UNGASIS Content Module: M365 Copilot Feature Router
**File:** `ungasis-m365-feature-router.md`  
**Purpose:** A beginner-friendly router for choosing the right Microsoft 365 Copilot feature for UNGASIS OS work.  
**Audience:** Mel John Dimat — beginner, ESL, visual learner, $0 budget, Microsoft-first builder.  
**Mode:** Deep / Reference Module.
> 🍳 **Simple analogy:** Microsoft 365 is your kitchen. Copilot features are different kitchen tools. Do not use the oven to chop onions. Pick the right tool for the job.
## Safety Rules Before Using Any M365 Copilot Feature
| Rule | Simple meaning | Why it matters |
|---|---|---|
| 🟢 Use safe data first | Start with public/demo/personal non-sensitive data | Prevents leaks |
| 🔴 Company/internal data stays in approved M365 | Do not paste work/client data into random external tools | Protects organization/client trust |
| ⛔ Never paste secrets | No API keys, passwords, tokens, connection strings | Secrets can be stolen or exposed |
| ✋ Human approval for risky actions | Sending, deleting, publishing, changing permissions, payments need review | Prevents costly mistakes |
| ⚙️ Check tenant/license | Some features depend on admin settings, rollout, region, and license | Avoids confusion when buttons are missing |
## Data Level Legend
| Level | Name | Use examples |
|---|---|---|
| 0 | Public demo data | Fake users, sample app data, public examples |
| 1 | Personal non-sensitive | Learning notes, simple personal tasks |
| 2 | Private personal | Personal finances, private journal, private files |
| 3 | Company/internal | Work files, client reports, internal metrics |
| 4 | Secrets/regulated | API keys, passwords, tokens, regulated/PII data |
## Quick Router — Which Feature Should I Use?
| If you need to... | Start with | Then upgrade to |
|---|---|---|
| Ask questions / draft / summarize | Copilot Chat | Pages or Notebook |
| Keep project sources together | Notebooks | SharePoint knowledge base or agent |
| Save a useful AI answer | Pages | Word or SharePoint page |
| Build repeated assistant behavior | Copilot Agent | Copilot Studio |
| Automate repetitive tasks | Power Automate | Power Apps + Power BI + approvals |
| Build internal form/app | SharePoint Lists | Power Apps |
| Analyze spreadsheet/data | Excel + Copilot | Power BI |
| Create public-style presentation | PowerPoint + Copilot | Designer/Create + PDF export |
| Validate an idea with users | Forms | Lists + Power BI dashboard |
---
## 1. Copilot Chat
| Field | Details |
|---|---|
| Feature name | Copilot Chat |
| What it is (analogy) | AI work chat; like a smart teammate you can ask questions |
| When to use | Brainstorm, summarize, draft, compare, learn, search work/web |
| Why it matters | It is the front door to your M365 AI workflow |
| Step-by-step how | 1. Open Microsoft 365 Copilot.<br>2. Choose work or web mode if available.<br>3. Add files/content if needed.<br>4. Ask one clear task.<br>5. Review and save useful output. |
| What NOT to use it for | Do not use for secrets, legal/tax final decisions, or unsourced facts |
| Best lifecycle stage | Idea, Research, Planning, Drafting |
| Difficulty 1-5 | 1 |
| Beginner example | Ask: summarize my project notes into next actions |
| Copy-paste prompt template | ```text
Act as my beginner-friendly project assistant. Using this context: [PASTE SAFE CONTEXT], create [OUTPUT]. Keep it simple. Include risks, next steps, and what to verify.
``` |
| Expected output | Summary, draft, comparison table, plan, or answer |
| Safety check | Check sources, permissions, and sensitive data before sharing |
| Common mistake | Asking vague questions like 'help me' |
| Limitations | May be limited by license, region, tenant settings, and available data |
| Tenant/admin dependency ⚙️ | ⚙️ License/admin/region may affect work data and agents |
| Max data level 0-4 | 3 |
| Connections to other M365 features | Pages, Notebooks, Word, Excel, PowerPoint, Outlook, Teams, OneDrive |
| Upgrade path | Save good answers to Pages/Notebook; turn repeated work into agent/automation |

## 2. Memory / Custom Instructions
| Field | Details |
|---|---|
| Feature name | Memory / Custom Instructions |
| What it is (analogy) | Your preference card; like telling a chef your taste before cooking |
| When to use | Set writing style, learning style, default rules |
| Why it matters | Reduces repeated instructions and improves consistency |
| Step-by-step how | 1. Open Copilot settings if available.<br>2. Add stable preferences only.<br>3. Keep it short.<br>4. Review monthly.<br>5. Remove outdated preferences. |
| What NOT to use it for | Do not store passwords, API keys, confidential project data, or temporary tasks |
| Best lifecycle stage | Global Setup |
| Difficulty 1-5 | 2 |
| Beginner example | Always explain jargon in simple English |
| Copy-paste prompt template | ```text
Remember: I prefer simple English, tables, short steps, and safety warnings. Do not use sensitive data unless I approve.
``` |
| Expected output | More personalized Copilot responses |
| Safety check | Only store durable preferences, not secrets |
| Common mistake | Putting project-specific rules in global memory |
| Limitations | Availability varies; memory may not capture everything |
| Tenant/admin dependency ⚙️ | ⚙️ May depend on tenant/user settings |
| Max data level 0-4 | 1 |
| Connections to other M365 features | Copilot Chat, Notebooks, Pages |
| Upgrade path | Move project-specific rules into Notebooks or agents |

## 3. Notebooks
| Field | Details |
|---|---|
| Feature name | Notebooks |
| What it is (analogy) | Project binder; like a digital folder where Copilot studies selected sources |
| When to use | Long-running projects, source-grounded analysis, reusable context |
| Why it matters | Keeps project context together and reduces hallucination |
| Step-by-step how | 1. Create a notebook.<br>2. Add safe references.<br>3. Ask questions against the notebook.<br>4. Draft outputs from sources.<br>5. Update references as project changes. |
| What NOT to use it for | Do not use as a dump for unrelated files or secrets |
| Best lifecycle stage | Research, Planning, Knowledge Base |
| Difficulty 1-5 | 2 |
| Beginner example | Notebook for UNGASIS sources and prompts |
| Copy-paste prompt template | ```text
Use this notebook as the source of truth. Summarize the key frameworks, missing modules, and next 3 actions. Cite which reference each point came from.
``` |
| Expected output | Grounded summaries, briefs, drafts, plans |
| Safety check | Confirm all referenced files are safe and current |
| Common mistake | Adding too many mixed-topic files |
| Limitations | Requires Copilot/OneDrive/SharePoint support; feature rollout varies |
| Tenant/admin dependency ⚙️ | ⚙️ Copilot license and SharePoint/OneDrive service plans may be needed |
| Max data level 0-4 | 3 |
| Connections to other M365 features | OneDrive, SharePoint, Pages, Teams meetings, Copilot Chat |
| Upgrade path | Turn mature notebook logic into SharePoint knowledge base or Copilot agent |

## 4. Copilot Agents
| Field | Details |
|---|---|
| Feature name | Copilot Agents |
| What it is (analogy) | Specialized AI helper; like hiring a mini-assistant for one job |
| When to use | Repeatable tasks such as lookup, triage, drafting, Q&A |
| Why it matters | Transforms repeated prompts into reusable workflows |
| Step-by-step how | 1. Find or create an agent.<br>2. Define one clear job.<br>3. Add approved knowledge/actions.<br>4. Test with dummy data.<br>5. Add human approval for risky actions. |
| What NOT to use it for | Do not let agents send, delete, publish, or change records without approval |
| Best lifecycle stage | Automation, Operations |
| Difficulty 1-5 | 3 |
| Beginner example | Agent that answers questions from UNGASIS docs |
| Copy-paste prompt template | ```text
You are the UNGASIS SOP helper. Answer only from approved sources. If not found, say unknown. Return steps and safety checks.
``` |
| Expected output | Task-specific answers or assisted actions |
| Safety check | Test with dummy data and require approval gates |
| Common mistake | Making one agent do everything |
| Limitations | Actions/connectors depend on tenant/admin/licensing |
| Tenant/admin dependency ⚙️ | ⚙️ Strong tenant/admin dependency |
| Max data level 0-4 | 3 |
| Connections to other M365 features | Copilot Chat, SharePoint, Teams, Power Automate, Copilot Studio |
| Upgrade path | Promote from simple prompt → agent → Copilot Studio workflow |

## 5. Agent Builder / Copilot Studio
| Field | Details |
|---|---|
| Feature name | Agent Builder / Copilot Studio |
| What it is (analogy) | Agent workshop; like a factory for custom assistants |
| When to use | Build controlled agents with topics, knowledge, actions, and channels |
| Why it matters | Best path for reusable business assistants |
| Step-by-step how | 1. Define purpose and audience.<br>2. Add approved knowledge sources.<br>3. Add actions/connectors carefully.<br>4. Test.<br>5. Publish only after review. |
| What NOT to use it for | Do not connect production actions without security review |
| Best lifecycle stage | Automation, Internal Tool |
| Difficulty 1-5 | 4 |
| Beginner example | Build a FAQ agent for a SharePoint SOP library |
| Copy-paste prompt template | ```text
Design an agent for [TASK]. Use only [SOURCES]. Include allowed actions, blocked actions, fallback response, and human approval gates.
``` |
| Expected output | Agent design spec or working agent |
| Safety check | Use least privilege and test with fake data first |
| Common mistake | Adding too many actions too early |
| Limitations | Licensing, environments, connectors, DLP policies vary |
| Tenant/admin dependency ⚙️ | ⚙️ High admin/licensing dependency |
| Max data level 0-4 | 3 |
| Connections to other M365 features | Power Automate, SharePoint, Teams, Dataverse, Power Apps |
| Upgrade path | Add analytics, approval flows, and managed deployment |

## 6. Researcher Agent
| Field | Details |
|---|---|
| Feature name | Researcher Agent |
| What it is (analogy) | Research assistant; like a librarian who writes a sourced report |
| When to use | Deep research, market scans, source-backed summaries |
| Why it matters | Helps you avoid guessing and fake citations |
| Step-by-step how | 1. Ask a focused research question.<br>2. Require official sources first.<br>3. Ask for confidence levels.<br>4. Review citations.<br>5. Save findings to Notebook/Page. |
| What NOT to use it for | Do not use for final legal/tax/accounting advice |
| Best lifecycle stage | Research, Validation |
| Difficulty 1-5 | 3 |
| Beginner example | Research free hosting options for a public MVP |
| Copy-paste prompt template | ```text
Research [QUESTION]. Use official sources first. Output: findings, source table, confidence, unknowns, and beginner recommendation.
``` |
| Expected output | Research brief with sources and confidence |
| Safety check | Verify important claims manually before decisions |
| Common mistake | Accepting citations without opening them |
| Limitations | Availability and source access vary |
| Tenant/admin dependency ⚙️ | ⚙️ License/rollout dependency |
| Max data level 0-4 | 2 |
| Connections to other M365 features | Copilot Chat, Notebooks, Pages, Word, SharePoint |
| Upgrade path | Convert research briefs into SOPs, decision matrices, or roadmaps |

## 7. Analyst Agent
| Field | Details |
|---|---|
| Feature name | Analyst Agent |
| What it is (analogy) | Data analyst; like a patient Excel/BI coach |
| When to use | Analyze files, find patterns, explain data, create charts |
| Why it matters | Turns messy data into decisions |
| Step-by-step how | 1. Prepare clean safe data.<br>2. Ask one analysis question.<br>3. Request assumptions.<br>4. Review formulas/results.<br>5. Save outputs to Excel/Power BI/Page. |
| What NOT to use it for | Do not use for confidential data outside approved environment |
| Best lifecycle stage | Analysis, Dashboard |
| Difficulty 1-5 | 3 |
| Beginner example | Analyze survey responses for top pain points |
| Copy-paste prompt template | ```text
Analyze this safe dataset: [DESCRIBE/ATTACH]. Find top patterns, anomalies, and recommended next actions. Explain in simple English.
``` |
| Expected output | Insights, charts, explanations, recommendations |
| Safety check | Check data quality and formulas |
| Common mistake | Using dirty data and trusting output blindly |
| Limitations | May require compatible files and license |
| Tenant/admin dependency ⚙️ | ⚙️ License/rollout dependency |
| Max data level 0-4 | 3 |
| Connections to other M365 features | Excel, Power BI, OneDrive, SharePoint, Pages |
| Upgrade path | Move repeated analysis into Power BI dashboard or Power Automate flow |

## 8. Create / Designer
| Field | Details |
|---|---|
| Feature name | Create / Designer |
| What it is (analogy) | Creative studio; like Canva inside Microsoft |
| When to use | Images, graphics, banners, quick visual content |
| Why it matters | Helps make ideas understandable and polished |
| Step-by-step how | 1. Choose Create/Designer.<br>2. Describe audience and format.<br>3. Generate options.<br>4. Edit manually.<br>5. Save/export. |
| What NOT to use it for | Do not generate copyrighted, sensitive, or misleading visuals |
| Best lifecycle stage | Design, Portfolio |
| Difficulty 1-5 | 2 |
| Beginner example | Create a simple UNGASIS roadmap poster |
| Copy-paste prompt template | ```text
Create a [FORMAT] for [AUDIENCE] explaining [TOPIC]. Style: clean, modern, beginner-friendly. Include no private data.
``` |
| Expected output | Image, graphic, poster, visual draft |
| Safety check | Check rights, accuracy, and sensitive content |
| Common mistake | Using AI images as factual diagrams without checking |
| Limitations | Brand kit and export options vary |
| Tenant/admin dependency ⚙️ | ⚙️ License/region dependency |
| Max data level 0-4 | 1 |
| Connections to other M365 features | PowerPoint, Pages, Word, Teams |
| Upgrade path | Use outputs in pitch decks, manuals, or portfolio |

## 9. Pages
| Field | Details |
|---|---|
| Feature name | Pages |
| What it is (analogy) | Living canvas; like a shared whiteboard/document for AI outputs |
| When to use | Save useful Copilot answers, co-edit, turn chat into docs |
| Why it matters | Prevents good chat outputs from disappearing |
| Step-by-step how | 1. In Copilot response, choose Edit in page if available.<br>2. Clean the content.<br>3. Add sections/checklists.<br>4. Share if needed.<br>5. Move final docs to SharePoint/Word. |
| What NOT to use it for | Do not treat as permanent governed knowledge base without review |
| Best lifecycle stage | Drafting, Collaboration |
| Difficulty 1-5 | 2 |
| Beginner example | Save a generated decision matrix to a Page |
| Copy-paste prompt template | ```text
Turn this answer into a clean Page with headings, tables, checklists, and next actions. Mark unknowns.
``` |
| Expected output | Editable page/document |
| Safety check | Review before sharing; remove private data |
| Common mistake | Leaving messy AI draft as final truth |
| Limitations | Feature availability varies |
| Tenant/admin dependency ⚙️ | ⚙️ License/rollout dependency |
| Max data level 0-4 | 2 |
| Connections to other M365 features | Copilot Chat, Loop, Word, SharePoint, Teams |
| Upgrade path | Promote polished Pages to Word docs or SharePoint pages |

## 10. Loop
| Field | Details |
|---|---|
| Feature name | Loop |
| What it is (analogy) | Flexible collaboration blocks; like LEGO notes teams can reuse |
| When to use | Shared plans, checklists, decisions, project rooms |
| Why it matters | Keeps live content synchronized across apps |
| Step-by-step how | 1. Create Loop page/component.<br>2. Add task table/checklist.<br>3. Share with team.<br>4. Update live.<br>5. Archive final decisions. |
| What NOT to use it for | Do not use for highly controlled records without governance |
| Best lifecycle stage | Collaboration, Planning |
| Difficulty 1-5 | 2 |
| Beginner example | UNGASIS sprint checklist shared with agents/team |
| Copy-paste prompt template | ```text
Create a Loop-ready project checklist for [PROJECT] with owner, status, due date, blockers, and next action.
``` |
| Expected output | Collaborative page/component |
| Safety check | Check sharing permissions |
| Common mistake | Using Loop as a dumping ground |
| Limitations | May depend on tenant Loop settings |
| Tenant/admin dependency ⚙️ | ⚙️ Tenant/admin dependency |
| Max data level 0-4 | 3 |
| Connections to other M365 features | Teams, Outlook, Pages, Planner, SharePoint |
| Upgrade path | Move mature processes into Planner, SharePoint Lists, or Power Automate |

## 11. SharePoint
| Field | Details |
|---|---|
| Feature name | SharePoint |
| What it is (analogy) | Team library/site; like a secure company filing cabinet |
| When to use | Knowledge bases, document libraries, intranet pages, controlled sharing |
| Why it matters | Best home for governed team knowledge |
| Step-by-step how | 1. Create/use site.<br>2. Add document library or pages.<br>3. Set permissions.<br>4. Add metadata.<br>5. Use Copilot to summarize/search. |
| What NOT to use it for | Do not use random permissions or public sharing for sensitive data |
| Best lifecycle stage | Knowledge Base, Governance |
| Difficulty 1-5 | 3 |
| Beginner example | UNGASIS internal wiki library |
| Copy-paste prompt template | ```text
Plan a SharePoint knowledge base for [TOPIC]. Include libraries, metadata, permissions, page structure, and maintenance SOP.
``` |
| Expected output | Site/library/page plan or content draft |
| Safety check | Check permissions and data classification |
| Common mistake | Uploading everything with no metadata |
| Limitations | Requires site permissions/admin policies |
| Tenant/admin dependency ⚙️ | ⚙️ Tenant/admin dependency |
| Max data level 0-4 | 3 |
| Connections to other M365 features | OneDrive, Teams, Lists, Power Automate, Copilot agents |
| Upgrade path | Add Lists, approvals, agents, and Power BI reporting |

## 12. OneDrive
| Field | Details |
|---|---|
| Feature name | OneDrive |
| What it is (analogy) | Personal work cloud drive; like your private project locker |
| When to use | Store personal drafts, source files, project artifacts |
| Why it matters | Keeps files accessible to Copilot and M365 apps |
| Step-by-step how | 1. Create project folder.<br>2. Store safe files.<br>3. Use clear naming.<br>4. Share only when needed.<br>5. Move team assets to SharePoint. |
| What NOT to use it for | Do not use as team source of truth for many people |
| Best lifecycle stage | Personal Workspace |
| Difficulty 1-5 | 1 |
| Beginner example | Store UNGASIS module drafts |
| Copy-paste prompt template | ```text
Using files in my OneDrive folder [FOLDER], summarize what each file is for and suggest a clean structure.
``` |
| Expected output | File summary, organization plan |
| Safety check | Review sharing links and sensitivity |
| Common mistake | Leaving files scattered across folders |
| Limitations | Storage/sharing policies vary |
| Tenant/admin dependency ⚙️ | ⚙️ Tenant/admin dependency |
| Max data level 0-4 | 2 |
| Connections to other M365 features | Copilot Chat, Word, Excel, PowerPoint, SharePoint |
| Upgrade path | Move shared or governed content to SharePoint |

## 13. Teams
| Field | Details |
|---|---|
| Feature name | Teams |
| What it is (analogy) | Collaboration room; like your project war room |
| When to use | Chats, channels, meetings, files, project coordination |
| Why it matters | Where teamwork and meeting memory live |
| Step-by-step how | 1. Create/use team/channel.<br>2. Keep topic-specific threads.<br>3. Store channel files.<br>4. Use Copilot for recaps/actions if available.<br>5. Move decisions to project tracker. |
| What NOT to use it for | Do not use chats as final documentation |
| Best lifecycle stage | Collaboration, Meetings |
| Difficulty 1-5 | 2 |
| Beginner example | Discuss UNGASIS roadmap and capture decisions |
| Copy-paste prompt template | ```text
Summarize this project discussion into decisions, action items, blockers, and next steps. Keep it beginner-friendly.
``` |
| Expected output | Recap, action list, draft message |
| Safety check | Do not assume invitees attended; verify decisions |
| Common mistake | Letting key decisions stay buried in chat |
| Limitations | Meeting recap/transcript features vary |
| Tenant/admin dependency ⚙️ | ⚙️ Tenant/license/meeting policy dependency |
| Max data level 0-4 | 3 |
| Connections to other M365 features | SharePoint, Planner, Loop, Outlook, OneDrive |
| Upgrade path | Turn recurring project work into Planner tasks or agents |

## 14. Outlook
| Field | Details |
|---|---|
| Feature name | Outlook |
| What it is (analogy) | Communication hub; like your professional inbox and calendar desk |
| When to use | Email drafts, summaries, follow-ups, scheduling context |
| Why it matters | Turns messages into actions |
| Step-by-step how | 1. Open email/calendar.<br>2. Ask Copilot to summarize/draft.<br>3. Review tone/facts.<br>4. Send manually.<br>5. Track follow-ups in To Do/Planner. |
| What NOT to use it for | Do not auto-send sensitive emails without review |
| Best lifecycle stage | Communication, Operations |
| Difficulty 1-5 | 2 |
| Beginner example | Draft beta tester invitation |
| Copy-paste prompt template | ```text
Draft a clear friendly email to [AUDIENCE] about [TOPIC]. Tone: professional, simple English. Include CTA and short subject lines.
``` |
| Expected output | Email draft, summary, calendar insight |
| Safety check | Review recipients, attachments, and confidential info |
| Common mistake | Sending AI draft without checking facts |
| Limitations | Capabilities vary by license/admin settings |
| Tenant/admin dependency ⚙️ | ⚙️ Tenant/license dependency |
| Max data level 0-4 | 3 |
| Connections to other M365 features | Teams, To Do, Planner, Copilot Chat, Loop |
| Upgrade path | Automate safe routing with rules/Power Automate after review |

## 15. Word + Copilot
| Field | Details |
|---|---|
| Feature name | Word + Copilot |
| What it is (analogy) | Document co-writer; like an editor sitting beside you |
| When to use | Reports, SOPs, proposals, manuals, policies |
| Why it matters | Turns rough notes into clear documents |
| Step-by-step how | 1. Open Word doc.<br>2. Ask Copilot to draft/rewrite/summarize.<br>3. Add sources/context.<br>4. Review changes.<br>5. Finalize formatting. |
| What NOT to use it for | Do not use for unsourced final policy/legal docs |
| Best lifecycle stage | Documentation, SOP |
| Difficulty 1-5 | 2 |
| Beginner example | Create an SOP from notes |
| Copy-paste prompt template | ```text
Turn these notes into a beginner-friendly SOP with purpose, steps, checklist, risks, and version footer: [NOTES].
``` |
| Expected output | Draft document or improved text |
| Safety check | Check facts, sources, and private info |
| Common mistake | Letting Copilot invent missing policy details |
| Limitations | Advanced capabilities depend on license |
| Tenant/admin dependency ⚙️ | ⚙️ License/rollout dependency |
| Max data level 0-4 | 3 |
| Connections to other M365 features | OneDrive, SharePoint, Pages, Outlook, Teams |
| Upgrade path | Publish final SOP to SharePoint or PDF |

## 16. Excel + Copilot
| Field | Details |
|---|---|
| Feature name | Excel + Copilot |
| What it is (analogy) | Spreadsheet analyst; like a calm formula coach |
| When to use | Clean data, formulas, pivots, insights, simple models |
| Why it matters | Makes data work easier for reporting consultants |
| Step-by-step how | 1. Use structured table data.<br>2. Ask one analysis task.<br>3. Request formula explanation.<br>4. Validate numbers.<br>5. Document assumptions. |
| What NOT to use it for | Do not trust analysis without checking source data |
| Best lifecycle stage | Data Analysis, Reporting |
| Difficulty 1-5 | 3 |
| Beginner example | Analyze validation survey responses |
| Copy-paste prompt template | ```text
Analyze this table and give top 5 insights, recommended chart, data quality issues, and simple explanation of formulas used.
``` |
| Expected output | Insights, formulas, charts, summaries |
| Safety check | Validate totals, filters, and assumptions |
| Common mistake | Using unclean data with merged cells |
| Limitations | Some features require Copilot license and supported file format |
| Tenant/admin dependency ⚙️ | ⚙️ License/file format dependency |
| Max data level 0-4 | 3 |
| Connections to other M365 features | Power BI, SharePoint Lists, Power Automate, Analyst |
| Upgrade path | Move stable reporting to Power BI |

## 17. PowerPoint + Copilot
| Field | Details |
|---|---|
| Feature name | PowerPoint + Copilot |
| What it is (analogy) | Deck builder; like a presentation designer and storyteller |
| When to use | Pitch decks, status updates, training slides |
| Why it matters | Turns ideas/docs into visual stories |
| Step-by-step how | 1. Start from outline or source doc.<br>2. Ask Copilot to create slides.<br>3. Refine structure.<br>4. Apply design.<br>5. Check every slide. |
| What NOT to use it for | Do not present without fact-checking |
| Best lifecycle stage | Presentation, Portfolio |
| Difficulty 1-5 | 2 |
| Beginner example | Create UNGASIS overview deck |
| Copy-paste prompt template | ```text
Create a 10-slide beginner-friendly deck from this outline: [OUTLINE]. Include speaker notes and simple visuals.
``` |
| Expected output | Slide draft, speaker notes, design ideas |
| Safety check | Check accuracy, branding, and confidential data |
| Common mistake | Too much text per slide |
| Limitations | Design/agent features vary |
| Tenant/admin dependency ⚙️ | ⚙️ License/rollout dependency |
| Max data level 0-4 | 2 |
| Connections to other M365 features | Word, Excel, Create/Designer, Teams |
| Upgrade path | Use as portfolio/pitch asset; export PDF |

## 18. Power Automate
| Field | Details |
|---|---|
| Feature name | Power Automate |
| What it is (analogy) | Workflow robot; like a dishwasher for repetitive tasks |
| When to use | Move data, reminders, approvals, notifications |
| Why it matters | Saves time and reduces manual copy-paste |
| Step-by-step how | 1. Map trigger/action.<br>2. Use template or Copilot.<br>3. Test with dummy data.<br>4. Add approval if risky.<br>5. Monitor failures. |
| What NOT to use it for | Do not automate delete/send/pay/publish without approval |
| Best lifecycle stage | Automation |
| Difficulty 1-5 | 3 |
| Beginner example | When form submitted, add row to List and notify me |
| Copy-paste prompt template | ```text
Design a safe Power Automate flow for [PROCESS]. Include trigger, actions, data level, approval gate, failure handling, and test plan.
``` |
| Expected output | Flow design or cloud flow |
| Safety check | Use least privilege and test safely |
| Common mistake | Automating a broken manual process |
| Limitations | Premium connectors/licensing/DLP may apply |
| Tenant/admin dependency ⚙️ | ⚙️ High admin/licensing dependency |
| Max data level 0-4 | 3 |
| Connections to other M365 features | Forms, Lists, Outlook, Teams, SharePoint, Power Apps |
| Upgrade path | Move from simple flow to solution-managed automation |

## 19. Power Apps
| Field | Details |
|---|---|
| Feature name | Power Apps |
| What it is (analogy) | App builder; like making a form-based mini app with blocks |
| When to use | Internal tools, data entry apps, approval apps |
| Why it matters | Fastest Microsoft-first app path for work processes |
| Step-by-step how | 1. Pick data source.<br>2. Create canvas/model app.<br>3. Use Copilot if available.<br>4. Test roles.<br>5. Publish to approved users. |
| What NOT to use it for | Do not use for public SaaS without licensing/security review |
| Best lifecycle stage | Internal Tool, Operations |
| Difficulty 1-5 | 4 |
| Beginner example | Simple project tracker app on SharePoint List |
| Copy-paste prompt template | ```text
Plan a Power Apps canvas app for [PROCESS]. Include screens, data source, roles, validation, and what not to build yet.
``` |
| Expected output | App plan or working app |
| Safety check | Check permissions, data source, and DLP |
| Common mistake | Building too many screens first |
| Limitations | Licensing/connectors/environment policies vary |
| Tenant/admin dependency ⚙️ | ⚙️ High admin/licensing dependency |
| Max data level 0-4 | 3 |
| Connections to other M365 features | SharePoint Lists, Dataverse, Power Automate, Teams |
| Upgrade path | Move from SharePoint data to Dataverse when complexity grows |

## 20. Power BI
| Field | Details |
|---|---|
| Feature name | Power BI |
| What it is (analogy) | Business dashboard; like a cockpit for decisions |
| When to use | Reports, KPI dashboards, trend analysis |
| Why it matters | Turns data into repeatable insight |
| Step-by-step how | 1. Prepare data.<br>2. Build model.<br>3. Create visuals.<br>4. Use Copilot if available.<br>5. Publish/share with permissions. |
| What NOT to use it for | Do not publish sensitive dashboards without access review |
| Best lifecycle stage | Dashboard, Reporting |
| Difficulty 1-5 | 4 |
| Beginner example | UNGASIS project metrics dashboard |
| Copy-paste prompt template | ```text
Design a Power BI dashboard for [GOAL]. Include measures, visuals, filters, data quality checks, and audience questions.
``` |
| Expected output | Dashboard design, measures, insights |
| Safety check | Validate data model, security, and refresh |
| Common mistake | Making visuals before defining decisions |
| Limitations | Copilot and sharing depend on capacity/license |
| Tenant/admin dependency ⚙️ | ⚙️ High admin/licensing dependency |
| Max data level 0-4 | 3 |
| Connections to other M365 features | Excel, SharePoint Lists, Power Automate, Teams |
| Upgrade path | Move from Excel dashboard to governed semantic model |

## 21. SharePoint Lists
| Field | Details |
|---|---|
| Feature name | SharePoint Lists |
| What it is (analogy) | Simple database list; like Excel with permissions and workflows |
| When to use | Track tasks, requests, risks, assets, feedback |
| Why it matters | Great free-first data source inside M365 |
| Step-by-step how | 1. Define fields.<br>2. Create List.<br>3. Add views.<br>4. Add rules/flow if needed.<br>5. Use in Power Apps/Power BI. |
| What NOT to use it for | Do not use for complex relational databases |
| Best lifecycle stage | Tracker, Internal Tool |
| Difficulty 1-5 | 2 |
| Beginner example | UNGASIS module tracker |
| Copy-paste prompt template | ```text
Design a SharePoint List for [TRACKER]. Include columns, types, views, validation, and beginner setup steps.
``` |
| Expected output | List schema and setup steps |
| Safety check | Check column types and permissions |
| Common mistake | Using one giant Notes field for everything |
| Limitations | List thresholds and policies may apply |
| Tenant/admin dependency ⚙️ | ⚙️ Tenant/admin dependency |
| Max data level 0-4 | 3 |
| Connections to other M365 features | Power Apps, Power Automate, Power BI, Teams |
| Upgrade path | Upgrade to Dataverse/Supabase when relational complexity grows |

## 22. Office Scripts
| Field | Details |
|---|---|
| Feature name | Office Scripts |
| What it is (analogy) | Excel automation script; like a reusable macro recipe |
| When to use | Repeat Excel cleanup/formatting tasks in web Excel |
| Why it matters | Saves repetitive reporting work |
| Step-by-step how | 1. Record or write script.<br>2. Test on copy.<br>3. Keep script small.<br>4. Document input/output.<br>5. Run manually or via flow. |
| What NOT to use it for | Do not run on production workbook without backup |
| Best lifecycle stage | Reporting Automation |
| Difficulty 1-5 | 4 |
| Beginner example | Format weekly report table |
| Copy-paste prompt template | ```text
Create an Office Script plan for this Excel task: [TASK]. Include input sheet, steps, output, and safety checks. Do not include secrets.
``` |
| Expected output | Script plan or code draft |
| Safety check | Test on backup copy first |
| Common mistake | Running script on wrong workbook |
| Limitations | Requires Excel on web and tenant scripting settings |
| Tenant/admin dependency ⚙️ | ⚙️ Tenant/admin dependency |
| Max data level 0-4 | 3 |
| Connections to other M365 features | Excel, Power Automate, OneDrive, SharePoint |
| Upgrade path | Connect script to Power Automate for scheduled processing |

## 23. Forms
| Field | Details |
|---|---|
| Feature name | Forms |
| What it is (analogy) | Survey/form tool; like a simple questionnaire box |
| When to use | Surveys, feedback, intake, quizzes |
| Why it matters | Fast validation with zero code |
| Step-by-step how | 1. Create form.<br>2. Add short questions.<br>3. Share link.<br>4. Review responses.<br>5. Export/analyze in Excel. |
| What NOT to use it for | Do not collect sensitive data unless approved |
| Best lifecycle stage | Validation, Feedback |
| Difficulty 1-5 | 1 |
| Beginner example | 7-question app idea validation survey |
| Copy-paste prompt template | ```text
Create a 7-question validation survey for [IDEA]. Avoid leading questions. Include rating and open-text questions.
``` |
| Expected output | Form questions and response plan |
| Safety check | Avoid private data and leading questions |
| Common mistake | Asking too many questions |
| Limitations | External sharing may be controlled by admin |
| Tenant/admin dependency ⚙️ | ⚙️ Tenant/admin dependency |
| Max data level 0-4 | 2 |
| Connections to other M365 features | Excel, Lists, Power Automate, Teams |
| Upgrade path | Move responses into Lists/Power BI after validation |

## 24. Planner / To Do
| Field | Details |
|---|---|
| Feature name | Planner / To Do |
| What it is (analogy) | Task board; like sticky notes with owners and due dates |
| When to use | Project tasks, personal follow-ups, sprint plans |
| Why it matters | Keeps AI outputs actionable |
| Step-by-step how | 1. Create plan/list.<br>2. Add tasks.<br>3. Assign owners/dates.<br>4. Review weekly.<br>5. Close completed tasks. |
| What NOT to use it for | Do not use as full documentation system |
| Best lifecycle stage | Execution, Project Management |
| Difficulty 1-5 | 1 |
| Beginner example | UNGASIS M1-M8 task tracker |
| Copy-paste prompt template | ```text
Turn this plan into Planner tasks with buckets, owners, priorities, due dates, and done criteria: [PLAN].
``` |
| Expected output | Task breakdown |
| Safety check | Check ownership and realistic scope |
| Common mistake | Too many tasks with no priority |
| Limitations | Features vary across Planner versions |
| Tenant/admin dependency ⚙️ | ⚙️ Tenant/license dependency |
| Max data level 0-4 | 2 |
| Connections to other M365 features | Teams, Outlook, To Do, Loop |
| Upgrade path | Connect recurring tasks to Power Automate reminders |

## 25. Viva
| Field | Details |
|---|---|
| Feature name | Viva |
| What it is (analogy) | Employee experience hub; like company learning/comms dashboard |
| When to use | Learning, insights, internal communications, employee knowledge |
| Why it matters | Useful if your tenant uses Viva modules |
| Step-by-step how | 1. Check which Viva apps are available.<br>2. Use relevant module.<br>3. Save learning/resources.<br>4. Apply to project.<br>5. Track progress. |
| What NOT to use it for | Do not assume Viva is enabled or complete in every tenant |
| Best lifecycle stage | Learning, Org Knowledge |
| Difficulty 1-5 | 2 |
| Beginner example | Find Microsoft Learn path for Power Platform |
| Copy-paste prompt template | ```text
Find beginner learning resources for [TOPIC] and create a simple learning checklist with practice tasks.
``` |
| Expected output | Learning path, resource list, checklist |
| Safety check | Verify course/source quality and relevance |
| Common mistake | Assuming all Viva modules are available |
| Limitations | Strong license/tenant/module dependency |
| Tenant/admin dependency ⚙️ | ⚙️ High tenant/license dependency |
| Max data level 0-4 | 2 |
| Connections to other M365 features | Teams, SharePoint, Microsoft Learn, Planner |
| Upgrade path | Use learning outputs to update SOP library and skill tracker |

---
## Beginner Operating Pattern
```text
1. Start in Copilot Chat.
2. If the answer is useful, save it to Pages.
3. If the project will continue, move sources into a Notebook.
4. If the task repeats, turn it into an Agent.
5. If it changes records or sends messages, add Power Automate with human approval.
6. If it becomes team knowledge, publish to SharePoint.
```
## Anti-Bloat Reminder
Before using a feature, ask:

- Does this help me build faster?
- Does this reduce risk?
- Does this improve quality?
- Does this help portfolio or monetization later?
- Is this needed at my current stage?

If **no**, mark it as `Deferred`, `Blueprint`, or `Not needed now`.
## Source Notes
This module was generated from the uploaded UNGASIS source methodology files and checked against Microsoft product help/search results available on 2026-05-31. Feature availability can change and may depend on tenant, license, region, rollout, and admin settings.

---
**Version:** v1.0  
**Date:** 2026-05-31  
**Module:** `ungasis-m365-feature-router.md`  
**Status:** Generated standalone UNGASIS content module.
