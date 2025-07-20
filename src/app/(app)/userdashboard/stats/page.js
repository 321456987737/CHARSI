"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const StatsPage = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState([]);
  const [totals, setTotals] = useState({ views: 0, saved: 0, likes: 0 });

  useEffect(() => {
    const getAnalytics = async () => {
      try {
        const res = await axios.get("/api/blog-analytics");
        setAnalytics(res.data.data);
        setTotals({
          views: res.data.totalViews,
          saved: res.data.totalSaved,
          likes: res.data.totalLikes,
        });
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    getAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-white py-16 px-6 pt-[150px]">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900">
           Your Blog Analytics
        </h1>

        {/* Totals Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <StatCard title="Total Views" value={totals.views} color="white" />
          <StatCard title="Total Saved" value={totals.saved} color="white" />
          <StatCard title="Total Likes" value={totals.likes} color="white" />
        </div>

        {/* Chart Section */}
        <div className="bg-white p-6 rounded-2xl  border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Views Per Month
          </h2>
          {loading ? (
            <p className="text-gray-500">Loading chart...</p>
          ) : (
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={analytics}
                  margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="views"
                    name="Views"
                    stroke="#808080"
                    strokeWidth={3}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  const colors = {
    indigo: "bg-white text-gray-700",
    yellow: "bg-white text-gray-700",
  };

  return (
    <div
      className={`rounded-2xl p-6  border border-gray-200  transition duration-300 ease-in-out ${colors[color]}`}
    >
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  );
};

export default StatsPage;
