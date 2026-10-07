export interface BirthdayInfo {
  id: string;
  sisterName: string;
  birthdayDate: string;
  heroTitle: string;
  heroSubtitle: string;
  mainMessage: string;
  finalMessage: string;
  createdAt: string;
  updatedAt: string;
}

export interface Memory {
  id: string;
  title: string;
  caption: string;
  description?: string;
  imageUrl: string;
  memoryDate?: string;
  displayOrder: number;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  imageUrl?: string;
  displayOrder: number;
}

export interface Reason {
  id: string;
  title: string;
  description: string;
  icon: string;
  displayOrder: number;
}

export interface Wish {
  id: string;
  name: string;
  relationship: string;
  message: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface MusicConfig {
  id: string;
  title: string;
  url?: string;
  enabled: boolean;
}

export interface User {
  id: string;
  email: string;
  role: string;
}
