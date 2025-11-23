export interface LineAnalysis {
  originalText: string;
  suggestion: string;
  reason: string;
  severity: 'High' | 'Medium' | 'Low';
}

export interface AtsAnalysis {
  score: number;
  summary: string;
  keywordsFound: string[];
  missingKeywords: string[];
  improvements: Array<{
    title: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
  }>;
  jobRoleMatch: string;
  lineByLineAnalysis: LineAnalysis[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}