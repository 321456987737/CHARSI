"use client";

import { BookText } from "lucide-react";

export default function PublicationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-black text-white py-16 px-6 flex flex-col items-center justify-center text-center">
        <div className="bg-white text-black p-4 rounded-full mb-4 shadow-md">
          <BookText className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Medium Publications</h1>
        <p className="text-gray-300 max-w-xl">
          Learn how to create and manage your own publication to showcase multiple stories and contributors.
        </p>
      </div>

      {/* Content Section */}
      <div className="bg-white px-6 py-10 max-w-4xl mx-auto w-full space-y-10">

        <section>
          <h2 className="text-xl font-semibold mb-2">What Is a Publication?</h2>
          <p className="text-gray-700">
            A publication is like a magazine on Medium. It can include stories from multiple writers,
            organized by themes or topics. Ideal for teams, communities, or personal branding.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">How to Create a Publication</h2>
          <p className="text-gray-700">
            Visit <strong>medium.com/new-publication</strong> and fill in the required info like name,
            description, and custom domain (optional). Choose your branding colors and logos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Publication Sections</h2>
          <p className="text-gray-700">
            Organize your stories into sections (e.g. Tech, Culture, Startup). Sections help readers
            navigate your content more easily.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Managing Editors & Writers</h2>
          <p className="text-gray-700">
            Invite writers or editors to your publication. You can control who can submit, edit,
            or manage stories. Use <strong>Settings → Editors</strong> to manage permissions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Adding a Story to a Publication</h2>
          <p className="text-gray-700">
            To add a story, click the <strong>“Add to publication”</strong> option while editing
            or publishing. You can also submit drafts for review by the publication editors.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Email Subscribers</h2>
          <p className="text-gray-700">
            Readers can subscribe to your publication and receive newsletters. You can send
            email digests using the <strong>“Email subscribers”</strong> option under the publication dashboard.
          </p>
        </section>
      </div>
    </div>
  );
}
