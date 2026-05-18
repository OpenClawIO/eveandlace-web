export type MetricStatus = 'normal' | 'high' | 'low' | 'critical';
export type ActionPriority = 'high' | 'medium' | 'low';
export type DueWindow = 'immediately' | 'within_1_week' | 'within_1_month' | 'within_3_months';

export interface UserProfile {
  age: number;
  sex: 'male' | 'female' | 'other';
  bmi?: number;
  medicalHistory?: string[];
  familyHistory?: string[];
}

export interface EvidenceRef {
  type: 'guideline' | 'lab_range' | 'trend_rule' | 'personalization_rule';
  sourceTitle: string;
  version?: string;
  locator?: string;
}

export interface ActionItem {
  priority: ActionPriority;
  title: string;
  description: string;
  dueWindow: DueWindow;
}

export interface MetricCard {
  code: string;
  name: string;
  category: string;
  value: number;
  unit: string;
  referenceRange: string;
  clinicalThreshold: string;
  status: MetricStatus;
  plainExplanation: string;
  personalizedExplanation: string;
  technicalExplanation: string;
  impactLevel: 'low' | 'medium' | 'high';
  trendSignal: string;
  actions: ActionItem[];
  evidence: EvidenceRef[];
}

export interface HealthOverview {
  score: number;
  headline: string;
  summary: string;
  systemScores: Array<{
    name: string;
    score: number;
    status: 'good' | 'watch' | 'risk';
  }>;
  priorityActions: ActionItem[];
}

export interface InterpretedReport {
  reportId: string;
  reportName: string;
  generatedAt: string;
  overview: HealthOverview;
  abnormalMetrics: MetricCard[];
}
