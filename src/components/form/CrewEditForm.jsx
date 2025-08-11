import { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
// import { useMutation } from "@tanstack/react-query";

import Select from '@/components/select/Select';
import FileUploadBtn from '@/components/button/FileUploadBtn';

import { cn } from '@/utils/clsx.js';
import trimString from '@/utils/trimString.js';
// import { registerUserApi } from '@/api/api';
// import { AuthContext } from '@/context/auth';

function CrewEditForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAlert, setShowAlert] = useState({
    type: '',
    message: '',
    isShow: false,
  });

  // const { logout } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const handleReset = () => {
    try {
      reset({
        name: '',
        role: '',
        status: '',
        account: '',
        password: '',
        confirmPassword: '',
      });

      navigate('/management/permission/list');
    } catch (error) {
      console.log(error);
    }
  };

  // const { mutate } = useMutation({
  //   mutationFn: registerUserApi,
  //   onSuccess: (message) => {
  //     console.log(message);
  //     setShowAlert(() => ({
  //       type: 'success',
  //       message: t('createUser.success'),
  //       isShow: true,
  //     }));
  //     setTimeout(() => {
  //       setShowAlert((prev) => ({
  //         ...prev,
  //         isShow: !prev.isShow,
  //       }));
  //       navigate('/product');
  //     }, 1500);
  //   },
  //   onError: (error) => {
  //     // console.log(error);
  //     setShowAlert(() => ({
  //       type: 'error',
  //       message: t('createUser.fail'),
  //       isShow: true,
  //     }));
  //     setTimeout(() => {
  //       setShowAlert((prev) => ({
  //         ...prev,
  //         isShow: !prev.isShow,
  //       }));
  //     }, 1500);
  //   },
  // });

  const inputLists = [
    {
      name: 'account',
      placeholder: t('accountPlaceholder'),
      rules: {
        required: { value: false, message: t('errorMessage.required') },
      },
    },
    {
      name: 'name',
      placeholder: t('namePlaceholder'),
      rules: {
        required: { value: false, message: t('errorMessage.required') },
      },
    },
    {
      name: 'email',
      placeholder: t('emailPlaceholder'),
      rules: {
        required: { value: true, message: t('errorMessage.required') },
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: '請輸入有效的電子郵件',
        },
      },
    },
    {
      name: 'mobile',
      placeholder: t('mobilePlaceholder'),
      rules: {
        required: { value: true, message: t('errorMessage.required') },
      },
    },
  ];

  const roleOptions = [
    {
      value: 'management',
      label: 'management',
    },
    {
      value: 'hr',
      label: 'hr',
    },
    {
      value: 'applicant',
      label: 'applicant',
    },
  ];

  const statusOptions = [
    {
      value: 'enable',
      label: 'enable',
    },
    {
      value: 'disable',
      label: 'disable',
    },
  ];

  const onSubmit = async (data) => {
    try {
      console.log(data);
      // mutate({
      //   username: trimString(data.username),
      //   password: trimString(data.password),
      //   email: trimString(data.email),
      //   fist_name: trimString(data.fist_name),
      //   last_name: trimString(data.last_name),
      //   role: trimString(data.role),
      //   phone_number: trimString(data.phone_number),
      // });

      // if (insufficientHours) return;
      // const { attachment, ...restOfData } = data;
      // let uploadResult;
      // if (attachment) {
      //   uploadResult = await uploadApplyFileApi(attachment);
      // }
      // const submissionData = {
      //   department: employeeData.department,
      //   leaveCode: restOfData.leaveCode,
      //   startTime: restOfData.dateRange[0],
      //   endTime: restOfData.dateRange[1],
      //   hoursCount: selectedDuration.hoursCount,
      //   description: restOfData.description ? restOfData.description : null,
      //   attachment: uploadResult ? uploadResult.path : null,
      // };
      // mutate({ payload: submissionData });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={cn(
            'font-noto-sans-tc flex w-[760px] flex-col rounded-xl bg-white p-6'
          )}
        >
          <span
            className={cn(
              'rounded-[4px] bg-[#E5EDF9] p-1 text-base leading-6 font-normal'
            )}
          >
            基本資料
          </span>
          <div
            className={cn(
              'mx-auto mt-6 flex h-full w-full flex-col gap-5 bg-white'
            )}
          >
            {inputLists.map(({ name, placeholder, rules }, index) => (
              <div
                key={name}
                className={cn('flex h-fit w-full flex-col gap-2')}
              >
                <div>
                  <label
                    className={cn('flex-shrink-0 text-base')}
                    htmlFor={name}
                  >
                    {/* {rules?.required?.value && <span>*</span>} */}
                    {t(`${name}`)}：
                  </label>
                </div>
                <input
                  {...register(name, rules)}
                  type='text'
                  id={name}
                  placeholder={placeholder}
                  className={cn(
                    'focus:none h-11 w-full rounded bg-[#F2F4F8] indent-3 text-[#ABB3BC] focus:outline-none',
                    `${errors?.[name] ? 'border-red-500' : ''}`
                  )}
                />
                {errors?.[name]?.type && (
                  <p className={cn('whitespace-nowrap text-red-500')}>
                    {errors?.[name]?.message}
                  </p>
                )}
              </div>
            ))}
            <div className={cn('flex h-fit w-full gap-2')}>
              <div className='flex h-fit w-full flex-col gap-2'>
                <label className='flex-shrink-0 text-base'>{t('role')}：</label>
                <Controller
                  control={control}
                  name='role'
                  rules={{
                    required: {
                      value: false,
                      message: t('errorMessage.required'),
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onChange={onChange}
                      options={roleOptions}
                      value={value}
                      // customStyle={cn(
                      //   "focus:none h-11 w-full rounded bg-[#F2F4F8] text-[#ABB3BC] focus:outline-none",
                      //   `${errors?.role ? "border-red-500" : ""}`
                      // )}
                      placeholder={t('rolePlaceholder')}
                    />
                  )}
                />
                {errors?.role?.type && (
                  <p className='whitespace-nowrap text-red-500'>
                    {errors?.role?.message}
                  </p>
                )}
              </div>
              <div className='flex h-fit w-full flex-col gap-2'>
                <label className='flex-shrink-0 text-base'>
                  {t('status')}：
                </label>
                <Controller
                  control={control}
                  name='status'
                  rules={{
                    required: {
                      value: false,
                      message: t('errorMessage.required'),
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      onChange={onChange}
                      options={statusOptions}
                      value={value}
                      // customStyle={cn(
                      //   "focus:none h-11 w-full rounded bg-[#F2F4F8] text-[#ABB3BC] focus:outline-none",
                      //   `${errors?.status ? "border-red-500" : ""}`
                      // )}
                      placeholder={t('statusPlaceholder')}
                    />
                  )}
                />
                {errors?.status?.type && (
                  <p className='whitespace-nowrap text-red-500'>
                    {errors?.status?.message}
                  </p>
                )}
              </div>
            </div>

            {/** password */}
            <div className={cn('flex h-fit w-full gap-2')}>
              {/** password */}
              <div className={cn('relative flex h-fit w-full flex-col gap-2')}>
                <div>
                  <label
                    className={cn('flex-shrink-0 text-base')}
                    htmlFor='password'
                  >
                    {/* {rules?.required?.value && <span>*</span>} */}
                    {t('password')}：
                  </label>
                </div>
                <input
                  {...register('password', {
                    required: {
                      value: false,
                      message: t('errorMessage.inputEmptyAlert'),
                    },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  placeholder={t('passwordPlaceholder')}
                  className={cn(
                    'focus:none h-11 w-full rounded bg-[#F2F4F8] indent-3 text-[#ABB3BC] focus:outline-none',
                    `${errors?.password ? 'border-red-500' : ''}`
                  )}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute top-[70%] right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600'
                >
                  {showPassword ? (
                    <div>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='size-6'
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
                        className='size-6'
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
                {errors?.password?.type && (
                  <p className={cn('whitespace-nowrap text-red-500')}>
                    {errors?.password?.message}
                  </p>
                )}
              </div>
              {/** confirmPassword */}
              <div className={cn('relative flex h-fit w-full flex-col gap-2')}>
                <div>
                  <label
                    className={cn('flex-shrink-0 text-base')}
                    htmlFor='confirmPassword'
                  >
                    {/* {rules?.required?.value && <span>*</span>} */}
                    {t('confirmPassword')}：
                  </label>
                </div>
                <input
                  {...register('confirmPassword', {
                    required: {
                      value: false,
                      message: t('errorMessage.inputEmptyAlert'),
                    },
                    validate: (value, { password }) => {
                      if (value !== password) {
                        return t('errorMessage.confirmPassword');
                      }
                    },
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  id='confirmPassword'
                  placeholder={t('confirmPasswordPlaceholder')}
                  className={cn(
                    'focus:none h-11 w-full rounded bg-[#F2F4F8] indent-3 text-[#ABB3BC] focus:outline-none',
                    `${errors?.confirmPassword ? 'border-red-500' : ''}`
                  )}
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute top-[70%] right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600'
                >
                  {showConfirmPassword ? (
                    <div>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='size-6'
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
                        className='size-6'
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
                {errors?.confirmPassword?.type && (
                  <p className={cn('whitespace-nowrap text-red-500')}>
                    {errors?.confirmPassword?.message}
                  </p>
                )}
              </div>
            </div>
            {/** uploadFile */}
            <div className='flex h-fit w-[700px] items-center gap-5'>
              <label
                htmlFor='attachment'
                className='w-fit flex-shrink-0 text-base'
              >
                Attachment：
              </label>
              <Controller
                control={control}
                name='attachment'
                render={({ field: { onChange } }) => (
                  <FileUploadBtn
                    name='attachment'
                    max={1}
                    employeeId={'123'}
                    register={register}
                    onChange={onChange}
                    customStyle={cn('')}
                  />
                )}
              />
            </div>
          </div>
          <div className={cn('flex w-full items-center justify-center gap-5')}>
            <button
              className={cn(
                'mt-6 h-[34px] w-18 rounded-2xl bg-[#E5EDF9] px-6 py-2 text-xs font-bold',
                'cursor-pointer shadow-md'
              )}
              type='button'
              onClick={handleReset}
            >
              {t('common.cancel')}
            </button>

            <button
              className={cn(
                'mt-6 h-[34px] w-18 rounded-2xl bg-[#E5EDF9] px-6 py-2 text-xs font-bold',
                'cursor-pointer shadow-md'
              )}
              // type="submit"
            >
              {t('common.submit')}
            </button>
          </div>
        </div>
        {/* <div className={cn('flex w-full items-center justify-center gap-5')}>
          <button
            className={cn(
              'mt-6 h-[34px] w-18 rounded-2xl bg-[#E5EDF9] px-6 py-2 text-xs font-bold',
              'cursor-pointer shadow-md'
            )}
            type='button'
            onClick={handleReset}
          >
            {t('common.cancel')}
          </button>

          <button
            className={cn(
              'mt-6 h-[34px] w-18 rounded-2xl bg-[#E5EDF9] px-6 py-2 text-xs font-bold',
              'cursor-pointer shadow-md'
            )}
            // type="submit"
          >
            {t('common.submit')}
          </button>
        </div> */}
        {showAlert.isShow && (
          <Alert type={showAlert.type} message={showAlert.message} />
        )}
      </form>
    </>
  );
}

export default CrewEditForm;
