import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// 偵測瀏覽器語言
import LanguageDetector from 'i18next-browser-languagedetector';
// 用來載入語言檔案
import Backend from 'i18next-http-backend';

import tw from '../../public/locales/zh-TW/translation.json';

const resources = {
  'zh-TW': {
    translation: tw,
  },
};

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  debug: false,
  resources,
  lng: 'zh-TW', // 一進入頁面，初始的語言
  fallbackLng: 'zh-TW', // 如果找不到區域設定的話，就用這個
  returnEmptyString: false, // 如果是空值，就會顯示成字串
});

export default i18n;
