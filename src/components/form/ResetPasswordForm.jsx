import { useContext } from 'react';
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
          <div key={name} className='flex h-fit w-full flex-col gap-2'>
            <div>
              <label className='flex-shrink-0 text-base' htmlFor={name}>
                {rules?.required?.value && <span>*</span>}
                {name}：
              </label>
            </div>
            <input
              {...register(name, rules)}
              type='password'
              id={name}
              placeholder={placeholder}
              className={`focus:none h-11 w-full rounded border-2 ${errors?.[name] ? 'border-red-500' : 'border-grey-500'} bg-grey-700 indent-3 text-white focus:outline-none`}
            />
            {errors?.[name]?.type && (
              <p className='whitespace-nowrap text-red-500'>
                {errors?.[name]?.message}
              </p>
            )}
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
