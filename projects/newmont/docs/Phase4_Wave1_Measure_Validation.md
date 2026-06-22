# Newmont Phase 4 Wave 1 — Measure Validation
Date: 2026-06-21
File saved: Newmont - TA Dashboard - 2026-06-21 v2.pbix

## Measures Created (6 in _Measures table)
| Measure | Value | DAX |
|---|---|---|
| CR Total Requisitions | 352 | CALCULATE([Total_Requisitions], R1_Clean[Country]="CR (Costa Rica)") |
| CR Fill Rate | 96.65% | CALCULATE([Fill Rate], R1_Clean[Country]="CR (Costa Rica)") |
| CR Avg TTF | 46.15 days | CALCULATE([Avg TTF], R1_Clean[Country]="CR (Costa Rica)") |
| CR Open Requisitions | 24 | CALCULATE([Total_Open], R1_Clean[Country]="CR (Costa Rica)") |
| CR Reqs 60+ Days Old | 0 | CALCULATE([Aged 60 Plus], R1_Clean[Country]="CR (Costa Rica)") |
| CR Offer Acceptance Rate | 82.17% | CALCULATE([Offer Acceptance Rate], R1_Clean[Country]="CR (Costa Rica)") |

## Validation Method
- Build via Power BI Modeling MCP
- Cross-checked with M365 Copilot
- Risk decomposition confirmed via independent DAX
- Visual confirmed on canvas (Card shows "--" = 0 = blank)

## Risk Decomposition (both legitimate, no measure bugs)
- CR Fill Rate 96.65%: 317 filled / 328 closed (only 11 cancelled)
- CR Offer Accept 82.17%: 295 accepted / 359 offers
- CR Reqs 60+ Old 0: only 24 CR open reqs, none aged 60+

## Canonical Fields Locked (Wave 1)
- Country filter: R1_Clean[Country] = "CR (Costa Rica)"  (NOT RD1_Details)
- HM dim: RD1_Details[Hiring Manager First/Last Name] (99% populated, visible)
- BU dim: RD1_Details[Business Unit] (92% populated)
- Date anchor: R1_Clean[Date Created]

## Lessons Learned
- M365 Copilot can hallucinate single cells in text-table summaries (returned 196 for CR Reqs 60+ Days Old when actual = 0)
- Always cross-check Copilot numbers with MCP DAX queries or live card visual before sharing with stakeholders
- R1_Clean string "CR (Costa Rica)" vs RD1_Details "Costa Rica" requires canonical decision per measure

## Blocked Items (Wave 2 prerequisites)
- HM-to-Interview Ratio: needs interview date field
- App-to-Interview SLA: needs application date + interview date
- Source of Hire Direct %: needs source/channel field
- Female Candidate Funnel %: needs gender field + privacy review

## Next Step
Build Page 6 "Costa Rica Deep-Dive" visuals (manual, Power BI Desktop)
