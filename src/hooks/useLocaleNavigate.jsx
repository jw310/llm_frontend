import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

export const useLocaleNavigate = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  return (to, options) => {
    const resolvedPath = `/${i18n.language}${to.startsWith('/') ? to : '/' + to}`;
    navigate(resolvedPath, options);
  };
};
