import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import eng from './eng';

i18n
  .use(initReactI18next)
  .init({
    resources: { eng },
    lng: 'eng',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
