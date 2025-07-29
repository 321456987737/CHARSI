"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Logo from "@/componenets/logo/page";
import Suggestion from "@/componenets/suggesttopics/page";
import {
  Pencil,
  Bell,
  User,
  BookOpen,
  FileText,
  BarChart2,
  Settings,
  Sparkles,
  Landmark,
  HelpCircle,
  Star,
  BadgeCheck,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Searchbar from "@/componenets/search/page";
import { motion, AnimatePresence } from "framer-motion";

const Page = () => {
  const { data: session } = useSession();
  const [aboutUser, setAboutUser] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const mobileMenuRef = useRef(null);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  // Track window width for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    if (currentY > lastScrollY && currentY > 50) {
      setShowTopBar(false);
    } else {
      setShowTopBar(true);
    }
    setLastScrollY(currentY);
  }, [lastScrollY]);

  useEffect(() => {
    const debounceScroll = setTimeout(() => {
      window.addEventListener("scroll", handleScroll);
    }, 100);

    return () => {
      clearTimeout(debounceScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Swipe to close functionality
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50; // Minimum swipe distance
    if (isLeftSwipe) {
      setMobileMenuOpen(false);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const menuSection1 = [
    { name: "Profile", icon: <User className="w-4 h-4" />, href: "/userdashboard/profile" },
    { name: "Library", icon: <BookOpen className="w-4 h-4" />, href: "/userdashboard/library" },
    { name: "Stories", icon: <FileText className="w-4 h-4" />, href: "/userdashboard/story" },
    { name: "Stats", icon: <BarChart2 className="w-4 h-4" />, href: "/userdashboard/stats" },
  ];

  const menuSection2 = [
    { name: "Settings", icon: <Settings className="w-4 h-4" />, href: "/userdashboard/settings" },
    { name: "Refine recommendations", icon: <Sparkles className="w-4 h-4" />, href: "/userdashboard/Refinerecommendations" },
    { name: "Manage publications", icon: <Landmark className="w-4 h-4" />, href: "/userdashboard/settings" },
    { name: "Help", icon: <HelpCircle className="w-4 h-4" />, href: "/help" },
  ];

  const menuSection3 = [
    { name: "Become a Medium member", icon: <Star className="w-4 h-4" />, href: "/plans" },
    { name: "Apply to the Partner Program", icon: <BadgeCheck className="w-4 h-4" />, href: "/membership" },
  ];

  // Mobile menu items - only Writing and Notifications
  const mobileMenuItems = [
    { 
      name: "Write", 
      icon: <Pencil className="w-5 h-5" />, 
      href: "/writing",
      description: "Create and publish your stories"
    },
    { 
      name: "Notifications", 
      icon: <Bell className="w-5 h-5" />, 
      href: "/userdashboard/notification",
      description: "Stay updated with your activity"
    },
  ];

  // Animation variants
  const mobileMenuVariants = {
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: { 
      opacity: 0, 
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
  };

  const dropdownVariants = {
    open: { opacity: 1, y: 0, scale: 1 },
    closed: { opacity: 0, y: -20, scale: 0.95 },
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  return (
    <>
      {/* Top Bar */}
      <motion.header
        className="fixed w-full z-50 bg-slate-50 border-b border-gray-200"
        animate={{
          y: showTopBar ? 0 : -60,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        aria-label="Main navigation"
      >
        {/* Main Navigation */}
        <div className="w-full px-4 md:px-6 flex items-center justify-between h-14">
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          {/* Logo */}
          <div className={`flex  items-center md:ml-[-60px] ${isMobile ? "flex-1  justify-center" : ""}`}>
            <Logo className="h-8 w-8" />
          </div>

          {/* Desktop Search */}
          {!isMobile && (
            <div className="flex-1 w-full mx-8">
              <Searchbar />
            </div>
          )}

          {/* Desktop Actions & Avatar */}
          {!isMobile && (
            <div className="flex items-center gap-2">
              <Link href="/writing" passHref>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Write"
                >
                  <Pencil className="w-5 h-5 text-gray-700" />
                </button>
              </Link>

              <Link href="/userdashboard/notification" passHref>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5 text-gray-700" />
                </button>
              </Link>

              <div className="relative ml-2">
                <button
                  onClick={() => setAboutUser(!aboutUser)}
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 rounded-full"
                  aria-label="User menu"
                  aria-expanded={aboutUser}
                >
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </button>

                <AnimatePresence>
                  {aboutUser && (
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={dropdownVariants}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[260px] z-50 py-2"
                    >
                      {[menuSection1, menuSection2, menuSection3].map((section, i) => (
                        <div key={i} className={i !== 0 ? "border-t border-gray-100 pt-2 mt-2" : ""}>
                          {section.map((item, j) => (
                            <Link
                              key={j}
                              href={item.href}
                              className="flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 px-4 py-2 transition-colors"
                              onClick={() => setAboutUser(false)}
                            >
                              {item.icon}
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      ))}

                      <div className="border-t border-gray-100 pt-2 mt-2">
                        <button
                          onClick={() => signOut()}
                          className="flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 px-4 py-2 transition-colors w-full"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign out
                        </button>
                        <div className="text-xs text-gray-500 px-4 py-1 truncate">
                          {session?.user?.email?.replace(/(?<=.).(?=[^@]*?@)/g, "•")}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Mobile Avatar */}
          {isMobile && (
            <div className="relative">
              <button
                onClick={() => setAboutUser(!aboutUser)}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 rounded-full"
                aria-label="User menu"
                aria-expanded={aboutUser}
              >
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </button>

              <AnimatePresence>
                {aboutUser && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={dropdownVariants}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[260px] z-50 py-2"
                  >
                    {[menuSection1, menuSection2, menuSection3].map((section, i) => (
                      <div key={i} className={i !== 0 ? "border-t border-gray-100 pt-2 mt-2" : ""}>
                        {section.map((item, j) => (
                          <Link
                            key={j}
                            href={item.href}
                            className="flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 px-4 py-2 transition-colors"
                            onClick={() => setAboutUser(false)}
                          >
                            {item.icon}
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ))}

                    <div className="border-t border-gray-100 pt-2 mt-2">
                      <button
                        onClick={() => signOut()}
                        className="flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 px-4 py-2 transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                      <div className="text-xs text-gray-500 px-4 py-1 truncate">
                        {session?.user?.email?.replace(/(?<=.).(?=[^@]*?@)/g, "•")}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Search Bar */}
        {isMobile && (
          <div className="px-4 pt-2.5 pb-2">
            <Searchbar />
          </div>
        )}

        {/* Suggestion Bar */}
        <div className="border-t border-gray-200 bg-white">
          <div className="max-w-6xl hidden md:block mx-auto px-4">
            <Suggestion />
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && isMobile && (
            <>
              {/* Backdrop */}
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={overlayVariants}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 bg-opacity-50 z-40"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              {/* Side Menu */}
              <motion.div
                ref={mobileMenuRef}
                initial="closed"
                animate="open"
                exit="closed"
                variants={mobileMenuVariants}
                className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">M</span>
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">Menu</h2>
                      <p className="text-sm text-gray-500">Quick actions</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 px-6 py-6 overflow-y-auto">
                  <div className="space-y-3">
                    {mobileMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-xs text-gray-400">
                      Swipe left or tap outside to close
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Page;

// "use client";
// import React, { useState, useEffect, useCallback,useRef } from "react";
// import Logo from "@/componenets/logo/page";
// import Suggestion from "@/componenets/suggesttopics/page";
// import {
//   Pencil,
//   Bell,
//   User,
//   BookOpen,
//   FileText,
//   BarChart2,
//   Settings,
//   Sparkles,
//   Landmark,
//   HelpCircle,
//   Star,
//   BadgeCheck,
//   LogOut,
//   Menu,
//   X,
// } from "lucide-react";
// import { useSession, signOut } from "next-auth/react";
// import Link from "next/link";
// import Searchbar from "@/componenets/search/page";
// import { motion, AnimatePresence } from "framer-motion";

// const Page = () => {
//   const { data: session } = useSession();
//   const [aboutUser, setAboutUser] = useState(false);
//   const [showTopBar, setShowTopBar] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(0);
//   const cancelscrollbar = useRef(null)
//   // Track window width for responsive behavior
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//       if (window.innerWidth > 768) {
//         setMobileMenuOpen(false);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const isMobile = windowWidth <= 768;

//   // Debounced scroll handler
//   const handleScroll = useCallback(() => {
//     const currentY = window.scrollY;
//     if (currentY > lastScrollY && currentY > 50) {
//       setShowTopBar(false);
//     } else {
//       setShowTopBar(true);
//     }
//     setLastScrollY(currentY);
//   }, [lastScrollY]);

//   useEffect(() => {
//     const debounceScroll = setTimeout(() => {
//       window.addEventListener("scroll", handleScroll);
//     }, 100);

//     return () => {
//       clearTimeout(debounceScroll);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [handleScroll]);

//   const menuSection1 = [
//     { name: "Profile", icon: <User className="w-4 h-4" />, href: "/userdashboard/profile" },
//     { name: "Library", icon: <BookOpen className="w-4 h-4" />, href: "/userdashboard/library" },
//     { name: "Stories", icon: <FileText className="w-4 h-4" />, href: "/userdashboard/story" },
//     { name: "Stats", icon: <BarChart2 className="w-4 h-4" />, href: "/userdashboard/stats" },
//   ];

//   const menuSection2 = [
//     { name: "Settings", icon: <Settings className="w-4 h-4" />, href: "/userdashboard/settings" },
//     { name: "Refine recommendations", icon: <Sparkles className="w-4 h-4" />, href: "/userdashboard/Refinerecommendations" },
//     { name: "Manage publications", icon: <Landmark className="w-4 h-4" />, href: "/userdashboard/settings" },
//     { name: "Help", icon: <HelpCircle className="w-4 h-4" />, href: "/help" },
//   ];

//   const menuSection3 = [
//     { name: "Become a Medium member", icon: <Star className="w-4 h-4" />, href: "/plans" },
//     { name: "Apply to the Partner Program", icon: <BadgeCheck className="w-4 h-4" />, href: "/membership" },
//   ];

//   // Mobile menu items - only Writing and Notifications
//   const mobileMenuItems = [
//     { 
//       name: "Write", 
//       icon: <Pencil className="w-5 h-5" />, 
//       href: "/writing",
//       description: "Create and publish your stories"
//     },
//     { 
//       name: "Notifications", 
//       icon: <Bell className="w-5 h-5" />, 
//       href: "/userdashboard/notification",
//       description: "Stay updated with your activity"
//     },
//   ];

//   // Animation variants
//   const mobileMenuVariants = {
//     open: { 
//       opacity: 1, 
//       x: 0,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 30
//       }
//     },
//     closed: { 
//       opacity: 0, 
//       x: "-100%",
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 30
//       }
//     },
//   };

//   const dropdownVariants = {
//     open: { opacity: 1, y: 0, scale: 1 },
//     closed: { opacity: 0, y: -20, scale: 0.95 },
//   };

//   const overlayVariants = {
//     open: { opacity: 1 },
//     closed: { opacity: 0 },
//   };

//   return (
//     <>
//       {/* Top Bar */}
//       <motion.header
//         className="fixed w-full z-50 bg-slate-50 border-b border-gray-200"
//         animate={{
//           y: showTopBar ? 0 : -60,
//         }}
//         transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         aria-label="Main navigation"
//       >
//         {/* Main Navigation */}
//         <div className="w-full px-4 md:px-6 flex items-center justify-between h-14">
//           {/* Mobile Menu Button */}
//           {isMobile && (
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//               aria-label="Toggle menu"
//               aria-expanded={mobileMenuOpen}
//             >
//               <Menu className="w-6 h-6" />
//             </button>
//           )}

//           {/* Logo */}
//           <div className={`flex  items-center md:ml-[-60px] ${isMobile ? "flex-1  justify-center" : ""}`}>
//             <Logo className="h-8 w-8" />
//           </div>

//           {/* Desktop Search */}
//           {!isMobile && (
//             <div className="flex-1 w-full mx-8">
//               <Searchbar />
//             </div>
//           )}

//           {/* Desktop Actions & Avatar */}
//           {!isMobile && (
//             <div className="flex items-center gap-2">
//               <Link href="/writing" passHref>
//                 <button
//                   className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//                   aria-label="Write"
//                 >
//                   <Pencil className="w-5 h-5 text-gray-700" />
//                 </button>
//               </Link>

//               <Link href="/userdashboard/notification" passHref>
//                 <button
//                   className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//                   aria-label="Notifications"
//                 >
//                   <Bell className="w-5 h-5 text-gray-700" />
//                 </button>
//               </Link>

//               <div className="relative ml-2">
//                 <button
//                   onClick={() => setAboutUser(!aboutUser)}
//                   className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 rounded-full"
//                   aria-label="User menu"
//                   aria-expanded={aboutUser}
//                 >
//                   {session?.user?.image ? (
//                     <img
//                       src={session.user.image}
//                       alt="User"
//                       className="w-8 h-8 rounded-full object-cover border border-gray-300"
//                     />
//                   ) : (
//                     <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300">
//                       <User className="w-4 h-4" />
//                     </div>
//                   )}
//                 </button>

//                 <AnimatePresence>
//                   {aboutUser && (
//                     <motion.div
//                       initial="closed"
//                       animate="open"
//                       exit="closed"
//                       variants={dropdownVariants}
//                       transition={{ duration: 0.2 }}
//                       className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[260px] z-50 py-2"
//                     >
//                       {[menuSection1, menuSection2, menuSection3].map((section, i) => (
//                         <div key={i} className={i !== 0 ? "border-t border-gray-100 pt-2 mt-2" : ""}>
//                           {section.map((item, j) => (
//                             <Link
//                               key={j}
//                               href={item.href}
//                               className="flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 px-4 py-2 transition-colors"
//                               onClick={() => setAboutUser(false)}
//                             >
//                               {item.icon}
//                               {item.name}
//                             </Link>
//                           ))}
//                         </div>
//                       ))}

//                       <div className="border-t border-gray-100 pt-2 mt-2">
//                         <button
//                           onClick={() => signOut()}
//                           className="flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 px-4 py-2 transition-colors w-full"
//                         >
//                           <LogOut className="w-4 h-4" />
//                           Sign out
//                         </button>
//                         <div className="text-xs text-gray-500 px-4 py-1 truncate">
//                           {session?.user?.email?.replace(/(?<=.).(?=[^@]*?@)/g, "•")}
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>
//           )}

//           {/* Mobile Avatar */}
//           {isMobile && (
//             <div className="relative">
//               <button
//                 onClick={() => setAboutUser(!aboutUser)}
//                 className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 rounded-full"
//                 aria-label="User menu"
//                 aria-expanded={aboutUser}
//               >
//                 {session?.user?.image ? (
//                   <img
//                     src={session.user.image}
//                     alt="User"
//                     className="w-8 h-8 rounded-full object-cover border border-gray-300"
//                   />
//                 ) : (
//                   <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300">
//                     <User className="w-4 h-4" />
//                   </div>
//                 )}
//               </button>

//               <AnimatePresence>
//                 {aboutUser && (
//                   <motion.div
//                     initial="closed"
//                     animate="open"
//                     exit="closed"
//                     variants={dropdownVariants}
//                     transition={{ duration: 0.2 }}
//                     className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[260px] z-50 py-2"
//                   >
//                     {[menuSection1, menuSection2, menuSection3].map((section, i) => (
//                       <div key={i} className={i !== 0 ? "border-t border-gray-100 pt-2 mt-2" : ""}>
//                         {section.map((item, j) => (
//                           <Link
//                             key={j}
//                             href={item.href}
//                             className="flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 px-4 py-2 transition-colors"
//                             onClick={() => setAboutUser(false)}
//                           >
//                             {item.icon}
//                             {item.name}
//                           </Link>
//                         ))}
//                       </div>
//                     ))}

//                     <div className="border-t border-gray-100 pt-2 mt-2">
//                       <button
//                         onClick={() => signOut()}
//                         className="flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 px-4 py-2 transition-colors w-full"
//                       >
//                         <LogOut className="w-4 h-4" />
//                         Sign out
//                       </button>
//                       <div className="text-xs text-gray-500 px-4 py-1 truncate">
//                         {session?.user?.email?.replace(/(?<=.).(?=[^@]*?@)/g, "•")}
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           )}
//         </div>

//         {/* Mobile Search Bar */}
//         {isMobile && (
//           <div className="px-4 pt-2.5 pb-2">
//             <Searchbar />
//           </div>
//         )}

//         {/* Suggestion Bar */}
//         <div className="border-t border-gray-200 bg-white">
//           <div className="max-w-6xl hidden md:block mx-auto px-4">
//             <Suggestion />
//           </div>
//         </div>

//         {/* Mobile Menu Overlay */}
//         <AnimatePresence>
//           {mobileMenuOpen && isMobile && (
//             <>
//               {/* Backdrop */}
//               <motion.div
//                 initial="closed"
//                 animate="open"
//                 exit="closed"
//                 variants={overlayVariants}
//                 transition={{ duration: 0.3 }}
//                 className="fixed inset-0 bg-black/50 bg-opacity-50 z-40"
//                 onClick={() => setMobileMenuOpen(false)}
//               />
              
//               {/* Side Menu */}
//               <motion.div
//                 initial="closed"
//                 animate="open"
//                 exit="closed"
//                 variants={mobileMenuVariants}
//                 className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col"
//               >
//                 {/* Header */}
//                 <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
//                       <span className="text-white font-semibold text-lg">M</span>
//                     </div>
//                     <div>
//                       <h2 className="font-semibold text-gray-900">Menu</h2>
//                       <p className="text-sm text-gray-500">Quick actions</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//                     aria-label="Close menu"
//                   >
//                     <X className="w-5 h-5 text-gray-600" />
//                   </button>
//                 </div>

//                 {/* Menu Items */}
//                 <div className="flex-1 px-6 py-6">
//                   <div className="space-y-3">
//                     {mobileMenuItems.map((item, index) => (
//                       <Link
//                         key={index}
//                         href={item.href}
//                         className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
//                         onClick={() => setMobileMenuOpen(false)}
//                       >
//                         <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
//                           {item.icon}
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
//                           <p className="text-sm text-gray-500">{item.description}</p>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="px-6 py-4 border-t border-gray-100">
//                   <div className="text-center">
//                     <p className="text-xs text-gray-400">
//                       Swipe left or tap outside to close
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             </>
//           )}
//         </AnimatePresence>
//       </motion.header>

//       {/* Content Spacer */}
//       {/* <div className={`${isMobile ? "pt-32" : "pt-24"}`} /> */}
//     </>
//   );
// };

// export default Page;



