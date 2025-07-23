"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useBlogStore from "@/stores/blogStore";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "for-you", "Self Improvement", "Technology", "Data Science", "Writing",
  "Relationships", "Machine Learning", "Productivity", "Business", "Money",
  "Psychology", "Politics", "Python", "Health", "Mental Health", "Life",
  "JavaScript", "Design", "Startup", "Culture", "Entrepreneurship",
  "Artificial Intelligence", "Coding", "Books", "Work", "Blockchain",
  "Education", "Marketing", "Humor", "Social Media", "Society",
  "Software Development", "Cryptocurrency", "Science", "Deep Learning",
  "Leadership", "History", "Web Development", "Apple", "Women", "Nft",
  "Lifestyle", "UX", "React", "Software Engineering", "Android",
  "Mindfulness", "Sexuality", "Programming"
];

const SuggestTopics = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const {
    activeCategory,
    loading,
    error,
    fetchCategoryBlogs,
    fetchLatestBlogs,
    fetchSuggestedBlogs,
    setActiveCategory,
    setError,
    initialized,
    setInitialized
  } = useBlogStore();

  useEffect(() => {
    if (!initialized) {
      fetchLatestBlogs();
      fetchSuggestedBlogs();
      setInitialized(true);
    }
  }, [initialized, fetchLatestBlogs, fetchSuggestedBlogs, setInitialized]);

  const handleCategoryChange = useCallback(async (category) => {
    setActiveCategory(category);
    if (category === "for-you") {
      await fetchLatestBlogs();
    } else {
      await fetchCategoryBlogs(category);
    }
  }, [fetchCategoryBlogs, fetchLatestBlogs, setActiveCategory]);

  const scroll = useCallback((direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = direction === "left" ? -300 : 300;
    const start = container.scrollLeft;
    const end = start + scrollAmount;
    
    const duration = 300;
    const startTime = performance.now();
    
    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = 0.5 * (1 - Math.cos(progress * Math.PI));
      
      container.scrollLeft = start + (end - start) * easeProgress;
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    
    requestAnimationFrame(animateScroll);
  }, []);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  const startDrag = useCallback((e) => {
    const container = scrollRef.current;
    if (!container) return;

    setIsDragging(true);
    setStartX(e.pageX || e.touches?.[0]?.pageX || 0);
    setScrollLeft(container.scrollLeft);
  }, []);

  const duringDrag = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const container = scrollRef.current;
    if (!container) return;

    const x = e.pageX || e.touches?.[0]?.pageX || 0;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const endDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    container.addEventListener("mousedown", startDrag);
    container.addEventListener("touchstart", startDrag, { passive: false });
    container.addEventListener("mousemove", duringDrag);
    container.addEventListener("touchmove", duringDrag, { passive: false });
    container.addEventListener("mouseup", endDrag);
    container.addEventListener("touchend", endDrag);
    container.addEventListener("mouseleave", endDrag);

    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("mousedown", startDrag);
      container.removeEventListener("touchstart", startDrag);
      container.removeEventListener("mousemove", duringDrag);
      container.removeEventListener("touchmove", duringDrag);
      container.removeEventListener("mouseup", endDrag);
      container.removeEventListener("touchend", endDrag);
      container.removeEventListener("mouseleave", endDrag);
    };
  }, [handleScroll, startDrag, duringDrag, endDrag]);

  return (
    <div className="relative w-full py-3 bg-white/50">
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
          background: transparent;
        }
      `}</style>

      <AnimatePresence>
        {showLeftArrow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10"
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showRightArrow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLeftArrow && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={() => scroll("left")}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white p-1.5 md:p-2 rounded-full shadow-md hover:bg-gray-50 transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative overflow-hidden">
        <div
          ref={scrollRef}
          className="hide-scrollbar flex gap-2 md:gap-3 overflow-x-auto px-12 md:px-16 scroll-smooth select-none touch-pan-x"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => handleCategoryChange(category)}
              disabled={loading}
              className={`px-3 py-1 md:px-4 md:py-1.5 rounded-full whitespace-nowrap text-xs md:text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              whileHover={activeCategory !== category && !loading ? { scale: 1.05 } : {}}
              whileTap={!loading ? { scale: 0.95 } : {}}
            >
              {category.replace(/-/g, " ")}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showRightArrow && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            onClick={() => scroll("right")}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white p-1.5 md:p-2 rounded-full shadow-md hover:bg-gray-50 transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight size={20} className="text-gray-700" />
          </motion.button>
        )}
      </AnimatePresence>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 mx-4 md:mx-16"
        >
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm relative">
            <button 
              onClick={() => setError(null)} 
              className="absolute top-1 right-3 text-lg font-bold hover:text-red-900 transition-colors"
            >
              &times;
            </button>
            <strong>Error:</strong> {error}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SuggestTopics;



