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
  const currentUserRef = useRef({});
  let isLoggedInRef = useRef(false);

  const decodedTokenHandler = () => {
    const decodedToken = tokenRef.current ? jwtDecode(tokenRef.current) : null;
    return decodedToken ? { id: decodedToken.sub, role: decodedToken.role } : null;
  };

  const login = (token) => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      tokenRef.current = JSON.parse(savedToken);
    }
    tokenRef.current = token;
    localStorage.setItem('token', JSON.stringify(tokenRef.current));
    const decodedToken = jwtDecode(tokenRef.current);
    currentUserRef.current = decodedTokenHandler(decodedToken);
    isLoggedInRef.current = !isLoggedInRef.current;
  };

  const logout = () => {
    tokenRef.current = ''
    currentUserRef.current = null;
    isLoggedInRef.current = false;
    localStorage.removeItem('token');
  };

  const {
    data: userInfo,
    isFetching: isUserInfoFetching,
    isLoading: isUserInfoLoading,
  } = useQuery({
    queryKey: ['userId', currentUserRef.current?.id],
    queryFn: () => getUserInfoByIdApi(currentUserRef.current.id),
    enabled: Boolean(currentUserRef.current),
    refetchOnWindowFocus: true,
  });

  const isLoggedIn = isLoggedInRef.current;
  const currentUser = currentUserRef.current;
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
