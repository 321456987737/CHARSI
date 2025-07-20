"use client";
import Navbar from "@/componenets/navbar/navbar";
import Landingpage from "@/componenets/landingpage/Landingpage";
export default function Home() {
  return (
    <>
      <div className="bg-amber-50">
        <div>
          <Navbar />
        </div>
        <div>
          <Landingpage />
        </div>
        
      </div>
    </>
  );
}
