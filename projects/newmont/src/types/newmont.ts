export interface Requisition {
  jobReqId: string;
  requisitionStatus: string;
  candidateProgress: string;
  jobTitle: string;
  sapPositionId: string;
  businessUnit: string;
  functionName: string;
  location: string;
  locationName: string;
  onsiteRemote: string;
  payGrade: string;
  taFirstName: string;
  taLastName: string;
  hmFirstName: string;
  hmLastName: string;
  dateCreated: string;
  approvedDate: string;
  closedDate: string;
  age: number;
  reasonForRequisition: string;
  openingsFilled: number;
  timeToFill: number | null;
  careerSiteFilterCountry: string;
  eltMember: string;
  notes: string;
  maxAnnualBaseSalary: number | null;
  midAnnualBaseSalary: number | null;
  minAnnualBaseSalary: number | null;
}

export interface HoldEvent {
  jobReqId: string;
  requisitionStatus: string;
  createdDate: string;
  closedDate: string;
  jobTitle: string;
  taFirstName: string;
  taLastName: string;
}

export interface Posting {
  jobReqId: string;
  jobTitle: string;
  location: string;
  boardId: string;
  postEndDate: string;
  postingStartDate: string;
  postingStatus: string;
  taFirstName: string;
  taLastName: string;
  postExpirationDate: string;
}

export interface FieldMapping {
  kfFieldName: string;
  backendRef: string;
  newmontFieldName: string;
  manipulationNeeded: string;
  kfNotes: string;
  newmontReportable: 'ok' | 'no' | 'blank';
  newmontComments: string;
  kfImpactToReporting: string;
}

export interface SLAMetric {
  name: string;
  canCalculate: boolean;
  formula: string;
  currentValue: number | null;
  missingFields: string[];
  status: 'green' | 'red' | 'amber';
}

export interface KPICard {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  color: string;
}
