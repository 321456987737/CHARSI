import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sessionwraper from "@/componenets/sessionwraper";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // --- Basic SEO ---
  title: {
    default: "Charsi | Blog Anything, Anytime",
    template: "%s | Charsi",
  },
  description:
    "Charsi is a modern, minimalist blogging platform to read, write, and share powerful ideas. Fast, elegant, and open to everyone.",
  keywords: [
    "Charsi",
    "Blogging platform",
    "Write blogs",
    "Read blogs",
    "Next.js blog",
    "Open-source blogging",
    "SEO friendly blog",
    "Modern blog app",
  ],
  metadataBase: new URL("https://charsi-sage.vercel.app"),
  authors: [{ name: "Iftikhar Ali", url: "https://charsi-sage.vercel.app" }],
  creator: "Iftikhar Ali",
  publisher: "Charsi Inc.",
  category: "Blogging",

  // --- Robots & Indexing ---
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },

  // --- Icons ---
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png", // optional if you create it
  },

  // --- Theme & App Meta ---
  // themeColor: "#ffffff",
  // colorScheme: "light",
  applicationName: "Charsi",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Charsi",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },

  // --- Open Graph for Social Sharing ---
  openGraph: {
    title: "Charsi Blogs",
    description:
      "Explore, write, and share impactful stories. No sign-up needed. Charsi is the new way to blog.",
    url: "https://your-site.com",
    siteName: "Charsi",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Charsi blog open graph image",
      },
    ],
  },

  // --- Twitter Card ---
  twitter: {
    card: "summary_large_image",
    site: "@yourhandle",
    title: "Charsi Blog Platform",
    description:
      "Join the next-gen blogging experience with Charsi. Share your thoughts freely.",
    images: ["/og-image.png"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Your Site Name",
              url: process.env.NEXT_PUBLIC_SITE_URL,
            }),
          }}
        />
      </head>
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Sessionwraper>{children}</Sessionwraper>
      </body>
    </html>
  );
}
