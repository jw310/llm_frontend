import { useRef, useEffect, useState } from 'react';

import toThousands from '@/utils/toThousands';
import { cn } from '@/utils/clsx';

function Count({ countObserverRef }) {
  const [counters, setCounters] = useState([
    { initialNum: 0, targetNum: 3250 },
  ]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // const section = counterObserverRef.current;
    // if (!counterObserverRef.current) return;

    const countObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting || hasAnimated) return;

        setHasAnimated(true);
        const speed = 1000;

        counters.forEach((counter, index) => {
          const updateCounter = () => {
            const targetNum = counter.targetNum;
            const addPerCount = targetNum / speed;

            setCounters((prevCounter) => {
              const newCounters = [...prevCounter];
              const currentCounter = newCounters[index];

              if (currentCounter.initialNum < targetNum) {
                currentCounter.initialNum = Math.min(
                  Math.round(currentCounter.initialNum + addPerCount),
                  targetNum
                );

                currentCounter.style = {
                  // animation: `slide-up 0.6s ease forwards ${index / counters.length + 0.5}s`,
                  // opacity: 1,
                  // transform: 'translateY(20px)',
                };

                // 如果還沒達到目標值，繼續更新
                if (currentCounter.initialNum < targetNum) {
                  setTimeout(updateCounter, 70);
                }
              }

              return newCounters;
            });
          };

          updateCounter();
        });
      },
      {
        root: null,
        threshold: 0.4,
      }
    );

    countObserver.observe(countObserverRef.current);

    return () => {
      countObserver.disconnect();
    };
  }, []);

  return (
    <div ref={countObserverRef} className='w-fit text-black'>
      <div className='space-y-6'>
        {counters.map((item, i) => (
          <div
            key={i}
            className='animate-slide-up text-5xl font-bold tracking-wider md:text-6xl lg:text-7xl xl:text-8xl'
            // style={{ ...item.style }}
          >
            {toThousands(item.initialNum)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Count;
