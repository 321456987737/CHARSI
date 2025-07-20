"use client";
import { useState, useEffect, useRef } from "react";
import Yourlist from "../yourlist";
import Savedlist from "../savedlist";
import Likedlist from "../likedlist";
import Readlist from "../readinghoistory";
import Highlightedlist from "../highlight";

const tabs = [
  { id: "your", label: "Your List", component: <Yourlist /> },
  { id: "saved", label: "Saved", component: <Savedlist /> },
  { id: "liked", label: "Liked", component: <Likedlist /> },
  { id: "read", label: "Read", component: <Readlist /> },
  { id: "highlighted", label: "Highlighted", component: <Highlightedlist /> },
];

export default function ListTabs() {
  const [activeTab, setActiveTab] = useState("your");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef({});

  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div className="w-full max-w-4xl mx-auto  px-4 py-8">
      {/* Tab Navigation with moving background */}
      <div className="relative">
        <ul className="flex space-x-4  pb-2 relative">
          {/* Sliding Indicator */}
          <div
            className="absolute  bottom-0 border-gray-200 h-[2px] bg-gray-400 transition-all duration-300 "
            style={indicatorStyle}
          />

          {tabs.map((tab) => (
            <li
              key={tab.id}
              ref={(el) => (tabRefs.current[tab.id] = el)}
              className={`cursor-pointer relative px-4 py-2 text-sm font-medium transition-colors duration-200 
                ${
                  activeTab === tab.id
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="mt-6   p-6 bg-white  border-t transition-all duration-500">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}
