import { useTranslation } from "react-i18next";

import TablesNodataPng from '@/assets/tables_nodata_images.svg'
// import BadgesErrorIcon from '@/assets/tables_Badges_error_icon.svg'
import FixedTooltip from '@/components/tooltip/FixedTooltip';

import { cn } from '@/utils/clsx';
import useWindowMeasurer from '@/hooks/useWindowMeasurer';

const Table = ({ tableHead, tableData }) => {
    const { t } = useTranslation();
    let windowWidth = useWindowMeasurer();

    const stateMap = (state) => {
        let mapping = {
            0: 'unUsed',
            1: 'normal',
            2: 'connectError',
            3: 'systemError',
            4: 'ipError'
        }
        return mapping[state]
    };

    return (
        <div>
            <div className={cn("hidden h-10 px-5 md:grid justify-center items-center",
                "rounded-t-lg text-gray-900 bg-gray-300",
                tableHead.length && `md:grid-cols-${tableHead.length}`)}
            >
                {
                    tableHead.map((item, index) => {
                        return <div key={index}>{t(item)}</div>
                    })
                }
            </div>
            {
                tableData.length !== 0 &&
                <div className={cn('md:h-[764px]')}>
                    {
                        tableData.map((item, index) => {
                            return (
                            <div className={cn("md:h-[72px] grid grid-cols-1 justify-center items-center px-5",
                                "text-gray-100 border-b-[1px] border-gray-600 bg-gray-600 whitespace-nowrap",
                                tableHead.length && `md:grid-cols-${tableHead.length}`)}
                                key={index}
                            >
                                <div className={cn("w-ful py-2 flex justify-start items-center whitespace-normal text-base",
                                    "before:content-[attr(data-title)] before:block before:w-1/2 before:text-gray-300 before:bg-gray-600",
                                    "md:flex-none md:justify-normal md:items-baseline md:py-0 md:text-base md:before:hidden")}
                                    data-title={t(tableHead[0])}
                                >
                                    { tableHead.length === 3 && item.updateTime }
                                    { tableHead.length === 4 && item.sn }
                                    { tableHead.length === 5 && item.date }
                                    { tableHead.length === 6 && item.sn }
                                </div>
                                {
                                    tableHead.length === 3 &&
                                    <div className={cn("flex justify-start items-center w-full py-2 text-base",
                                        "before:content-[attr(data-title)] before:block before:w-1/2 before:text-gray-300 before:bg-gray-600",
                                        "md:flex-none md:justify-normal md:w-full md:py-0 md:text-base md:before:hidden")}
                                        data-title={t(tableHead[1])}
                                    >
                                        {
                                            <div className={cn("flex justify-center items-center")}>
                                                <span className={cn("block h-[28px] mr-2 px-2 py-[2px] border-2 text-xs text-center rounded-[16px]",
                                                    item.state === 1 && 'text-green-500 bg-green-100',
                                                    item.state === 2 && 'text-red-500 bg-red-100',
                                                    item.state === 4 && 'text-red-600 bg-yellow-600')}
                                                >
                                                    {t(stateMap(item.state))}
                                                </span>
                                                {
                                                    windowWidth > 1439 && item.state !== 1 &&
                                                    <div className={cn('infoHover flex whitespace-normal cursor-pointer')}>
                                                        <FixedTooltip text={ item.state === 2 ? 'sdn.noCheck' : 'sdn.ipAbnormal' }>
                                                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.99996 5.83317C9.77895 5.83317 9.56699 5.92097 9.41071 6.07725C9.25443 6.23353 9.16663 6.44549 9.16663 6.6665V9.99984C9.16663 10.2209 9.25443 10.4328 9.41071 10.5891C9.56699 10.7454 9.77895 10.8332 9.99996 10.8332C10.221 10.8332 10.4329 10.7454 10.5892 10.5891C10.7455 10.4328 10.8333 10.2209 10.8333 9.99984V6.6665C10.8333 6.44549 10.7455 6.23353 10.5892 6.07725C10.4329 5.92097 10.221 5.83317 9.99996 5.83317ZM10.7666 13.0165C10.7484 12.9634 10.7232 12.913 10.6916 12.8665L10.5916 12.7415C10.4744 12.6259 10.3256 12.5475 10.164 12.5164C10.0023 12.4853 9.83506 12.5027 9.6833 12.5665C9.58231 12.6087 9.4893 12.6679 9.4083 12.7415C9.33106 12.8194 9.26996 12.9117 9.22849 13.0132C9.18702 13.1148 9.166 13.2235 9.16663 13.3332C9.16795 13.4421 9.1906 13.5497 9.2333 13.6498C9.27072 13.7533 9.33044 13.8472 9.4082 13.9249C9.48597 14.0027 9.57988 14.0624 9.6833 14.0998C9.78305 14.1439 9.8909 14.1667 9.99996 14.1667C10.109 14.1667 10.2169 14.1439 10.3166 14.0998C10.42 14.0624 10.514 14.0027 10.5917 13.9249C10.6695 13.8472 10.7292 13.7533 10.7666 13.6498C10.8093 13.5497 10.832 13.4421 10.8333 13.3332C10.8374 13.2777 10.8374 13.222 10.8333 13.1665C10.8189 13.1134 10.7965 13.0628 10.7666 13.0165ZM9.99996 1.6665C8.35179 1.6665 6.74062 2.15525 5.37021 3.07092C3.9998 3.9866 2.9317 5.28809 2.30097 6.81081C1.67024 8.33353 1.50521 10.0091 1.82675 11.6256C2.1483 13.2421 2.94197 14.727 4.10741 15.8924C5.27284 17.0578 6.7577 17.8515 8.37421 18.173C9.99072 18.4946 11.6663 18.3296 13.189 17.6988C14.7117 17.0681 16.0132 16 16.9289 14.6296C17.8446 13.2592 18.3333 11.648 18.3333 9.99984C18.3333 8.90549 18.1177 7.82186 17.699 6.81081C17.2802 5.79976 16.6663 4.8811 15.8925 4.10728C15.1187 3.33346 14.2 2.71963 13.189 2.30084C12.1779 1.88205 11.0943 1.6665 9.99996 1.6665ZM9.99996 16.6665C8.68142 16.6665 7.39249 16.2755 6.29616 15.543C5.19983 14.8104 4.34535 13.7692 3.84077 12.5511C3.33618 11.3329 3.20416 9.99244 3.46139 8.69924C3.71863 7.40603 4.35357 6.21814 5.28592 5.28579C6.21827 4.35344 7.40615 3.7185 8.69936 3.46127C9.99257 3.20403 11.333 3.33606 12.5512 3.84064C13.7694 4.34522 14.8105 5.19971 15.5431 6.29604C16.2756 7.39236 16.6666 8.6813 16.6666 9.99984C16.6666 11.7679 15.9643 13.4636 14.714 14.7139C13.4638 15.9641 11.7681 16.6665 9.99996 16.6665Z" fill="#465465"/>
                                                            </svg>
                                                        </FixedTooltip>
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                }
                                {
                                    tableHead.length === 4 &&
                                    <div className={cn("flex justify-start items-center w-full py-2 text-base",
                                        "before:content-[attr(data-title)] before:block before:w-1/2 before:text-gray-300 before:bg-gray-900",
                                        "md:flex-none md:justify-normal md:w-full md:py-0 md:text-base md:before:hidden")}
                                        data-title={t(tableHead[1])}
                                    >
                                    { tableHead.length === 4 && item.totalFlow }
                                    </div>
                                }
                                {
                                    tableHead.length === 5 &&
                                    <div className={cn("flex justify-start items-center w-full py-2 text-base",
                                        "before:content-[attr(data-title)] before:block before:w-1/2 before:text-gray-300 before:bg-gray-900",
                                        "md:flex-none md:justify-normal md:w-full md:py-0 md:text-base md:before:hidden")}
                                        data-title={t(tableHead[1])}
                                    >
                                    { tableHead.length === 5 && item.totalFlow }
                                    </div>
                                }
                                {
                                    tableHead.length === 6 &&
                                    <div className={cn("flex justify-start items-center w-full py-2 text-base",
                                        "before:content-[attr(data-title)] before:block before:w-1/2 before:text-gray-300 before:bg-gray-900",
                                        "md:flex-none md:justify-normal md:w-full md:py-0 md:text-base md:before:hidden")}
                                        data-title={t(tableHead[1])}
                                    >
                                        {
                                            <div className='flex justify-center items-center'>
                                                <span className={cn("block h-[28px] mr-2 px-2 py-[2px] border-2 text-xs text-center rounded-[16px]",
                                                    item.state === 1 && 'text-green-500 bg-green-100',
                                                    item.state === 2 && 'text-red-500 bg-red-100',
                                                    item.state === 4 && 'text-red-600 bg-yellow-600')}
                                                >
                                                    {t(stateMap(item.state))}
                                                </span>
                                                {
                                                    windowWidth > 1439 && item.state !== 1 &&
                                                    <div className={cn('infoHover flex cursor-pointer whitespace-normal')}>
                                                        <FixedTooltip text={ item.state === 2 ? 'sdn.noCheck' : 'sdn.ipAbnormal' }>
                                                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.99996 5.83317C9.77895 5.83317 9.56699 5.92097 9.41071 6.07725C9.25443 6.23353 9.16663 6.44549 9.16663 6.6665V9.99984C9.16663 10.2209 9.25443 10.4328 9.41071 10.5891C9.56699 10.7454 9.77895 10.8332 9.99996 10.8332C10.221 10.8332 10.4329 10.7454 10.5892 10.5891C10.7455 10.4328 10.8333 10.2209 10.8333 9.99984V6.6665C10.8333 6.44549 10.7455 6.23353 10.5892 6.07725C10.4329 5.92097 10.221 5.83317 9.99996 5.83317ZM10.7666 13.0165C10.7484 12.9634 10.7232 12.913 10.6916 12.8665L10.5916 12.7415C10.4744 12.6259 10.3256 12.5475 10.164 12.5164C10.0023 12.4853 9.83506 12.5027 9.6833 12.5665C9.58231 12.6087 9.4893 12.6679 9.4083 12.7415C9.33106 12.8194 9.26996 12.9117 9.22849 13.0132C9.18702 13.1148 9.166 13.2235 9.16663 13.3332C9.16795 13.4421 9.1906 13.5497 9.2333 13.6498C9.27072 13.7533 9.33044 13.8472 9.4082 13.9249C9.48597 14.0027 9.57988 14.0624 9.6833 14.0998C9.78305 14.1439 9.8909 14.1667 9.99996 14.1667C10.109 14.1667 10.2169 14.1439 10.3166 14.0998C10.42 14.0624 10.514 14.0027 10.5917 13.9249C10.6695 13.8472 10.7292 13.7533 10.7666 13.6498C10.8093 13.5497 10.832 13.4421 10.8333 13.3332C10.8374 13.2777 10.8374 13.222 10.8333 13.1665C10.8189 13.1134 10.7965 13.0628 10.7666 13.0165ZM9.99996 1.6665C8.35179 1.6665 6.74062 2.15525 5.37021 3.07092C3.9998 3.9866 2.9317 5.28809 2.30097 6.81081C1.67024 8.33353 1.50521 10.0091 1.82675 11.6256C2.1483 13.2421 2.94197 14.727 4.10741 15.8924C5.27284 17.0578 6.7577 17.8515 8.37421 18.173C9.99072 18.4946 11.6663 18.3296 13.189 17.6988C14.7117 17.0681 16.0132 16 16.9289 14.6296C17.8446 13.2592 18.3333 11.648 18.3333 9.99984C18.3333 8.90549 18.1177 7.82186 17.699 6.81081C17.2802 5.79976 16.6663 4.8811 15.8925 4.10728C15.1187 3.33346 14.2 2.71963 13.189 2.30084C12.1779 1.88205 11.0943 1.6665 9.99996 1.6665ZM9.99996 16.6665C8.68142 16.6665 7.39249 16.2755 6.29616 15.543C5.19983 14.8104 4.34535 13.7692 3.84077 12.5511C3.33618 11.3329 3.20416 9.99244 3.46139 8.69924C3.71863 7.40603 4.35357 6.21814 5.28592 5.28579C6.21827 4.35344 7.40615 3.7185 8.69936 3.46127C9.99257 3.20403 11.333 3.33606 12.5512 3.84064C13.7694 4.34522 14.8105 5.19971 15.5431 6.29604C16.2756 7.39236 16.6666 8.6813 16.6666 9.99984C16.6666 11.7679 15.9643 13.4636 14.714 14.7139C13.4638 15.9641 11.7681 16.6665 9.99996 16.6665Z" fill="#465465"/>
                                                            </svg>
                                                        </FixedTooltip>
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                }
                                <div className={cn("flex justify-start items-center w-full py-2 text-base",
                                    "before:content-[attr(data-title)] before:block before:w-1/2 before:text-gray-300 before:bg-gray-900",
                                    "md:flex-none md:justify-normal md:w-full md:py-0 md:text-base md:before:hidden")}
                                    data-title={t(tableHead[2])}
                                >
                                    { tableHead.length === 3 && item.ip }
                                    { tableHead.length === 4 && item.totalUsdt }
                                    { tableHead.length === 5 && item.totalUsdt }
                                    { tableHead.length === 6 && item.ip }
                                </div>
                                {
                                    tableHead.length === 4 &&
                                    <div className={cn("flex justify-start items-center w-full py-2 text-base",
                                        "before:content-[attr(data-title)] before:block before:w-1/2 before:text-gray-300 before:bg-gray-900",
                                        "md:flex-none md:justify-normal md:w-full md:py-0 md:text-base md:before:hidden")}
                                        data-title={t(tableHead[3])}
                                    >
                                        {item.totalArac}
                                    </div>
                                }
                                {
                                    tableHead.length === 5 &&
                                    <div className={cn("flex justify-start items-center w-full py-2 text-base",
                                        "before:content-[attr(data-title)] before:block before:w-1/2 before:text-gray-300 before:bg-gray-900",
                                        "md:flex-none md:justify-normal md:w-full md:py-0 md:text-base md:before:hidden")}
                                        data-title={t(tableHead[3])}
                                    >
                                        { item.totalArac }
                                    </div>
                                }
                                {
                                    tableHead.length === 6 &&
                                    <div className={cn("flex justify-start items-center w-full py-2 text-base",
                                        "before:content-[attr(data-title)] before:block before:w-1/2 before:text-gray-300 before:bg-gray-900",
                                        "md:flex-none md:justify-normal md:w-full md:py-0 md:text-base md:before:hidden")}
                                        data-title={t(tableHead[3])}
                                    >
                                        { item.syncTime }
                                    </div>
                                }
                                {
                                    tableHead.length === 5 &&
                                    <div className={cn("flex justify-start items-center w-full py-2 text-base",
                                        "before:content-[attr(data-title)] before:block before:w-1/2 before:text-gray-300 before:bg-gray-900",
                                        "md:flex-none md:justify-normal md:w-full md:py-0 md:text-base md:before:hidden")}
                                        data-title={t(tableHead[4])}
                                    >
                                        <button className={cn("text-title-m leading-6 text-yellow-500 cursor-pointer")}>
                                            {t('miner.more')}
                                        </button>
                                    </div>
                                }
                                {
                                    tableHead.length > 5 &&
                                    <div className={cn("flex justify-start items-center w-full py-2 text-base",
                                        "before:content-[attr(data-title)] before:block before:w-1/2 before:text-gray-300 before:bg-gray-900",
                                        "md:flex-none md:justify-normal md:w-full md:py-0 md:text-base md:before:hidden")}
                                        data-title={t(tableHead[4])}
                                    >
                                        {item.loginTime}
                                    </div>
                                }
                                {
                                    tableHead.length > 5 &&
                                    <div className={cn("flex justify-start items-center w-full py-2 text-base",
                                        "before:content-[attr(data-title)] before:block before:w-1/2 before:text-gray-300 before:bg-gray-900",
                                        "md:flex-none md:justify-normal md:w-full md:py-0 md:text-base md:before:hidden")}
                                        data-title={t(tableHead[3])}
                                    >
                                        <button className={cn("mr-3 text-title-m leading-6 text-yellow-500 cursor-pointer")}>
                                            {t('sdn.more')}
                                        </button>
                                        <button className={cn("text-title-m leading-6 text-gray-400 cursor-pointer")}>
                                            {t('sdn.delete')}
                                        </button>
                                    </div>
                                }
                            </div>
                            );
                        })
                    }
                </div>
            }
            {
                tableData.length === 0 &&
                <div className={cn("w-full md:h-[764px] flex justify-center items-center")}>
                    <div className={cn("flex flex-col justify-center items-center")}>
                        <img src={TablesNodataPng} alt="svg" width={124} height={144} priority />
                        <h3 className={cn("mt-10 md:text-xl text-gray-100")}>{t('table.noInfo')}</h3>
                    </div>
                </div>

            }
        </div>
    );
};

export default Table;