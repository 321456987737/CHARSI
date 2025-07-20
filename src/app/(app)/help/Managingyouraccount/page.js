"use client";

import { UserCog } from "lucide-react";

export default function ManagingYourAccountPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section (top half) */}
      <div className="bg-black text-white py-16 px-6 flex flex-col items-center justify-center text-center">
        <div className="bg-white text-black p-4 rounded-full mb-4 shadow-md">
          <UserCog className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Managing Your Account</h1>
        <p className="text-gray-300 max-w-xl">
          Everything you need to know about customizing, securing, and managing your Medium account.
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white px-6 py-10 max-w-4xl mx-auto w-full space-y-10">

        <section>
          <h2 className="text-xl font-semibold mb-2">Featured Articles</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Adjust email preferences</li>
            <li>Connect social media accounts</li>
            <li>Delete or deactivate your account</li>
            <li>Become a Friend of Medium</li>
            <li>Manage your membership</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Customize your profile page and bio</li>
            <li>Set or update your profile URL</li>
            <li>Set your pronouns on Medium</li>
            <li>Find your Medium profile URL</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Access & Login</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Sign in or sign up to Medium</li>
            <li>Sign out of your account</li>
            <li>Troubleshooting sign-in issues</li>
            <li>Issues receiving Medium emails</li>
            <li>Handling multiple Medium accounts</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Verify your author profile</li>
            <li>Adjust email preferences</li>
            <li>Connect social accounts</li>
            <li>Delete or deactivate your account</li>
            <li>Export your account data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Membership & Subscriptions</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Become a Medium Member</li>
            <li>Redeem student discounts</li>
            <li>Change payment method</li>
            <li>Cancel membership</li>
            <li>Fix iTunes/Google Play purchase errors</li>
            <li>Resolve duplicate charges</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Other Troubleshooting</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Understand restrictions on your account</li>
            <li>I never created a Medium account — why do I have one?</li>
            <li>What does Medium do with my X.com account?</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
