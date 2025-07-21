import React, { useState } from 'react';
import {
  ClipboardIcon,
  EnvelopeIcon,
  MoonIcon,
} from '@heroicons/react/20/solid';

import { cn } from '@/utils/clsx';

function ApiPlaygroundPage() {
  const [apiKey, setApiKey] = useState('default');
  const [query, setQuery] = useState('latest news about windsurf merger');
  const [activeTab, setActiveTab] = useState('Search');

  const responseData = {
    query: 'latest news about windsurf merger',
    follow_up_questions: null,
    answer: 'Cognition announced on July 14, 2025, that it',
    images: [],
    results: [
      {
        url: 'https://www.wsgr.com/en/insights/wilson-sons',
        title: 'Wilson Sonsini Advises Windsurf on Acquisi',
        content: 'On July 14, 2025, Cognition announced th',
        score: 0.79939574,
        raw_content: 'Wilson Sonsini Advises Windsurf on Ac',
      },
    ],
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(responseData, null, 2));
  };

  return (
    <div className={cn('min-h-screen bg-gray-50')}>
      {/* Header */}
      <div className={cn('border-b border-gray-200 bg-white')}>
        <div className={cn('mx-auto max-w-7xl px-6 py-4')}>
          <div className={cn('flex items-center justify-between')}>
            <div>
              <div className={cn('mb-1 text-sm text-gray-500')}>
                Pages / API Playground
              </div>
              <h1 className={cn('text-2xl font-semibold text-gray-900')}>
                API Playground
              </h1>
            </div>
            <div className={cn('flex items-center space-x-4')}>
              <div className={cn('flex items-center space-x-2')}>
                <div className={cn('h-3 w-3 rounded-full bg-green-500')}></div>
                <span className={cn('text-sm text-gray-600')}>Operational</span>
              </div>
              <div className={cn('flex items-center space-x-3')}>
                {/* <Github className='h-5 w-5 cursor-pointer text-gray-600 hover:text-gray-800' /> */}
                {/* <Twitter className='h-5 w-5 cursor-pointer text-gray-600 hover:text-gray-800' /> */}
                <EnvelopeIcon
                  className={cn(
                    'h-5 w-5 cursor-pointer text-gray-600 hover:text-gray-800'
                  )}
                />
                <MoonIcon
                  className={cn(
                    'h-5 w-5 cursor-pointer text-gray-600 hover:text-gray-800'
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cn('mx-auto max-w-7xl px-6 py-8')}>
        <div className={cn('grid grid-cols-1 gap-8 lg:grid-cols-2')}>
          {/* Left Panel */}
          <div className={cn('space-y-6')}>
            {/* Tabs */}
            <div className={cn('flex space-x-2')}>
              {['Search', 'Extract', 'Crawl'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {tab === 'Search' && '🔍 '}
                  {tab === 'Extract' && '📄 '}
                  {tab === 'Crawl' && '🕸️ '}
                  {tab}
                </button>
              ))}
            </div>

            {/* API Key */}
            <div>
              <label
                className={cn('mb-2 block text-sm font-medium text-gray-700')}
              >
                API key
              </label>
              <select
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className={cn(
                  'w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
                )}
              >
                <option value='default'>default</option>
              </select>
            </div>

            {/* Query */}
            <div>
              <label
                className={cn('mb-2 block text-sm font-medium text-gray-700')}
              >
                Query <span className={cn('text-red-500')}>required</span>
              </label>
              <input
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={cn(
                  'w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
                )}
                placeholder='Enter your query...'
              />
            </div>

            {/* Try an example */}
            <button
              className={cn(
                'text-sm font-medium text-blue-500 hover:text-blue-700'
              )}
            >
              ✨ Try an example
            </button>

            {/* Send Request Button */}
            <button
              className={cn(
                'w-full rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600'
              )}
            >
              Send Request
            </button>
          </div>

          {/* Right Panel - Response */}
          <div>
            <div className={cn('mb-4 flex items-center justify-between')}>
              <h2 className={cn('text-xl font-semibold text-gray-900')}>
                Response
              </h2>
              <button
                onClick={handleCopy}
                className={cn(
                  'flex items-center space-x-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                )}
              >
                <ClipboardIcon className={cn('h-4 w-4')} />
                <span>Copy</span>
              </button>
            </div>

            {/* Response Code Block */}
            <div
              className={cn(
                'max-h-96 overflow-auto rounded-lg bg-gray-900 p-4 font-mono text-sm text-gray-100'
              )}
            >
              <div className={cn('space-y-1')}>
                <div>
                  <span className={cn('text-blue-400')}>1</span>{' '}
                  <span className={cn('text-yellow-400')}>{'{'}</span>
                </div>
                <div>
                  <span className={cn('text-blue-400')}>2</span>{' '}
                  <span className={cn('text-green-400')}>"query"</span>:{' '}
                  <span className={cn('text-orange-300')}>
                    "latest news about windsurf merger"
                  </span>
                  ,
                </div>
                <div>
                  <span className={cn('text-blue-400')}>3</span>{' '}
                  <span className={cn('text-green-400')}>
                    "follow_up_questions"
                  </span>
                  : <span className={cn('text-purple-400')}>null</span>,
                </div>
                <div>
                  <span className={cn('text-blue-400')}>4</span>{' '}
                  <span className={cn('text-green-400')}>"answer"</span>:{' '}
                  <span className={cn('text-orange-300')}>
                    "Cognition announced on July 14, 2025, that it"
                  </span>
                  ,
                </div>
                <div>
                  <span className={cn('text-blue-400')}>5</span>{' '}
                  <span className={cn('text-green-400')}>"images"</span>: [],
                </div>
                <div>
                  <span className={cn('text-blue-400')}>6</span>{' '}
                  <span className={cn('text-green-400')}>"results"</span>: [
                </div>
                <div>
                  <span className={cn('text-blue-400')}>7</span>{' '}
                  <span className={cn('text-yellow-400')}>{'{'}</span>
                </div>
                <div>
                  <span className={cn('text-blue-400')}>8</span>{' '}
                  <span className={cn('text-green-400')}>"url"</span>:{' '}
                  <span className={cn('text-orange-300')}>
                    "https://www.wsgr.com/en/insights/wilson-sons"
                  </span>
                  ,
                </div>
                <div>
                  <span className={cn('text-blue-400')}>9</span>{' '}
                  <span className={cn('text-green-400')}>"title"</span>:{' '}
                  <span className={cn('text-orange-300')}>
                    "Wilson Sonsini Advises Windsurf on Acquisi"
                  </span>
                  ,
                </div>
                <div>
                  <span className={cn('text-blue-400')}>10</span>{' '}
                  <span className={cn('text-green-400')}>"content"</span>:{' '}
                  <span className={cn('text-orange-300')}>
                    "On July 14, 2025, Cognition announced th"
                  </span>
                  ,
                </div>
                <div>
                  <span className={cn('text-blue-400')}>11</span>{' '}
                  <span className={cn('text-green-400')}>"score"</span>:{' '}
                  <span className={cn('text-cyan-400')}>0.79939574</span>,
                </div>
                <div>
                  <span className={cn('text-blue-400')}>12</span>{' '}
                  <span className={cn('text-green-400')}>"raw_content"</span>:{' '}
                  <span className={cn('text-orange-300')}>
                    "Wilson Sonsini Advises Windsurf on Ac"
                  </span>
                </div>
                <div>
                  <span className={cn('text-blue-400')}>13</span>{' '}
                  <span className={cn('text-yellow-400')}>{'}'}</span>,
                </div>
                <div>
                  <span className={cn('text-blue-400')}>14</span>{' '}
                  <span className={cn('text-yellow-400')}>{'{'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiPlaygroundPage;
