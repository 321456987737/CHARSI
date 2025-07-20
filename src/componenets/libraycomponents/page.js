"use client";
import React from 'react'
import Leftside from "./leftsection/page";
import Rightside from "./rightsection/page";
const Page = () => {
  return (
    <div className="min-h-screen bg-white ">
      {/* <SuggestTopics /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <Leftside />
          </div>
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
          <Rightside />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page
