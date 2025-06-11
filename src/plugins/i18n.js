import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// 偵測瀏覽器語言
import LanguageDetector from 'i18next-browser-languagedetector';
// 用來載入語言檔案
import HttpBackend from 'i18next-http-backend';

import tw from '../../public/locales/zh-TW/translation.json';
import us from '../../public/locales/en-US/translation.json';

const resources = {
  'zh-TW': {
    translation: tw,
  },
  'en-US': {
    translation: us,
  },
};

i18n.use(HttpBackend).use(LanguageDetector).use(initReactI18next).init({
  debug: false, // 開發環境時顯示 debug 訊息：import.meta.env.DEV (Vite 環境變數)
  resources, // 載入語言檔案
  lng: 'zh-TW', // 一進入頁面，初始的語言
  fallbackLng: 'zh-TW', // 若找不到對應語系則回傳此語系
  // detection: {
  //   order: ['querystring', 'navigator'], // 定義語言檢測的順序，例如通過查詢參數或瀏覽器語言
  //   caches: [], // 不緩存語言設定，不使用 localStorage 或 cookie
  // },
  returnEmptyString: false, // 如果是空值，就會顯示成字串
});

export default i18n;
