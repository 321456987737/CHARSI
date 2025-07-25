'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [countdown, setCountdown] = useState(5);
  
  const paymentId = searchParams.get('payment_id');
  const merchantPaymentId = searchParams.get('merchant_payment_id');

  useEffect(() => {
    // Clear any stored payment data
    localStorage.removeItem('paymentAttempt');
    localStorage.removeItem('intendedPlan');
    
    // Store successful payment info
    if (paymentId) {
      localStorage.setItem('lastSuccessfulPayment', JSON.stringify({
        paymentId: paymentId,
        merchantPaymentId: merchantPaymentId,
        completedAt: new Date().toISOString(),
        userEmail: session?.user?.email
      }));
    }
    
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/userdashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router, paymentId, merchantPaymentId, session]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-xl p-8">
        {/* Success Animation */}
        <div className="relative mb-6">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto animate-pulse">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold animate-bounce">
            ✓
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful! 🎉
        </h1>
        
        <p className="text-gray-600 mb-6 text-lg">
          Thank you for your subscription! Your payment has been processed successfully and your account has been upgraded.
        </p>
        
        {/* Payment Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-2">Payment Details:</h3>
          {paymentId && (
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Payment ID:</span> {paymentId}
            </p>
          )}
          {merchantPaymentId && (
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Reference:</span> {merchantPaymentId}
            </p>
          )}
          <p className="text-sm text-gray-600">
            <span className="font-medium">Date:</span> {new Date().toLocaleDateString()}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => router.push('/userdashboard')}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-200 font-semibold"
          >
            Go to Dashboard
          </button>
          
          <button
            onClick={() => router.push('/browse')}
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition duration-200 font-medium"
          >
            Start Reading
          </button>
        </div>
        
        {/* Auto Redirect Info */}
        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <span className="font-medium">Auto-redirecting in {countdown} seconds...</span>
          </p>
          <div className="w-full bg-blue-200 rounded-full h-1 mt-2">
            <div 
              className="bg-blue-600 h-1 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${((5 - countdown) / 5) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Receipt Option */}
        <p className="text-xs text-gray-500 mt-4">
          Need a receipt? Check your email or{' '}
          <button 
            onClick={() => window.print()} 
            className="text-blue-600 hover:underline"
          >
            print this page
          </button>
        </p>
      </div>
    </div>
  );
}