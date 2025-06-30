import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '@/context/auth';

import Alert from '../modal/Alert';
import trimString from '@/utils/trimString';
import { Spinner } from '@/components/loader/Spinner.jsx';
// import useCustomMutation from '@/hooks/useCustomMutation.jsx';
// import { updateUserPasswordApi } from '@/api/api';

import { cn } from '@/utils/clsx';

function ResetPasswordForm() {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  // const { showAlert } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const handleReset = () => {
    // 使用 reset 方法重置表單到初始狀態。
    reset({
      originalPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  // const { mutate, isPending } = useCustomMutation({
  //   mutationFn: updateUserPasswordApi,
  //   options: {
  //     successMessage: t('resetPassword.success'),
  //     errorMessage: t('resetPassword.fail'),
  //     onSuccess: () => {
  //       reset();
  //     },
  //   },
  // });

  const inputLists = [
    {
      name: 'originalPassword',
      placeholder: 'Original Password',
      rules: {
        required: { value: true, message: t('errorMessage.required') },
      },
    },
    {
      name: 'newPassword',
      placeholder: 'New Password',
      rules: {
        required: { value: true, message: t('errorMessage.required') },
        pattern: {
          value: /^[a-zA-Z\d]{6,}$/,
          message: t('errorMessage.atLeastSixCharacters'),
        },
      },
    },
    {
      name: 'confirmPassword',
      placeholder: 'Confirm Password',
      rules: {
        required: { value: true, message: t('errorMessage.required') },
        // pattern: {
        //   value: /^[a-zA-Z\d]{6,}$/,
        //   message: t('errorMessage.atLeastSixCharacters'),
        // },
        validate: (value, { newPassword }) => {
          if (value !== newPassword) {
            return t('errorMessage.confirmPassword');
          }
        },
      },
    },
  ];

  const onSubmit = async (data) => {
    console.log('data', data);
    // mutate({
    //   oldPassword: trimString(data.originalPassword),
    //   newPassword: trimString(data.newPassword),
    // });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex h-fit w-full flex-col gap-5'>
        {inputLists.map(({ name, placeholder, rules }, index) => (
          <div key={name} className='relative flex h-fit w-full flex-col gap-2'>
            <div>
              <label className='flex-shrink-0 text-base' htmlFor={name}>
                {rules?.required?.value && <span>*</span>}
                {name}：
              </label>
            </div>
            <input
              {...register(name, rules)}
              type={showPassword ? 'text' : 'password'}
              id={name}
              placeholder={placeholder}
              className={`focus:none h-11 w-full rounded border-2 ${errors?.[name] ? 'border-red-500' : 'border-grey-500'} bg-grey-700 indent-3 text-white focus:outline-none`}
            />
            {errors?.[name]?.type && (
              <p className='whitespace-nowrap text-red-500'>
                {errors?.[name]?.message}
              </p>
            )}
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute top-2/3 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600'
            >
              {showPassword ? (
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    class='size-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                    />
                  </svg>
                </div>
              ) : (
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    class='size-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88'
                    />
                  </svg>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
      <div className='flex h-fit w-full items-center justify-center gap-5'>
        <button className='mt-6 w-fit cursor-pointer rounded bg-blue-600 px-2 py-2 text-base text-white shadow-md hover:bg-blue-200 hover:text-blue-600'>
          Submit
        </button>
      </div>
      {/* {showAlert.isShow && (
        <Alert type={showAlert.type} message={showAlert.message} />
      )}
      {isPending && <Spinner />} */}
    </form>
  );
}

export default ResetPasswordForm;
