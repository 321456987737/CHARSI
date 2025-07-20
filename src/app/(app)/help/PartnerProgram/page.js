"use client";

import { Users } from "lucide-react";
import Link from "next/link";

export default function PartnerProgramPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-black text-white py-16 px-6 flex flex-col items-center justify-center text-center">
        <div className="bg-white text-black p-4 rounded-full mb-4 shadow-md">
          <Users className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Medium Partner Program
        </h1>
        <p className="text-gray-300 max-w-xl">
          Learn how to earn money from your writing by joining the Medium
          Partner Program.
        </p>
      </div>

      {/* Content Section */}
      <div className="bg-white px-6 py-10 max-w-4xl mx-auto w-full space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-2">
            What Is the Partner Program?
          </h2>
          <p className="text-gray-700">
            The Partner Program allows you to earn money when Medium members
            read and engage with your stories. Your earnings depend on read time
            and engagement from paying members.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">How to Join</h2>
          <p className="text-gray-700">
            To join, go to <strong>Settings → Partner Program</strong>. You must
            have a Stripe account, and live in a supported country. After
            linking your account, you’ll be eligible to start earning.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Eligible Stories</h2>
          <p className="text-gray-700">
            When publishing, check the box that marks the story as eligible for
            the Partner Program. It must follow Medium’s content guidelines and
            cannot include paywalled or promotional content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Understanding Your Earnings
          </h2>
          <p className="text-gray-700">
            Earnings are calculated based on the amount of time Medium members
            spend reading your story. Other factors like claps, highlights, and
            followers may also influence distribution and performance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Partner Dashboard</h2>
          <p className="text-gray-700">
            After enrolling, visit your Partner Program dashboard to track
            views, read time, and earnings per story or overall.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Getting Paid</h2>
          <p className="text-gray-700">
            Payouts are processed monthly through Stripe. Make sure your payment
            and tax info is correctly set up in your Stripe account to avoid
            payment delays.
          </p>
        </section>
      </div>
      <div className="bg-gray-50 border max-w-4xl flex flex-col items-center mx-auto border-gray-200 rounded-xl p-6 my-12 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">
          Let’s join the Medium Partner Program!
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Start earning money for the content you publish.
        </p>
        <button
          className="bg-gray-400 hover:bg-gray-500 cursor-pointer text-white font-medium px-6 py-2 rounded-md shadow-sm transition duration-200"
          onClick={() => alert("Redirecting to Partner Program...")}
        >
          <Link href={"/membership"}>
          Join Now
          </Link>
        </button>
      </div>
    </div>
  );
}