// "use client";

// import React, { useRef, useState, useEffect, useCallback } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import useBlogStore from "@/stores/blogStore";

// const categories = [
//   "for-you", "Self Improvement", "Technology", "Data Science", "Writing",
//   "Relationships", "Machine Learning", "Productivity", "Business", "Money",
//   "Psychology", "Politics", "Python", "Health", "Mental Health", "Life",
//   "JavaScript", "Design", "Startup", "Culture", "Entrepreneurship",
//   "Artificial Intelligence", "Coding", "Books", "Work", "Blockchain",
//   "Education", "Marketing", "Humor", "Social Media", "Society",
//   "Software Development", "Cryptocurrency", "Science", "Deep Learning",
//   "Leadership", "History", "Web Development", "Apple", "Women", "Nft",
//   "Lifestyle", "UX", "React", "Software Engineering", "Android",
//   "Mindfulness", "Sexuality", "Programming"
// ];

// const SuggestTopics = () => {
//   const scrollRef = useRef(null);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);

//   const {
//     activeCategory,
//     loading,
//     error,
//     fetchCategoryBlogs,
//     fetchLatestBlogs,
//     fetchSuggestedBlogs,
//     setActiveCategory,
//     setError,
//     initialized,
//     setInitialized
//   } = useBlogStore();

//   useEffect(() => {
//     if (!initialized) {
//       fetchLatestBlogs();
//       fetchSuggestedBlogs();
//       setInitialized(true);
//     }
//   }, [initialized, fetchLatestBlogs, fetchSuggestedBlogs, setInitialized]);

//   const handleCategoryChange = useCallback(async (category) => {
//     setActiveCategory(category);
//     if (category === "for-you") {
//       await fetchLatestBlogs();
//     } else {
//       await fetchCategoryBlogs(category);
//     }
//   }, [fetchCategoryBlogs, fetchLatestBlogs, setActiveCategory]);

//   const scroll = useCallback((direction) => {
//     const container = scrollRef.current;
//     if (!container) return;

//     const scrollAmount = 300;
//     container.scrollBy({
//       left: direction === "left" ? -scrollAmount : scrollAmount,
//       behavior: "smooth"
//     });
//   }, []);

//   const handleScroll = useCallback(() => {
//     const container = scrollRef.current;
//     if (!container) return;

//     const { scrollLeft, scrollWidth, clientWidth } = container;
//     setShowLeftArrow(scrollLeft > 0);
//     setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
//   }, []);

//   useEffect(() => {
//     const container = scrollRef.current;
//     if (!container) return;

//     container.addEventListener("scroll", handleScroll);
//     handleScroll();

//     return () => container.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   return (
//     <>
//       {/* Global CSS to remove scrollbar without flicker */}
//       <style jsx global>{`
//         .no-scrollbar {
//           scrollbar-width: none !important;
//           -ms-overflow-style: none !important;
//         }
//         .no-scrollbar::-webkit-scrollbar {
//           display: none !important;
//           width: 0 !important;
//           height: 0 !important;
//         }
//       `}</style>

//       <div className="relative w-full pt-4 pb-3 bg-white/50">
//         {/* Gradient overlays */}
//         <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10" />
//         <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10" />

//         {/* Left Arrow */}
//         <button
//           onClick={() => scroll("left")}
//           disabled={!showLeftArrow}
//           className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md transition ${
//             showLeftArrow ? "opacity-100 hover:bg-gray-50" : "opacity-30 cursor-not-allowed"
//           }`}
//         >
//           <ChevronLeft size={22} />
//         </button>

//         {/* Scrollable category list */}
//         <div className="relative overflow-hidden">
//           <div
//             ref={scrollRef}
//             className="no-scrollbar flex gap-3 overflow-x-auto px-16 scroll-smooth"
//           >
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => handleCategoryChange(category)}
//                 disabled={loading}
//                 className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition ${
//                   activeCategory === category
//                     ? "bg-gray-800 text-white"
//                     : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//                 } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
//               >
//                 {category.replace(/-/g, " ")}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Right Arrow */}
//         <button
//           onClick={() => scroll("right")}
//           disabled={!showRightArrow}
//           className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md transition ${
//             showRightArrow ? "opacity-100 hover:bg-gray-50" : "opacity-30 cursor-not-allowed"
//           }`}
//         >
//           <ChevronRight size={22} />
//         </button>

//         {/* Error message */}
//         {error && (
//           <div className="mt-4 mx-16">
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm relative">
//               <button onClick={() => setError(null)} className="absolute top-1 right-3 text-lg font-bold">&times;</button>
//               <strong>Error:</strong> {error}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SuggestTopics;
