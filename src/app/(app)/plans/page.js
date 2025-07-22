"use client";
import React from "react";
import Logo from "@/componenets/logo/page";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const plans = [
  {
    name: "Free",
    price: "Basic access to read articles.",
    popular: false,
    color: "bg-white text-black border border-gray-200",
    features: [
      "Access to public posts",
      "Commenting allowed",
      "No premium content",
    ],
    button: {
      label: "Get Started",
      color: "bg-gray-100 hover:bg-gray-200 text-black border border-gray-300",
    },
  },
  {
    name: "Pro",
    price: "Full access for avid readers.",
    popular: true,
    color: "bg-gray-900 text-white",
    highlight: "bg-yellow-400 text-black",
    features: [
      "Unlimited premium articles",
      "Offline reading",
      "Ad-free experience",
    ],
    button: {
      label: "Subscribe - $9/mo",
      color: "bg-yellow-400 hover:bg-yellow-300 text-black",
    },
  },
  {
    name: "Premium",
    price: "Support creators and unlock perks.",
    popular: false,
    color: "bg-white text-black border border-gray-200",
    features: [
      "All Pro benefits",
      "Support writers directly",
      "Early access to new features",
    ],
    button: {
      label: "Subscribe - $15/mo",
      color: "bg-gray-800 hover:bg-gray-700 text-white",
    },
  },
];

const PlansPage = () => {
  const router = useRouter();
  const session = useSession();
  const handleFree = async () => {
    if (!session.data) {
      router.push("/signin");
    }else{
      router.push("/userdashboard");
    }
  };

  const handlePro = async () => {
    alert("pro");
  };
  
  const handlePremium = async () => {
    alert("premium");
  };
  return (
    <section className="min-h-screen bg-white px-4">
      <div className="w-full flex items-center justify-center py-3 border-b">
        {" "}
        <Logo />
      </div>
      <div className="max-w-6xl mx-auto text-center mt-3">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Membership Plan
        </h1>
        <p className="text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
          Unlock exclusive content and support creators with one of our premium
          membership options.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`${plan.color} relative rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col justify-between`}
            >
              {plan.popular && (
                <div
                  className={`${plan.highlight} absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-lg`}
                >
                  Most Popular
                </div>
              )}

              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  {plan.name} Plan
                </h2>
                <p className="text-lg font-medium mb-6">{plan.price}</p>
                <ul
                  className={`space-y-3 text-sm ${
                    plan.popular ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <span className="text-green-500">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={
                  plan.name === "Free"
                    ? handleFree
                    : plan.name === "Pro"
                    ? handlePro
                    : handlePremium
                }
                className={`mt-10 w-full py-2 rounded-lg font-medium text-center transition duration-300 ${plan.button.color}`}
              >
                {plan.button.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlansPage;
