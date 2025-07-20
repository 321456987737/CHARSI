"use client";
import { useState } from "react";

// Import components
import AccountSettings from "./AccountSettings";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import BioSettings from "./BioSettings";
import UserBlogs from "./UserBlogs";
import SocialConnections from "./SocialConnections";
import NotificationSettings from "./NotificationSettings";

const SECTIONS = [
  { id: "account", label: "Account" },
  { id: "password", label: "Password" },
  { id: "bio", label: "Bio" },
  { id: "blogs", label: "Your Blogs" },
  { id: "social", label: "Followers & Following" },
  { id: "notifications", label: "Notifications" },
  { id: "danger", label: "Danger Zone" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "account":
        return <AccountSettings />;
      case "password":
        return <ChangePassword />;
      case "bio":
        return <BioSettings />;
      case "blogs":
        return <UserBlogs />;
      case "social":
        return <SocialConnections />;
      case "notifications":
        return <NotificationSettings />;
      case "danger":
        return <DeleteAccount />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto pt-[150px] gap-6 px-4">
      {/* Sidebar Navigation */}
      <aside className="lg:w-1/4 space-y-2">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                activeTab === section.id
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {section.label}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="lg:w-3/4">{renderActiveComponent()}</main>
    </div>
  );
}
