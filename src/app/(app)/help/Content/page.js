"use client";

import { Volume2 } from "lucide-react";

export default function ContentPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-black text-white py-16 px-6 flex flex-col items-center justify-center text-center">
        <div className="bg-white text-black p-4 rounded-full mb-4 shadow-md">
          <Volume2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Content Guidelines</h1>
        <p className="text-gray-300 max-w-xl">
          Understand Medium’s content standards, best practices, and what is or isn’t allowed on the platform.
        </p>
      </div>

      {/* Content Section */}
      <div className="bg-white px-6 py-10 max-w-4xl mx-auto w-full space-y-10">

        <section>
          <h2 className="text-xl font-semibold mb-2">Content Policies</h2>
          <p className="text-gray-700">
            Medium supports open expression, but stories must align with policies around
            respectful dialogue, factual accuracy, and community well-being.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Controversial, Suspect & Extreme Content</h2>
          <p className="text-gray-700">
            Medium restricts content that promotes violence, misinformation, hate, or extremism.
            Content should aim to inform or provoke thoughtful conversation, not incite harm.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Best Practices for Journalistic Content</h2>
          <span className="text-gray-700">
            If you publish news or investigative content:
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Ensure sources are cited and fact-checked</li>
              <li>Avoid sensational or misleading titles</li>
              <li>Disclose conflicts of interest</li>
            </ul>
          </span>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">COVID-19 Content Policy</h2>
          <p className="text-gray-700">
            Medium applies extra scrutiny to content related to COVID-19 to prevent misinformation.
            Stories on medical topics must be based on reliable sources and public health guidance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Removing or Reporting Content</h2>
          <p className="text-gray-700">
            Readers can report posts they believe violate Medium’s content rules. Mediums Trust & Safety
            team reviews reports and may remove content or restrict accounts where necessary.
          </p>
        </section>

      </div>
    </div>
  );
}
