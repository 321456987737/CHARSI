"use client";

import { Megaphone } from "lucide-react";

export default function DistributionPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-black text-white py-16 px-6 flex flex-col items-center justify-center text-center">
        <div className="bg-white text-black p-4 rounded-full mb-4 shadow-md">
          <Megaphone className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Story Distribution</h1>
        <p className="text-gray-300 max-w-xl">
          Learn how your story is shared on Medium and how to reach more readers.
        </p>
      </div>

      {/* Content Section */}
      <div className="bg-white px-6 py-10 max-w-4xl mx-auto w-full space-y-10">

        <section>
          <h2 className="text-xl font-semibold mb-2">How Distribution Works</h2>
          <p className="text-gray-700">
            When you publish a story, Medium’s algorithm may recommend it to others via the homepage,
            email digests, or topic pages. The more engaging and relevant your story is, the better
            chance it has of being distributed widely.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Editorial Curation</h2>
          <p className="text-gray-700">
            Medium may manually review stories for curation. If selected, your story will be featured
            in topic feeds or newsletters. Stories must follow community guidelines and be of high quality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Distribution Signals</h2>
          <p className="text-gray-700">
            Signals like <strong>read time, engagement, highlights, shares, and comments</strong> affect
            how your post performs in Medium’s distribution system.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Tips for Better Reach</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Use a clear, attention-grabbing title</li>
            <li>Add a great cover image</li>
            <li>Use relevant tags</li>
            <li>Share your story on social media</li>
            <li>Encourage engagement and comments</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Medium’s Quality Standards</h2>
          <p className="text-gray-700">
            To be eligible for distribution, stories must be original, thoughtful, and follow Medium’s
            quality guidelines. Avoid spammy behavior or clickbait.
          </p>
        </section>
      </div>
    </div>
  );
}
