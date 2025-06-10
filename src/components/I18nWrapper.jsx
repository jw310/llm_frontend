import { useEffect } from 'react';
import { useParams, Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';


const I18nWrapper = () => {
  const { locale } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  return (
    <Outlet />
  )
}

export default I18nWrapper;