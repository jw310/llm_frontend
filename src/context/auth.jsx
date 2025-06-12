import { createContext, useState, useRef } from 'react';
import { Navigate } from 'react-router';
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
  let isLoggedInRef = useRef(false);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (token) => {
    tokenRef.current = token;
    localStorage.setItem('token', JSON.stringify(tokenRef.current));
    const decodedToken = jwtDecode(tokenRef.current);
    setCurrentUser({
      name: decodedToken.name,
      id: decodedToken.sub,
      role: decodedToken.role,
    });
    isLoggedInRef.current = !isLoggedInRef.current;
  };

  const logout = () => {
    tokenRef.current = '';
    setCurrentUser(null);
    isLoggedInRef.current = false;
    localStorage.removeItem('token');
  };

  const {
    data: userInfo,
    isFetching: isUserInfoFetching,
    isLoading: isUserInfoLoading,
  } = useQuery({
    // 監聽 currentUser.id 變化，重新取得資料
    queryKey: ['userId', currentUser?.id],
    queryFn: async () => {
      try {
        const data = await getUserInfoByIdApi(currentUser.id);
        return data;
      } catch (error) {
        console.error('API Error:', error);
        logout();
        <Navigate to='/login' replace />;
      }
    },
    enabled: Boolean(currentUser),
    refetchOnWindowFocus: false,
    throwOnError: true,
  });

  // Keep logged in after handling page refresh
  let savedToken = null;
  savedToken = localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : null;

  if (!currentUser && savedToken !== null) {
    tokenRef.current = savedToken;
    const decodedToken = jwtDecode(savedToken);
    setCurrentUser({
      name: decodedToken.name,
      id: decodedToken.sub,
      role: decodedToken.role,
    });
    isLoggedInRef.current = true;
  }

  const isLoggedIn = isLoggedInRef.current;
  const token = tokenRef.current;

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
