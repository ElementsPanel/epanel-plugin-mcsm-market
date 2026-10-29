export interface FilterOption {
  label: string;
  value: string;
}

export interface QuickStartPackages {
  language: string;
  description: string;
  title: string;
  category: string;
  runtime: string;
  size: string;
  hardware: string;
  remark: string;
  targetLink?: string;
  author: string;
  dockerOptional?: { image: string; updateCommandImage?: string };
  setupInfo: Record<string, any>;
  gameType: string;
  image: string;
  platform: string;
  tags?: string[];
  isSummary?: boolean;
  key?: string;
}

export interface QuickStartTemplate {
  languages: FilterOption[];
  packages: QuickStartPackages[];
}

export interface ComputedNodeInfo {
  uuid: string;
  dockerPlatforms?: string[];
  system?: { type?: string };
}

export const SEARCH_ALL_KEY = "ALL";
