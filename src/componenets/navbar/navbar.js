"use client";

import Link from "next/link";
import React from "react";
import Logo from "@/componenets/logo/page";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="h-[75px] border-b border-solid w-full z-50 bg-amber-50 flex items-center justify-center fixed">
      <div className="w-[80%] flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center justify-center">
          <div className="ml-[-75px]">
            <Logo />
          </div>
        </div>

        {/* NAV LINKS */}
        <div className="flex items-center gap-4 text-[13px] font-semibold text-gray-600">

          <div className="md:flex hidden gap-4">
            <Link href="/about" className="hover:text-black transition">
              Our Story
            </Link>

            <Link href="/membership" className="hover:text-black transition">
              Membership
            </Link>

            <Link href="/writing" className="hover:text-black transition">
              Write
            </Link>

            {/* only show signin if not logged in */}
            {!session && (
              <Link href="/signin" className="hover:text-black transition">
                Sign In
              </Link>
            )}
          </div>

          {/* RIGHT SIDE (SESSION UI) */}
          <div className="mr-[-15px]">

            {status === "loading" ? (
              <button className="bg-gray-300 text-white px-4 py-2 rounded-full">
                Loading...
              </button>
            ) : session ? (
              <div className="flex items-center gap-3">

                {/* PROFILE */}
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
                  <img
                    src={session.user?.image || "/default-avatar.png"}
                    alt="user"
                    className="w-8 h-8 rounded-full"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    {session.user?.name?.split(" ")[0]}
                  </span>
                </div>

                {/* DASHBOARD BUTTON */}
                <Link
                  href="/userdashboard"
                  className="bg-black text-white px-4 py-2 rounded-full hover:opacity-90 transition"
                >
                  Dashboard
                </Link>

                {/* LOGOUT */}
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition"
                >
                  Logout
                </button>

              </div>
            ) : (
              <Link
                href="/signin"
                className="bg-black text-white px-4 py-2 rounded-full hover:opacity-90 transition"
              >
                Get Started
              </Link>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
// "use client";
// import Link from "next/link";
// import React from "react";
// import Logo from "@/componenets/logo/page";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// const Navbar = () => {
//   const { data: session } = useSession();
//   const router = useRouter();
//   return (
//     <div className="h-[75px] border-b-[1px] fixed border-solid w-full z-50 bg-amber-50   flex items-center justify-center ">
//       <div className="w-[80%] flex items-center justify-between">
//         <div className="flex items-center justify-center">
//           <div className="ml-[-75px]">
//             <Logo />
//           </div>
//         </div>
//         <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-600 flex-nowrap">
//           <div className="md:flex hidden gap-4">
//             <button className="hover:cursor-pointer ">
//               <Link href={"/about"}>Our Story</Link>
//             </button>
//             <button className="hover:cursor-pointer">
//               <Link href={"/membership"}>Membership</Link>
//             </button>
//             <button className="hover:cursor-pointer">
//               <Link href={"/writing"}>Write</Link>
//             </button>
//             <button className="hover:cursor-pointer">
//               <Link href={"/signin"}>SignIn</Link>
//             </button>
//           </div>
//           <div className="mr-[-15px]">
//               <button onClick={()=>{session?router.push("/userdashboard"):router.push("/signin")}} className="bg-black text-white px-4 py-2 text-md rounded-full cursor-pointer inline-block">
//                 Get Started
//               </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
