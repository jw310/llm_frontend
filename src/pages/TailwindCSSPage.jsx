import { useState } from 'react';

function TailwindCSSPage() {
  const [theme, setTheme] = useState('default');
  const [borderRadius, setBorderRadius] = useState('default');
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('features');

  // 主題切換函數
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.classList.remove(
      'theme-blue',
      'theme-purple',
      'theme-green'
    );
    if (newTheme !== 'default') {
      document.documentElement.classList.add(`theme-${newTheme}`);
    }
  };

  // 圓角樣式切換
  const changeRadius = (newRadius) => {
    setBorderRadius(newRadius);
    document.documentElement.classList.remove(
      'radius-sharp',
      'radius-rounded',
      'radius-pill'
    );
    if (newRadius !== 'default') {
      document.documentElement.classList.add(`radius-${newRadius}`);
    }
  };

  return (
    <div className='mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md'>
      <div className='p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='white'
                className='h-6 w-6'
              >
                <path d='M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 01.878.645 49.17 49.17 0 01.376 5.452.657.657 0 01-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 00-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 01-.595 4.845.75.75 0 01-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 01-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 01-.658.643 49.118 49.118 0 01-4.708-.36.75.75 0 01-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 005.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 00.659-.663 47.703 47.703 0 00-.31-4.82.75.75 0 01.83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 00.657-.642z' />
              </svg>
            </div>
            <div className='ml-4'>
              <h2 className='text-xl font-bold text-gray-900'>
                Tailwind CSS v4
              </h2>
              <p className='text-sm text-gray-500'>React 組件示例</p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='rounded-full p-2 hover:bg-gray-100'
          >
            {isExpanded ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4.5 15.75l7.5-7.5 7.5 7.5'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                />
              </svg>
            )}
          </button>
        </div>

        {isExpanded && (
          <div className='mt-4'>
            <div className='flex border-b'>
              <button
                className={`px-4 py-2 ${activeTab === 'features' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('features')}
              >
                特點
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'usage' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('usage')}
              >
                使用方法
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'demo' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('demo')}
              >
                演示
              </button>
            </div>

            <div className='mt-4'>
              {activeTab === 'features' && (
                <div className='space-y-2'>
                  <p className='text-gray-700'>Tailwind CSS v4 提供了：</p>
                  <ul className='list-disc pl-5 text-gray-600'>
                    <li>基於實用程序的 CSS 框架</li>
                    <li>高度可自定義的設計系統</li>
                    <li>優秀的性能優化</li>
                    <li>與 React 完美整合</li>
                  </ul>
                </div>
              )}
              {activeTab === 'usage' && (
                <div className='rounded bg-gray-50 p-3 font-mono text-sm text-gray-700'>
                  <p>{'import { useState } from "react";'}</p>
                  <p>{'function MyComponent() {'}</p>
                  <p className='pl-4'>{'// 您的組件代碼'}</p>
                  <p>{'}'}</p>
                </div>
              )}
              {activeTab === 'demo' && (
                <div className='flex flex-wrap gap-2'>
                  <span className='rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800'>
                    默認
                  </span>
                  <span className='rounded-full bg-green-100 px-3 py-1 text-sm text-green-800'>
                    成功
                  </span>
                  <span className='rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800'>
                    警告
                  </span>
                  <span className='rounded-full bg-red-100 px-3 py-1 text-sm text-red-800'>
                    錯誤
                  </span>

                  {/* 圓角選擇器 */}
                  <div className='mb-6'>
                    <h3 className='mb-2 font-medium text-gray-700'>
                      選擇圓角風格
                    </h3>
                    <div className='flex space-x-2'>
                      <button
                        onClick={() => changeRadius('default')}
                        className={`border px-3 py-1 ${borderRadius === 'default' ? 'border-gray-300 bg-gray-100' : 'border-gray-200'} rounded`}
                      >
                        默認
                      </button>
                      <button
                        onClick={() => changeRadius('sharp')}
                        className={`border px-3 py-1 ${borderRadius === 'sharp' ? 'border-gray-300 bg-gray-100' : 'border-gray-200'}`}
                      >
                        方正
                      </button>
                      <button
                        onClick={() => changeRadius('rounded')}
                        className={`border px-3 py-1 ${borderRadius === 'rounded' ? 'border-gray-300 bg-gray-100' : 'border-gray-200'} rounded-lg`}
                      >
                        圓潤
                      </button>
                      <button
                        onClick={() => changeRadius('pill')}
                        className={`border px-3 py-1 ${borderRadius === 'pill' ? 'border-gray-300 bg-gray-100' : 'border-gray-200'} rounded-full`}
                      >
                        藥丸
                      </button>
                    </div>
                  </div>

                  {/* 主題選擇器 */}
                  <div className='mb-6'>
                    <h3 className='mb-2 font-medium text-gray-700'>
                      選擇色彩主題
                    </h3>
                    <div className='flex space-x-2'>
                      <button
                        onClick={() => changeTheme('default')}
                        className={`h-8 w-8 rounded-full border-2 bg-blue-500 ${theme === 'default' ? 'border-gray-900' : 'border-transparent'}`}
                      />
                      <button
                        onClick={() => changeTheme('blue')}
                        className={`h-8 w-8 rounded-full border-2 bg-blue-600 ${theme === 'blue' ? 'border-gray-900' : 'border-transparent'}`}
                      />
                      <button
                        onClick={() => changeTheme('purple')}
                        className={`h-8 w-8 rounded-full border-2 bg-purple-600 ${theme === 'purple' ? 'border-gray-900' : 'border-transparent'}`}
                      />
                      <button
                        onClick={() => changeTheme('green')}
                        className={`h-8 w-8 rounded-full border-2 bg-green-600 ${theme === 'green' ? 'border-gray-900' : 'border-transparent'}`}
                      />
                    </div>
                  </div>

                  {/* 預覽區域 */}
                  <div className='rounded-lg border border-gray-200 p-4'>
                    <h3 className='mb-4 font-medium text-gray-700'>主題預覽</h3>

                    <div className='space-y-4'>
                      {/* 按鈕預覽 */}
                      <div className='flex space-x-2'>
                        <button className='bg-primary rounded px-4 py-2 text-white'>
                          主要按鈕
                        </button>
                        <button className='bg-secondary rounded px-4 py-2 text-white'>
                          次要按鈕
                        </button>
                      </div>

                      {/* 卡片預覽 */}
                      <div className='rounded border border-gray-200 bg-white p-3 shadow-sm'>
                        <div className='bg-primary mb-2 h-4 w-1/4 rounded-sm'></div>
                        <div className='mb-1 h-3 w-full rounded-sm bg-gray-200'></div>
                        <div className='h-3 w-4/5 rounded-sm bg-gray-200'></div>
                      </div>

                      {/* 標籤預覽 */}
                      <div className='flex space-x-2'>
                        <span className='bg-primary-50 text-primary rounded px-2 py-1 text-sm'>
                          標籤一
                        </span>
                        <span className='bg-secondary-50 text-secondary rounded px-2 py-1 text-sm'>
                          標籤二
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className='mt-4 flex justify-end'>
          <button className='rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600'>
            了解更多
          </button>
        </div>
      </div>
    </div>
  );
}

export default TailwindCSSPage;
