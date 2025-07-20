"use client";

import Link from "next/link";
import {
  BookText,
  Shield,
  FileText,
  Megaphone,
  Users,
  UserCog,
  Edit3,
  Globe,
  Volume2,
  Server,
  BookOpenCheck,
} from "lucide-react";
import axios from "axios";
const topics = [
  { name: "Getting started", link: "Gettingstarted", icon: Globe },
  { name: "Managing your account", link: "Managingyouraccount", icon: UserCog },
  { name: "Reading", link: "Reading", icon: BookOpenCheck },
  { name: "Managing stories", link: "Managingstories", icon: FileText },
  { name: "Writing & editing", link: "Writing&editing", icon: Edit3 },
  { name: "Distribution", link: "Distribution", icon: Megaphone },
  { name: "Partner Program", link: "PartnerProgram", icon: Users },
  { name: "Publications", link: "Publications", icon: BookText },
  { name: "Terms & Policies", link: "Terms&Policies", icon: Server },
  { name: "Content", link: "Content", icon: Volume2 },
  { name: "Safety", link: "Safety", icon: Shield },
];

export default function HelpLandingPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
          Help Center
        </h1>
        <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">
          Find answers and guidance for using Medium. Choose a topic to get
          started.
        </p>
      </div>
      {/* Report Form Section */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-12 shadow-sm">
        <h3 className="text-xl font-semibold text-red-700 mb-2">
          Want to report a problem?
        </h3>
        <p className="text-sm text-red-600 mb-4">
          Let us know about bugs, abuse, or policy violations.
        </p>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const input = e.target.elements.reportMessage;
            const message = input.value.trim();

            if (!message) return;

            try {
              await axios.post("/api/report", { message });
              alert("Report submitted successfully!");
              input.value = "";
            } catch (err) {
              alert("Failed to submit report.");
              console.error(err);
            }
          }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
        >
          <input
            type="text"
            name="reportMessage"
            placeholder="Describe the issue..."
            className="flex-1 px-4 py-2 border  border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium transition"
          >
            Submit Report
          </button>
        </form>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map(({ name, link, icon: Icon }) => (
          <Link
            key={link}
            href={`/help/${link}`}
            className="block bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-200 p-6 hover:scale-[1.02] transform"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full shadow-sm">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-blue-700">
                  {name}
                </h2>
                <p className="text-sm text-gray-500">
                  Everything you need to know about {name.toLowerCase()}.
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
