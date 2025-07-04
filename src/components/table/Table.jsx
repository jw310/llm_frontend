import { useState } from 'react';
// import { useNavigate, useParams } from 'react-router';
// import { useQuery } from '@tanstack/react-query';

import DetailModal from '@/components/modal/DetailModal.jsx';
import TablesNodataPng from '@/assets/tables_nodata_images.svg';

import { cn } from '@/utils/clsx';
// import { getOfferInfoByIdApi } from '@/api/api';

const tableHeader = ['單號', '假別', '時長', '功能'];

function Table({ tableHead = tableHeader, tableData }) {
  const [showDetailModal, setShowDetailModal] = useState(false);

  tableHead ? tableHead : tableHeader;
  // const {
  //   data: offerDetailsData,
  //   isFetching,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ['offerDetails', recordId],
  //   queryFn: () => getOfferInfoByIdApi(recordId),
  //   refetchOnWindowFocus: false,
  //   enabled: !!recordId,
  // });

  const handleDetailClick = (id) => {
    setShowDetailModal((prev) => !prev);
    // if (showDetailModal) {
    //   return navigate('/staff/leave/record');
    // }
    // navigate(`/staff/leave/record/${id}`);
  };

  let tableContent;

  if (tableData?.length > 0) {
    tableContent = tableData?.map((item, index) => (
      <tr
        key={index}
        className={cn(
          'border-b-2 border-slate-200 last:border-b-0 even:bg-slate-50'
        )}
      >
        <td className={cn('p-4 text-center')}>{item.date}</td>
        <td className={cn('text-center')}>{item.title}</td>
        <td className={cn('text-center')}>
          <div
            className={cn(
              'mx-auto w-fit rounded-2xl bg-[#EDFCF3] p-[4px_10px] font-bold',
              item.status === 'enabled'
                ? 'text-[#0B9052]'
                : 'bg-[#FBF0EF] text-[#CB3023]'
            )}
          >
            {item.status}
          </div>
        </td>
        <td className={cn('text-center')}>
          <button
            onClick={() => handleDetailClick(item.offerId)}
            className={cn(
              'ml-2 h-fit w-fit cursor-pointer rounded bg-indigo-500 px-4 py-2 text-white hover:bg-yellow-500 hover:text-black'
            )}
          >
            Detail
          </button>
        </td>
      </tr>
    ));
  } else {
    tableContent = (
      <tr>
        <td colSpan={4}>
          <div className={cn('flex flex-col items-center justify-center p-4')}>
            <img
              src={TablesNodataPng}
              alt='no-data'
              className={cn('h-[200px] w-[200px] object-contain')}
            />
            <p className={cn('text-lg font-medium text-slate-500')}>No Data</p>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <>
      <table className={cn('h-fit w-full bg-white text-sm')}>
        <thead className={cn('bg-sky-100 text-slate-500')}>
          <tr className={cn('border-b-2 border-slate-200')}>
            {tableHead?.map((item) => (
              <th key={item} className={cn('h-fit w-1/4 p-2')}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
      {showDetailModal && (
        <DetailModal
          // detailFrom='leaveRecord'
          // data={offerDetailsData}
          // isFetching={isFetching}
          // isLoading={isLoading}
          onCloseClick={handleDetailClick}
        />
      )}
    </>
  );
}

export default Table;
