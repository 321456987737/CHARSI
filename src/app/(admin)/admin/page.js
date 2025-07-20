"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Eye, Users, AlertTriangle, ChevronDown } from "lucide-react";
import Link from "next/link";

// Stat Card Component
const StatCard = ({ title, icon: Icon, value, color }) => (
  <div className="bg-white transition-transform duration-300  shadow rounded-2xl p-4 flex items-center gap-4  ">
    <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-xs text-gray-500">{title}</p>
      <h3 className="text-xl font-bold text-gray-900">{value}</h3>
    </div>
  </div>
);

// Custom Dropdown Component
const CustomMonthDropdown = ({ topBlogs, selectedMonth, setSelectedMonth }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const months = topBlogs.map((entry) => entry.month);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-[200px]" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm hover:border-emerald-500 focus:outline-none"
      >
        {selectedMonth || "Select Month"}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto rounded-md bg-white shadow ring-1 ring-black ring-opacity-5">
          {months.map((month) => (
            <li
              key={month}
              onClick={() => {
                setSelectedMonth(month);
                setOpen(false);
              }}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-emerald-100 ${
                selectedMonth === month ? "bg-emerald-50 font-medium" : ""
              }`}
            >
              {month}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const BlogAndUserStats = () => {
  const [blogViews, setBlogViews] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [userStats, setUserStats] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [reportStats, setReportStats] = useState([]);
  const [totalReports, setTotalReports] = useState(0);
  const [topBlogs, setTopBlogs] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [latestReports, setLatestReports] = useState([]);
const [latestBlogs, setLatestBlogs] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRes = await axios.get("/api/totalblog");
        setBlogViews(blogRes.data.monthlyViews);
        setTotalViews(blogRes.data.totalViews);
        setLatestBlogs(blogRes.data.latestBlogs || []);
        setTopBlogs(blogRes.data.topBlogsPerMonth || []);
        if (blogRes.data.topBlogsPerMonth.length > 0) {
          setSelectedMonth(blogRes.data.topBlogsPerMonth.at(-1).month);
        }

        const userRes = await axios.get("/api/totalusers");
        setUserStats(userRes.data.monthlyUsers);
        setTotalUsers(userRes.data.totalUsers);

        const reportRes = await axios.get("/api/totalreports");
        setReportStats(reportRes.data.monthlyReports);
        setTotalReports(reportRes.data.totalReports);
        setLatestReports(reportRes.data.latestReports || []);
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full p-6 space-y-12">
      {/* Stat Cards */}
      <div className="flex  flex-wrap gap-6 items-center justify-around">
        <StatCard title="Total Blog Views" icon={Eye} value={totalViews} color="emerald" />
        <StatCard title="Total Users" icon={Users} value={totalUsers} color="green" />
        <StatCard title="Total Reports" icon={AlertTriangle} value={totalReports} color="red" />
      </div>

      {/* Blog Views Chart */}
      <div className="bg-white rounded-2xl shadow px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">📈 Monthly Blog Views</h2>
        <div className="h-[260px] sm:h-[280px] md:h-[300px] lg:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={blogViews}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                interval={0}
                tick={{ fontSize: 11, angle: -30, textAnchor: "end" }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* User Signups */}
        <div className="bg-white rounded-2xl shadow px-6 py-4 w-full lg:w-1/2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">👥 Monthly User Signups</h2>
          <div className="h-[260px] sm:h-[280px] md:h-[300px] lg:h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  interval={0}
                  tick={{ fontSize: 11, angle: -30, textAnchor: "end" }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reports */}
        <div className="bg-white rounded-2xl shadow px-6 py-4 w-full lg:w-1/2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">🚨 Monthly Reports</h2>
          <div className="h-[260px] sm:h-[280px] md:h-[300px] lg:h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  interval={0}
                  tick={{ fontSize: 11, angle: -30, textAnchor: "end" }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Trending Blogs by Month */}
      <div className="bg-white rounded-2xl shadow px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
          <h2 className="text-lg font-semibold text-gray-800">
            🔥 Top 5 Trending Blogs — Monthly
          </h2>
          <CustomMonthDropdown
            topBlogs={topBlogs}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        </div>

        {topBlogs
          .filter((entry) => entry.month === selectedMonth)
          .map((entry) => (
            <ul key={entry.month} className="space-y-3">
              {entry.blogs.length === 0 ? (
                <li className="text-gray-400 italic text-sm">
                  No blogs found for this month.
                </li>
              ) : (
                entry.blogs.map((blog, index) => (
                  <li
                    key={blog._id}
                    className="flex justify-between items-center bg-gray-50 rounded-md px-4 py-2 hover:bg-gray-100 transition"
                  >
                    <span>
                      <span className="font-medium text-gray-700">{index + 1}.</span>{" "}
                      <Link
                        href={`/userdashboard/readblog/${blog.slug}`}
                        className="text-gray-600 hover:underline font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {blog.title}
                      </Link>
                    </span>
                    <span className="text-gray-500 text-xs">{blog.views} views</span>
                  </li>
                ))
              )}
            </ul>
          ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
  {/* Latest 5 Reports */}
  <div className="bg-white rounded-2xl shadow px-6 py-6 w-full lg:w-1/2">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">🕵️‍♂️ Latest 5 Reports</h2>
    {latestReports.length === 0 ? (
      <p className="text-sm text-gray-400 italic">No recent reports found.</p>
    ) : (
      <ul className="divide-y divide-gray-200">
        {latestReports.map((report, index) => (
          <li
            key={report._id}
            className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
          >
            <div>
              <p className="text-sm text-gray-800 font-medium">
                {index + 1}. {report.message}
              </p>
              <p className="text-xs text-gray-500">
                Submitted by: <span className="font-mono">{report.userId}</span>
              </p>
            </div>
            <p className="text-xs text-gray-400">
              {new Date(report.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    )}
  </div>

  {/* Latest 5 Blogs */}
  <div className="bg-white rounded-2xl shadow px-6 py-6 w-full lg:w-1/2">
    <h2 className="text-lg font-semibold text-gray-800 mb-4">🆕 Latest 5 Blogs</h2>
    <ul className="space-y-3">
      {latestBlogs.length === 0 ? (
        <li className="text-gray-400 italic text-sm">No blogs available.</li>
      ) : (
        latestBlogs.map((blog, index) => (
          <li
            key={blog._id}
            className="flex justify-between items-center bg-gray-50 rounded-md px-4 py-2 hover:bg-gray-100 transition"
          >
            <span>
              <span className="font-medium text-gray-700">{index + 1}.</span>{" "}
              <Link
                href={`/userdashboard/readblog/${blog._id}`}
                className="text-gray-600 hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                {blog.title}
              </Link>
            </span>
            <span className="text-gray-500 text-xs">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </li>
        ))
      )}
    </ul>
  </div>
</div>

    </div>
  );
};

export default BlogAndUserStats;
