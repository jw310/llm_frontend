import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';

import Alert from '@/components/modal/Alert.jsx';
import { Spinner } from '@/components/loader/Spinner.jsx';

import { cn } from '@/utils/clsx.js';
import { requestLoginApi } from '@/api/api';
import { AuthContext } from '@/context/auth.jsx';
// import useCustomMutation from '@/hooks/useCustomMutation.jsx';

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState({
    type: 'success',
    message: '',
    isShow: false,
  });


  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const { mutate, isPending } = useMutation({
    mutationFn: requestLoginApi,
    onSuccess: (token) => {
      // login(token);
      // setTimeout(() => {
      //   const decodedToken = jwtDecode(token);
      //   if (decodedToken.role === 1) {
      //     return navigate('/staff/apply/record');
      //   }
      //   navigate('/');
      // }, 1000);
    },
    onError: (error) => {
      // toast.error(error.message, {
      //   position: 'top-center',
      //   autoClose: 1000,
      // });
    },
  });

  // const { mutate, isPending } = useCustomMutation({
  //   mutationFn: resquestLoginApi,
  //   options: {
  //     successMessage: t('loginPage.successAlert'),
  //     refreshDataFn: () => navigate('/product'),
  //     onSuccess: (token) => {
  //       login(token);
  //     },
  //   },
  // });

  const onSubmit = async (data) => {
    mutate({ username: data.username, password: data.password });
  };

  // const handleGoogleLogin = (response) => {
  //   if (!response.credential) {
  //     toast.error(t('loginPage.failedAlert'), {
  //       position: 'top-center',
  //       autoClose: 1000,
  //     });
  //     return;
  //   }

  //   localStorage.setItem('token', response.credential);
  //   toast.success(t('loginPage.successAlert'), {
  //     position: 'top-center',
  //     autoClose: 1000,
  //   });
  //   setTimeout(() => {
  //     navigate('/product');
  //   }, 1500);
  // };

  // 設定google的多語系
  // const setGoogleLocale = (prefix) => {
  //   switch (prefix) {
  //     case 'en-US': {
  //       return 'en_US';
  //     }
  //     case 'zh-CN': {
  //       return 'zh_CN';
  //     }
  //     case 'zh-TW': {
  //       return 'zh_TW';
  //     }
  //   }
  // };

  // useEffect(() => {
  //   window.handleGoogleLogin = handleGoogleLogin;
  //   const loadGoogleSignInScript = () => {
  //     const script = document.createElement('script');
  //     script.src = 'https://accounts.google.com/gsi/client';
  //     document.body.appendChild(script);
  //   };

  //   loadGoogleSignInScript();
  // }, []);

  return (
    <div className={cn('flex h-screen items-center justify-center bg-gray-500')}>
      <div className={cn('flex flex-col items-center justify-center gap-8')}>
        <h1 className={cn('whitespace-pre-wrap text-center text-2xl font-bold leading-[34.5px] text-white')}>
          {t('loginPage.title')}
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn('flex h-fit w-[594px] flex-col items-center gap-6')}
        >
          <div className={cn('flex h-fit w-full flex-col gap-2')}>
            <div className={cn('flex flex-col items-start gap-1')}>
              <label className={cn('mb-1 font-medium text-white')}>
                *{t('loginPage.username')}：
              </label>
              <input
                {...register('username', {
                  required: {
                    value: true,
                    message: t('errorMessage.inputEmptyAlert'),
                  },
                })}
                type='text'
                placeholder={t('loginPage.usernamePlaceholder')}
                className={cn('focus:none h-11 w-full rounded border border-grey-600 bg-grey-700 px-3 py-[10px] text-white focus:outline-none')}
              />
              {errors?.username?.type && (
                <p className={cn('text-xs font-medium text-red-400')}>
                  {errors?.username?.message}
                </p>
              )}
            </div>
            <div className={cn('flex flex-col items-start gap-1')}>
              <label className={cn('mb-1 font-medium text-white')}>
                *{t('loginPage.password')}：
              </label>
              <input
                {...register('password', {
                  required: {
                    value: true,
                    message: t('errorMessage.inputEmptyAlert'),
                  },
                })}
                placeholder={t('loginPage.passwordPlaceholder')}
                type='password'
                className={cn('focus:none h-11 w-full rounded border border-grey-600 bg-grey-700 px-3 py-[10px] text-white focus:outline-none')}
              />
              {errors?.password?.type && (
                <p className={cn('text-xs font-medium text-red-400')}>
                  {errors?.password?.message}
                </p>
              )}
            </div>
          </div>

          <button
            type='submit'
            className={cn('h-fit w-fit rounded bg-grey-600 p-[10px] text-2xl font-medium text-grey-200 hover:bg-grey-300 hover:text-grey-600')}
          >
            {t('loginPage.submit')}
          </button>
        </form>
        {/* Google 登入 先隱藏*/}
        {/* <div id='googleLogin'>
          <script src='https://accounts.google.com/gsi/client' async></script>
          <div
            id='g_id_onload'
            data-client_id={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            data-callback='handleGoogleLogin'
            data-auto_prompt='false'
          ></div>
          <div
            className='g_id_signin'
            data-width='594'
            data-type='standard'
            data-size='large'
            data-theme='filled_white'
            data-text='sign_in_with'
            data-shape='pill'
            data-logo_alignment='left'
            // data-locale={setGoogleLocale(locale)}
          ></div>
        </div> */}
      </div>
      {showAlert.isShow && (
        <Alert type={showAlert.type} message={showAlert.message} />
      )}
      {isPending && <Spinner />}
    </div>
  );
}

export default LoginPage;
