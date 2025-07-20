"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, Loader2, X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const DEBOUNCE_DELAY = 350;
const API_TIMEOUT = 5000;

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const router = useRouter();
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const cancelTokenRef = useRef(null);

  const fetchResults = useCallback(async (query) => {
    if (!query.trim()) {
      setResults([]);
      setUserResults([]);
      setHasSearched(false);
      return;
    }

    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel("Cancelled previous request");
    }

    cancelTokenRef.current = axios.CancelToken.source();
    setIsLoading(true);
    setError(null);

    try {
      const [blogRes, userRes] = await Promise.all([
        axios.get(`/api/search/blogs`, {
          params: { q: query },
          cancelToken: cancelTokenRef.current.token,
          timeout: API_TIMEOUT,
        }),
        axios.get(`/api/search/users`, {
          params: { q: query },
          cancelToken: cancelTokenRef.current.token,
          timeout: API_TIMEOUT,
        }),
      ]);

      setResults(blogRes.data.blogs || []);
      setUserResults(userRes.data.users || []);
      setHasSearched(true);
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error("Search error:", err);
        setError("Search failed. Try again.");
        setResults([]);
        setUserResults([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchResults(searchTerm);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
      if (cancelTokenRef.current) cancelTokenRef.current.cancel();
    };
  }, [searchTerm, fetchResults]);

  const handleKeyDown = (e) => {
    const totalLength = userResults.length + results.length;
    if (totalLength === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, totalLength - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, -1));
        break;
      case "Enter":
        if (selectedIndex >= 0) {
          if (selectedIndex < userResults.length) {
            router.push(`/profile/${userResults[selectedIndex].username}`);
          } else {
            const blog = results[selectedIndex - userResults.length];
            router.push(`/userdashboard/readblog/${blog._id}`);
          }
          setIsDropdownVisible(false);
        }
        break;
      case "Escape":
        setIsDropdownVisible(false);
        inputRef.current?.blur();
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedIndex >= 0 && dropdownRef.current) {
      const items = dropdownRef.current.querySelectorAll("li");
      items[selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  const clearSearch = () => {
    setSearchTerm("");
    setResults([]);
    setUserResults([]);
    setHasSearched(false);
    setError(null);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full flex justify-center px-4 relative">
      <div className="w-full max-w-2xl relative">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search articles or users..."
            className="w-full pl-12 pr-10 py-2 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedIndex(-1);
            }}
            onFocus={() => setIsDropdownVisible(true)}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            {isLoading ? (
              <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
            ) : searchTerm ? (
              <button
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            ) : null}
          </div>
        </div>

        {/* Dropdown Results */}
        {isDropdownVisible && (
          <div
            ref={dropdownRef}
            className={`absolute mt-2 w-full bg-white rounded-lg shadow-lg z-50 border border-gray-100 overflow-hidden transition-all duration-200 ${
              hasSearched || isLoading || error
                ? "opacity-100 scale-y-100"
                : "opacity-0 scale-y-95"
            }`}
          >
            <div className="py-2 max-h-80 overflow-y-auto">
              {isLoading ? (
                <div className="px-4 py-6 text-center text-gray-500">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  <p className="mt-2">Searching...</p>
                </div>
              ) : error ? (
                <div className="px-4 py-3 text-red-500 text-sm">{error}</div>
              ) : (
                <>
                  {/* User Results */}
                  {userResults.length > 0 && (
                    <>
                      <div className="px-4 py-2 text-xs text-gray-400">
                        Top Users
                      </div>
                      <ul className="divide-y divide-gray-100">
                        {userResults.map((user, index) => (
                          <li
                            key={user._id}
                            className={`px-4 py-3 cursor-pointer flex items-center gap-3 ${
                              selectedIndex === index
                                ? "bg-blue-50"
                                : "hover:bg-gray-50"
                            }`}
                            onClick={() =>
                              router.push(`/userdashboard/Usersprofilepage/${user.email}`)
                            }
                            onMouseEnter={() => setSelectedIndex(index)}
                          >
                            <img
                              src={user.image || user.profileImage}
                              alt={user.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {user.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                @{user.username}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {/* Blog Results */}
                  {results.length > 0 && (
                    <>
                      <div className="px-4 py-2 text-xs text-gray-400">
                        Articles
                      </div>
                      <ul className="divide-y divide-gray-100">
                        {results.map((blog, index) => {
                          const blogIndex = index + userResults.length;
                          return (
                            <li
                              key={blog._id}
                              className={`px-4 py-3 cursor-pointer ${
                                selectedIndex === blogIndex
                                  ? "bg-blue-50"
                                  : "hover:bg-gray-50"
                              }`}
                              onClick={() =>
                                router.push(
                                  `/userdashboard/readblog/${blog._id}`
                                )
                              }
                              onMouseEnter={() =>
                                setSelectedIndex(blogIndex)
                              }
                            >
                              <p className="font-medium text-gray-900 truncate">
                                {blog.title}
                              </p>
                              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {blog.description}
                              </p>
                              {blog.author?.name && (
                                <p className="text-xs text-gray-400 mt-1">
                                  By {blog.author.name}
                                </p>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}

                  {/* No Results */}
                  {userResults.length === 0 &&
                    results.length === 0 &&
                    hasSearched && (
                      <div className="px-4 py-3 text-gray-500">
                        No results found for {searchTerm}
                      </div>
                    )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;



// "use client";
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { Search, Loader2, X } from "lucide-react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// const DEBOUNCE_DELAY = 350;
// const API_TIMEOUT = 5000;

// const SearchComponent = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
  
//   const router = useRouter();
//   const inputRef = useRef(null);
//   const dropdownRef = useRef(null);
//   const cancelTokenRef = useRef(null);

//   // Memoized fetch function with cancellation
//   const fetchResults = useCallback(async (query) => {
//     if (!query.trim()) {
//       setResults([]);
//       setHasSearched(false);
//       return;
//     }

//     // Cancel previous request if exists
//     if (cancelTokenRef.current) {
//       cancelTokenRef.current.cancel("Operation canceled due to new request");
//     }

//     // Create new token for current request
//     cancelTokenRef.current = axios.CancelToken.source();
    
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(`/api/search`, {
//         params: { q: query },
//         cancelToken: cancelTokenRef.current.token,
//         timeout: API_TIMEOUT,
//       });

//       setResults(response.data.blogs || []);
//       setHasSearched(true);
//     } catch (err) {
//       if (!axios.isCancel(err)) {
//         console.error("Search error:", err);
//         setError(err.response?.data?.message || "Failed to fetch results");
//         setResults([]);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   // Debounced effect for search
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       fetchResults(searchTerm);
//     }, DEBOUNCE_DELAY);

//     return () => {
//       clearTimeout(handler);
//       if (cancelTokenRef.current) {
//         cancelTokenRef.current.cancel();
//       }
//     };
//   }, [searchTerm, fetchResults]);

//   // Keyboard navigation
//   const handleKeyDown = (e) => {
//     if (results.length === 0) return;

//     switch (e.key) {
//       case "ArrowDown":
//         e.preventDefault();
//         setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
//         break;
//       case "ArrowUp":
//         e.preventDefault();
//         setSelectedIndex(prev => Math.max(prev - 1, -1));
//         break;
//       case "Enter":
//         if (selectedIndex >= 0 && selectedIndex < results.length) {
//           router.push(`/blog/${results[selectedIndex].slug}`);
//           setIsDropdownVisible(false);
//         }
//         break;
//       case "Escape":
//         setIsDropdownVisible(false);
//         inputRef.current?.blur();
//         break;
//     }
//   };

//   // Click outside handler
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         dropdownRef.current && 
//         !dropdownRef.current.contains(e.target) &&
//         inputRef.current &&
//         !inputRef.current.contains(e.target)
//       ) {
//         setIsDropdownVisible(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Scroll selected item into view
//   useEffect(() => {
//     if (selectedIndex >= 0 && dropdownRef.current) {
//       const items = dropdownRef.current.querySelectorAll("li");
//       items[selectedIndex]?.scrollIntoView({
//         block: "nearest",
//         behavior: "smooth"
//       });
//     }
//   }, [selectedIndex]);

//   const clearSearch = () => {
//     setSearchTerm("");
//     setResults([]);
//     setHasSearched(false);
//     setError(null);
//     inputRef.current?.focus();
//   };

//   const handleResultClick = (id) => {
//     router.push(`/userdashboard/readblog/${id}`);
//     setIsDropdownVisible(false);
//   };

//   return (
//     <div className="w-full flex justify-center px-4 relative">
//       <div className="w-full max-w-2xl relative">
//         {/* Search input */}
//         <div className="relative">
//           <Search 
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" 
//             aria-hidden="true"
//           />
//           <input
//             ref={inputRef}
//             type="text"
//             role="combobox"
//             aria-expanded={isDropdownVisible}
//             aria-autocomplete="list"
//             aria-controls="search-results"
//             aria-activedescendant={
//               selectedIndex >= 0 ? `result-${selectedIndex}` : undefined
//             }
//             placeholder="Search articles, topics, or authors..."
//             className="w-full pl-12 pr-10 py-2 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent tracking-wide text-base placeholder-gray-400 transition-all"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setSelectedIndex(-1);
//             }}
//             onFocus={() => setIsDropdownVisible(true)}
//             onKeyDown={handleKeyDown}
//           />
          
//           {/* Clear/loading indicator */}
//           <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
//             {isLoading ? (
//               <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
//             ) : searchTerm ? (
//               <button
//                 type="button"
//                 onClick={clearSearch}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//                 aria-label="Clear search"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             ) : null}
//           </div>
//         </div>

//         {/* Dropdown results */}
//         {isDropdownVisible && (
//           <div
//             ref={dropdownRef}
//             id="search-results"
//             className={`absolute mt-2 w-full bg-white rounded-lg shadow-lg z-50 border border-gray-100 overflow-hidden transition-all duration-200 ${
//               hasSearched || isLoading || error ? "opacity-100 scale-y-100" : "opacity-0 scale-y-95"
//             }`}
//           >
//             <div className="py-2">
//               {isLoading ? (
//                 <div className="px-4 py-6 text-center text-gray-500">
//                   <Loader2 className="mx-auto h-6 w-6 animate-spin" />
//                   <p className="mt-2">Searching...</p>
//                 </div>
//               ) : error ? (
//                 <div className="px-4 py-3 text-red-500 text-sm">
//                   Error: {error}
//                 </div>
//               ) : results.length === 0 && hasSearched ? (
//                 <div className="px-4 py-3 text-gray-500">
//                   No results found for {searchTerm}
//                 </div>
//               ) : (
//                 <ul className="divide-y divide-gray-100">
//                   {results.map((result, index) => (
//                     <li
//                       key={result._id}
//                       id={`result-${index}`}
//                       role="option"
//                       aria-selected={selectedIndex === index}
//                       className={`px-4 py-3 cursor-pointer transition-colors ${
//                         selectedIndex === index 
//                           ? "bg-blue-50" 
//                           : "hover:bg-gray-50"
//                       }`}
//                       onClick={() => handleResultClick(result._id)}
//                       onMouseEnter={() => setSelectedIndex(index)}
//                     >
//                       <p className="font-medium text-gray-900 truncate">
//                         {result.title}
//                       </p>
//                       <p className="text-sm text-gray-500 mt-1 line-clamp-2">
//                         {result.description}
//                       </p>
//                       {result.author && (
//                         <p className="text-xs text-gray-400 mt-1">
//                           By {result.author.name}
//                         </p>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
            
//             {results.length > 0 && (
//               <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500 border-t border-gray-100">
//                 {results.length} result{results.length !== 1 ? 's' : ''} found
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchComponent;