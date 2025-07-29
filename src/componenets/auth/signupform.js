// components/auth/SignupForm.jsx
"use client";

import Link from "next/link";
import Logo from "@/componenets/logo/page";
import { useState } from "react";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const SignupForm = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);

  const onFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post("/api/auth/signup", form);

      await signIn("credentials", {
        redirect: false,
        username: form.username,
        email: form.email,
        password: form.password,
      });
      res.data.success && router.push("/userdashboard");
    } catch (error) {
      console.error(error);
      setError(error.res?.data?.message || "Something went wrong");
    }
  };

  const handleGoogleSignUp = () => {
    signIn("google", { callbackUrl: "/userdashboard" });
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 space-y-6 border border-gray-200">
        <div className="flex flex-col items-center">
          <Logo />
          <h2 className="text-2xl font-semibold mt-4">Create an account</h2>
          <p className="text-sm text-gray-500">Sign up to get started</p>
        </div>

        {(errorParam || error) && (
          <p className="text-red-500 text-sm text-center">{errorParam || error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={onFormChange}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onFormChange}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onFormChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center justify-center">
          <span className="text-gray-400 text-sm">or</span>
        </div>

        <button
          onClick={handleGoogleSignUp}
          className="w-full py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
        >
          Sign up with Google
        </button>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
