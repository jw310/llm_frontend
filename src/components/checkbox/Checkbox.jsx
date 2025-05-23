import { cn } from '@/utils/clsx';
import { Controller } from 'react-hook-form';

function Checkbox({ name, control, rules = {} }) {

  return (
      <div className={cn('')}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value, name }, fieldState: { error } }) => (
          <label htmlFor={name}
              // className={cn('block w-fit h-10 p-2 border-2 rounded-md',
              //   'checkbox-label',
              // )}
            >
              <div>
                <input
                  type="checkbox"
                  id={name}
                  name={name}
                  checked={value || false }
                  onChange={(e) => {
                    onChange(e.target.checked)
                    // if (onSubmit) {
                    //   onSubmit()
                    // }
                  }}
                  // className={cn('hidden')}
                />
                {error && (
                  <p className={cn('whitespace-nowrap text-red-500')}>
                    {error.message}
                  </p>
                )}
                {name}
              </div>
            </label>
        )}
      />
    </div>
  );
}

export default Checkbox;