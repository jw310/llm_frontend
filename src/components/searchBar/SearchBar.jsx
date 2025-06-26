import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { cn } from '@/utils/clsx';

const SearchBar = ({ value = '', onChange, placeholder, customStyle }) => {
  const onChangeHandler = (e) => {
    onChange(e.target.value.trim());
  };

  return (
    <>
      <div className={cn('w-fit')}>
        <div className={cn('relative flex items-center')}>
          <input
            type='text'
            value={value}
            className={cn(
              'block h-12 rounded-lg border border-gray-300 bg-white p-3 pl-4 text-black',
              customStyle
            )}
            placeholder={placeholder}
            onChange={onChangeHandler}
          />
          <MagnifyingGlassIcon
            className={cn('absolute right-3 h-4 text-gray-400')}
          />
          {/* <div className={cn('absolute right-3 h-6 text-gray-400')}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M5.89805 10.789C5.89805 9.49183 6.41335 8.24778 7.33059 7.33054C8.24784 6.4133 9.49188 5.898 10.7891 5.898C12.0862 5.898 13.3303 6.4133 14.2475 7.33054C15.1648 8.24778 15.6801 9.49183 15.6801 10.789C15.6801 12.0862 15.1648 13.3302 14.2475 14.2475C13.3303 15.1647 12.0862 15.68 10.7891 15.68C9.49188 15.68 8.24784 15.1647 7.33059 14.2475C6.41335 13.3302 5.89805 12.0862 5.89805 10.789ZM10.7881 4.5C9.78351 4.50019 8.79362 4.74101 7.90126 5.20231C7.00889 5.66361 6.24002 6.33197 5.65898 7.15143C5.07795 7.97088 4.70167 8.91761 4.56165 9.91234C4.42162 10.9071 4.52191 11.9209 4.85414 12.8689C5.18636 13.8169 5.74085 14.6716 6.47119 15.3613C7.20152 16.051 8.08645 16.5558 9.05191 16.8333C10.0174 17.1108 11.0352 17.153 12.0204 16.9563C13.0055 16.7597 13.9291 16.3299 14.7141 15.703L18.3071 19.295C18.3711 19.3634 18.4483 19.4183 18.534 19.4563C18.6196 19.4943 18.7121 19.5146 18.8058 19.5162C18.8995 19.5177 18.9926 19.5004 19.0795 19.4652C19.1664 19.4301 19.2453 19.3778 19.3116 19.3115C19.3779 19.2453 19.4301 19.1663 19.4653 19.0794C19.5004 18.9925 19.5178 18.8995 19.5162 18.8058C19.5147 18.712 19.4943 18.6196 19.4563 18.5339C19.4183 18.4482 19.3635 18.3711 19.2951 18.307L15.7021 14.714C16.441 13.7888 16.9038 12.6738 17.0372 11.4973C17.1706 10.3208 16.969 9.13046 16.4559 8.06337C15.9427 6.99628 15.1387 6.09573 14.1364 5.46535C13.1341 4.83496 11.9741 4.50035 10.7901 4.5H10.7881Z'
                fill='black'
              />
            </svg>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
