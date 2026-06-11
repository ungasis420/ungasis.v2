# Wave 1 Prompts — Foundation (S1)

> Executed in parallel via `agy -p "<prompt>" --model gemini-3.5-flash --add-dir D:\.projects\ungasis\projects\newmont --print-timeout 5m`

## Agent 1: Types

Create src/types/newmont.ts with TypeScript interfaces. Requisition: jobReqId string, requisitionStatus string, candidateProgress string, jobTitle string, sapPositionId string, businessUnit string, functionName string, location string, locationName string, onsiteRemote string, payGrade string, taFirstName string, taLastName string, hmFirstName string, hmLastName string, dateCreated string, approvedDate string, closedDate string, age number, reasonForRequisition string, openingsFilled number, timeToFill number|null, careerSiteFilterCountry string, eltMember string, notes string, maxAnnualBaseSalary number|null, midAnnualBaseSalary number|null, minAnnualBaseSalary number|null. HoldEvent: jobReqId string, requisitionStatus string, createdDate string, closedDate string, jobTitle string, taFirstName string, taLastName string. Posting: jobReqId string, jobTitle string, location string, boardId string, postEndDate string, postingStartDate string, postingStatus string, taFirstName string, taLastName string, postExpirationDate string. FieldMapping: kfFieldName string, backendRef string, newmontFieldName string, manipulationNeeded string, kfNotes string, newmontReportable 'ok'|'no'|'blank', newmontComments string, kfImpactToReporting string. SLAMetric: name string, canCalculate boolean, formula string, currentValue number|null, missingFields string[], status 'green'|'red'|'amber'. KPICard: label string, value string, trend 'up'|'down'|'neutral', color string. Export all. Max 200 lines.

## Agent 2: Data Engine

Create src/lib/data-engine.ts. Import Dexie and Papa from papaparse and types from @/types/newmont. Class NewmontDB extends Dexie with tables: requisitions (Requisition[]), holdEvents (HoldEvent[]), postings (Posting[]). Constructor defines stores with jobReqId as key. Export functions: initDB() returns NewmontDB instance. loadCSVFile(file: File, tableName: 'requisitions'|'holdEvents'|'postings') parses CSV with Papa.parse, maps headers to camelCase, stores in Dexie. getRequisitions() getHoldEvents() getPostings() query all rows. clearAllData() clears all tables. Handle column name mapping from CSV headers (e.g. 'Job Req ID' -> jobReqId, 'Requisition Status' -> requisitionStatus). Max 200 lines.

## Agent 3: Zustand Store

Create src/stores/dashboard.ts. Zustand store using create(). State: requisitions Requisition[], holdEvents HoldEvent[], postings Posting[], isLoaded boolean, activeModule string. Computed selectors (exported functions): selectTotalReqs, selectFillRate (count where requisitionStatus is Filled or Closed divided by total), selectCancelRate (Cancelled/total), selectAvgTTF (mean of timeToFill where not null), selectOpenReqs (count Open), selectOnHold (count 'On Hold'), selectTTFByCountry (group by careerSiteFilterCountry, avg TTF, return array sorted desc), selectStatusDistribution (count per requisitionStatus). Actions: setRequisitions, setHoldEvents, setPostings, setActiveModule, reset. Import types from @/types/newmont. Max 200 lines.

---
*Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel John Dimat*
