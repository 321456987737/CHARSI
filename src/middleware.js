import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPaths = ["/userdashboard", "/writing", "/admin"];

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const pathname = url.pathname;

  // 1️⃣ Premium Route Guard
  if (pathname.startsWith('/premium')) {
    if (!token?.user?.subscriptionStatus || token.user.subscriptionStatus === 'FREE') {
      return NextResponse.redirect(new URL('/plans', req.url));
    }
  }

  // 2️⃣ Auth Protected Routes
  if (protectedPaths.includes(pathname)) {
    if (!token) {
      url.pathname = "/signup";
      return NextResponse.redirect(url);
    }
  }

  // 3️⃣ Admin Route Check
  if (pathname === "/admin") {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getadminusers`);
      const adminUsers = await res.json();

      const isAdmin = adminUsers?.some((admin) => admin.email === token.email);

      if (!isAdmin) {
        url.pathname = "/userdashboard";
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error("Admin check failed:", error);
      url.pathname = "/userdashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// 👇 Matcher includes all required paths
export const config = {
  matcher: [
    "/userdashboard",
    "/writing",
    "/admin",
    "/premium/:path*"
  ],
};


// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// const protectedPaths = ["/userdashboard", "/writing", "/admin"];

// export async function middleware(req) {
//   const url = req.nextUrl.clone();
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   // 1️⃣ Redirect unauthenticated users
//   if (protectedPaths.includes(url.pathname)) {
//     if (!token) {
//       url.pathname = "/signup";
//       return NextResponse.redirect(url);
//     }
//   }

//   // 2️⃣ If user is logged in and trying to access adminpanel, validate admin
//   if (url.pathname === "/admin") {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getadminusers`);
//       const adminUsers = await res.json();

//       const isAdmin = adminUsers?.some((admin) => admin.email === token.email);

//       if (!isAdmin) {
//         url.pathname = "/userdashboard"; // redirect unauthorized users
//         return NextResponse.redirect(url);
//       }
//     } catch (error) {
//       console.error("Admin check failed:", error);
//       url.pathname = "/userdashboard";
//       return NextResponse.redirect(url);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/userdashboard", "/writing", "/admin"],
// };
