import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@/context/authContext';

const useCustomMutation = ({ mutationFn, options = {} }) => {
  const navigate = useNavigate();
  const { logout, toggleAlert } = useContext(AuthContext);
  const {
    onSuccess,
    onError,
    successMessage,
    errorMessage,
    refreshDataFn,
    ...restOptions
  } = options;

  return useMutation({
    mutationFn,
    onSuccess: (...args) => {
      if (successMessage) {
        toggleAlert({
          type: 'success',
          message: successMessage,
          ...(refreshDataFn && {
            refreshDataFn: () => refreshDataFn(),
          }),
        });
      }

      if (onSuccess) {
        onSuccess(...args);
      }
    },
    onError: (error, ...args) => {
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
          message: errorMessage || error.message,
        });
      }

      if (onError) {
        onError(error, ...args);
      }
    },
    ...restOptions,
  });
};

export default useCustomMutation;
