
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPaths = ["/userdashboard", "/writing", "/admin"];

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 1️⃣ Redirect unauthenticated users
  if (protectedPaths.includes(url.pathname)) {
    if (!token) {
      url.pathname = "/signup";
      return NextResponse.redirect(url);
    }
  }

  // 2️⃣ If user is logged in and trying to access adminpanel, validate admin
  if (url.pathname === "/admin") {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getadminusers`);
      console.log("Admin users fetched:1", res.status);
      const adminUsers = await res.json();
      console.log("Admin users fetched:2", adminUsers);

      const isAdmin = adminUsers?.some((admin) => admin.email === token.email);
      console.log("Admin users fetched:3", res.status);

      if (!isAdmin) {
        url.pathname = "/userdashboard"; // redirect unauthorized users
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error("Admin check failed:4", error);
      url.pathname = "/userdashboard";
      return NextResponse.redirect(url);
    }
  }
      console.log("Admin users fetched:", res.status);

  return NextResponse.next();
}

export const config = {
  matcher: ["/userdashboard", "/writing", 
    "/admin"
  ],
};
