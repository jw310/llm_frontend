import { useState, useRef, lazy, Suspense } from 'react';

import SearchForm from '@/components/form/SearchForm';
import PayModal from '@/components/modal/PayModal';
import TabGroup from '@/components/tab/TabGroup';
import Tab1Content from '@/components/tab/Tab1Content';
import Tab2Content from '@/components/tab/Tab2Content';
import PriceCard from '@/components/card/PriceCard';
import PrintBtn from '@/components/print/PrintBtn';
import Print from '@/components/print/Print';
import Count from '@/components/Count';
import CountdownTimer from '@/components/CountdownTimer';
import Timeline2 from '@/components/timeline/Timeline2';
import AnimatedButton from '@/components/button/AnimatedButton';

const LazyProgressBar = lazy(() => import('@/components/progress/ProgressBar'));
const LazyProgressCircle = lazy(
  () => import('@/components/progress/ProgressCircle')
);
const LazyLineChart = lazy(() => import('@/components/chart/LineChart'));
const LazyRadarChart = lazy(() => import('@/components/chart/RadarChart'));
const LazyDeleteModal = lazy(() => import('@/components/modal/DeleteModal'));
const LazyDetailModal = lazy(() => import('@/components/modal/DetailModal'));

import { cn } from '@/utils/clsx';

const checkboxOptions = [
  { id: 'cash', img: 'ic_pay_cash_24', name: '現金' },
  { id: 'jko', img: 'ic_pay_jko_24', name: '街口支付' },
  { id: 'line', img: 'ic_pay_line_24', name: 'LINE Pay' },
  { id: 'bank', img: 'ic_pay_bank', name: '銀行轉帳' },
  { id: 'wechat', img: 'ic_pay_wechat', name: '微信支付' },
  { id: 'ali', img: 'ic_pay_ali', name: '支付寶' },
  { id: 'other', img: 'ic_pay_other_24', name: '其他' },
];

const tabs = [
  { label: 'A', content: <Tab1Content /> },
  { label: 'B', content: <Tab2Content /> },
];

const planList = [
  {
    id: '24-month',
    title: 'twoYear',
    bestPrice: true,
    NTDPrice: '60',
    USDPrice: '2.00',
  },
  {
    id: '12-month',
    title: 'oneYear',
    bestPrice: false,
    NTDPrice: '90',
    USDPrice: '3.00',
  },
  {
    id: '1-month',
    title: 'monthly',
    bestPrice: false,
    NTDPrice: '857',
    USDPrice: '28.50',
  },
];

