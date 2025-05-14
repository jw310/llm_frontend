import { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
// import {
//   getLeaveHoursCountByCode,
//   uploadApplyFileApi,
//   createApplyApi,
// } from '@/api/api';
// import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '@/context/auth';

import Alert from '../modal/Alert';

function CreateUseForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState({
    type: '',
    message: '',
    isShow: false,
  });
  // const { logout } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // const { mutate } = useMutation({
  //   mutationFn: createApplyApi,
  //   onSuccess: (message) => {
  //     toast.success(message, {
  //       position: 'top-center',
  //       autoClose: 1000,
  //     });
  //     setTimeout(() => {
  //       navigate('/staff/apply/record');
  //     }, 2000);
  //   },
  //   onError: (error) => {
  //     toast.error(error.message, {
  //       position: 'top-center',
  //       autoClose: 1000,
  //     });

  //     if (error.message === 'Unauthorized') {
  //       setTimeout(() => {
  //         logout();
  //       }, 2000);
  //     }
  //   },
  // });

  // const onDurationChange = ({ hoursCount }) => {
  //   setSelectedDuration((prev) => {
  //     return {
  //       ...prev,
  //       hoursCount: hoursCount,
  //     };
  //   });
  // };

  const inputLists = [
    {
      name: 'account',
      placeholder: t('createUse.accountPlaceholder'),
      rules: {
        required: { value: true, message: t('errorMessage.required') },
      },
    },
    {
      name: 'month',
      placeholder: t('createUse.monthPlaceholder'),
      rules: {
        required: { value: true, message: t('errorMessage.required') },
      },
    },
  ];

  const onSubmit = async (data) => {
    console.log(data, errors);

    setShowAlert((prev) => ({
      type: 'success',
      message: t('createUse.success'),
      isShow: !prev.isShow,
    }));
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex h-fit w-full flex-col gap-5'>
        {inputLists.map(({ name, placeholder, rules }, index) => (
          <div key={index} className='flex h-fit w-full flex-col gap-2'>
            <div>
              <label className='flex-shrink-0 text-base' htmlFor={name}>
                {rules?.required?.value && <span>*</span>}
                {t(`createUse.${name}`)}：
              </label>
            </div>
            <input
              {...register(name, rules)}
              type='text'
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
        {/* <button
          type='button'
          onClick={handleReturnClick}
          className='mt-6 w-[52px] cursor-pointer rounded bg-grey-600 px-2 py-2 text-base text-white shadow-md hover:bg-yellow-500 hover:text-black'
        >
          {t('createUser.cancel')}
        </button> */}
        <button
          className='mt-6 w-[52px] cursor-pointer rounded bg-blue-600 px-2 py-2 text-base text-white shadow-md hover:bg-yellow-500 hover:text-black'
          type='submit'
        >
          {t('createUser.submit')}
        </button>
      </div>
      {showAlert.isShow && (
        <Alert type={showAlert.type} message={showAlert.message} />
      )}
    </form>
  );
}

export default CreateUseForm;
