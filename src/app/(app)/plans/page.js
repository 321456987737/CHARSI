'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Basic access to read articles.',
    features: ['Access to public posts', 'Commenting allowed'],
  },
  {
    name: 'Pro',
    price: 9,
    description: 'Full access for avid readers.',
    features: ['Unlimited premium articles', 'Offline reading', 'Ad-free'],
  },
  {
    name: 'Premium',
    price: 15,
    description: 'Support creators and unlock perks.',
    features: ['All Pro benefits', 'Support writers', 'Early access'],
  },
];

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handlePlanClick = async (planName, price) => {
    if (!session) {
      router.push('/signin');
      return;
    }

    if (price === 0) {
      router.push('/userdashboard');
      return;
    }

    setLoadingPlan(planName);
    const res = await fetch('/api/payfast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: planName, amount: price }),
    });

    const html = await res.text();
    console.log(html,"this is the html");
    setLoadingPlan(null);
    const newWindow = window.open();
    newWindow.document.write(html);
    newWindow.document.close();
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Choose a Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="border p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="text-gray-600 mt-1">{plan.description}</p>
            <ul className="mt-4 text-sm text-gray-700">
              {plan.features.map((f) => (
                <li key={f}>✔ {f}</li>
              ))}
            </ul>
            <button
              className="mt-6 w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
              onClick={() => handlePlanClick(plan.name, plan.price)}
              disabled={loadingPlan === plan.name}
            >
              {loadingPlan === plan.name
                ? 'Loading...'
                : plan.price === 0
                ? 'Start Free'
                : `Subscribe $${plan.price}/mo`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


// 'use client';

// import { useState } from 'react';

// export default function PaymentButton() {
//   const [loading, setLoading] = useState(false);

//   const handlePayment = async () => {
//     setLoading(true);
//     const response = await fetch('/api/payfast', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         amount: '100.00',
//         item_name: 'Test Product',
//       }),
//     });

//     const data = await response.json();
//     setLoading(false);

//     if (data.paymentUrl) {
//       window.location.href = data.paymentUrl; // Redirect to PayFast
//     }
//   };

//   return (
//     <button onClick={handlePayment} disabled={loading}>
//       {loading ? 'Processing...' : 'Pay Now'}
//     </button>
//   );
// }





// // 'use client';
// // import React from 'react';
// // import Logo from '@/componenets/logo/page';
// // import { useRouter } from 'next/navigation';
// // import { useSession } from 'next-auth/react';

// // const plans = [
// //   {
// //     name: 'Free',
// //     price: 'Basic access to read articles.',
// //     popular: false,
// //     color: 'bg-white text-black border border-gray-200',
// //     features: [
// //       'Access to public posts',
// //       'Commenting allowed',
// //       'No premium content',
// //     ],
// //     button: {
// //       label: 'Get Started',
// //       color: 'bg-gray-100 hover:bg-gray-200 text-black border border-gray-300',
// //     },
// //   },
// //   {
// //     name: 'Pro',
// //     price: 'Full access for avid readers.',
// //     popular: true,
// //     color: 'bg-gray-900 text-white',
// //     highlight: 'bg-yellow-400 text-black',
// //     features: ['Unlimited premium articles', 'Offline reading', 'Ad-free experience'],
// //     button: {
// //       label: 'Subscribe - $9/mo',
// //       color: 'bg-yellow-400 hover:bg-yellow-300 text-black',
// //     },
// //   },
// //   {
// //     name: 'Premium',
// //     price: 'Support creators and unlock perks.',
// //     popular: false,
// //     color: 'bg-white text-black border border-gray-200',
// //     features: [
// //       'All Pro benefits',
// //       'Support writers directly',
// //       'Early access to new features',
// //     ],
// //     button: {
// //       label: 'Subscribe - $15/mo',
// //       color: 'bg-gray-800 hover:bg-gray-700 text-white',
// //     },
// //   },
// // ];

// // export default function CheckoutPage() {
// //   const router = useRouter();
// //   const session = useSession();

// //   const handleFree = () => {
// //     if (!session.data) {
// //       router.push('/signin');
// //     } else {
// //       router.push('/userdashboard');
// //     }
// //   };

// //   const handlePaidPlan = async (plan, amount) => {
// //     if (!session.data) {
// //       router.push('/signin');
// //       return;
// //     }

// //     try {
// //       const res = await fetch('/api/payfast', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ plan, amount }),
// //       });

// //       const data = await res.json();
// //       if (data.redirectUrl) {
// //         window.location.href = data.redirectUrl;
// //       } else {
// //         alert('Failed to redirect to PayFast.');
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       alert('Payment failed.');
// //     }
// //   };

// //   return (
// //     <section className="min-h-screen bg-white px-4">
// //       <div className="w-full flex items-center justify-center py-3 border-b">
// //         <Logo />
// //       </div>

// //       <div className="max-w-6xl mx-auto text-center mt-3">
// //         <h1 className="text-4xl font-bold text-gray-900 mb-4">
// //           Choose Your Membership Plan
// //         </h1>
// //         <p className="text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
// //           Unlock exclusive content and support creators with one of our premium membership options.
// //         </p>

// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //           {plans.map((plan, index) => (
// //             <div
// //               key={index}
// //               className={`${plan.color} relative rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col justify-between`}
// //             >
// //               {plan.popular && (
// //                 <div
// //                   className={`${plan.highlight} absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-lg`}
// //                 >
// //                   Most Popular
// //                 </div>
// //               )}

// //               <div>
// //                 <h2 className="text-2xl font-semibold mb-2">{plan.name} Plan</h2>
// //                 <p className="text-lg font-medium mb-6">{plan.price}</p>
// //                 <ul
// //                   className={`space-y-3 text-sm ${
// //                     plan.popular ? 'text-gray-200' : 'text-gray-700'
// //                   }`}
// //                 >
// //                   {plan.features.map((feature, i) => (
// //                     <li key={i}>
// //                       <span className="text-green-500">✓</span> {feature}
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>

// //               <button
// //                 onClick={
// //                   plan.name === 'Free'
// //                     ? handleFree
// //                     : () =>
// //                         handlePaidPlan(
// //                           `${plan.name} Subscription`,
// //                           plan.name === 'Pro' ? 9 : 15
// //                         )
// //                 }
// //                 className={`mt-10 w-full py-2 rounded-lg font-medium text-center transition duration-300 ${plan.button.color}`}
// //               >
// //                 {plan.button.label}
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }
