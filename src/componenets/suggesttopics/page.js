"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useBlogStore from "@/stores/blogStore";

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

    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  }, []);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      {/* Global CSS to remove scrollbar without flicker */}
      <style jsx global>{`
        .no-scrollbar {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
      `}</style>

      <div className="relative w-full pt-4 pb-3 bg-white/50">
        {/* Gradient overlays */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          disabled={!showLeftArrow}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md transition ${
            showLeftArrow ? "opacity-100 hover:bg-gray-50" : "opacity-30 cursor-not-allowed"
          }`}
        >
          <ChevronLeft size={22} />
        </button>

        {/* Scrollable category list */}
        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="no-scrollbar flex gap-3 overflow-x-auto px-16 scroll-smooth"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                disabled={loading}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                {category.replace(/-/g, " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          disabled={!showRightArrow}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md transition ${
            showRightArrow ? "opacity-100 hover:bg-gray-50" : "opacity-30 cursor-not-allowed"
          }`}
        >
          <ChevronRight size={22} />
        </button>

        {/* Error message */}
        {error && (
          <div className="mt-4 mx-16">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm relative">
              <button onClick={() => setError(null)} className="absolute top-1 right-3 text-lg font-bold">&times;</button>
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SuggestTopics;

// "use client";
// import React, { useRef, useState, useEffect, useCallback } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import axios from "axios";
// import useBlogStore from "@/stores/blogStore";

// const categories = [
//   "for-you", "Self Improvement", "Technology", "Data Science", "Writing", "Relationships", "Machine Learning",
//   "Productivity", "Business", "Money", "Psychology", "Politics", "Python", "Health", "Mental Health", "Life",
//   "JavaScript", "Design", "Startup", "Culture", "Entrepreneurship", "Artificial Intelligence", "Coding", "Books",
//   "Work", "Blockchain", "Education", "Marketing", "Humor", "Social Media", "Society", "Software Development",
//   "Cryptocurrency", "Science", "Deep Learning", "Leadership", "History", "Web Development", "Apple", "Women",
//   "Nft", "Lifestyle", "UX", "React", "Software Engineering", "Android", "Mindfulness", "Sexuality", "Programming"
// ];

// const SuggestTopics = () => {
//   const scrollRef = useRef(null);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);

//   const {
//     activeCategory,
//     loading,
//     error,
//     setBlogs,
//     setSuggestedBlogs,
//     setIsFiltering,
//     clearBlogs,
//     setLoading,
//     setActiveCategory,
//     setError,
//     resetPagination,
//   } = useBlogStore();

//   const [initialFetchDone, setInitialFetchDone] = useState(false);

//   // Fetch initial blogs and suggested blogs on mount
//   useEffect(() => {
//     if (!initialFetchDone) {
//       setInitialFetchDone(true);
//       fetchLatestBlogs();
//       fetchSuggestedBlogs();
//     }
//   }, [initialFetchDone]);

//   // Memoized fetch functions without dependencies to prevent infinite loops
//   const fetchLatestBlogs = useCallback(async () => {
//     const currentLoading = useBlogStore.getState().loading;
//     if (currentLoading) return;
    
//     useBlogStore.getState().setLoading(true);
//     useBlogStore.getState().setError(null);
    
//     try {
//       const response = await axios.get('/api/blog?skip=0', {
//         timeout: 10000,
//       });
      
//       if (response.data?.success && Array.isArray(response.data.blogs)) {
//         useBlogStore.getState().setBlogs(response.data.blogs);
//         useBlogStore.getState().resetPagination();
//       } else {
//         throw new Error('Invalid response format');
//       }
//     } catch (error) {
//       console.error("Error fetching latest blogs:", error);
//       useBlogStore.getState().setError(error.response?.data?.message || error.message || 'Failed to fetch blogs');
//       useBlogStore.getState().setBlogs([]);
//     } finally {
//       useBlogStore.getState().setLoading(false);
//     }
//   }, []);

//   const fetchSuggestedBlogs = useCallback(async () => {
//     try {
//       const response = await axios.get("/api/recomendedblogxcharsi", {
//         timeout: 10000,
//       });
      
//       if (response.data?.blogs && Array.isArray(response.data.blogs)) {
//         useBlogStore.getState().setSuggestedBlogs(response.data.blogs);
//       } else if (Array.isArray(response.data)) {
//         useBlogStore.getState().setSuggestedBlogs(response.data);
//       } else {
//         console.warn('Unexpected suggested blogs response format');
//         useBlogStore.getState().setSuggestedBlogs([]);
//       }
//     } catch (error) {
//       console.error("Error fetching suggested blogs:", error);
//       useBlogStore.getState().setSuggestedBlogs([]);
//     }
//   }, []);

//   const fetchCategoryBlogs = useCallback(async (category) => {
//     const currentLoading = useBlogStore.getState().loading;
//     if (currentLoading) return;

//     // Handle "for-you" category
//     if (category === "for-you") {
//       useBlogStore.getState().clearBlogs();
//       useBlogStore.getState().setActiveCategory(category);
//       useBlogStore.getState().setIsFiltering(false);
//       await fetchLatestBlogs();
//       return;
//     }

//     useBlogStore.getState().setLoading(true);
//     useBlogStore.getState().setError(null);
//     useBlogStore.getState().setActiveCategory(category);

//     try {
//       const response = await axios.get(`/api/categoryblog?category=${encodeURIComponent(category)}`, {
//         timeout: 10000,
//       });
      
//       if (response.data?.blogs && Array.isArray(response.data.blogs)) {
//         useBlogStore.getState().setBlogs(response.data.blogs);
//         useBlogStore.getState().setIsFiltering(true);
//       } else if (response.data?.success === false) {
//         useBlogStore.getState().setBlogs([]);
//         useBlogStore.getState().setIsFiltering(true);
//         useBlogStore.getState().setError(response.data.message || 'No blogs found for this category');
//       } else {
//         throw new Error('Invalid response format');
//       }
//     } catch (error) {
//       console.error("Error fetching category blogs:", error);
//       useBlogStore.getState().setError(error.response?.data?.message || error.message || 'Failed to fetch category blogs');
//       useBlogStore.getState().setBlogs([]);
//       useBlogStore.getState().setIsFiltering(true);
//     } finally {
//       useBlogStore.getState().setLoading(false);
//     }
//   }, [fetchLatestBlogs]);

//   // Scroll functionality
//   const scroll = useCallback((direction) => {
//     const container = scrollRef.current;
//     if (!container) return;

//     const scrollAmount = 300;
//     container.scrollBy({
//       left: direction === "left" ? -scrollAmount : scrollAmount,
//       behavior: "smooth",
//     });
//   }, []);

//   const handleScroll = useCallback(() => {
//     const container = scrollRef.current;
//     if (!container) return;

//     const { scrollLeft, scrollWidth, clientWidth } = container;
//     setShowLeftArrow(scrollLeft > 0);
//     setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1); // -1 for rounding
//   }, []);

//   // Set up scroll listeners
//   useEffect(() => {
//     const container = scrollRef.current;
//     if (!container) return;

//     container.addEventListener("scroll", handleScroll);
//     handleScroll(); // Initial check

//     return () => {
//       container.removeEventListener("scroll", handleScroll);
//     };
//   }, [handleScroll]);

//   // Handle category click with debouncing
//   const handleCategoryClick = useCallback((category) => {
//     const currentState = useBlogStore.getState();
//     if (category === currentState.activeCategory || currentState.loading) return;
//     fetchCategoryBlogs(category);
//   }, [fetchCategoryBlogs]);

//   return (
//     <div className="relative w-full pt-4 pb-3 bg-white">
//       {/* Gradient overlays */}
//       <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#fcfcfd] to-transparent z-10" />
//       <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#fcfcfd] to-transparent z-10" />

//       {/* Left Arrow */}
//       <button
//         onClick={() => scroll("left")}
//         disabled={!showLeftArrow}
//         className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white backdrop-blur-sm p-2 rounded-full shadow-md transition-all duration-200 ${
//           showLeftArrow 
//             ? "opacity-100 cursor-pointer hover:bg-white hover:shadow-lg" 
//             : "opacity-30 cursor-not-allowed"
//         }`}
//         aria-label="Scroll categories left"
//       >
//         <ChevronLeft size={22} />
//       </button>

//       {/* Category Buttons */}
//       <div
//         ref={scrollRef}
//         className="scrollbar-hide flex gap-3 overflow-x-auto px-16 scroll-smooth"
//         role="tablist"
//         aria-label="Blog categories"
//       >
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => handleCategoryClick(category)}
//             disabled={loading}
//             className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
//               activeCategory === category
//                 ? "bg-gray-800 text-white shadow-md"
//                 : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//             }`}
//             role="tab"
//             aria-selected={activeCategory === category}
//             aria-label={`Filter by ${category}`}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* Right Arrow */}
//       <button
//         onClick={() => scroll("right")}
//         disabled={!showRightArrow}
//         className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md transition-all duration-200 ${
//           showRightArrow 
//             ? "opacity-100 cursor-pointer hover:bg-white hover:shadow-lg" 
//             : "opacity-30 cursor-not-allowed"
//         }`}
//         aria-label="Scroll categories right"
//       >
//         <ChevronRight size={22} />
//       </button>

//       {/* Error Display */}
//       {error && (
//         <div className="mt-4 mx-16">
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
//             <strong>Error:</strong> {error}
//           </div>
//         </div>
//       )}

//       {/* Custom scrollbar hide styles */}
//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SuggestTopics;
// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import axios from "axios";
// import useBlogStore from "@/stores/blogStore";

// const categories = [
//   "for-you", "Self Improvement", "Technology", "Data Science", "Writing", "Relationships", "Machine Learning",
//   "Productivity", "Business", "Money", "Psychology", "Politics", "Python", "Health", "Mental Health", "Life",
//   "JavaScript", "Design", "Startup", "Culture", "Entrepreneurship", "Artificial Intelligence", "Coding", "Books",
//   "Work", "Blockchain", "Education", "Marketing", "Humor", "Social Media", "Society", "Software Development",
//   "Cryptocurrency", "Science", "Deep Learning", "Leadership", "History", "Web Development", "Apple", "Women",
//   "Nft", "Lifestyle", "UX", "React", "Software Engineering", "Android", "Mindfulness", "Sexuality", "Programming"
// ];

// const SuggestTopics = () => {
//   const scrollRef = useRef(null);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);
//   const [activeCategory, setActiveCategory] = useState("for-you");
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [skip, setSkip] = useState(0);
//   const [suggestedBlogs, setSuggestedBlogs] = useState([]);

//   const setBlogs = useBlogStore((state) => state.setBlogs);
//   const setIsFiltering = useBlogStore((state) => state.setIsFiltering);
//   const clearBlogs = useBlogStore((state) => state.clearBlogs);

//   // Fetch initial blogs and suggested blogs
//   useEffect(() => {
//     fetchLatestBlogs();
//     fetchSuggestedBlogs();
//   }, []);

//   const fetchLatestBlogs = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`/api/blog?skip=0`);
//       if (res.data.success) {
//         setBlogs(res.data.blogs);
//         setSkip(res.data.blogs.length);
//         setHasMore(res.data.hasMore);
//       }
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     }
//     setLoading(false);
//   };

