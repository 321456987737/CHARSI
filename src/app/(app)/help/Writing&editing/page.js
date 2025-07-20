"use client";

import { Edit3 } from "lucide-react";

export default function WritingEditingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-black text-white py-16 px-6 flex flex-col items-center justify-center text-center">
        <div className="bg-white text-black p-4 rounded-full mb-4 shadow-md">
          <Edit3 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Writing & Editing</h1>
        <p className="text-gray-300 max-w-xl">
          Learn how to use Medium s editor, format your story, add images, and share drafts.
        </p>
      </div>

      {/* Content Section */}
      <div className="bg-white px-6 py-10 max-w-4xl mx-auto w-full space-y-10">

        <section>
          <h2 className="text-xl font-semibold mb-2">Using the Story Editor</h2>
          <p className="text-gray-700">
            Medium s editor is clean and intuitive. Click Write in the top menu to start a new story.
            Type directly in the editor, and use the  button to add media like images or embeds.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Formatting Text</h2>
          <p className="text-gray-700">
            Highlight text to apply formatting: <strong>bold, italic, headers, quotes, links</strong>, etc.
            You can also create lists and add code blocks.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Adding Images & Embeds</h2>
          <p className="text-gray-700">
            Click the <strong>+</strong> icon or paste a link to insert:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
            <li>Images (drag & drop or upload)</li>
            <li>Videos (YouTube, Vimeo)</li>
            <li>Social media embeds (X/Twitter, Instagram)</li>
            <li>Code snippets or Gists</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Using Tags</h2>
          <p className="text-gray-700">
            You can add up to 5 tags when publishing. Tags help your story get discovered
            by readers interested in similar topics.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Sharing Drafts</h2>
          <p className="text-gray-700">
            Want feedback before publishing? Click Share draft and copy the private link to send
            to friends or editors.
          </p>
        </section>

      </div>
    </div>
  );
}
