import {
  CheckCircleIcon,
  CreditCardIcon,
  DocumentTextIcon,
  DevicePhoneMobileIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

import { cn } from '@/utils/clsx.js';

const BillCraftLanding = () => {
  return (
    <div
      className={cn(
        'min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50'
      )}
    >
      {/* Header */}
      <header
        className={cn(
          'sticky top-0 z-50 border-b border-gray-200/50 bg-white/80 backdrop-blur-md'
        )}
      >
        <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8')}>
          <div className={cn('flex items-center justify-between py-4')}>
            <div className={cn('flex items-center space-x-2')}>
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600'
                )}
              >
                <DocumentTextIcon className={cn('h-5 w-5 text-white')} />
              </div>
              <span className={cn('text-2xl font-bold text-gray-900')}>
                BillCraft
              </span>
            </div>

            <nav className={cn('hidden space-x-8 md:flex')}>
              <a
                href='#'
                className={cn(
                  'text-gray-700 transition-colors hover:text-blue-600'
                )}
              >
                Explore
              </a>
              <a
                href='#'
                className={cn(
                  'text-gray-700 transition-colors hover:text-blue-600'
                )}
              >
                Solutions
              </a>
              <a
                href='#'
                className='text-gray-700 transition-colors hover:text-blue-600'
              >
                About
              </a>
              <a
                href='#'
                className={cn(
                  'text-gray-700 transition-colors hover:text-blue-600'
                )}
              >
                Blog
              </a>
            </nav>

            <div className={cn('flex items-center space-x-4')}>
              <button
                className={cn(
                  'text-gray-700 transition-colors hover:text-blue-600'
                )}
              >
                Sign In
              </button>
              <button
                className={cn(
                  'rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'
                )}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={cn('mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8')}>
        <div className={cn('grid items-center gap-12 lg:grid-cols-2')}>
          {/* Left Side - Content */}
          <div className={cn('space-y-8')}>
            {/* Trust Badge */}
            <div
              className={cn(
                'flex items-center space-x-2 text-sm text-gray-600'
              )}
            >
              <CheckCircleIcon className={cn('h-4 w-4 text-blue-600')} />
              <span>Trusted by 10k+ freelancers</span>
            </div>

            {/* Main Heading */}
            <div className={cn('space-y-6')}>
              <h1
                className={cn(
                  'text-5xl leading-tight font-bold text-gray-900 lg:text-6xl'
                )}
              >
                Send Invoices. Get Paid. Stress-Free
              </h1>

              <p className={cn('text-lg leading-relaxed text-gray-600')}>
                From sending your first invoice to managing recurring payments,
                BillCraft helps you run your business without hassle
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={cn('space-y-4')}>
              <button
                className={cn(
                  'w-full rounded-lg border-2 border-gray-300 bg-white px-8 py-3 text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto'
                )}
              >
                See How It Works
              </button>

              <button
                className={cn(
                  'ml-0 w-full rounded-lg bg-blue-600 px-8 py-3 text-white transition-colors hover:bg-blue-700 sm:ml-4 sm:w-auto'
                )}
              >
                Try Free for 30 Days
              </button>

              <div
                className={cn(
                  'flex items-center space-x-2 text-sm text-gray-600'
                )}
              >
                <CheckCircleIcon className={cn('h-4 w-4 text-green-600')} />
                <span>No credit card required</span>
              </div>
            </div>

            {/* Stats */}
            <div className={cn('grid grid-cols-3 gap-8 pt-8')}>
              <div className={cn('text-center')}>
                <div className={cn('text-3xl font-bold text-gray-900')}>
                  1M+
                </div>
                <div className='text-sm text-gray-600'>Invoice Sends</div>
              </div>
              <div className={cn('text-center')}>
                <div className={cn('text-3xl font-bold text-gray-900')}>
                  98%
                </div>
                <div className={cn('text-sm text-gray-600')}></div>
              </div>
              <div className={cn('text-center')}>
                <div className={cn('text-3xl font-bold text-gray-900')}>
                  $50M+
                </div>
                <div className={cn('text-sm text-gray-600')}>
                  Tracked in Payments
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className={cn('relative')}>
            <div
              className={cn(
                'relative rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 p-8 shadow-2xl'
              )}
            >
              {/* Phone Mockup */}
              <div
                className={cn(
                  'relative mx-auto h-96 w-64 overflow-hidden rounded-3xl bg-white shadow-lg'
                )}
              >
                {/* Phone Header */}
                <div
                  className={cn(
                    'flex h-6 items-center justify-center bg-gray-100'
                  )}
                >
                  <div className={cn('flex space-x-1')}>
                    <div
                      className={cn('h-1 w-1 rounded-full bg-gray-400')}
                    ></div>
                    <div
                      className={cn('h-1 w-1 rounded-full bg-gray-400')}
                    ></div>
                    <div
                      className={cn('h-1 w-1 rounded-full bg-gray-400')}
                    ></div>
                  </div>
                </div>

                {/* Phone Content */}
                <div className={cn('space-y-4 p-4')}>
                  {/* Invoice Header */}
                  <div className={cn('text-center')}>
                    <div className={cn('text-lg font-semibold text-gray-400')}>
                      INVOICE
                    </div>
                    <div
                      className={cn('mt-2 text-2xl font-bold text-gray-900')}
                    >
                      INVOICE
                    </div>
                  </div>

                  {/* Invoice Lines */}
                  <div className={cn('space-y-2')}>
                    <div className={cn('h-2 rounded bg-blue-200')}></div>
                    <div className={cn('h-2 w-3/4 rounded bg-gray-200')}></div>
                    <div className={cn('h-2 w-1/2 rounded bg-gray-200')}></div>
                  </div>

                  {/* Bill Preview */}
                  <div className={cn('space-y-2 rounded-lg bg-gray-50 p-3')}>
                    <div className={cn('text-sm font-semibold')}>BILL</div>
                    <div className={cn('space-y-1')}>
                      <div
                        className={cn('h-1 w-full rounded bg-blue-300')}
                      ></div>
                      <div
                        className={cn('h-1 w-4/5 rounded bg-blue-300')}
                      ></div>
                      <div
                        className={cn('h-1 w-3/5 rounded bg-blue-300')}
                      ></div>
                    </div>
                  </div>

                  {/* Pay Button */}
                  <div className={cn('pt-4')}>
                    <button
                      className={cn(
                        'w-full rounded-lg bg-blue-600 py-3 font-semibold text-white'
                      )}
                    >
                      PAY
                    </button>
                  </div>
                </div>
              </div>

              {/* Credit Card */}
              <div
                className={cn(
                  'absolute top-4 right-4 h-15 w-32 rounded-lg bg-blue-600 shadow-lg'
                )}
              >
                <div className={cn('p-2')}>
                  <div className={cn('text-xs font-bold text-white')}>BANK</div>
                  <div className={cn('mt-1 text-xs text-white/80')}>
                    **** **** **** 1234
                  </div>
                </div>
              </div>

              {/* Character Illustration */}
              <div className={cn('absolute bottom-0 left-4')}>
                <div
                  className={cn(
                    'relative h-32 w-24 rounded-t-full bg-gradient-to-t from-blue-600 to-blue-500'
                  )}
                >
                  {/* Simple character representation */}
                  <div
                    className={cn(
                      'absolute top-4 left-1/2 h-8 w-8 -translate-x-1/2 transform rounded-full bg-orange-200'
                    )}
                  ></div>
                  <div
                    className={cn(
                      'absolute top-12 left-1/2 h-16 w-12 -translate-x-1/2 transform rounded-t-lg bg-gray-800'
                    )}
                  ></div>
                  <div
                    className={cn(
                      'absolute bottom-8 left-1/2 h-8 w-16 -translate-x-1/2 transform rounded-lg bg-blue-400'
                    )}
                  ></div>
                </div>
              </div>

              {/* Floating Elements */}
              <div
                className={cn(
                  'absolute top-12 left-8 flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-lg'
                )}
              >
                <DocumentTextIcon className={cn('h-4 w-4 text-gray-600')} />
              </div>

              <div
                className={cn(
                  'absolute top-20 right-12 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 shadow-lg'
                )}
              >
                <CheckCircleIcon className={cn('h-3 w-3 text-white')} />
              </div>

              {/* WiFi Icon */}
              <div
                className={cn(
                  'absolute top-8 left-1/2 -translate-x-1/2 transform'
                )}
              >
                <div className={cn('flex space-x-1')}>
                  <div className={cn('h-1 w-1 rounded-full bg-gray-400')}></div>
                  <div className={cn('h-2 w-1 rounded-full bg-gray-400')}></div>
                  <div className={cn('h-3 w-1 rounded-full bg-gray-400')}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BillCraftLanding;
