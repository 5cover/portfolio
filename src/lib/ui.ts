import { getLangData, getLangs } from './content';
import type { LangEntry } from './content';
import type { LanguageInfo, NavItem, ThemeLabels } from './ui-types';

export function buildNavItems(langData: LangEntry['data']): NavItem[] {
  return [
    { page: 'projects', label: langData.namePageProjects },
    { page: 'history', label: langData.namePageHistory },
    { page: 'hobbies', label: langData.namePagePassions },
    { page: 'blog', label: langData.namePagePerspectives },
    { page: 'history/history-but', label: langData.namePageButInformatique },
  ];
}

export function buildThemeLabels(langData: LangEntry['data']): ThemeLabels {
  return {
    light: langData.nameLightTheme,
    system: langData.nameSystemTheme,
    dark: langData.nameDarkTheme,
  };
}

export function buildLanguages(
  langs: string[],
  langMap: Record<string, LangEntry['data']>
): LanguageInfo[] {
  return langs.map((code) => {
    const data = langMap[code];
    return {
      code,
      name: code,
      flagClass: data.flagClass,
      names: data.names,
    };
  });
}

export async function getLanguages(): Promise<LanguageInfo[]> {
  const langs = await getLangs();
  const langMap = Object.fromEntries(
    await Promise.all(langs.map(async (code) => [code, await getLangData(code)]))
  );
  return buildLanguages(langs, langMap);
}
