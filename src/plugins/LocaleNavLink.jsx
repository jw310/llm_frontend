import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

const LocaleNavLink = ({ children, to, ...others }) => {
  const { i18n } = useTranslation();
  const resolvedPath = `/${i18n.language}${to.startsWith('/') ? to : '/' + to}`

  return (
    <NavLink
      to={resolvedPath}
      {...others}
    >
      {children}
    </NavLink>
  )
}

export default LocaleNavLink;