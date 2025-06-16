import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { cn } from '@/utils/clsx';

const SearchBar = ({ value = '', onChange }) => {
  const onChangeHandler = (e) => {
    onChange(e.target.value.trim());
  };

  return (
    <>
      <div className={cn('ml-5 w-fit')}>
        <div className={cn('relative flex items-center pl-3')}>
          <input
            type='text'
            value={value}
            className={cn(
              'block rounded-lg border border-gray-100 bg-gray-200 p-3 pl-4 text-black'
            )}
            placeholder={'Please input'}
            onChange={onChangeHandler}
          />
          <MagnifyingGlassIcon
            className={cn('absolute right-3 h-4 text-gray-400')}
          />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
