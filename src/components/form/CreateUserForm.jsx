import { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import Alert from '../modal/Alert';
import Select from '../select/Select';

import { cn } from '@/utils/clsx.js';
// import { registerUserApi } from '@/api/api';
// import { AuthContext } from '@/context/auth';

function CreateUserForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState({
    type: '',
    message: '',
    isShow: false,
  });

  const [selectedOption, setSelectedOption] = useState();

  // const { logout } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();

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
      name: 'username',
      placeholder: t('createUser.usernamePlaceholder'),
      rules: {
        required: { value: true, message: t('errorMessage.required') },
      },
    },
    {
      name: 'password',
      placeholder: t('createUser.passwordPlaceholder'),
      rules: {
        required: { value: true, message: t('errorMessage.required') },
        pattern: {
          value: /^[a-zA-Z\d]{6,}$/,
          message: t('errorMessage.atLeastSixCharacters'),
        },
      },
    },
    {
      name: 'email',
      placeholder: t('createUser.companyPlaceholder'),
      rules: {
        required: { value: true, message: t('errorMessage.required') },
      },
    },
    {
      name: 'first_name',
      placeholder: t('createUser.first_namePlaceholder'),
      rules: {
        required: { value: true, message: t('errorMessage.required') },
      },
    },
    {
      name: 'last_name',
      placeholder: t('createUser.last_namePlaceholder'),
      rules: {
        required: { value: true, message: t('errorMessage.required') },
      },
    },
    // {
    //   name: 'role',
    //   placeholder: t('createUser.rolePlaceholder'),
    //   rules: {
    //     required: { value: true, message: t('errorMessage.required') },
    //   },
    // },
    {
      name: 'phone_number',
      placeholder: t('createUser.phonePlaceholder'),
      rules: {
        required: { value: true, message: t('errorMessage.required') },
      },
    },
  ];

  const roleOptions = [
    {
      value: '1',
      name: 'Admin',
    },
    {
      value: '2',
      name: 'User',
    },
  ];


  const clickOptionHandler = (value) => {
    setSelectedOption(value);
  };


  const onSubmit = async (data) => {
    console.log(data);

    // mutate({
    //   username: data.username,
    //   password: data.password,
    //   email: data.email,
    //   fist_name: data.fist_name,
    //   last_name: data.last_name,
    //   role: data.role,
    //   phone_number: data.phone_number,
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
  };

  return (
    <>
      {/* <Select options={roleOptions} name="role"
          placeholder={t('createUser.rolePlaceholder')}
          onChange={(value) => clickOptionHandler(value)}
          value={selectedOption}
      /> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cn('flex h-fit w-[300px] flex-col gap-5')}>
          {inputLists.map(({ name, placeholder, rules }, index) => (
            <div key={name} className={cn('flex h-fit w-full flex-col gap-2')}>
              <div>
                <label className={cn('flex-shrink-0 text-base')} htmlFor={name}>
                  {rules?.required?.value && <span>*</span>}
                  {t(`createUser.${name}`)}：
                </label>
              </div>
              <input
                {...register(name, rules)}
                type='text'
                id={name}
                placeholder={placeholder}
                className={cn('focus:none h-11 w-full rounded border-2 bg-grey-700 indent-3 text-white focus:outline-none',
                    `${errors?.[name] ? 'border-red-500' : 'border-grey-500'}`)}
              />
              {errors?.[name]?.type && (
                <p className={cn('whitespace-nowrap text-red-500')}>
                  {errors?.[name]?.message}
                </p>
              )}
            </div>
          ))}
          <div className='flex h-fit w-full flex-col gap-2'>
            <label className='flex-shrink-0 text-base'>
              *{t('createUser.role')}：
            </label>
            <Controller
              control={control}
              name='role'
              rules={{
                required: { value: true, message: t('errorMessage.required') },
              }}
              render={({ field: { onChange, value } }) => (
                <Select
                  onChange={onChange}
                  options={roleOptions}
                  value={value}
                  // customStyle='focus:none h-11 w-full rounded border-2 border-grey-500 bg-grey-700 text-white focus:outline-none'
                  customStyle={cn('focus:none h-11 w-full rounded border-2 bg-grey-700 indent-3 text-white focus:outline-none',
                    `${errors?.role ? 'border-red-500' : 'border-grey-500'}`)}
                  placeholder={t('createUser.rolePlaceholder')}
                />
              )}
            />
            {errors?.knowledgeType?.type && (
              <p className='whitespace-nowrap text-red-500'>
                {errors?.knowledgeType?.message}
              </p>
            )}
          </div>
        </div>
        <div className={cn('flex h-fit w-full items-center justify-center gap-5')}>
          {/* <button
            type='button'
            onClick={handleReturnClick}
            className={cn('mt-6 w-[52px] cursor-pointer rounded bg-grey-600 px-2 py-2 text-base text-white shadow-md hover:bg-yellow-500 hover:text-black')}
          >
            {t('common.cancel')}
          </button> */}
          <button
            className={cn('mt-6 w-[52px] cursor-pointer rounded bg-blue-600 px-2 py-2 text-base text-white shadow-md hover:bg-yellow-500 hover:text-black')}
            type='submit'
          >
            {t('common.submit')}
          </button>
        </div>
        {showAlert.isShow && (
          <Alert type={showAlert.type} message={showAlert.message} />
        )}
      </form>
    </>
  );
}

export default CreateUserForm;
