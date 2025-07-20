"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const AnalyticsPage = () => {
  const { id } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Analytics data:", analytics);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/blog/analytics/${id}`);
        setAnalytics(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAnalytics();
  }, [id]);

  if (loading) return (
    <div className="p-4 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading analytics...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-4 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    </div>
  );

  if (!analytics) return (
    <div className="p-4 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-gray-600">No analytics data available</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          📊 Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Detailed insights for: <span className="font-semibold text-blue-600">{analytics.blog.title}</span>
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Views</p>
              <p className="text-2xl font-bold text-blue-600">
                {analytics.totalViews ? analytics.totalViews.toLocaleString() : '0'}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <span className="text-2xl">👀</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Likes</p>
              <p className="text-2xl font-bold text-green-600">{analytics.blog.likes}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <span className="text-2xl">❤️</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Comments</p>
              <p className="text-2xl font-bold text-purple-600">{analytics.blog.commentsCount}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <span className="text-2xl">💬</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Monthly Total</p>
              <p className="text-2xl font-bold text-orange-600">
                {analytics.monthlyTotal ? analytics.monthlyTotal.toLocaleString() : '0'}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Views Chart */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Monthly Views (Last 12 Months)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={analytics.views}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              allowDecimals={false}
              stroke="#666"
              fontSize={12}
            />
            <Tooltip 
              formatter={(value) => [value.toLocaleString(), 'Views']}
              labelFormatter={(label) => `${label} 2024`}
              contentStyle={{
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="views" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8, fill: '#1d4ed8' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Blog Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Blog Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Category:</span>
              <span className="font-medium">{analytics.blog.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Author:</span>
              <span className="font-medium">{analytics.blog.username}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                analytics.blog.status === 'published' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {analytics.blog.status}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Publication Info</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Created:</span>
              <span className="font-medium">
                {new Date(analytics.blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Updated:</span>
              <span className="font-medium">
                {new Date(analytics.blog.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Blog ID:</span>
              <span className="font-medium text-xs text-gray-600">{analytics.blog._id}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown Table */}


      {/* Debug Info - Always show for now */}
      <div className="bg-gray-800 text-white p-4 rounded-xl">
        <h3 className="text-lg font-semibold mb-2">Debug Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-300">Blog Views (from DB):</p>
            <p className="text-lg font-bold text-yellow-400">{analytics.blog.views || 'null/undefined'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Monthly Total (calculated):</p>
            <p className="text-lg font-bold text-green-400">{analytics.monthlyTotal || 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Total Views (final):</p>
            <p className="text-lg font-bold text-blue-400">{analytics.totalViews || 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Views Array Length:</p>
            <p className="text-lg font-bold text-purple-400">{analytics.views?.length || 0}</p>
          </div>
        </div>
        {/* <details className="text-xs">
          <summary className="cursor-pointer mb-2">Full Response Data</summary>
          <pre className="overflow-x-auto bg-gray-900 p-2 rounded">
            {JSON.stringify(analytics, null, 2)}
          </pre>
        </details> */}
      </div>
    </div>
  );
};

export default AnalyticsPage;