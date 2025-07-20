"use client";

import { FileText } from "lucide-react";

export default function ManagingStoriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-black text-white py-16 px-6 flex flex-col items-center justify-center text-center">
        <div className="bg-white text-black p-4 rounded-full mb-4 shadow-md">
          <FileText className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Managing Your Stories</h1>
        <p className="text-gray-300 max-w-xl">
          Learn how to view, edit, and track your stories — including stats, drafts, and published posts.
        </p>
      </div>

      {/* Content Section */}
      <div className="bg-white px-6 py-10 max-w-4xl mx-auto w-full space-y-10">

        <section>
          <h2 className="text-xl font-semibold mb-2">Your Stories Dashboard</h2>
          <p className="text-gray-700">
            Head to your profile → <strong>Stories</strong> to see all your drafts and published articles.
            You can view them by date or title, and click any one to edit or update.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Editing Published Stories</h2>
          <p className="text-gray-700">
            You can edit a story at any time after publishing. Changes are saved immediately, and
            your readers will see the updated version instantly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Deleting or Unpublishing a Story</h2>
          <p className="text-gray-700">
            Want to remove a story? You can choose to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
            <li><strong>Unpublish</strong>: The story goes offline but stays in your drafts.</li>
            <li><strong>Delete</strong>: Permanently removes the story from your account.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Understanding Stats</h2>
          <p className="text-gray-700">
            Each story includes statistics such as views, reads, and fans. Click the “Stats” link
            under your story to analyze performance over time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Audience Metrics</h2>
          <p className="text-gray-700">
            Access your <strong>Audience Stats</strong> to learn more about your readers — where theyre from,
            what devices they use, and how they engage with your content.
          </p>
        </section>

      </div>
    </div>
  );
}
