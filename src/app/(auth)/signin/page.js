"use client";

import Link from "next/link";
import Logo from "@/componenets/logo/page";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
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

export default Page;

// "use client";
// import Link from "next/link";
// import Logo from "@/componenets/logo/page";
// import { useState } from "react";
// import axios from "axios";
// import { useSession, signIn } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";

// const Page = () => {
//   const { data: session } = useSession();
//   const searchParams = useSearchParams();
//   const errorParam = searchParams.get("error");

//   const router = useRouter();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const onFormChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       const result = await signIn("credentials", {
//         redirect: false,
//         email: form.email,
//         password: form.password,
//       });

//       if (result?.ok) {
//         router.push("/userdashboard");
//       } else {
//         setError(result?.error || "Invalid credentials");
//       }
//     } catch (err) {
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signInWithGoogle = () => {
//     signIn("google", { callbackUrl: "/userdashboard" });
//   };

//   return (
//     <div className="h-screen w-screen flex items-center justify-center flex-col">
//       <div className="flex items-center justify-between flex-col">
//         <div className="flex items-center justify-center">
//           <Logo />
//         </div>

//         <div className="bg-white text-black flex items-center justify-center flex-col max-w-[420px] w-[380px] px-10 py-10 gap-3 rounded-2xl border border-gray-300">
//           <div className="mb-6">
//             <span className="text-4xl font-semibold">Sign In</span>
//           </div>

//           {(errorParam || error) && (
//             <span className="text-red-500 text-sm text-center">
//               {errorParam || error}
//             </span>
//           )}

//           <form onSubmit={handleSubmit} className="w-full">
//             <div className="flex flex-col gap-4">
//               <input
//                 className="pr-6 pl-4 py-2 border border-gray-300 rounded-2xl"
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={onFormChange}
//                 placeholder="Email"
//                 required
//               />

//               <input
//                 className="pr-2 pl-4 py-2 border border-gray-300 rounded-2xl"
//                 type="password"
//                 name="password"
//                 value={form.password}
//                 onChange={onFormChange}
//                 placeholder="Password"
//                 required
//               />

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="bg-black text-white px-4 py-2 text-md rounded-full cursor-pointer hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? "Signing in..." : "Sign In"}
//               </button>
//             </div>
//           </form>

//           <div className="border-t mt-3 mb-3 border-gray-300 w-full" />

//           <button
//             onClick={signInWithGoogle}
//             className="px-6 py-2 border rounded-lg border-gray-300 hover:bg-gray-100 cursor-pointer"
//           >
//             Sign in with Google
//           </button>
//         </div>
//       </div>

//       <div className="mt-4">
//         Don’t have an account?
//         <Link href="/signup">
//           <span className="pl-2 hover:underline text-blue-600">Sign Up</span>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Page;
