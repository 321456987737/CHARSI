"use client";
import BlogCard from "@/componenets/BlogCard";
import useBlogStore from "@/stores/blogStore";
import Suggesttoptopics from "@/componenets/suggesttoptopics"
const SuggestedBlogs = () => {
  const { suggestedBlogs, isLoading, error } = useBlogStore();

  // Show loading skeletons while data is being fetched
  if (isLoading) {
    return (
      <div className="bg-white p-6 pl-16 border-l border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Suggested Blogs</h3>
        <div className="space-y-4">
          {/* Show 3 skeleton cards while loading */}
          {Array.from({ length: 3 }).map((_, index) => (
            <BlogCard key={`skeleton-${index}`} isLoading={true} compact />
          ))}
        </div>
      </div>
    );
  }

  // Show error state if there's an error
  if (error) {
    return (
      <div className="bg-white p-6 pl-16 border-l border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Suggested Blogs</h3>
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">
            Unable to load suggested blogs. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Don't render anything if no blogs are available
  if (!suggestedBlogs || !Array.isArray(suggestedBlogs) || suggestedBlogs.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 pl-16 border-l border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Suggested Blogs</h3>
      <div className="space-y-4">
        {suggestedBlogs.map((blog) => {
          // Safety check for each blog item
          if (!blog || !blog._id) {
            return null;
          }
          
          return (
            <BlogCard 
              key={blog._id} 
              blog={blog} 
              compact 
              isLoading={false}
            />
          );
        })}
      </div>
      <div className="w-full">
        <Suggesttoptopics/>
      </div>
    </div>
  );
};

export default SuggestedBlogs;