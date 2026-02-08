'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-peach">
      <div className="text-center">
        <div className="text-6xl font-bold text-orange mb-4">Pair</div>
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    </div>
  );
}