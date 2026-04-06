import en from './en.json';
import es from './es.json';

const translations = { en, es } as const;
export type Lang = keyof typeof translations;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'es') return 'es';
  return 'en';
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof en): string {
    return (translations[lang] as any)[key] ?? (translations['en'] as any)[key] ?? key;
  };
}

export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === 'es') return `/es${path}`;
  return path;
}
