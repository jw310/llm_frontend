import { createContext, useState, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useQuery } from '@tanstack/react-query';
import { getUserInfoByIdApi } from '@/api/api';

const defaultAuthContext = {
  isLoggedIn: false,
  currentUser: null,
  userInfo: null,
  isUserInfoLoading: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext(defaultAuthContext);

export function AuthProvider({ children }) {
  const tokenRef = useRef('');
  const [currentUser, setCurrentUser] = useState(null);
  let isLoggedInRef = useRef(false);

  const login = (token) => {
    tokenRef.current = token;
    localStorage.setItem('token', JSON.stringify(tokenRef.current));
    const decodedToken = jwtDecode(tokenRef.current);
    setCurrentUser({ name: decodedToken.name, id: decodedToken.sub, role: decodedToken.role });
    isLoggedInRef.current = !isLoggedInRef.current;
  };

  const logout = () => {
    tokenRef.current = ''
    setCurrentUser(null);
    isLoggedInRef.current = false;
    localStorage.removeItem('token');
  };

  const {
    data: userInfo,
    isFetching: isUserInfoFetching,
    isLoading: isUserInfoLoading,
  } = useQuery({
    queryKey: ['userId', currentUser?.id],
    queryFn: () => getUserInfoByIdApi(currentUser.id),
    enabled: Boolean(currentUser),
    refetchOnWindowFocus: false,
  });

  const isLoggedIn = isLoggedInRef.current;
  const token = tokenRef.current;

  let savedToken = null;

  savedToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;

  if (!currentUser && savedToken !== null) {
    const decodedToken = jwtDecode(savedToken);
    setCurrentUser({ name: decodedToken.name, id: decodedToken.sub, role: decodedToken.role });
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        userInfo,
        isUserInfoLoading,
        isUserInfoFetching,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
