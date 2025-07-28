"use client";
import { create } from "zustand";
import axios from "axios";

// ✅ Max blog limit for frontend state
const BLOG_FETCH_LIMIT = 64;

const useBlogStore = create((set, get) => ({
  // State
  blogs: [],
  suggestedBlogs: [],
  isFiltering: false,
  loading: false,
  loadingMore: false,
  hasMore: true,
  skip: 0,
  limit: 12,
  activeCategory: "for-you",
  error: null,
  initialized: false,

  // Actions
  setInitialized: (value) => set({ initialized: value }),

  fetchLatestBlogs: async () => {
    set({ 
      loading: true,
      error: null,
      skip: 0,
      hasMore: true,
      isFiltering: false
    });

    try {
      const { limit } = get();
      const res = await axios.get(`/api/blog?skip=0&limit=${limit}`);
      
      if (res.data?.success) {
        const blogs = res.data.blogs || [];
        set({
          blogs,
          skip: blogs.length,
          hasMore: blogs.length < BLOG_FETCH_LIMIT && res.data.hasMore !== false,
          loading: false
        });
      }
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to load blogs",
        blogs: [],
        loading: false,
        hasMore: false
      });
    }
  },

  fetchMoreBlogs: async () => {
    const { skip, limit, loadingMore, hasMore, isFiltering, blogs } = get();

    // ✅ Don't fetch if already 32 blogs or other conditions
    if (blogs.length >= BLOG_FETCH_LIMIT || loadingMore || !hasMore || isFiltering) return;

    set({ loadingMore: true, error: null });

    try {
      const res = await axios.get(`/api/blog?skip=${skip}&limit=${limit}`);
      if (res.data?.success) {
        const newBlogs = res.data.blogs || [];
        const totalBlogs = [...blogs, ...newBlogs];

        set({
          blogs: totalBlogs,
          skip: skip + newBlogs.length,
          hasMore: totalBlogs.length < BLOG_FETCH_LIMIT && res.data.hasMore !== false,
          loadingMore: false
        });
      }
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to load more blogs",
        loadingMore: false
      });
    }
  },

  fetchCategoryBlogs: async (category) => {
    if (category === "for-you") {
      get().fetchLatestBlogs();
      return;
    }

    set({
      loading: true,
      error: null,
      activeCategory: category,
      isFiltering: true
    });

    try {
      const res = await axios.get(
        `/api/categoryblog?category=${encodeURIComponent(category)}`
      );
      
      const blogs = res.data?.blogs || [];
      set({
        blogs,
        loading: false,
        hasMore: false,
        skip: 0
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to load category blogs",
        blogs: [],
        loading: false
      });
    }
  },

  fetchSuggestedBlogs: async () => {
    try {
      const res = await axios.get('/api/recomendedblogxcharsi');
      set({
        suggestedBlogs: Array.isArray(res.data?.blogs) 
          ? res.data.blogs 
          : res.data || []
      });
    } catch (error) {
      console.error("Failed to fetch suggested blogs:", error);
      set({ suggestedBlogs: [] });
    }
  },

  clearBlogs: () => set({ 
    blogs: [],
    isFiltering: false,
    skip: 0,
    hasMore: true
  }),

  setActiveCategory: (category) => set({ activeCategory: category })
}));

export default useBlogStore;

// import { create } from "zustand";
// import axios from "axios";

// const useBlogStore = create((set, get) => ({
//   // State
//   blogs: [],
//   suggestedBlogs: [],
//   isFiltering: false,
//   loading: false,
//   loadingMore: false,
//   hasMore: true,
//   skip: 0,
//   limit: 6,
//   activeCategory: "for-you",
//   error: null,
//   initialized: false,

//   // Actions
//   setInitialized: (value) => set({ initialized: value }),

//   fetchLatestBlogs: async () => {
//     set({ 
//       loading: true,
//       error: null,
//       skip: 0,
//       hasMore: true,
//       isFiltering: false
//     });

//     try {
//       const { limit } = get();
//       const res = await axios.get(`/api/blog?skip=0&limit=${limit}`);
      
//       if (res.data?.success) {
//         set({
//           blogs: res.data.blogs || [],
//           skip: limit,
//           hasMore: res.data.hasMore !== false,
//           loading: false
//         });
//       }
//     } catch (error) {
//       set({
//         error: error.response?.data?.message || "Failed to load blogs",
//         blogs: [],
//         loading: false,
//         hasMore: false
//       });
//     }
//   },

//  fetchMoreBlogs: async () => {
//   const { skip, limit, loadingMore, hasMore, isFiltering } = get();
//   // If already loading or no more blogs, return early
//   if (loadingMore || !hasMore || isFiltering) return;

//   set({ loadingMore: true, error: null });

//   try {
//     const res = await axios.get(`/api/blog?skip=${skip}&limit=${limit}`);
//     if (res.data?.success) {
//       // Update blogs array and skip count
//       set({
//         blogs: [...get().blogs, ...res.data.blogs],
//         skip: skip + res.data.blogs.length,
//         hasMore: res.data.hasMore, // This should be true if there are more blogs
//         loadingMore: false
//       });
//     }
//   } catch (error) {
//     set({
//       error: error.response?.data?.message || "Failed to load more blogs",
//       loadingMore: false
//     });
//   }
// },

//   fetchCategoryBlogs: async (category) => {
//     if (category === "for-you") {
//       get().fetchLatestBlogs();
//       return;
//     }

//     set({
//       loading: true,
//       error: null,
//       activeCategory: category,
//       isFiltering: true
//     });

//     try {
//       const res = await axios.get(
//         `/api/categoryblog?category=${encodeURIComponent(category)}`
//       );
      
//       set({
//         blogs: res.data?.blogs || [],
//         loading: false,
//         hasMore: false,
//         skip: 0
//       });
//     } catch (error) {
//       set({
//         error: error.response?.data?.message || "Failed to load category blogs",
//         blogs: [],
//         loading: false
//       });
//     }
//   },

//   fetchSuggestedBlogs: async () => {
//     try {
//       const res = await axios.get('/api/recomendedblogxcharsi');
//       set({
//         suggestedBlogs: Array.isArray(res.data?.blogs) 
//           ? res.data.blogs 
//           : res.data || []
//       });
//     } catch (error) {
//       console.error("Failed to fetch suggested blogs:", error);
//       set({ suggestedBlogs: [] });
//     }
//   },

//   clearBlogs: () => set({ 
//     blogs: [],
//     isFiltering: false,
//     skip: 0,
//     hasMore: true
//   }),

//   setActiveCategory: (category) => set({ activeCategory: category })
// }));

// export default useBlogStore;
// import { create } from "zustand";

// const useBlogStore = create((set) => ({
//   blogs: [],
//   suggestedBlogs: [],
//   isFiltering: false,
//   setBlogs: (blogs) => set({ blogs }),
//   setSuggestedBlogs: (blogs) => set({ suggestedBlogs: blogs }),
//   setIsFiltering: (value) => set({ isFiltering: value }),
//   clearBlogs: () => set({ blogs: [], isFiltering: false }),
// }));

// export default useBlogStore;