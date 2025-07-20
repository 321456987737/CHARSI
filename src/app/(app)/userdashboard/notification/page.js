"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Bell, X } from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const session = useSession();
  const userEmail = session?.data?.user?.email;

  useEffect(() => {
    if (!userEmail) return;

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`/api/notification?email=${userEmail}`);
        setNotifications(res.data.notifications);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };

    fetchNotifications();
  }, [userEmail]);

  const markAsRead = async (id) => {
    try {
      await axios.patch(`/api/notification/read`, { id });
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-[140px] px-4">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <Bell className="w-6 h-6 text-yellow-500" />
        Notifications
      </h2>

      {notifications.length === 0 ? (
        <p className="text-gray-500 italic">You re all caught up! 🎉</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li
              key={n._id}
              className="bg-white shadow-md rounded-xl px-5 py-4 flex justify-between items-start hover:shadow-lg transition-all border border-gray-100"
            >
              <div>
                <p className="text-gray-800">
                  <strong className="text-blue-600">{n.username}</strong>{" "}
                  published <em className="text-gray-700">{n.title}</em>
                </p>
                <span className="text-xs text-gray-400">
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => markAsRead(n._id)}
                className="text-gray-400 hover:text-red-500 transition"
                aria-label="Mark as read"
              >
                <X className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
