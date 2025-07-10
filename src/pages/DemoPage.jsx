import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import viteLogo from '/vite.svg?url';
import './demoPage.css';

function DemoPage() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <div className='demo-container'>
        <div className='logo-container'>
          <a href='https://vite.dev' target='_blank'>
            <img src={viteLogo} className='logo' alt='Vite logo' />
          </a>
          <a href='https://react.dev' target='_blank'>
            <img src={reactLogo} className='logo react' alt='React logo' />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className='card'>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className='read-the-docs'>
          Click on the Vite and React logos to learn more
        </p>
      </div> */}
      <div className='min-h-screen bg-gray-200 p-8'>
        <div className='mx-auto max-w-6xl'>
          {/* Header */}
          <div className='mb-12 flex items-center justify-between'>
            <h1 className='text-2xl font-medium text-gray-700'>
              Design tutorial
            </h1>
            <span className='text-gray-500'>UXRishi</span>
          </div>

          {/* Inner Shadow Section */}
          <div className='mb-16 grid gap-8 lg:grid-cols-2'>
            <div className='flex justify-center'>
              <div className='relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-3xl bg-gray-100'>
                {/* Inner Shadow Effect */}
                <div className='absolute inset-0 rounded-3xl shadow-inner'></div>
                <div className='absolute inset-2 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-gray-300/20'></div>
                <div className='absolute inset-2 rounded-3xl bg-gradient-to-tl from-transparent via-transparent to-white/50'></div>

                <span className='relative z-10 text-6xl font-light text-gray-400'>
                  E5E5E5
                </span>
              </div>
            </div>

            <div className='space-y-6'>
              <h2 className='text-3xl font-light text-gray-600'>
                Inner shadow
              </h2>

              <div className='grid grid-cols-2 gap-8'>
                <div className='space-y-2'>
                  <div className='text-sm text-gray-500'>Blur:50</div>
                  <div className='text-sm text-gray-500'>X and Y:-30</div>
                  <div className='text-sm text-gray-500'>Opacity:70%</div>
                  <div className='text-sm text-gray-500'>Color:#FFFFFF</div>
                </div>

                <div className='space-y-2'>
                  <div className='text-sm text-gray-500'>Blur:50</div>
                  <div className='text-sm text-gray-500'>X and Y:30</div>
                  <div className='text-sm text-gray-500'>Opacity:16%</div>
                  <div className='text-sm text-gray-500'>Color:#0D2750</div>
                </div>
              </div>
            </div>
          </div>

          {/* Drop Shadow Section */}
          <div className='mb-16 grid gap-8 lg:grid-cols-2'>
            <div className='flex justify-center'>
              <div
                className='flex h-64 w-64 items-center justify-center rounded-3xl bg-gray-100'
                style={{
                  boxShadow: `
                  -30px -30px 50px rgba(255, 255, 255, 0.7),
                  30px 30px 48px rgba(0, 0, 0, 0.25)
                `,
                }}
              >
                <span className='text-6xl font-light text-gray-400'>
                  E5E5E5
                </span>
              </div>
            </div>

            <div className='space-y-6'>
              <h2 className='text-3xl font-light text-gray-600'>Drop shadow</h2>

              <div className='grid grid-cols-2 gap-8'>
                <div className='space-y-2'>
                  <div className='text-sm text-gray-500'>Blur:48</div>
                  <div className='text-sm text-gray-500'>X and Y:-30</div>
                  <div className='text-sm text-gray-500'>Opacity:70%</div>
                  <div className='text-sm text-gray-500'>Color:#FFFFFF</div>
                </div>

                <div className='space-y-2'>
                  <div className='text-sm text-gray-500'>Blur:48</div>
                  <div className='text-sm text-gray-500'>X and Y:30</div>
                  <div className='text-sm text-gray-500'>Opacity:25%</div>
                  <div className='text-sm text-gray-500'>Color:#000000</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mixed Shadow Section */}
          <div className='mb-16 grid gap-8 lg:grid-cols-2'>
            <div className='flex justify-center'>
              <div
                className='relative flex h-64 w-64 items-center justify-center rounded-3xl bg-gray-100'
                style={{
                  boxShadow: `
                  -30px -30px 48px rgba(255, 255, 255, 0.7),
                  30px 30px 48px rgba(0, 0, 0, 0.25)
                `,
                }}
              >
                {/* Inner Card */}
                <div
                  className='flex h-48 w-48 items-center justify-center rounded-2xl bg-gray-100'
                  style={{
                    boxShadow: `
                    inset -20px -20px 40px rgba(255, 255, 255, 0.7),
                    inset 20px 20px 40px rgba(13, 39, 80, 0.16)
                  `,
                  }}
                >
                  <span className='text-4xl font-light text-gray-400'>
                    E5E5E5
                  </span>
                </div>
              </div>
            </div>

            <div className='space-y-6'>
              <h2 className='text-3xl font-light text-gray-600'>
                Mix of inner shadow and drop shadow
              </h2>
            </div>
          </div>

          {/* Using Tailwind Custom Shadow Classes */}
          <div className='mt-16 space-y-8'>
            <h3 className='text-2xl font-medium text-gray-700'>
              Using Tailwind CSS Classes
            </h3>

            <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
              {/* Neumorphism Inset */}
              <div className='space-y-4 text-center'>
                <div className='mx-auto flex h-48 w-48 items-center justify-center rounded-3xl bg-gray-200 shadow-inner'>
                  <div
                    className='flex h-40 w-40 items-center justify-center rounded-2xl bg-gray-200'
                    style={{
                      boxShadow: `
                      inset -15px -15px 30px rgba(255, 255, 255, 0.7),
                      inset 15px 15px 30px rgba(0, 0, 0, 0.1)
                    `,
                    }}
                  >
                    <span className='text-3xl font-light text-gray-400'>
                      Inner
                    </span>
                  </div>
                </div>
                <p className='text-sm text-gray-600'>Inner Shadow</p>
              </div>

              {/* Neumorphism Raised */}
              <div className='space-y-4 text-center'>
                <div
                  className='mx-auto flex h-48 w-48 items-center justify-center rounded-3xl bg-gray-200'
                  style={{
                    boxShadow: `
                    -15px -15px 30px rgba(255, 255, 255, 0.7),
                    15px 15px 30px rgba(0, 0, 0, 0.15)
                  `,
                  }}
                >
                  <span className='text-3xl font-light text-gray-400'>
                    Raised
                  </span>
                </div>
                <p className='text-sm text-gray-600'>Drop Shadow</p>
              </div>

              {/* Neumorphism Mixed */}
              <div className='space-y-4 text-center'>
                <div
                  className='mx-auto flex h-48 w-48 items-center justify-center rounded-3xl bg-gray-200'
                  style={{
                    boxShadow: `
                    -15px -15px 30px rgba(255, 255, 255, 0.7),
                    15px 15px 30px rgba(0, 0, 0, 0.15)
                  `,
                  }}
                >
                  <div
                    className='flex h-32 w-32 items-center justify-center rounded-2xl bg-gray-200'
                    style={{
                      boxShadow: `
                      inset -10px -10px 20px rgba(255, 255, 255, 0.7),
                      inset 10px 10px 20px rgba(0, 0, 0, 0.1)
                    `,
                    }}
                  >
                    <span className='text-2xl font-light text-gray-400'>
                      Mixed
                    </span>
                  </div>
                </div>
                <p className='text-sm text-gray-600'>Mixed Shadow</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className='mt-16 flex items-center justify-between border-t border-gray-300 pt-8'>
            <span className='text-gray-500'>2025</span>
            <span className='text-gray-500'>UXRishi</span>
          </div>
        </div>

        {/* Custom CSS for additional shadow effects */}
        <style jsx>{`
          .neumorphism-inset {
            box-shadow:
              inset -20px -20px 40px rgba(255, 255, 255, 0.7),
              inset 20px 20px 40px rgba(13, 39, 80, 0.16);
          }

          .neumorphism-raised {
            box-shadow:
              -20px -20px 40px rgba(255, 255, 255, 0.7),
              20px 20px 40px rgba(0, 0, 0, 0.25);
          }

          .neumorphism-mixed {
            box-shadow:
              -15px -15px 30px rgba(255, 255, 255, 0.7),
              15px 15px 30px rgba(0, 0, 0, 0.15),
              inset -10px -10px 20px rgba(255, 255, 255, 0.5),
              inset 10px 10px 20px rgba(0, 0, 0, 0.1);
          }
        `}</style>
      </div>
    </>
  );
}

export default DemoPage;
