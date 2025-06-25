import { useState, useEffect } from 'react';

import { cn } from '@/utils/clsx';
function CountdownTimer({ days, hours, minutes, seconds }) {
  // 設定倒數計時的目標時間
  const getTargetTime = () => {
    const now = new Date();
    return new Date(
      now.getTime() +
        days * 24 * 60 * 60 * 1000 +
        hours * 60 * 60 * 1000 +
        minutes * 60 * 1000 +
        seconds * 1000
    );
  };

  const [targetTime] = useState(getTargetTime());
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const TimeBlock = ({ value, label }) => (
    <div className={cn('flex items-center gap-2')}>
      <div className={cn('rounded-lg px-4 py-3 shadow-lg')}>
        <span
          className={cn(
            'font-mono text-4xl font-bold text-orange-400',
            value === 0 ? 'text-gray-400' : 'text-orange-400'
          )}
        >
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span
        className={cn(
          'text-2xl font-medium',
          value === 0 ? 'text-gray-400' : 'text-black'
        )}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div className='flex flex-wrap gap-6'>
      <TimeBlock value={timeLeft.days} label='天' />
      <TimeBlock value={timeLeft.hours} label='時' />
      <TimeBlock value={timeLeft.minutes} label='分' />
      <TimeBlock value={timeLeft.seconds} label='秒' />
    </div>
  );
}

export default CountdownTimer;
