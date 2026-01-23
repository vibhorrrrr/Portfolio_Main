
export interface SystemProject {
  id: string;
  title: string;
  philosophy: string;
  description: string;
  capabilities: string[];
  techStack: string[];
  repoUrl?: string;
  paperUrl?: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  venue: string;
  year: string;
  abstract: string;
  url?: string;
}

export enum InteractionState {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  COMPLETE = 'COMPLETE',
}
