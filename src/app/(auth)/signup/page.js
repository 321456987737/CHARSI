"use client";

import Link from "next/link";
import Logo from "@/componenets/logo/page";
import { useState } from "react";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
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

      router.push("/userdashboard");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleGoogleSignUp = () => {
    signIn("google");
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 space-y-6 border border-gray-200">
        <div className="flex flex-col items-center">
          <Logo />
          <h2 className="text-2xl font-semibold mt-4">Create an account</h2>
          <p className="text-sm text-gray-500">Sign up to get started</p>
        </div>

        {errorParam || error ? (
          <p className="text-red-500 text-sm text-center">{errorParam || error}</p>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={onFormChange}
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onFormChange}
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onFormChange}
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

export default Page;

// "use client";
// import Link from "next/link";
// import Logo from "@/componenets/logo/page";
// import { useState } from "react";
// import axios from "axios";
// import { useSession, signIn, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
// const Page = () => {
//   const { data: session } = useSession();
//   const searchParams = useSearchParams();
//   const errorParam = searchParams.get("error");
//   console.log(session);
//   const router = useRouter();
//   const [form, setform] = useState({ username: "", email: "", password: "" });
//   const [Error, setError] = useState(null);

//   const onformchange = (e) => {
//     setform({ ...form, [e.target.name]: e.target.value });
//   };
//   const handlesubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     try {
//       const res = await axios.post("/api/auth/signup", form);
//       // Automatically sign in after signup
//       await signIn("credentials", {
//         redirect: false,
//         username: form.username,
//         email: form.email,
//         password: form.password,
//       });
//       router.push("/userdashboard");
//       setError(null);
//     } catch (error) {
//       console.error(error);
//       setError(error.response?.data?.message || "Something went wrong");
//     }
//   };
//   const signinwithgoogle = () => {
//     signIn("google");
//   };
//   return (
//     <div className="h-screen w-screen flex items-center justify-center flex-col">
//       <div className="flex items-center justify-between flex-col">
//         <div className="flex items-center justify-center">
//           <Logo />
//         </div>
//         <div className="bg-white text-black flex items-center justify-center flex-col max-w-[420px] w-[380px] h px-10 py-10 gap-3 rounded-2xl border border-gray-300">
//           <div className="mb-6">
//             <span className="text-4xl font-semibold ">Sign up</span>
//           </div>
//           <span className="text-red-500 text-sm text-center">{errorParam}</span>
//           <span className="text-red-500 text-sm text-center">{Error}</span>
//           <div>
//             <form onSubmit={handlesubmit} action="">
//               <div className="flex flex-col gap-4 ">
//                 <input
//                   className="pr-6 pl-4 py-2 border w-full border-gray-300 rounded-2xl"
//                   type="text"
//                   name="username"
//                   value={form.username}
//                   onChange={onformchange}
//                   placeholder="Username"
//                 />
//                 <input
//                   className="pr-6 pl-4 py-2 border border-gray-300 rounded-2xl"
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={onformchange}
//                   placeholder="Email"
//                 />
//                 <input
//                   className="pr-2 pl-4 py-2 border border-gray-300 rounded-2xl"
//                   type="password"
//                   name="password"
//                   value={form.password}
//                   onChange={onformchange}
//                   placeholder="Password"
//                 />
//                 <button
//                   type="submit"
//                   className="bg-black text-white px-4 py-2 text-md rounded-full cursor-pointer hover:bg-gray-800 transition"
//                 >
//                   Sign Up
//                 </button>
//               </div>
//             </form>
//           </div>
//           <div className="border-t mt-3 mb-3 border-gray-300 w-full "></div>
//           <div>
//             <div>
//               <button
//                 onClick={signinwithgoogle}
//                 className="px-6 py-2 border rounded-lg border-gray-300 hover:bg-gray-100 cursor-pointer"
//               >
//                 SIgn up with google
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div>
//         already have an account ?
//         <Link href="/signin">
//           <span className="pl-2 hover:underline text-blue-600">Sign in</span>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Page;
