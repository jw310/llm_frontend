import { useForm, Controller } from 'react-hook-form';
import SingleDatePicker from '@/components/date-picker/SingleDatePicker.jsx';

import { cn } from '@/utils/clsx';

const DatePickerForm = () => {
  const {
    handleSubmit,
    control,
    // watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: null,
    },
  });

  const onSubmit = async (data) => {
    console.log('data', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 日期 */}
      <div className={cn('flex h-fit w-full items-center gap-5')}>
        <div className={cn('flex h-fit w-[700px] items-center gap-5')}>
          <label
            htmlFor='date'
            className={cn('w-[50px] flex-shrink-0 text-xl')}
          >
            <span className={cn('text-red-500')}>*</span>Date
          </label>
          <Controller
            control={control}
            name='date'
            rules={{
              required: {
                value: true,
                message: '日期為必填項！',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <SingleDatePicker
                error={errors?.dateOfHire}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>
        {errors?.date && (
          <p className={cn('whitespace-nowrap text-red-500')}>
            {errors.date.message}
          </p>
        )}
        <button type='submit'>submit</button>
      </div>
    </form>
  );
};

export default DatePickerForm;
