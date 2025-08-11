import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import SingleDatePicker from '@/components/date-picker/SingleDatePicker.jsx';
import DateRangePicker from '@/components/date-picker/DateRangePicker.jsx';

import { DayPicker } from 'react-day-picker';
import { setHours, setMinutes } from 'date-fns';

import dayjs from 'dayjs';

import 'react-day-picker/dist/style.css';

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
      {/* Data */}
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
                value: false,
                message: '日期為必填項！',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <SingleDatePicker
                error={errors?.data}
                onChange={onChange}
                value={value}
                placeholderText='Date'
                customStyle={cn('')}
              />
            )}
          />
        </div>
        {errors?.date && (
          <p className={cn('whitespace-nowrap text-red-500')}>
            {errors.date.message}
          </p>
        )}
      </div>
      {/* DataRange */}
      <div>
        <label
          htmlFor='dateRange'
          className={cn('w-[50px] flex-shrink-0 text-xl')}
        >
          <span className={cn('text-red-500')}>*</span>DateRange
        </label>
        <Controller
          control={control}
          name='dateRange'
          rules={{
            required: {
              value: false,
              message: '請選擇開始與結束的日期時間',
            },
            // validate: (v) =>
            //   v?.from && v?.to ||  ? true : '請選擇開始與結束的日期時間',
            validate: (v) =>
              dayjs(v?.from).isAfter(dayjs(v?.to))
                ? '結束日期必須在開始日期之後'
                : true,
          }}
          render={({ field: { onChange, value } }) => (
            <DateRangePicker
              onChange={onChange}
              value={value}
              error={errors?.dateRange}
              customStyle={cn('')}
            />
          )}
        />
        {errors?.dateRange && (
          <p className={cn('whitespace-nowrap text-red-500')}>
            {errors.dateRange.message}
          </p>
        )}
      </div>
      <button
        className={cn(
          'mt-1 h-12 w-fit self-end rounded bg-blue-600 p-2 text-base text-white shadow-md',
          'cursor-pointer hover:bg-yellow-500 hover:text-black'
        )}
        type='submit'
      >
        {'Submit'}
      </button>
    </form>
  );
};

export default DatePickerForm;
