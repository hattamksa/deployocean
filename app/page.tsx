// app/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [envInfo, setEnvInfo] = useState({
    nodeEnv: '',
    apiUrl: ''
  });

  useEffect(() => {
    // Fetch data dari API route
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message));

    // Get environment info
    setEnvInfo({
      nodeEnv: process.env.NODE_ENV || 'development',
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'Not set'
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🌊 Digital Path Ocean
          </h1>
          <p className="text-gray-600">
            Next.js App deployed to Digital Ocean
          </p>
        </div>

        <div className="space-y-4">
          {/* API Response */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h2 className="font-semibold text-blue-900 mb-2">API Response:</h2>
            <p className="text-blue-700">
              {message || 'Loading...'}
            </p>
          </div>

          {/* Environment Info */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h2 className="font-semibold text-green-900 mb-2">Environment Info:</h2>
            <div className="space-y-1 text-sm">
              <p className="text-green-700">
                <span className="font-medium">NODE_ENV:</span> {envInfo.nodeEnv}
              </p>
              <p className="text-green-700">
                <span className="font-medium">API URL:</span> {envInfo.apiUrl}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h2 className="font-semibold text-purple-900 mb-2">Deployment Status:</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-purple-700">App is running successfully! 🚀</span>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">✅ Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Next.js 14 App Router</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Docker Deployment</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">🔧 Tech Stack</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• React 18</li>
                <li>• GitHub Actions</li>
                <li>• Digital Ocean</li>
                <li>• Docker Hub</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Built with ❤️ using Next.js
        </div>
      </div>
    </div>
  );
}
