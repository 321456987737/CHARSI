"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, X, Edit3, Trash2, ChevronDown } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export const AdminSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();

    const search = async () => {
      if (!searchTerm.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const { data } = await axios.get(`/api/admin/searchblogs`, {
          params: { q: searchTerm },
          signal: controller.signal,
        });
        setResults(data.blogs || []);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Search error:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(search, 350);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await axios.patch(`/api/admin/blog/${selectedBlog._id}`, {
        status: newStatus,
      });
      setSelectedBlog({ ...selectedBlog, status: newStatus });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/admin/blog/${selectedBlog._id}`);
      setSelectedBlog(null);
      setSearchTerm("");
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
  };

  const handleAnalytics = () => {
    router.push(`/admin/bloganalytics/${selectedBlog._id}`);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div
          className={`flex items-center border border-gray-400 rounded-xl overflow-hidden transition-all duration-300 ${
            isExpanded ? "ring-2 ring-gray-400 shadow-md" : "hover:shadow-sm"
          }`}
        >
          <div className="pl-4 pr-2 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search blogs by title, author, or keyword..."
            className="w-full p-3 outline-none bg-transparent placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedBlog(null);
              setIsExpanded(true);
            }}
            onFocus={() => setIsExpanded(true)}
          />
          <div className="flex items-center pr-3 space-x-2">
            {searchTerm && !isLoading && (
              <button
                onClick={() => setSearchTerm("")}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
            {isLoading && (
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 transition-transform"
            >
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Dropdown */}
        <AnimatePresence>
          {isExpanded && searchTerm && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-20 mt-2 w-full bg-white shadow-xl rounded-xl border border-gray-100 max-h-80 overflow-auto"
            >
              {isLoading ? (
                <div className="p-4 flex justify-center">
                  <Loader2 className="animate-spin h-5 w-5 text-blue-500" />
                </div>
              ) : results.length > 0 ? (
                <ul className="divide-y divide-gray-100">
                  {results.map((blog) => (
                    <motion.li
                      key={blog._id}
                      whileHover={{
                        backgroundColor: "rgba(243, 244, 246, 0.5)",
                      }}
                      className="p-4 cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedBlog(blog);
                        setIsExpanded(false);
                      }}
                    >
                      <h3 className="font-medium text-gray-900">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {blog.description}
                      </p>
                      <div className="flex items-center mt-2 text-xs text-gray-400">
                        <span>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{blog?.username || "Unknown"}</span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  {searchTerm.trim()
                    ? "No matching blogs found"
                    : "Start typing to search"}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected Blog */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedBlog.title}
                  </h2>
                  <p className="mt-2 text-gray-600">
                    {selectedBlog.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mt-6">
                  {/* Status Selector */}
                  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm hover:shadow transition">
                    <Edit3 className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-gray-700 font-medium">
                      Status:
                    </span>
                    <select
                      value={selectedBlog.status || "published"}
                      onChange={handleStatusChange}
                      className="bg-transparent text-sm text-blue-600 font-semibold outline-none cursor-pointer"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 bg-white border border-red-200 rounded-lg px-4 py-2 text-red-600 font-semibold shadow-sm hover:bg-red-50 hover:shadow transition"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>

                  {/* Analytics */}
                  <button
                    onClick={handleAnalytics}
                    className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-700 font-semibold shadow-sm hover:bg-gray-100 hover:shadow transition"
                  >
                    📈 View Analytics
                  </button>
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <span>
                    Last updated:{" "}
                    {new Date(selectedBlog.createdAt).toLocaleString()}
                  </span>
                  <span className="mx-2">•</span>
                  <span>
                    Status:{" "}
                    <span className="text-green-600">
                      {selectedBlog.status || "Published"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
