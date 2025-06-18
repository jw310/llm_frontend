import { useState, useRef } from 'react';

import { cn } from '@/utils/clsx.js';
function SvgPage() {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <>
      {/* Svg */}
      <div className={cn('rounded-lg bg-white/10 p-6 backdrop-blur-sm')}>
        <h2 className={cn('mb-4 text-xl font-semibold text-black')}>Svg</h2>
        <div className={cn('flex justify-center')}>
          <svg width='120' height='120' className={cn('animate-spin')}>
            <circle
              cx='60'
              cy='60'
              r='40'
              fill='none'
              stroke='#10b981'
              strokeWidth='4'
              strokeDasharray='20 10'
            />
          </svg>
        </div>
      </div>
      {/* Path */}
      <div className={cn('rounded-lg bg-white/10 p-6 backdrop-blur-sm')}>
        <h2 className={cn('mb-4 text-xl font-semibold text-black')}>
          Svg Path
        </h2>
        <div className={cn('flex justify-center')}>
          <svg width='120' height='120' viewBox='0 0 120 120'>
            <path
              d='M20,60 Q60,20 100,60 Q60,100 20,60'
              fill='none'
              stroke='#f59e0b'
              strokeWidth='3'
              style={{
                strokeDasharray: '200',
                strokeDashoffset: '200',
                animation: 'draw-path 3s ease-in-out infinite',
              }}
            />
          </svg>
        </div>
      </div>
      {/* Polygon */}
      <div className={cn('rounded-lg bg-white/10 p-6 backdrop-blur-sm')}>
        <h2 className={cn('mb-4 text-xl font-semibold text-black')}>Polygon</h2>
        <div className={cn('flex justify-center')}>
          <svg width='120' height='120' viewBox='0 0 120 120'>
            <polygon
              points='60,20 100,100 20,100'
              fill='#8b5cf6'
              className={cn('origin-[60px_60px] transform-gpu')}
              style={{
                animation: 'morph-shape 2s ease-in-out infinite alternate',
              }}
            />
          </svg>
        </div>
      </div>
      {/* Interactive */}
      <div className='rounded-lg bg-white/10 p-6 backdrop-blur-sm'>
        <h2 className='mb-4 text-xl font-semibold text-black'>Interactive</h2>
        <div className='flex flex-col items-center space-y-4'>
          <svg
            width='120'
            height='120'
            viewBox='0 0 120 120'
            className='cursor-pointer'
            onClick={() => setIsAnimating(!isAnimating)}
          >
            <rect
              x='30'
              y='30'
              width='60'
              height='60'
              fill='#ef4444'
              rx='10'
              className={`origin-[60px_60px] transform transition-all duration-500 ${
                isAnimating ? 'scale-125 rotate-45' : 'scale-100 rotate-0'
              }`}
            />
          </svg>
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className='rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600'
          >
            {isAnimating ? 'Start' : 'Stop'}
          </button>
        </div>
      </div>

      {/* Complex animation */}
      <div className={cn('rounded-lg bg-white/10 p-6 backdrop-blur-sm')}>
        <h2 className={cn('mb-4 text-xl font-semibold text-black')}>Complex</h2>
        <div className={cn('flex h-[310px] justify-center')}>
          <svg
            width='300'
            height='150'
            viewBox='0 0 300 150'
            className={cn('animate-orbit')}
          >
            {/* 背景圓圈 */}
            <circle
              cx='150'
              cy='75'
              r='60'
              fill='none'
              stroke='#374151'
              strokeWidth='2'
            />

            {/* 旋轉的小球 */}
            <g className={cn('origin-[150px_75px]')}>
              <circle cx='210' cy='75' r='8' fill='#06d6a0'>
                <animate
                  attributeName='r'
                  values='8;12;8'
                  dur='1s'
                  repeatCount='indefinite'
                />
              </circle>
            </g>

            {/* 中心脈動圓 */}
            <circle
              cx='150'
              cy='75'
              r='20'
              fill='#f72585'
              className={cn('animate-pulse')}
            />

            {/* 波紋效果 */}
            <circle
              cx='150'
              cy='75'
              r='0'
              fill='none'
              stroke='#4cc9f0'
              strokeWidth='2'
              opacity='0.7'
              className={cn('animate-ripple')}
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export default SvgPage;
