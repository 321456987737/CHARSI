"use client";

import { BookOpenCheck } from "lucide-react";

export default function ReadingHelpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-black text-white py-16 px-6 flex flex-col items-center justify-center text-center">
        <div className="bg-white text-black p-4 rounded-full mb-4 shadow-md">
          <BookOpenCheck className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Reading on Medium</h1>
        <p className="text-gray-300 max-w-xl">
          Discover how to manage your reading experience on Medium with custom feeds, lists, and controls.
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white px-6 py-10 max-w-4xl mx-auto w-full space-y-10">

        <section>
          <h2 className="text-xl font-semibold mb-2">Your Homepage Feed</h2>
          <p className="text-gray-700">
            Your Medium homepage is personalized based on who and what you follow. It includes
            recommended stories, topics, and publications curated just for you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Creating and Managing Lists</h2>
          <p className="text-gray-700">
            Save stories into custom lists. You can create a list from the story page or from your profile.
            Use lists to group stories by theme or interest.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Control Your Recommendations</h2>
          <p className="text-gray-700">
            You can improve your recommendations by following/unfollowing topics and authors. Visit
            <strong> Settings → Customize recommendations</strong> to reset your interests anytime.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Mute an Author or Publication</h2>
          <p className="text-gray-700">
            Don’t want to see content from someone? Use the “Mute” option from the story menu or their profile
            to remove their stories from your feed and recommendations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Audio Versions</h2>
          <p className="text-gray-700">
            For Medium members, many stories include audio versions. Tap the headphone icon to listen instead
            of reading. Great for multitasking!
          </p>
        </section>
      </div>
    </div>
  );
}
