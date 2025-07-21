"use client";

import Link from "next/link";
import Logo from "@/componenets/logo/page";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const SigninForm = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
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
      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (result?.ok) {
        router.push("/userdashboard");
      } else {
        setError(result?.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = () => {
    signIn("google", { callbackUrl: "/userdashboard" });
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 space-y-6 border border-gray-200">
        <div className="flex flex-col items-center">
          <Logo />
          <h2 className="text-2xl font-semibold mt-4">Welcome Back</h2>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </div>

        {(errorParam || error) && (
          <p className="text-red-500 text-sm text-center">
            {errorParam || error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center justify-center">
          <span className="text-gray-400 text-sm">or</span>
        </div>

        <button
          onClick={signInWithGoogle}
          className="w-full py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
        >
          Sign in with Google
        </button>

        <div className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
