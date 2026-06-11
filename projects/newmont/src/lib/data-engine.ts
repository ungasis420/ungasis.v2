import Dexie, { Table } from 'dexie';
import Papa from 'papaparse';
import { Requisition, HoldEvent, Posting } from '@/types/newmont';

// Maps CSV column headers to camelCase fields in the Requisition type
const REQUISITION_MAP: Record<string, keyof Requisition> = {
  'Job Req ID': 'jobReqId',
  'Requisition Status': 'requisitionStatus',
  'Candidate Progress': 'candidateProgress',
  'Job Title': 'jobTitle',
  'SAP Position ID': 'sapPositionId',
  'Business Unit': 'businessUnit',
  'Function': 'functionName',
  'Location': 'location',
  'Location ': 'locationName',
  'Onsite/Remote Position': 'onsiteRemote',
  'Pay Grade': 'payGrade',
  'Talent Acquisition First Name': 'taFirstName',
  'Talent Acquisition Last Name': 'taLastName',
  'Hiring Manager First name': 'hmFirstName',
  'Hiring Manager Last Name': 'hmLastName',
  'Date Created': 'dateCreated',
  'Approved Date': 'approvedDate',
  'Closed Date': 'closedDate',
  'Age': 'age',
  'Reason for Requisition': 'reasonForRequisition',
  'Openings Filled': 'openingsFilled',
  'Time to Fill': 'timeToFill',
  'Career Site Filter Country': 'careerSiteFilterCountry',
  'ELT Member': 'eltMember',
  'Notes': 'notes',
  'Maximum Annual Base Salary': 'maxAnnualBaseSalary',
  'Mid-Point Annual Base Salary': 'midAnnualBaseSalary',
  'Minimum Annual Base Salary': 'minAnnualBaseSalary',
};

// Maps CSV column headers to camelCase fields in the HoldEvent type
const HOLD_EVENT_MAP: Record<string, keyof HoldEvent> = {
  'Job Req ID': 'jobReqId',
  'Requisition Status': 'requisitionStatus',
  'Created Date (Timestamp)': 'createdDate',
  'Closed Date': 'closedDate',
  'Job Title': 'jobTitle',
  'Talent Acquisition First Name': 'taFirstName',
  'Talent Acquisition Last Name': 'taLastName',
};

// Maps CSV column headers to camelCase fields in the Posting type
const POSTING_MAP: Record<string, keyof Posting> = {
  'Job Req ID': 'jobReqId',
  'Job Title': 'jobTitle',
  'Location ': 'location',
  'Board ID': 'boardId',
  'Post End Date': 'postEndDate',
  'Posting Start Date (Timestamp)': 'postingStartDate',
  'Posting Status': 'postingStatus',
  'Talent Acquisition First Name': 'taFirstName',
  'Talent Acquisition Last Name': 'taLastName',
  'Post Expiration Date': 'postExpirationDate',
};

function parseNum(val: any): number {
  if (val === null || val === undefined || val === '') return 0;
  const parsed = parseInt(String(val).replace(/,/g, ''), 10);
  return isNaN(parsed) ? 0 : parsed;
}

function parseNullableNum(val: any): number | null {
  if (val === null || val === undefined || val === '') return null;
  const cleaned = String(val).replace(/,/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
}

export class NewmontDB extends Dexie {
  requisitions!: Table<Requisition>;
  holdEvents!: Table<HoldEvent>;
  postings!: Table<Posting>;

  constructor() {
    super('NewmontCommandCenterDB');
    this.version(1).stores({
      requisitions: 'jobReqId',
      holdEvents: '++id, jobReqId',
      postings: '++id, jobReqId',
    });
  }
}

let dbInstance: NewmontDB | null = null;

export function initDB(): NewmontDB {
  if (!dbInstance) {
    dbInstance = new NewmontDB();
  }
  return dbInstance;
}

export function loadCSVFile(
  file: File,
  tableName: 'requisitions' | 'holdEvents' | 'postings'
): Promise<void> {
  const db = initDB();

  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: 'greedy',
      complete: async (results) => {
        try {
          const data = results.data;

          if (tableName === 'requisitions') {
            const mapped = data.map((row: any) => {
              const item = {} as Requisition;
              for (const [csvKey, apiKey] of Object.entries(REQUISITION_MAP)) {
                const value = row[csvKey];
                if (apiKey === 'age' || apiKey === 'openingsFilled') {
                  item[apiKey] = parseNum(value);
                } else if (
                  apiKey === 'timeToFill' ||
                  apiKey === 'maxAnnualBaseSalary' ||
                  apiKey === 'midAnnualBaseSalary' ||
                  apiKey === 'minAnnualBaseSalary'
                ) {
                  item[apiKey] = parseNullableNum(value);
                } else {
                  item[apiKey] = value !== null && value !== undefined ? String(value).trim() : '';
                }
              }
              return item;
            });
            await db.requisitions.clear();
            await db.requisitions.bulkPut(mapped);
          } else if (tableName === 'holdEvents') {
            const mapped = data.map((row: any) => {
              const item = {} as HoldEvent;
              for (const [csvKey, apiKey] of Object.entries(HOLD_EVENT_MAP)) {
                const value = row[csvKey];
                item[apiKey] = value !== null && value !== undefined ? String(value).trim() : '';
              }
              return item;
            });
            await db.holdEvents.clear();
            await db.holdEvents.bulkPut(mapped);
          } else if (tableName === 'postings') {
            const mapped = data.map((row: any) => {
              const item = {} as Posting;
              for (const [csvKey, apiKey] of Object.entries(POSTING_MAP)) {
                const value = row[csvKey];
                item[apiKey] = value !== null && value !== undefined ? String(value).trim() : '';
              }
              return item;
            });
            await db.postings.clear();
            await db.postings.bulkPut(mapped);
          }

          resolve();
        } catch (err) {
          reject(err);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

export async function getRequisitions(): Promise<Requisition[]> {
  const db = initDB();
  return db.requisitions.toArray();
}

export async function getHoldEvents(): Promise<HoldEvent[]> {
  const db = initDB();
  return db.holdEvents.toArray();
}

export async function getPostings(): Promise<Posting[]> {
  const db = initDB();
  return db.postings.toArray();
}

export async function clearAllData(): Promise<void> {
  const db = initDB();
  await Promise.all([
    db.requisitions.clear(),
    db.holdEvents.clear(),
    db.postings.clear(),
  ]);
}
