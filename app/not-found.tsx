'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-orange mb-4">404</h1>
        <p className="text-gray-600 mb-6">Challenge not found</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-6 py-2 bg-orange text-white rounded-lg hover:bg-orange-600"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}