const HomePage = () => {
  const modalRef = useRef();
  const printRef = useRef();

  const countObserverRef = useRef(null);

  const [selected, setSelected] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeleteTheme, setSelectedDeleteTheme] = useState({
    id: '1',
    name: 'Test',
  });

  const [showDetailModal, setShowDetailModal] = useState(false);

  const progress = '60';

  const timeLineList = [
    {
      title: 'First Event',
      time: '2021.06-2022.07',
      depictionTitle: 'First Event Title',
      depiction: 'This is the description for the first event.',
      isMark: false,
    },
    {
      title: 'First Event',
      time: '2021.06-2022.07',
      depictionTitle: 'First Event Title',
      depiction: 'This is the description for the first event.',
      isMark: false,
    },
    {
      title: 'First Event',
      time: '2021.06-2022.07',
      depictionTitle: 'First Event Title',
      depiction: 'This is the description for the first event.',
      isMark: false,
    },
    {
      title: 'First Event',
      time: '2021.06-2022.07',
      depictionTitle: 'First Event Title',
      depiction: 'This is the description for the first event.',
      isMark: false,
    },
    {
      title: 'First Event',
      time: '2021.06-2022.07',
      depictionTitle: 'First Event Title',
      depiction: 'This is the description for the first event.',
      isMark: true,
    },
  ];

  const handleConfirmDeleteClick = async () => {
    setShowDeleteModal((prev) => !prev);
    // const response = await removeChatbotKnowledgeByIdApi(
    //   selectedDeleteTheme.id
    // );

    // if (response.statusCode !== 200) {
    //   toggleAlert({
    //     type: 'error',
    //     message: t('knowledge.fail'),
    //   });
    // }
    // toggleAlert({
    //   type: 'success',
    //   message: t('knowledge.success'),
    //   /* 重新 query， queryFn: getChatbotKnowledgeApi queryKey: ['knowledgeData'] */
    //   refreshDataFn: () => queryClient.invalidateQueries(['knowledgeData']),
    // });
  };

  const handleConfirmClick = () => {
    setShowDetailModal((prev) => !prev);
    // setShowAlert((prev) => ({
    //   ...prev,
    //   type: 'success',
    //   message: 'Success',
    //   isShow: !prev.isShow,
    // }));

    // setTimeout(() => {
    //   setShowAlert((prev) => ({
    //     ...prev,
    //     isShow: !prev.isShow,
    //   }));
    // }, 1500);
  };

  const handleCloseClick = (type, id, name) => {
    if (type === 'deleteModal') {
      setShowDeleteModal((prev) => !prev);
      if (showDeleteModal) return;
      setSelectedDeleteTheme((prev) => {
        return { ...prev, id, name };
      });
    } else if (type === 'detailModal') {
      setShowDetailModal((prev) => !prev);
    }
  };

  return (
    <>
      <AnimatedButton />
      <Timeline2 timeLineList={timeLineList} locale='us' />
      <SearchForm />
      {showDeleteModal && (
        <LazyDeleteModal
          onCloseClick={() =>
            handleCloseClick(
              'deleteModal',
              selectedDeleteTheme.id,
              selectedDeleteTheme.name
            )
          }
          onDeleteClick={handleConfirmDeleteClick}
          selectedData={selectedDeleteTheme}
        />
      )}
      <button
        className={cn(
          'mt-1 w-fit cursor-pointer self-end rounded bg-blue-600 p-2 text-base text-white shadow-md hover:bg-yellow-500 hover:text-black'
        )}
        onClick={() => setShowDetailModal((prev) => !prev)}
      >
        {'DetailModal'}
      </button>
      {showDetailModal && (
        <LazyDetailModal
          onCloseClick={() => handleCloseClick('detailModal')}
          onConfirmClick={handleConfirmClick}
          // selectedData={selectedDeleteTheme}
        />
      )}
      <button
        className={cn(
          'mt-1 w-fit cursor-pointer self-end rounded bg-blue-600 p-2 text-base text-white shadow-md hover:bg-yellow-500 hover:text-black'
        )}
        onClick={() => setShowDeleteModal((prev) => !prev)}
      >
        {'DeleteModal'}
      </button>
      <Suspense fallback={<h2>Dynamic Loading...</h2>}>
        <LazyLineChart isExecute={true} />
      </Suspense>
      <Suspense fallback={<h2>Dynamic Loading...</h2>}>
        <LazyRadarChart isExecute={true} />
      </Suspense>
      <div
        className={cn(
          'mt-5 flex h-fit w-full flex-col items-center justify-center gap-3',
          'lg:flex-3 lg:flex-row-reverse lg:gap-4'
        )}
      >
        {planList.map((el) => (
          <PriceCard key={el.id} plan={el} />
        ))}
      </div>
      {/* <PrintBtn documentTitle='print' printContent={printRef} />
      <div ref={printRef}>
        <div className='hidden print:block'>僅列印時顯示</div>
        <div className='print:hidden'>僅畫面上顯示</div>
      </div> */}
      {/* <TabGroup tabs={tabs} /> */}
      {/* <div className='h-fit bg-gray-100 p-4'>
        <h3 className='mb-2 text-sm'>Pay Method</h3>

        <button
          onClick={() => modalRef.current.open()}
          className='mb-4 rounded bg-blue-500 px-4 py-2 text-white'
        >
          Open payment menu
        </button>

        <div className='mb-4 flex gap-2'>
          {selected.map((id) => (
            <img
              key={id}
              // src={`/assets/images/other/${id}.png`}
              alt={id}
              className='h-8 w-8'
            />
          ))}
        </div>

        <PayModal
          ref={modalRef}
          options={checkboxOptions}
          onChange={setSelected}
        />
      </div> */}
      <div>
        <Count countObserverRef={countObserverRef} />
      </div>
      <div>
        <CountdownTimer days={0} hours={0} minutes={1} seconds={0} />
      </div>
    </>
  );
};

export default HomePage;
