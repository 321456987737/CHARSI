'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PaymentFailed() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/plans');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-gray-600 mb-4">
          {error === 'user-not-found'
            ? 'User account not found. Please contact support.'
            : error === 'database'
            ? 'A technical error occurred. Please try again later.'
            : 'Your payment could not be processed. Please try again.'}
        </p>
        <button
          onClick={() => router.push('/plans')}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          Return to Plans
        </button>
      </div>
    </div>
  );
}
