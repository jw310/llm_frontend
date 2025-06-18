import { cn } from '@/utils/clsx';

const data = [
  {
    title: 'Flowbite Library v1.0.0',
    date: 'Released on December 3, 2021',
    content:
      'Get started with dozens of web components and interactive elements.',
  },
  {
    title: 'Flowbite Library v1.0.0',
    date: 'Released on December 2, 2021',
    content:
      'Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.',
  },
];

function Timeline({ vertical }) {
  if (vertical) {
    return (
      <div className={cn('px-[calc(10%)]>')}>
        <ol
          className={cn(
            'relative border-l border-gray-200 dark:border-gray-700'
          )}
        >
          {data.map((el, index) => (
            <li key={index} className={cn('mb-10 ml-6')}>
              <span
                className={cn(
                  'absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900'
                )}
              >
                <svg
                  className={cn('h-3 w-3 text-blue-600 dark:text-blue-400')}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </span>
              <h3
                className={cn(
                  'mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white'
                )}
              >
                {el.title}
                {index === 0 && (
                  <span
                    className={cn(
                      'mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-200 dark:text-blue-800'
                    )}
                  >
                    Latest
                  </span>
                )}
              </h3>
              <time
                className={cn(
                  'mb-2 block text-sm leading-none font-normal text-gray-400 dark:text-gray-500'
                )}
              >
                {el.date}
              </time>
              <p
                className={cn(
                  'mb-4 text-base font-normal text-gray-500 dark:text-gray-400'
                )}
              >
                {el.content}
              </p>
              {index === 0 && (
                <a
                  href='#'
                  className={cn(
                    'inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  )}
                >
                  <svg
                    className={cn('mr-2 h-4 w-4')}
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z'
                      clipRule='evenodd'
                    ></path>
                  </svg>{' '}
                  Download ZIP
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div>
      <ol className={cn('justify-center px-[calc(10%)] sm:flex')}>
        {data.map((el, index) => (
          <li key={index} className={cn('relative mb-6 sm:mb-0')}>
            <div className={cn('flex items-center')}>
              <div
                className={cn(
                  'z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-200 ring-0 ring-white sm:ring-8 dark:bg-blue-900 dark:ring-gray-900'
                )}
              >
                <svg
                  className={cn('h-3 w-3 text-blue-600 dark:text-blue-300')}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </div>
              <div
                className={cn(
                  'hidden h-0.5 w-full bg-gray-200 sm:flex dark:bg-gray-700'
                )}
              ></div>
            </div>
            <div className={cn('mt-3 sm:pr-8')}>
              <h3
                className={cn(
                  'text-lg font-semibold text-gray-900 dark:text-white'
                )}
              >
                {el.title}
              </h3>
              <time
                className={cn(
                  'mb-2 block text-sm leading-none font-normal text-gray-400 dark:text-gray-500'
                )}
              >
                {el.date}
              </time>
              <p
                className={cn(
                  'text-base font-normal text-gray-500 dark:text-gray-400'
                )}
              >
                {el.content}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Timeline;
