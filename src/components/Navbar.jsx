import { useContext, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '@/context/auth';
import {
  Squares2X2Icon,
  UserIcon,
  DocumentCheckIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline';

function filterNavItems(items, userRole) {
  return items.filter((item) => {
    if (!item.allowedRoles.includes(userRole)) {
      return false;
    }
    if (item.subLinks) {
      item.subLinks = item.subLinks.filter((subItem) =>
        subItem.allowedRoles.includes(userRole)
      );
    }
    return true;
  });
}

function extractPath(url) {
  const parts = url.split('/');
  return parts.length > 1 ? `/${parts[1]}` : '';
}

function Navbar() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { currentUser, logout } = useContext(AuthContext);
  const [activeNavLink, setIsActiveNavLink] = useState(extractPath(pathname));

  const navItems = [
    {
      id: 'nav-1',
      name: 'Dashboard',
      path: '/',
      icon: Squares2X2Icon,
      allowedRoles: [2, 3, 4],
    },
    {
      id: 'nav-2',
      name: '員工管理',
      path: '/staff/apply',
      icon: UserIcon,
      allowedRoles: [1, 2, 3, 4],
      subLinks: [
        {
          id: 'nav-2-1',
          name: '請假申請',
          path: '/staff/apply/new',
          allowedRoles: [1, 2, 3, 4],
        },
        {
          id: 'nav-2-2',
          name: '請假紀錄',
          path: '/staff/apply/record',
          allowedRoles: [1, 2, 3, 4],
        },
        {
          id: 'nav-2-3',
          name: '獲假紀錄',
          path: '/staff/leave/record',
          allowedRoles: [1, 2, 3, 4],
        },
        {
          id: 'nav-2-4',
          name: '請假統計',
          path: '/staff/apply/statistic',
          allowedRoles: [1, 2, 3, 4],
        },
        {
          id: 'nav-2-5',
          name: '特休休假統計',
          path: '/staff/leave/statistic',
          allowedRoles: [1, 2, 3, 4],
        },
      ],
    },
    {
      id: 'nav-3',
      name: '簽核管理',
      path: '/approval/list',
      icon: DocumentCheckIcon,
      allowedRoles: [2, 3, 4],
      subLinks: [
        {
          id: 'nav-3-1',
          name: '簽核列表',
          path: '/approval/list',
          allowedRoles: [2, 3, 4],
        },
      ],
    },
    {
      id: 'nav-4',
      name: '假別管理',
      path: currentUser?.role === 3 ? '/leave/type' : '/leave/offer',
      icon: ShieldCheckIcon,
      allowedRoles: currentUser?.role === 3 ? [3, 4] : [2, 4],
      subLinks: [
        {
          id: 'nav-4-1',
          name: '假別管理',
          path: '/leave/type/manage',
          allowedRoles: [3, 4],
        },
        {
          id: 'nav-4-2',
          name: '給假管理',
          path: '/leave/offer/manage',
          allowedRoles: [2, 4],
        },
      ],
    },
    {
      id: 'nav-5',
      name: '系統管理',
      path: '/system/crew',
      icon: Cog6ToothIcon,
      allowedRoles: [3, 4],
      subLinks: [
        {
          id: 'nav-5-1',
          name: '人員列表',
          path: '/system/crew/list',
          allowedRoles: [3, 4],
        },
      ],
    },
  ];

  const navItemsDependsOnCurrentUser = filterNavItems(
    navItems,
    currentUser?.role
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className='hide-scrollbar flex h-full w-fit flex-shrink-0 flex-col items-center justify-between gap-16 overflow-y-scroll bg-slate-100 p-5'>
      <div className='flex w-[240px] flex-col gap-10 px-4'>
        <h1 className='text-center text-2xl font-bold text-blue-900'>
          LLM
          <br /> 專案系統
        </h1>
        <ul className='flex h-fit w-full flex-col gap-3'>
          {navItemsDependsOnCurrentUser.map((item) => (
            <li key={item.id} className='flex w-full flex-col items-center'>
              <NavLink
                to={item.path}
                onClick={() => setIsActiveNavLink(extractPath(item.path))}
                className={`flex h-14 w-full items-center justify-start gap-5 px-4 ${
                  activeNavLink === extractPath(item.path)
                    ? 'font-medium text-indigo-500'
                    : 'cursor-pointer hover:animate-shake hover:bg-violet-500 hover:bg-opacity-5'
                }`}
              >
                {item.icon && <item.icon className='inline-block h-6 w-6' />}
                {item.name}
              </NavLink>
              {item.subLinks && (
                <ul
                  className={`flex w-full flex-col overflow-hidden ${
                    activeNavLink === extractPath(item.path) ? 'h-fit' : 'h-0'
                  }`}
                >
                  {item.subLinks.map((subItem) => (
                    <li key={subItem.id} className='h-14 w-full'>
                      <NavLink
                        to={subItem.path}
                        className={({ isActive }) =>
                          isActive
                            ? 'flex h-full w-full items-center pl-[60px] font-medium text-indigo-500'
                            : 'flex h-full w-full cursor-pointer items-center pl-[60px] hover:animate-shake hover:bg-violet-500 hover:bg-opacity-5'
                        }
                      >
                        {subItem.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className='flex h-14 w-full items-center justify-start gap-5 px-4 hover:animate-shake hover:bg-violet-500 hover:bg-opacity-5'
      >
        <ArrowLeftStartOnRectangleIcon className='inline-block h-6 w-6' />
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