//   const fetchMoreBlogs = async () => {
//     if (loading || !hasMore) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(`/api/blog?skip=${skip}`);
//       if (res.data.success) {
//         setBlogs((prev) => [...prev, ...res.data.blogs]);
//         setSkip((prev) => prev + res.data.blogs.length);
//         setHasMore(res.data.hasMore);
//       }
//     } catch (error) {
//       console.error("Error fetching more blogs:", error);
//     }
//     setLoading(false);
//   };

//   const fetchSuggestedBlogs = async () => {
//     try {
//       const res = await axios.get("/api/recomendedblogxcharsi");
//       setSuggestedBlogs(res.data.blogs);
//     } catch (error) {
//       console.error("Error fetching suggested blogs:", error);
//     }
//   };

//   const fetchCategoryBlogs = async (category) => {
//     if (category === "for-you") {
//       clearBlogs();
//       fetchLatestBlogs();
//       setIsFiltering(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.get(`/api/categoryblog?category=${category}`);
//       setBlogs(res.data.blogs);
//       setIsFiltering(true);
//     } catch (error) {
//       console.error("Error fetching category blogs:", error);
//       setBlogs([]);
//       setIsFiltering(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const scroll = (direction) => {
//     const container = scrollRef.current;
//     const scrollAmount = 300;
//     if (container) {
//       container.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   const handleScroll = () => {
//     const container = scrollRef.current;
//     if (!container) return;

