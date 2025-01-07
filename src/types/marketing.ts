// src/types/marketing.ts
export interface Website {
  id: string;
  userId: string; 
  url: string;
  name: string;
  lastAnalysis: string;
  status: 'active' | 'pending' | 'needs_update';
  createdAt: Date;
  updatedAt: Date;
  description: string;
  metaTags: MetaTag[];
  analytics?: {
    visitors: number;
    bounceRate: number;
    avgTimeOnSite: string;
  }
}


export interface MetaTag {
  name: string;
  content: string;
}
  
  export interface Campaign {
    id: string;
    userId: string; // ID użytkownika z Firebase Auth
    websiteId: string; // Referencja do strony
    url: string;
    name: string;
    status: 'active' | 'draft' | 'completed';
    platforms: string[];
    budget: number;
    startDate: string;
    createdAt: Date;
    updatedAt: Date;
    performance?: {
      clicks: number;
      impressions: number;
      conversions: number;
    }
  }