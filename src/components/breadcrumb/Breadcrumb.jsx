import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

const Breadcrumb = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const [breadcrumbList, setBreadcrumbList] = useState([]);

  // 模擬路由設定
  const routeConfig = {
    '/': { title: '首頁' },
    '/products': { title: '產品列表' },
    '/products/detail': { title: '產品詳情' },
    '/users': { title: '用戶管理' },
    '/users/profile': { title: '用戶資料' },
    '/settings': { title: '設置' },
    '/settings/general': { title: '一般設置' },
  };

  const isHome = (pathname) => {
    return pathname === '/';
  };

  const getBreadcrumbs = () => {
    const { pathname } = location;
    let pathSegments = pathname.split('/').filter(Boolean);
    let breadcrumbs = [];

    // 如果不是首頁，總是包含首頁連結
    if (!isHome(pathname)) {
      breadcrumbs.push({
        path: `/${i18n.language}/`,
        meta: { title: '首頁' },
      });
    }

    // 建立麵包屑路徑
    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;

      // 從路由設定中得取標題，如果沒有設定則使用路徑段作為標題
      const title =
        routeConfig[currentPath]?.title ||
        segment.charAt(0).toUpperCase() + segment.slice(1);

      breadcrumbs.push({
        path: currentPath,
        meta: { title },
      });
    });

    setBreadcrumbList(breadcrumbs);
  };

  useEffect(() => {
    getBreadcrumbs();
  }, [location]);

  return (
    <nav aria-label='breadcrumb' className='mb-4'>
      <ol className='flex items-center space-x-2'>
        {breadcrumbList.map((item, index) => (
          <li key={index} className='flex items-center'>
            {index > 0 && (
              <span className='mx-2 text-gray-400 select-none'>/</span>
            )}
            {index === breadcrumbList.length - 1 ? (
              // 最後一個項目不需要連結
              <span className='font-medium text-gray-600'>
                {item.meta.title}
              </span>
            ) : (
              <Link
                to={item.path}
                className='text-blue-600 transition-colors duration-200 hover:text-blue-800 hover:underline'
              >
                {item.meta.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
