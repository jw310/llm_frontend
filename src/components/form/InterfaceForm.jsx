// import { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
// import { useNavigate } from 'react-router';
// import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import Select from '@/components/select/Select.jsx';

// import { AuthContext } from '@/context/auth';
import { cn } from '@/utils/clsx.js';

function InterfaceForm() {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  // const { logout } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      media: 'line',
    },
  });

  const selectedMedia = watch('media');

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

  const mediaOptions = [
    {
      value: 'line',
      name: 'Line@',
    },
    {
      value: 'instagram',
      name: 'Instagram',
    },
    {
      value: 'facebook',
      name: 'Facebook (Messenger)',
    },
  ];

  const onSubmit = async (data) => {
    console.log(data, errors);
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-3')}
    >
      <div className={cn('flex h-fit w-full flex-col gap-3')}>
        <Controller
          control={control}
          name='media'
          rules={{
            required: { value: true, message: 'Error' },
          }}
          render={({ field: { onChange, value } }) => (
            <Select
              onChange={onChange}
              options={mediaOptions}
              value={value}
              error={errors?.lang?.type}
              placeholder='media'
              customStyle={cn('h-11 w-[253px]')}
            />
          )}
        />
        {/* ID */}
        <div className={cn('flex h-fit w-full flex-col gap-2')}>
          <label className={cn('flex-shrink-0 text-base')} htmlFor='id'>
            *{selectedMedia === 'line' ? 'Channel' : 'App'} ID：
          </label>
          <input
            {...register('id', {
              required: {
                value: true,
                message: t('errorMessage.required'),
              },
            })}
            type='text'
            id='name'
            placeholder={`Input ${selectedMedia === 'line' ? 'Channel' : 'App'} ID`}
            className={cn(
              'border-grey-600 bg-grey-700 h-11 w-full rounded border border-gray-300 indent-3',
              'focus:none focus:outline-none',
              errors?.id?.type && 'border-red-500'
            )}
          />
          {errors?.id?.type && (
            <p className='text-xs font-medium text-red-400'>
              {errors?.id?.message}
            </p>
          )}
        </div>
        {/* secret */}
        <div className={cn('flex h-fit w-full flex-col gap-2')}>
          <label className={cn('flex-shrink-0 text-base')} htmlFor='secret'>
            *{selectedMedia === 'line' ? 'Channel' : 'App'} Secret：
          </label>
          <input
            {...register('secret', {
              required: {
                value: true,
                message: t('errorMessage.required'),
              },
            })}
            type='text'
            id='secret'
            placeholder={`Input ${selectedMedia === 'line' ? 'Channel' : 'App'} Secret`}
            className={cn(
              'border-grey-600 bg-grey-700 h-11 w-full rounded border border-gray-300 indent-3',
              'focus:none focus:outline-none',
              errors?.id?.type && 'border-red-500'
            )}
          />
          {errors?.secret?.type && (
            <p className={cn('text-xs font-medium text-red-400')}>
              {errors?.secret?.message}
            </p>
          )}
        </div>
      </div>
      <div className={cn('mt-3 flex h-fit w-full items-center justify-center')}>
        <button
          className={cn(
            'text-grey-200 h-fit w-fit rounded bg-gray-300 p-[10px] text-base shadow-md',
            'hover:bg-blue-200 hover:text-blue-600'
          )}
          type='submit'
        >
          Submit
        </button>
      </div>
      <div className='flex h-fit w-full flex-col'>
        <label className='font-medium'>Webhook URL：</label>
        <p className={cn('border-b border-gray-500 px-3 py-[10px]')}>123</p>
      </div>
    </form>
  );
}

export default InterfaceForm;
