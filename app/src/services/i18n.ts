import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from '../assets/locales/en';
import de from '../assets/locales/de';

type LanguageInfo = {
   id: string;
   name: string;
};

const resources = {
   en,
   de,
};

export const supportedLanguages: LanguageInfo[] = [
   { id: 'en', name: 'English' },
   { id: 'de', name: 'Deutsch' },
];

i18next
   .use(initReactI18next)
   .use(LanguageDetector)
   .init({
      resources,
      fallbackLng: 'en',
      supportedLngs: supportedLanguages.map((x) => x.id),
      ns: ['main', 'slides'],
      defaultNS: 'main',
      nonExplicitSupportedLngs: true,
      interpolation: {
         escapeValue: false,
      },
   });

export default i18next;
