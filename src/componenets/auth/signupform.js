"use client";

import Link from "next/link";
import Logo from "@/componenets/logo/page";
import { useState } from "react";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Chrome } from "lucide-react";

const SignupForm = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const router = useRouter();

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/signup", form);
      if (res.data.success) {
        await signIn("credentials", {
          redirect: true,
          callbackUrl: "/userdashboard",
          username: form.username,
          email: form.email,
          password: form.password,
        });
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    signIn("google", { callbackUrl: "/userdashboard" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-gray-200 space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col items-center space-y-2">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <Logo />
          </motion.div>
          <h2 className="text-3xl font-semibold text-gray-900 mt-3">
            Create an account
          </h2>
          <p className="text-gray-500 text-sm">
            Join us today and start your journey 🚀
          </p>
        </div>

        {/* Error Message */}
        {(errorParam || error) && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-xl"
          >
            {errorParam || error}
          </motion.p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={onFormChange}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onFormChange}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={onFormChange}
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-all"
          >
            {loading ? "Signing up..." : "Sign Up"}
            <ArrowRight size={18} />
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] bg-gray-300 w-1/4" />
          <span className="text-gray-400 text-sm">or</span>
          <div className="h-[1px] bg-gray-300 w-1/4" />
        </div>

        {/* Google Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-100 transition-all"
        >
          <Chrome size={18} />
          Sign up with Google
        </motion.button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/signin" className="text-amber-600 hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupForm;
