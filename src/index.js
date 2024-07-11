import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './Components/locales/en/translation.json';
import translationAR from './Components/locales/ar/translation.json';
import translationSP from './Components/locales/sp/translation.json';
import translationFR from './Components/locales/fr/translation.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';


i18n
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: translationEN
      },
      ar: {
        translation: translationAR
      },
      fr: {
        translation: translationFR
      },
      sp: {
        translation: translationSP
      }
    },
    fallbackLng: 'en', // fallback language if translation for current language is not available
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>

      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>

  </React.StrictMode>
);



