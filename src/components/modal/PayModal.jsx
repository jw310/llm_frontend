import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

// forwardRef 讓父元件存取子元件的 ref
const PayModal = forwardRef(({ options, onChange }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const { control, watch, setValue } = useForm({
    defaultValues: { checks: [] },
  });

  const selected = watch('checks') || [];
  const maxSelected = selected.length >= 3;

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  // 針對一個 react component 定義他要暴露的任何屬性
  // 在 react component 的外部元件(父元件)可以直接存取 ref.current.open() 或 ref.current.close()
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='w-11/12 max-w-[336px] rounded-lg bg-white p-7 shadow'>
        <div className='relative pb-2'>
          <h2 className='text-lg font-semibold'>Pay Method</h2>
          <button
            className='absolute -top-3 right-0 rotate-45 text-2xl'
            onClick={() => setIsOpen(false)}
          >
            +
          </button>
        </div>
        <hr className='my-3' />
        <p className='mb-4 text-gray-500'>Choose up to three payment methods</p>

        <div className='space-y-3'>
          {options.map((opt) => (
            <label key={opt.id} className='flex items-center'>
              <Controller
                control={control}
                name='checks'
                render={({ field: { value } }) => (
                  <input
                    type='checkbox'
                    value={opt}
                    checked={value.includes(opt.id)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const checkedArray = checked
                        ? [...value, opt.id]
                        : value.filter((v) => v !== opt.id);
                      console.log('checkedArray', checkedArray);
                      setValue('checks', checkedArray);
                    }}
                    disabled={!value.includes(opt.id) && maxSelected}
                    className='form-checkbox'
                  />
                )}
              />
              <div className='ml-4 flex items-center'>
                <img src={opt.img} alt={opt.name} className='h-6 w-6' />
                <span className='ml-3'>{opt.name}</span>
              </div>
            </label>
          ))}
        </div>

        <button
          disabled={selected.length === 0}
          className='mt-6 w-full rounded-md bg-blue-600 py-2 text-white disabled:opacity-50'
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
});

export default PayModal;
