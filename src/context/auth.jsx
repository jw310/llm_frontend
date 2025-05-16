import { createContext, useState } from 'react';
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
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('token');
    return savedToken ? JSON.parse(savedToken) : null;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const decodedToken = token ? jwtDecode(token) : null;
    return decodedToken
      ? { id: decodedToken.id, role: decodedToken.role }
      : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => token != null);

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

  const login = (tokenData) => {
    setToken(tokenData);
    const decodedToken = jwtDecode(tokenData);
    setCurrentUser({ id: decodedToken.sub, role: decodedToken.role });
    setIsLoggedIn(() => !isLoggedIn);
    localStorage.setItem('token', JSON.stringify(tokenData));
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    setIsLoggedIn(() => !isLoggedIn);
    localStorage.removeItem('token');
  };

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
