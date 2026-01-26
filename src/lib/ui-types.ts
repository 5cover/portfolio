import type { ComponentChildren } from "preact";

export type NavItem = {
  page: string;
  label: string;
};

export type LanguageInfo = {
  code: string;
  name: string;
  flagClass: string;
  names: Record<string, string>;
};

export type ThemeLabels = {
  light: string;
  system: string;
  dark: string;
};

export type Copy = string | ComponentChildren;
