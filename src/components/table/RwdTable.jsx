import { useTranslation } from 'react-i18next';

import TablesNodataPng from '@/assets/tables_nodata_images.svg';
// import BadgesErrorIcon from '@/assets/tables_Badges_error_icon.svg'
import FixedTooltip from '@/components/tooltip/FixedTooltip';

import { cn } from '@/utils/clsx';
import useWindowMeasurer from '@/hooks/useWindowMeasurer';

const tableHeader = ['單號', '假別', '時長', '功能'];

const RwdTable = ({ tableHead = tableHeader, tableData }) => {
  const { t } = useTranslation();
  let windowWidth = useWindowMeasurer();

  const stateMap = (state) => {
    let mapping = {
      0: 'unUsed',
      1: 'normal',
      2: 'error',
    };
    return mapping[state];
  };

  return (
    <div>
      <div
        className={cn(
          'hidden h-10 items-center justify-center px-5 md:grid',
          'rounded-t-lg bg-gray-300 text-gray-900',
          tableHead.length === 3 && 'md:grid-cols-3',
          tableHead.length === 4 && 'md:grid-cols-4',
          tableHead.length === 5 && 'md:grid-cols-5',
          tableHead.length === 6 && 'md:grid-cols-6'
        )}
      >
        {tableHead?.map((item, index) => {
          return <div key={index}>{t(item)}</div>;
        })}
      </div>
      {tableData.length !== 0 && (
        <div className={cn('')}>
          {tableData.map((item, index) => {
            return (
              <div
                className={cn(
                  'grid grid-cols-1 items-center justify-center px-5 md:h-[72px]',
                  'border-b-[1px] border-gray-600 bg-gray-400 whitespace-nowrap text-gray-100',
                  tableHead.length === 3 && 'md:grid-cols-3',
                  tableHead.length === 4 && 'md:grid-cols-4',
                  tableHead.length === 5 && 'md:grid-cols-5',
                  tableHead.length === 6 && 'md:grid-cols-6'
                )}
                key={index}
              >
                <div
                  className={cn(
                    'flex w-full items-center justify-start py-2 text-base whitespace-normal',
                    'before:block before:w-1/2 before:bg-gray-600 before:text-gray-300 before:content-[attr(data-title)]',
                    'md:flex-none md:items-baseline md:justify-normal md:py-0 md:text-base md:before:hidden'
                  )}
                  data-title={t(tableHead[0])}
                >
                  {item.date}
                </div>
                {tableHead.length === 3 && (
                  <div
                    className={cn(
                      'flex w-full items-center justify-start py-2 text-base',
                      'before:block before:w-1/2 before:bg-gray-600 before:text-gray-300 before:content-[attr(data-title)]',
                      'md:w-full md:flex-none md:justify-normal md:py-0 md:text-base md:before:hidden'
                    )}
                    data-title={t(tableHead[1])}
                  >
                    {
                      <div className={cn('flex items-center justify-center')}>
                        <span
                          className={cn(
                            'mr-2 block h-[28px] rounded-[16px] border-2 px-2 py-[2px] text-center text-xs',
                            item.state === 1 && 'bg-green-100 text-green-500',
                            item.state === 2 && 'bg-red-100 text-red-500',
                            item.state === 4 && 'bg-yellow-600 text-red-600'
                          )}
                        >
                          {stateMap(item.state)}
                        </span>
                        {windowWidth > 1439 && item.state !== 1 && (
                          <div
                            className={cn(
                              'infoHover flex cursor-pointer whitespace-normal'
                            )}
                          >
                            <FixedTooltip
                              text={item.state === 2 ? 'error' : 'ip'}
                            >
                              <svg
                                width='16'
                                height='16'
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M9.99996 5.83317C9.77895 5.83317 9.56699 5.92097 9.41071 6.07725C9.25443 6.23353 9.16663 6.44549 9.16663 6.6665V9.99984C9.16663 10.2209 9.25443 10.4328 9.41071 10.5891C9.56699 10.7454 9.77895 10.8332 9.99996 10.8332C10.221 10.8332 10.4329 10.7454 10.5892 10.5891C10.7455 10.4328 10.8333 10.2209 10.8333 9.99984V6.6665C10.8333 6.44549 10.7455 6.23353 10.5892 6.07725C10.4329 5.92097 10.221 5.83317 9.99996 5.83317ZM10.7666 13.0165C10.7484 12.9634 10.7232 12.913 10.6916 12.8665L10.5916 12.7415C10.4744 12.6259 10.3256 12.5475 10.164 12.5164C10.0023 12.4853 9.83506 12.5027 9.6833 12.5665C9.58231 12.6087 9.4893 12.6679 9.4083 12.7415C9.33106 12.8194 9.26996 12.9117 9.22849 13.0132C9.18702 13.1148 9.166 13.2235 9.16663 13.3332C9.16795 13.4421 9.1906 13.5497 9.2333 13.6498C9.27072 13.7533 9.33044 13.8472 9.4082 13.9249C9.48597 14.0027 9.57988 14.0624 9.6833 14.0998C9.78305 14.1439 9.8909 14.1667 9.99996 14.1667C10.109 14.1667 10.2169 14.1439 10.3166 14.0998C10.42 14.0624 10.514 14.0027 10.5917 13.9249C10.6695 13.8472 10.7292 13.7533 10.7666 13.6498C10.8093 13.5497 10.832 13.4421 10.8333 13.3332C10.8374 13.2777 10.8374 13.222 10.8333 13.1665C10.8189 13.1134 10.7965 13.0628 10.7666 13.0165ZM9.99996 1.6665C8.35179 1.6665 6.74062 2.15525 5.37021 3.07092C3.9998 3.9866 2.9317 5.28809 2.30097 6.81081C1.67024 8.33353 1.50521 10.0091 1.82675 11.6256C2.1483 13.2421 2.94197 14.727 4.10741 15.8924C5.27284 17.0578 6.7577 17.8515 8.37421 18.173C9.99072 18.4946 11.6663 18.3296 13.189 17.6988C14.7117 17.0681 16.0132 16 16.9289 14.6296C17.8446 13.2592 18.3333 11.648 18.3333 9.99984C18.3333 8.90549 18.1177 7.82186 17.699 6.81081C17.2802 5.79976 16.6663 4.8811 15.8925 4.10728C15.1187 3.33346 14.2 2.71963 13.189 2.30084C12.1779 1.88205 11.0943 1.6665 9.99996 1.6665ZM9.99996 16.6665C8.68142 16.6665 7.39249 16.2755 6.29616 15.543C5.19983 14.8104 4.34535 13.7692 3.84077 12.5511C3.33618 11.3329 3.20416 9.99244 3.46139 8.69924C3.71863 7.40603 4.35357 6.21814 5.28592 5.28579C6.21827 4.35344 7.40615 3.7185 8.69936 3.46127C9.99257 3.20403 11.333 3.33606 12.5512 3.84064C13.7694 4.34522 14.8105 5.19971 15.5431 6.29604C16.2756 7.39236 16.6666 8.6813 16.6666 9.99984C16.6666 11.7679 15.9643 13.4636 14.714 14.7139C13.4638 15.9641 11.7681 16.6665 9.99996 16.6665Z'
                                  fill='#fff'
                                />
                              </svg>
                            </FixedTooltip>
                          </div>
                        )}
                      </div>
                    }
                  </div>
                )}
                <div
                  className={cn(
                    'flex w-full items-center justify-start py-2 text-base',
                    'before:block before:w-1/2 before:bg-gray-600 before:text-gray-300 before:content-[attr(data-title)]',
                    'md:w-full md:flex-none md:justify-normal md:py-0 md:text-base md:before:hidden'
                  )}
                  data-title={t(tableHead[2])}
                >
                  {item.title}
                </div>
                {tableHead.length === 4 && (
                  <div
                    className={cn(
                      'flex w-full items-center justify-start py-2 text-base',
                      'before:block before:w-1/2 before:bg-gray-900 before:text-gray-300 before:content-[attr(data-title)]',
                      'md:w-full md:flex-none md:justify-normal md:py-0 md:text-base md:before:hidden'
                    )}
                    data-title={t(tableHead[3])}
                  >
                    {item.title}
                  </div>
                )}
                <div
                  className={cn(
                    'flex w-full items-center justify-start py-2 text-base',
                    'before:block before:w-1/2 before:bg-gray-600 before:text-gray-300 before:content-[attr(data-title)]',
                    'md:w-full md:flex-none md:justify-normal md:py-0 md:text-base md:before:hidden'
                  )}
                  data-title={t(tableHead[3])}
                >
                  <button
                    className={cn(
                      'text-title-m mr-3 cursor-pointer leading-6 text-yellow-500'
                    )}
                  >
                    more
                  </button>
                </div>
                {tableHead.length === 5 && (
                  <div
                    className={cn(
                      'flex w-full items-center justify-start py-2 text-base',
                      'before:block before:w-1/2 before:bg-gray-900 before:text-gray-300 before:content-[attr(data-title)]',
                      'md:w-full md:flex-none md:justify-normal md:py-0 md:text-base md:before:hidden'
                    )}
                    data-title={t(tableHead[3])}
                  >
                    {item.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {tableData.length === 0 && (
        <div
          className={cn('flex w-full items-center justify-center md:h-[764px]')}
        >
          <div className={cn('flex flex-col items-center justify-center')}>
            <img
              src={TablesNodataPng}
              alt='svg'
              width={124}
              height={144}
              priority
            />
            <h3 className={cn('mt-10 text-gray-100 md:text-xl')}>
              {t('table.noInfo')}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default RwdTable;
