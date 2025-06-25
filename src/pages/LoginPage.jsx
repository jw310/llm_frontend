import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';

import Alert from '@/components/modal/Alert.jsx';
import { Spinner } from '@/components/loader/Spinner.jsx';

import { cn } from '@/utils/clsx.js';
import trimString from '@/utils/trimString.js';
import { requestLoginApi } from '@/api/api';
import { AuthContext } from '@/context/auth.jsx';
import { useLocaleNavigate } from '@/hooks/useLocaleNavigate.jsx';
// import useCustomMutation from '@/hooks/useCustomMutation.jsx';

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useLocaleNavigate();

  const [showAlert, setShowAlert] = useState({
    type: '',
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
      login(token);
      setShowAlert((prev) => ({
        type: 'success',
        message: 'Login Success',
        isShow: !prev.isShow,
      }));
      setTimeout(() => {
        const decodedToken = jwtDecode(token);
        if (decodedToken.role === 'admin') {
          return navigate('/admin/create-user');
        }
        navigate('/calendar');
      }, 1000);
    },
    onError: (error) => {
      console.log(error);
      setShowAlert((prev) => ({
        type: 'error',
        message: 'Login Success',
        isShow: !prev.isShow,
      }));
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
    mutate({
      username: trimString(data.username),
      password: trimString(data.password),
    });
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
    <div
      className={cn(
        'font-noto-sans-tc relative mx-auto flex h-screen justify-center overflow-hidden bg-[#E5EDF9]'
        // 'bg-linear-65 from-[#3498db] to-[#2ecc71]'
      )}
    >
      {/* 圓圈背景 */}
      <div
        className={cn(
          'absolute top-[160px] right-[240px] h-[300px] w-[300px] translate-x-32 -translate-y-32 transform rounded-full opacity-30',
          'bg-gradient-to-r from-[#C8E1FF] from-[12.1%] to-[#FFF] to-[85.32%]'
        )}
      ></div>
      <div
        className={cn(
          'absolute top-[330px] left-[212px] h-[353px] w-[353px] -translate-x-24 translate-y-24 transform rounded-full bg-indigo-200 opacity-30'
        )}
      ></div>
      <div
        className={cn(
          'absolute right-[188px] bottom-10 h-[353px] w-[353px] rounded-full',
          'to-[#B0D3FB bg-gradient-to-r from-[#C9DFF9] from-[13.22%] via-[#E5EDF9] via-[62.98%] to-[86.51%]'
        )}
      ></div>

      <div
        className={cn(
          'absolute right-[188px] bottom-10 h-[353px] w-[353px] rounded-full',
          'to-[#B0D3FB bg-gradient-to-r from-[#C9DFF9] from-[13.22%] via-[#E5EDF9] via-[62.98%] to-[86.51%]'
        )}
      ></div>
      {/* 輸入框 */}
      <div
        className={cn(
          'relative z-10 mt-[125px] flex h-[510px] w-[795px] flex-col items-center justify-center',
          'rounded-2xl bg-white opacity-90 shadow-lg',
          'border-t-42 border-[#F2F6FC]',
          'border-b-8 border-[#F2F6FC]',
          'border-l-8 border-[#F2F6FC]',
          'border-r-8 border-[#F2F6FC]'
        )}
      >
        <div
          className={cn(
            'absolute -top-[20px] left-10 h-2 w-2 rounded-full bg-[#EAEFF6]',
            'before:absolute before:top-0 before:-left-6 before:h-2 before:w-2',
            "before:rounded-full before:bg-[#EAEFF6] before:content-['']",
            'after:absolute after:top-0 after:left-6 after:h-2 after:w-2',
            "after:rounded-full after:bg-[#EAEFF6] after:content-['']"
          )}
        ></div>
        <div
          className={cn(
            'absolute -top-[28px] left-[160px] h-5 w-[475px] bg-white'
          )}
        ></div>

        <div className={cn('absolute top-0 left-[700px] h-full w-full')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='79'
            height='153'
            viewBox='0 0 79 153'
            fill='none'
          >
            <path
              d='M73 0C76.3137 1.61064e-07 79 2.68629 79 6V152.362C31.982 127.172 0 77.5721 0 20.5C0 14.4385 0.36327 8.46156 1.06445 2.58887C2.1474 1.02492 3.95369 9.94617e-08 6 0H73Z'
              fill='url(#paint0_linear_194_2073)'
            />
            <defs>
              <linearGradient
                id='paint0_linear_194_2073'
                x1='13'
                y1='75.9995'
                x2='74.9996'
                y2='6.99956'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#C9E1FF' />
                <stop offset='1' stopColor='#D9EAFF' />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className={cn('absolute top-[262px] left-0 h-fit w-fit')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='140'
            height='198'
            viewBox='0 0 140 198'
            fill='none'
          >
            <path
              d='M0 0.78125C79.9642 17.5955 140 88.5355 140 173.5C140 181.813 139.424 189.993 138.312 198H8C3.58172 198 0 194.418 0 190V0.78125Z'
              fill='#B7D3F3'
              fillOpacity='0.5'
            />
          </svg>
        </div>
        <h1
          className={cn(
            'mb-8 text-center text-2xl leading-[34.5px] font-medium whitespace-pre-wrap'
          )}
        >
          {t('loginPage.title')}
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn('flex h-fit w-[594px] flex-col items-center gap-6')}
        >
          <div className={cn('flex h-fit w-full flex-col gap-2')}>
            <div className={cn('flex flex-col items-start gap-1')}>
              <label
                className={cn('mb-1 block text-sm font-medium text-gray-700')}
                htmlFor='username'
              >
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
                id='username'
                placeholder={t('loginPage.usernamePlaceholder')}
                className={cn(
                  'w-full rounded-lg border border-transparent bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none'
                )}
              />
              {errors?.username?.type && (
                <p className={cn('text-xs font-medium text-red-400')}>
                  {errors?.username?.message}
                </p>
              )}
            </div>
            <div className={cn('flex flex-col items-start gap-1')}>
              <label
                className={cn('mb-1 block text-sm font-medium text-gray-700')}
                htmlFor='password'
              >
                *{t('loginPage.password')}：
              </label>
              <input
                {...register('password', {
                  required: {
                    value: true,
                    message: t('errorMessage.inputEmptyAlert'),
                  },
                })}
                type='password'
                id='password'
                placeholder={t('loginPage.passwordPlaceholder')}
                className={cn(
                  'w-full rounded-lg border border-transparent bg-gray-100 px-4 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none'
                )}
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
            className={cn(
              'flex w-fit rounded-xl bg-[#e0e9f6] px-6 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-[#d5e3f4]',
              'cursor-pointer shadow-xl hover:bg-gray-300 hover:text-gray-600'
            )}
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
