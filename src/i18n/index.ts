import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

type Language = 'en' | 'nl' | 'de';
export type LanguageStrings = Partial<Record<Language, string>>;

export const languages: Language[] = ['en', 'nl'];

import files from './locales/en/files.json'
import footer from './locales/en/footer.json'
import generic from './locales/en/generic.json'
import languagebar from './locales/en/languagebar.json'
import metadata from './locales/en/metadata.json'
import submit from './locales/en/submit.json'
import filesNL from './locales/nl/files.json'
import footerNL from './locales/nl/footer.json'
import genericNL from './locales/en/generic.json'
import languagebarNL from './locales/nl/languagebar.json'
import metadataNL from './locales/nl/metadata.json'
import submitNL from './locales/nl/submit.json'

i18n
  .use(resourcesToBackend({
    en: {
      files,
      footer,
      generic,
      languagebar,
      metadata,
      submit,
    },
    nl: {
      files: filesNL,
      footer: footerNL,
      generic: genericNL,
      languagebar: languagebarNL,
      metadata: metadataNL,
      submit: submitNL,
    },
  }))
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    supportedLngs: languages,
    detection: {
      order: ['cookie', 'localStorage'],
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;

export function lookupLanguageString(obj: LanguageStrings | string | undefined): string | undefined {
  return obj === undefined ?
  '' :
  typeof obj === 'string' ? 
  obj : 
  obj[i18n.language as Language];
}

