import { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { cn } from '@/utils/clsx';

function CheckboxForm() {
  const formRef = useRef(null);

  // const [options, setOptions] = useState([
  //   {
  //     value: '1',
  //     name: 'Option 1',
  //     checked: false
  //   },
  //   {
  //     value: '2',
  //     name: 'Option 2',
  //     checked: false
  //   }
  // ])

  const options = [
    {
      value: '1',
      name: 'Option 1',
      checked: false
    },
    {
      value: '2',
      name: 'Option 2',
      checked: false
    }
  ]

  const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
    } = useForm(
      // { defaultValues: { 'my-checkbox': [ ],} }
    );

    function handleChange(event) {
      // const updatedOptions = options.map(option => {
      //   if (option.value === event.target.value) {
      //     return { ...option, checked: event.target.checked };
      //   }
      //   return option;
      // });
      // setOptions(updatedOptions);
      // console.log(updatedOptions);

      formRef.current.dispatchEvent(new Event('submit', { bubbles: true }));
      // console.log(event.target.checked);
    }

  const onSubmit = async (data) => {
    console.log(data);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <div>
        {
          options.map(({name, value}, index) => (
            <label htmlFor={name} key={index}
              // className={cn('block w-fit h-10 p-2 border-2 rounded-md',
              //   'checkbox-label',
              // )}
            >
              <div>
                <input
                  {...register(name, value)}
                  type="checkbox"
                  id={name}
                  name={name}
                  value={value}
                  onChange={handleChange}
                  // className={cn('hidden')}
                />
                {/* {errors?.[name]?.type && (
                  <p className={cn('whitespace-nowrap text-red-500')}>
                    {errors?.[name]?.message}
                  </p>
                )} */}
                {name}
              </div>
            </label>
          ))
        }
      </div>
    </form>
  );
}

export default CheckboxForm;