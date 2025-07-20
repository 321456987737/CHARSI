"use client";

import { Server } from "lucide-react";

export default function TermsPoliciesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-black text-white py-16 px-6 flex flex-col items-center justify-center text-center">
        <div className="bg-white text-black p-4 rounded-full mb-4 shadow-md">
          <Server className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Terms & Policies</h1>
        <p className="text-gray-300 max-w-xl">
          Understand the rules, rights, and responsibilities that guide your use of Medium.
        </p>
      </div>

      {/* Content Section */}
      <div className="bg-white px-6 py-10 max-w-4xl mx-auto w-full space-y-10">

        <section>
          <h2 className="text-xl font-semibold mb-2">Terms of Service</h2>
          <p className="text-gray-700">
            The Terms of Service outline the rules and expectations for using Medium, including
            your rights, limitations, and acceptable use of the platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Privacy Policy</h2>
          <p className="text-gray-700">
            Medium s Privacy Policy explains what data is collected, how its used, and your rights
            related to your personal information. It includes cookie usage, analytics, and GDPR compliance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Medium Rules</h2>
          <p className="text-gray-700">
            These are the community guidelines that all writers and readers must follow. This includes:
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>No hate speech or harassment</li>
              <li>No spam or misleading content</li>
              <li>No copyright infringement</li>
            </ul>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Partner Program Terms</h2>
          <p className="text-gray-700">
            If you’re earning through Medium, the Partner Program Terms specify payout policies,
            eligibility, and content expectations for monetized stories.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Reporting Violations</h2>
          <p className="text-gray-700">
            If you see a post or user violating these rules, you can report it using the menu next to
            any story or comment. Medium will review and take action as appropriate.
          </p>
        </section>

      </div>
    </div>
  );
}
