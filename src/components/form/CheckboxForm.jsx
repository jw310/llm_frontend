import { useForm } from 'react-hook-form';

import Checkbox from '../checkbox/Checkbox';

import { cn } from '@/utils/clsx';

function CheckboxForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues: {
      agreeTerms: false,
      newsletter: false,
      notifications: true,
      categories: {
        sports: false,
        technology: false,
        music: false,
      },
    },
  });

  const watchedValues = watch();

  // 處理 checkbox 點選時的自動提交
  const handleCheckboxSubmit = () => {
    handleSubmit(onSubmit)();
  };

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('flex h-fit w-full flex-col gap-2')}>
        <label className='flex-shrink-0 text-base'>*Options：</label>
        <Checkbox
          name='agreeTerms'
          label='我同意服務條款'
          control={control}
          rules={{
            required: { value: true, message: '請同意服務條款才能繼續' },
          }}
          onSubmit={handleCheckboxSubmit}
        />

        {/* 可選的 checkbox */}
        <Checkbox
          name='newsletter'
          label='訂閱電子報'
          control={control}
          onSubmit={handleCheckboxSubmit}
        />

        {/* 預設為 true 的 checkbox */}
        <Checkbox
          name='notifications'
          label='接收通知'
          control={control}
          onSubmit={handleCheckboxSubmit}
        />

        {/* 巢狀物件的 checkbox 群組 */}
        <div className='border-t pt-4'>
          <h3 className='mb-3 text-lg font-semibold'>興趣分類</h3>
          <Checkbox
            name='categories.sports'
            label='運動'
            control={control}
            onSubmit={handleCheckboxSubmit}
          />
          <Checkbox
            name='categories.technology'
            label='科技'
            control={control}
            onSubmit={handleCheckboxSubmit}
          />
          <Checkbox
            name='categories.music'
            label='音樂'
            control={control}
            onSubmit={handleCheckboxSubmit}
          />
        </div>
        <button
          type='submit'
          className='w-full rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600'
        >
          送出表單
        </button>
      </div>

      {/* 即時顯示表單狀態 */}
      <div className='mt-6 rounded bg-gray-100 p-4'>
        <h3 className='mb-2 font-semibold'>目前表單值:</h3>
        <pre className='overflow-auto text-xs'>
          {JSON.stringify(watchedValues, null, 2)}
        </pre>
      </div>

      {/* 顯示錯誤訊息 */}
      {Object.keys(errors).length > 0 && (
        <div className='mt-4 rounded bg-red-100 p-4'>
          <h3 className='mb-2 font-semibold text-red-800'>表單錯誤:</h3>
          <pre className='text-xs text-red-600'>
            {JSON.stringify(errors, null, 2)}
          </pre>
        </div>
      )}
    </form>
  );
}

export default CheckboxForm;
