import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';

const useCustomQuery = ({ queryKey, queryFn, options = {} }) => {
  const navigate = useNavigate();
  const { logout, toggleAlert } = useContext(AuthContext);

  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const data = await queryFn();
        return data;
      } catch (error) {
        console.error('API Error:', error);

        if (error.message === 'Unauthorized') {
          toggleAlert({
            type: 'error',
            message: '登入已過期，請重新登入！',
            refreshDataFn: async () => {
              await logout();
              navigate('/login');
            },
          });
        } else {
          toggleAlert({
            type: 'error',
            message: error.message || '發生錯誤，請稍後再試！',
          });
        }

        return {};
      }
    },
    ...options,
  });
};

export default useCustomQuery;