//     setShowLeftArrow(container.scrollLeft > 0);
//     setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth);
//   };

//   useEffect(() => {
//     const container = scrollRef.current;
//     if (!container) return;

//     container.addEventListener("scroll", handleScroll);
//     handleScroll(); // initial check

//     return () => {
//       container.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div className="relative w-full pt-4 pb-3 bg-[#fcfcfd]">
//       <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
//       <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />

//       {/* Left Arrow */}
//       <button
//         onClick={() => scroll("left")}
//         className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md hover:bg-white transition ${
//           showLeftArrow ? "opacity-100 cursor-pointer" : "opacity-20 cursor-not-allowed"
//         }`}
//       >
//         <ChevronLeft size={22} />
//       </button>

//       {/* Category Buttons */}
//       <div
//         ref={scrollRef}
//         className="scrollbar-hide flex gap-3 overflow-x-auto px-16 scroll-smooth"
//       >
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => {
//               setActiveCategory(category);
//               fetchCategoryBlogs(category);
//             }}
//             className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition duration-200 hover:scale-105 ${
//               activeCategory === category
//                 ? "bg-gray-700 text-white"
//                 : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//             }`}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* Right Arrow */}
//       <button
//         onClick={() => scroll("right")}
//         className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md hover:bg-white transition ${
//           showRightArrow ? "opacity-100 cursor-pointer" : "opacity-20 cursor-not-allowed"
//         }`}
//       >
//         <ChevronRight size={22} />
//       </button>

//       {/* Custom scrollbar hide */}
//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SuggestTopics;


// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import axios from "axios";

// import { useRouter } from "next/navigation";
// import UseBlogStore from "@/stores/blogStore";

// const categories = [
//   "for-you", "Self Improvement", "Technology", "Data Science", "Writing", "Relationships", "Machine Learning",
//   "Productivity", "Business", "Money", "Psychology", "Politics", "Python", "Health", "Mental Health", "Life",
//   "JavaScript", "Design", "Startup", "Culture", "Entrepreneurship", "Artificial Intelligence", "Coding", "Books",
//   "Work", "Blockchain", "Education", "Marketing", "Humor", "Social Media", "Society", "Software Development",
//   "Cryptocurrency", "Science", "Deep Learning", "Leadership", "History", "Web Development", "Apple", "Women",
//   "Nft", "Lifestyle", "UX", "React", "Software Engineering", "Android", "Mindfulness", "Sexuality", "Programming"
// ];

// const Page = () => {
//   const scrollRef = useRef(null);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);
//   const [activeCategory, setActiveCategory] = useState("for-you");
//   const setBlogs = UseBlogStore((state) => state.setBlogs);
//   const router = useRouter();

//   const scroll = (direction) => {
//     const container = scrollRef.current;
//     const scrollAmount = 300;
//     if (container) {
//       container.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   const handleScroll = () => {
//     const container = scrollRef.current;
//     if (!container) return;

//     setShowLeftArrow(container.scrollLeft > 0);
//     setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth);
//   };

//   useEffect(() => {
//     const container = scrollRef.current;
//     if (!container) return;

//     container.addEventListener("scroll", handleScroll);
//     handleScroll(); // initial check

//     return () => {
//       container.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const fetchCategoryBlogs = async (category) => {
//     try {
//       const res = await axios.get(`/api/categoryblog?category=${category}`);
//       setBlogs(res.data.blogs); // Set blogs to Zustand store
//       router.push("/userdashboard/loadblogs"); // Navigate to page
//     } catch (error) {
//       console.error("Error fetching category blogs:", error);
//     }
//   };
  
//   return (
//     <div className="relative w-full pt-4 pb-3 bg-[#fcfcfd] ">
//       <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
//       <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />

//       {/* Left Arrow */}
//       <button
//         onClick={() => scroll("left")}
//         className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md hover:bg-white transition ${
//           showLeftArrow ? "opacity-100 cursor-pointer" : "opacity-20 cursor-not-allowed"
//         }`}
//         >
//         <ChevronLeft size={22} />
//       </button>

//       {/* Category Buttons */}
//       <div
//         ref={scrollRef}
//         className="scrollbar-hide flex gap-3 overflow-x-auto px-16 scroll-smooth"
//         >
//         {categories.map((category) => (
//           <button
//           key={category}
//           onClick={() => {
//             setActiveCategory(category);
//               fetchCategoryBlogs(category);
//             }}
//             className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition duration-200 hover:scale-105 ${
//               activeCategory === category
//               ? "bg-gray-700 text-white"
//               : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//             }`}
//             >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* Right Arrow */}
//       <button
//         onClick={() => scroll("right")}
//         className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md hover:bg-white transition ${
//           showRightArrow ? "opacity-100 cursor-pointer" : "opacity-20 cursor-not-allowed"
//         }`}
//         >
//         <ChevronRight size={22} />
//       </button>

//       {/* Custom scrollbar hide */}
//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         `}</style>
//     </div>
//   );
// };

// export default Page;



















// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import axios from "axios";
// import useBlogStore from "@/stores/blogStore";

// const categories = [
//   "Featured", "Self Improvement", "Technology", "Data Science", "Writing", "Relationships",
//   "Machine Learning", "Productivity", "Business", "Money", "Psychology", "Politics", "Python",
//   "Health", "Mental Health", "Life", "JavaScript", "Design", "Startup", "Culture",
//   "Entrepreneurship", "Artificial Intelligence", "Coding", "Books", "Work", "Blockchain",
//   "Education", "Marketing", "Humor", "Social Media", "Society", "Software Development",
//   "Cryptocurrency", "Science", "Deep Learning", "Leadership", "History", "Web Development",
//   "Apple", "Women", "Nft", "Lifestyle", "UX", "React", "Software Engineering", "Android",
//   "Mindfulness", "Sexuality", "Programming"
// ];

// const SuggestTopics = () => {
//   const scrollRef = useRef(null);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);
//   const [activeCategory, setActiveCategory] = useState("for-you");

//   const setBlogs = useBlogStore((state) => state.setBlogs);
//   const setIsFiltering = useBlogStore((state) => state.setIsFiltering);

//   const fetchCategoryBlogs = async (category) => {
//     try {
//       const res = await axios.get(`/api/categoryblog?category=${category}`);
//       setBlogs(res.data.blogs);
//       setIsFiltering(true);
//     } catch (err) {
//       console.log("Error fetching category blogs:", err);
//       setBlogs([]);
//       setIsFiltering(true);
//     }
//   };

//   const scroll = (direction) => {
//     if (!scrollRef.current) return;
//     scrollRef.current.scrollBy({
//       left: direction === "left" ? -300 : 300,
//       behavior: "smooth",
//     });
//   };

//   const handleScroll = () => {
//     const container = scrollRef.current;
//     if (!container) return;
//     setShowLeftArrow(container.scrollLeft > 0);
//     setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth);
//   };

//   useEffect(() => {
//     const container = scrollRef.current;
//     if (!container) return;

//     container.addEventListener("scroll", handleScroll);
//     handleScroll();
//     return () => container.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="relative w-full pt-4 pb-3 bg-[#fcfcfd]">
//       <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
//       <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />

//       <button onClick={() => scroll("left")} className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md hover:bg-white transition ${showLeftArrow ? "opacity-100 cursor-pointer" : "opacity-20 cursor-not-allowed"}`}>
//         <ChevronLeft size={22} />
//       </button>

//       <div ref={scrollRef} className="scrollbar-hide flex gap-3 overflow-x-auto px-16 scroll-smooth">
//         {categories.map((category) => (
//           <button
//             key={category}
//             className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition duration-200 hover:scale-105 ${
//               activeCategory === category
//                 ? "bg-gray-700 text-white"
//                 : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//             }`}
//             onClick={() => {
//               setActiveCategory(category);
//               fetchCategoryBlogs(category);
//             }}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       <button onClick={() => scroll("right")} className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md hover:bg-white transition ${showRightArrow ? "opacity-100 cursor-pointer" : "opacity-20 cursor-not-allowed"}`}>
//         <ChevronRight size={22} />
//       </button>

//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SuggestTopics;
