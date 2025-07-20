"use client";

import { Shield } from "lucide-react";

export default function SafetyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-black text-white py-16 px-6 flex flex-col items-center justify-center text-center">
        <div className="bg-white text-black p-4 rounded-full mb-4 shadow-md">
          <Shield className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Trust & Safety</h1>
        <p className="text-gray-300 max-w-xl">
          Learn how to manage interactions, protect your content, and report harmful activity on Medium.
        </p>
      </div>

      {/* Content Section */}
      <div className="bg-white px-6 py-10 max-w-4xl mx-auto w-full space-y-10">

        <section>
          <h2 className="text-xl font-semibold mb-2">Blocking Users</h2>
          <p className="text-gray-700">
            You can block users to prevent them from interacting with your stories or commenting
            on your posts. Go to the users profile and click the three-dot menu to block them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Managing Responses</h2>
          <p className="text-gray-700">
            Authors have full control over responses on their stories. You can hide, delete,
            or report any response directly from your story’s response section.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Reporting Harmful Content</h2>
          <p className="text-gray-700">
            If you encounter abusive, harmful, or spammy content, click the “...” menu
            and select “Report”. Medium’s moderation team will review it promptly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Reporting Copyright Infringement</h2>
          <p className="text-gray-700">
            To report a copyright violation, visit Medium’s copyright form. Provide your original content,
            proof of ownership, and details about the copied material.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Data & Privacy Protection</h2>
          <p className="text-gray-700">
            Medium complies with data protection laws and allows you to control your data.
            Visit <strong>Settings → Security</strong> to download your data or manage preferences.
          </p>
        </section>

      </div>
    </div>
  );
}
