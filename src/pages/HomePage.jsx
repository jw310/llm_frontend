import { useState, useRef } from 'react';

import DatePickerForm from '@/components/form/datePickerForm';
import PayModal from '@/components/modal/PayModal';

const checkboxOptions = [
  { id: 'cash', img: 'ic_pay_cash_24', name: '現金' },
  { id: 'jko', img: 'ic_pay_jko_24', name: '街口支付' },
  { id: 'line', img: 'ic_pay_line_24', name: 'LINE Pay' },
  { id: 'bank', img: 'ic_pay_bank', name: '銀行轉帳' },
  { id: 'wechat', img: 'ic_pay_wechat', name: '微信支付' },
  { id: 'ali', img: 'ic_pay_ali', name: '支付寶' },
  { id: 'other', img: 'ic_pay_other_24', name: '其他' },
];

const HomePage = () => {
  const modalRef = useRef();
  const [selected, setSelected] = useState([]);

  return (
    <>
      <DatePickerForm />
      {/* <div className='min-h-screen bg-gray-100 p-4'>
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
    </>
  );
};

export default HomePage;
