
export type User = {
  email: string;
  name: string;
};

export type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'tags' | 'boolean';

export type FieldOption = {
  label: string;
  value: string;
};

export type FieldSchema = {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: FieldOption[]; // For 'select'
  rows?: number; // For 'textarea'
  required?: boolean;
  defaultValue?: any;
};

export type Template = {
  id: string;
  name: string;
  displayName?: string; // For UI display (e.g., "Legenda para Instagram")
  displaySubtitle?: string; // For UI display (e.g., "Para descrever imóveis...")
  description: string;
  iconName: string; // Lucide icon name matching
  schema: FieldSchema[];
};

export type GenerationHistoryItem = {
  id: string;
  templateId: string;
  templateName: string;
  inputs: Record<string, any>;
  result: string;
  createdAt: string; // ISO string
};

export type AppSettings = {
  language: 'pt-BR' | 'en-US';
  tone: string;
  length: 'short' | 'medium' | 'long';
  devMode: boolean;
};

export interface GeneratePayload {
  userId: string;
  templateId: string;
  inputs: Record<string, any>;
  preferences: AppSettings;
  title?: string;
}
