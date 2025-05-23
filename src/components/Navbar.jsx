import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router';

import {
  Squares2X2Icon,
  UserIcon,
  DocumentCheckIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline';

import { AuthContext } from '@/context/auth';
import { cn } from '@/utils/clsx';

// 從權限篩選出可用的導覽項
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

// function extractPath(url) {
//   const parts = url.split('/');
//   return parts.length > 1 ? `/${parts[1]}` : '';
// }

function Navbar() {
  const navigate = useNavigate();
  // const pathname = useLocation().pathname;
  // const [activeNavLink, setIsActiveNavLink] = useState(extractPath(pathname));

  const { currentUser, logout } = useContext(AuthContext);

  const navItems = [
    {
      id: 'nav-1',
      name: 'Calendar',
      path: '/',
      icon: Squares2X2Icon,
      allowedRoles: ['admin', 'user'],
    },
    {
      id: 'nav-2',
      name: 'Create',
      path: '/create',
      icon: UserIcon,
      allowedRoles: ['admin'],
      subLinks: [
        {
          id: 'nav-2-1',
          name: 'Pdf',
          path: '/create/pdf',
          allowedRoles: ['admin', 'user'],
        },
      ],
    },
    {
      id: 'nav-3',
      name: 'Chat',
      path: '/chat',
      icon: DocumentCheckIcon,
      allowedRoles: ['admin', 'user'],
    //   subLinks: [
    //     {
    //       id: 'nav-3-1',
    //       name: '簽核列表',
    //       path: '/approval/list',
    //       allowedRoles: [2, 3, 4],
    //     },
    //   ],
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
    <>
      <nav className={cn('hide-scrollbar flex w-fit flex-shrink-0 flex-col items-center justify-between gap-16 overflow-y-scroll bg-slate-100 p-5')}>
        <div className={cn('flex w-[240px] flex-col gap-10 px-4')}>
          <h1 className={cn('text-center text-2xl font-bold text-blue-900')}>
            LLM
          </h1>
          <ul className={cn('flex h-fit w-full flex-col gap-3')}>
            {navItemsDependsOnCurrentUser.map((item) => (
              <li key={item.id} className={cn('flex w-full flex-col items-center')}>
                <NavLink
                  to={item.path}
                  // onClick={() => setIsActiveNavLink(extractPath(item.path))}
                  className={
                    ({ isActive }) =>
                      isActive ? 'flex h-14 w-full items-center justify-start gap-5 px-4 font-medium text-indigo-500' :
                        'flex h-14 w-full items-center justify-start gap-5 px-4 cursor-pointer hover:animate-shake hover:bg-gray-300 hover:bg-opacity-5'
                  }
                >
                  {item.icon && <item.icon className={cn('inline-block h-6 w-6')} />}
                  {item.name}
                </NavLink>
                {item.subLinks && (
                  <ul
                    // className={cn('flex w-full flex-col overflow-hidden',
                    //   `activeNavLink === extractPath(item.path) ? 'h-fit' : 'h-0'`
                    // )}
                    className={cn('flex w-full flex-col overflow-hidden')}
                  >
                    {item.subLinks.map((subItem) => (
                      <li key={subItem.id} className={cn('h-14 w-full')}>
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) =>
                            isActive
                              ? 'flex h-full w-full items-center pl-[60px] font-medium text-indigo-500'
                              : 'flex h-full w-full cursor-pointer items-center pl-[60px] hover:animate-shake hover:bg-gray-300 hover:bg-opacity-5'
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
          className={cn('flex h-14 w-full items-center justify-start gap-5 px-4',
              'hover:animate-shake hover:bg-violet-500 hover:bg-opacity-5'
          )}
        >
          <ArrowLeftStartOnRectangleIcon className={cn('inline-block h-6 w-6')} />
          Logout
        </button>
      </nav>
    </>
  );
}

export default Navbar;
