import { cn } from '@/utils/clsx';

const contentArray = [
  {
    src: 't11',
    title: 'A',
    content: 'AA',
  },
  {
    src: 't12',
    title: 'B',
    content: 'BB',
  },
  {
    src: 't13',
    title: 'C',
    content: 'CC',
  },
  {
    src: 't14',
    title: 'D',
    content: 'DD',
  },
];

const Tab1Content = () => {
  return (
    <>
      <div className={cn('h-full w-full bg-transparent')}>
        {contentArray.map((el, index) => (
          <div
            key={index}
            className={cn(
              'relative w-[300px] lg:flex lg:h-full lg:w-full lg:items-center lg:justify-around odd:lg:flex-row-reverse'
            )}
          >
            <div className={cn('flex justify-center lg:flex-none')}>
              <div
                className={cn(
                  'absolute h-[166px] w-[166px] lg:static lg:h-[396px] lg:w-[396px]'
                )}
              >
                <img
                  src={el.src}
                  alt={`${el.src}-image}`}
                  className={cn('opacity-50 lg:opacity-100')}
                />
              </div>
            </div>
            <div
              className={cn(
                'absolute flex flex-col items-center gap-5 p-3 lg:static lg:w-full lg:flex-1 lg:items-start lg:p-0 lg:pr-[50px]'
              )}
            >
              <h1
                className={cn(
                  'text-grey-100 text-center text-[24px] font-bold lg:text-left lg:text-[36px]'
                )}
              >
                {el.title}
              </h1>
              <p
                className={cn(
                  'mb-5 text-left text-xs leading-8 font-bold text-gray-500 lg:text-[18px] lg:leading-9 lg:font-normal'
                )}
              >
                {el.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tab1Content;
