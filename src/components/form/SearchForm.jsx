// import { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import SearchBar from '@/components/searchBar/SearchBar';
import Select from '@/components/select/Select';
import SingleDatePicker from '@/components/date-picker/SingleDatePicker';
import DataRangePicker from '@/components/date-picker/DataRangePicker.jsx';

import { cn } from '@/utils/clsx';

function SearchForm() {
  const { t } = useTranslation();

  const genderOptions = [
    {
      value: 'male',
      name: 'male',
    },
    {
      value: 'female',
      name: 'female',
    },
  ];

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const handleReset = () => {
    // 使用 reset 方法重置表單到初始狀態。
    reset({
      originalPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('flex h-fit w-full gap-5')}>
        {/** Search */}
        <div className={cn('flex h-fit w-[200px] items-center')}>
          {/* <label
            htmlFor="search"
            className={cn("w-[50px] flex-shrink-0 text-xl")}
          >
            <span className={cn("text-red-500")}>*</span>Search
          </label> */}
          <Controller
            control={control}
            name='search'
            rules={{
              required: {
                value: false,
                message: '搜尋條件為必填項！',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <SearchBar
                error={errors?.search}
                onChange={onChange}
                value={value}
                placeholder='Search'
                customStyle={cn('')}
              />
            )}
          />
          {errors?.search && (
            <p className={cn('whitespace-nowrap text-red-500')}>
              {errors.search.message}
            </p>
          )}
        </div>
        {/** Select */}
        <div className='flex h-fit w-[120px] flex-col'>
          {/* <label className="flex-shrink-0 text-base">
            {t("interview.gender")}：
          </label> */}
          <Controller
            control={control}
            name='gender'
            rules={{
              required: {
                value: false,
                message: t('errorMessage.required'),
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                options={genderOptions}
                value={value}
                customStyle={cn('bg-white')}
                // customStyle={cn(
                //   "focus:none h-11 w-full rounded bg-[#F2F4F8] indent-3 text-white focus:outline-none",
                //   `${errors?.gender ? "border-red-500" : ""}`
                // )}
                placeholder='Gender'
              />
            )}
          />
          {errors?.gender?.type && (
            <p className='whitespace-nowrap text-red-500'>
              {errors?.gender?.message}
            </p>
          )}
        </div>
        {/** date */}
        <div className='flex h-fit w-[160px] flex-col'>
          {/* <label className="flex-shrink-0 text-base">
            {t("interview.date")}：
          </label> */}
          <Controller
            control={control}
            name='date'
            rules={{
              required: {
                value: false,
                message: t('errorMessage.required'),
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
          {errors?.date?.type && (
            <p className='whitespace-nowrap text-red-500'>
              {errors?.date?.message}
            </p>
          )}
        </div>
        {/** DataRange */}
        <div className={cn('flex h-fit w-[360px] flex-col')}>
          {/* <label
            htmlFor='dateRange'
            className={cn('w-[50px] flex-shrink-0 text-xl')}
          >
            <span className={cn('text-red-500')}>*</span>DateRange
          </label> */}
          <Controller
            control={control}
            name='dateRange'
            rules={{
              required: {
                value: false,
                message: '請選擇開始與結束的日期時間',
              },
              // validate: (v) =>
              //   v?.from && v?.to ? true : '請選擇開始與結束的日期時間',
            }}
            render={({ field: { onChange, value } }) => (
              <DataRangePicker
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
          type='submit'
          className={cn(
            'h-12 rounded-2xl bg-[#E5EDF9] p-[8px_24px]',
            'shadow-custom cursor-pointer'
          )}
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className={cn(
            'h-12 rounded-2xl bg-[#E5EDF9] p-[8px_24px]',
            'shadow-custom cursor-pointer'
          )}
        >
          Reset
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
