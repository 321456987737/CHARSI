"use client";

import { useState, useEffect } from "react";
import Navbarwithoutsignin from "@/componenets/navbarwithoutsignin/page";
import { useSession } from "next-auth/react";
import Logo from "@/componenets/logo/page";
import Link from "next/link";
import Image from "next/image";

export default function MembershipPage() {
  const { data: session } = useSession();
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const images = [
    {
      img: "1_CeGUACXvkyTZDUdNTMGteQ.png",
      title: "1",
      user: "user1",
      userdescription: "user1 description 1",
      color: "pink",
    },
    {
      img: "1_CT6GkrJ4geuSOoavTlxz6g.png",
      title: "2",
      user: "user2",
      userdescription: "user2 description 2",
      color: "blue",
    },
    {
      img: "1_KiLGJfmh-_cRkVwGQtL7PA.png",
      title: "3",
      user: "user3",
      userdescription: "user3 description 3",
      color: "green",
    },
    {
      img: "1_pNQWumUtMEZnyCtz3o1MUQ.png",
      title: "4",
      user: "user4",
      userdescription: "user4 description 4",
      color: "gray",
    },
  ];

  const [sliderIndex, setSliderIndex] = useState(0);
  const time = 3500;

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, time);

    return () => clearInterval(interval);
  }, []);

  const currentImage = images[sliderIndex];

  return (
    <main className="bg-white min-h-screen font-sans text-gray-900">
      {/* Sticky Header */}
      <Navbarwithoutsignin />

      {/* Hero Section */}
      {/* Hero Section */}
<section className="min-h-[85vh] flex flex-col transition-all lg:flex-row border-b">
  {/* Left side with dynamic background color */}
  <div 
    className={`w-full lg:w-[65%] flex flex-col justify-between p-6 md:p-8 lg:pl-8 lg:pr-12 lg:pt-20 lg:pb-16 border-r-0 lg:border-b-0 border-b lg:border-r  ${
      currentImage.color === 'pink' ? 'bg-pink-200' :
      currentImage.color === 'blue' ? 'bg-blue-200' :
      currentImage.color === 'green' ? 'bg-green-200' :
      'bg-gray-200'
    }`}
  >
    <div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-[85px] font-bold leading-tight">
        Support Human Stories
      </h1>
    </div>
    <div className="text-lg md:text-xl lg:text-2xl mt-6 lg:mt-0">
      <p className="mb-6">
        Become a member to read without limits or ads, fund great
        writers, and join a global community of people who care about
        high-quality storytelling.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="px-4 py-2 md:px-6 md:py-3 rounded-full bg-black text-white text-base md:text-lg cursor-pointer font-semibold transition-all hover:bg-gray-800">
         <Link href={"/plans"}>
          Upgrade
         </Link>
        </button>
        <button className="px-4 py-2 md:px-6 md:py-3 rounded-full bg-white text-black border border-gray-500 transition-all text-base md:text-lg cursor-pointer font-semibold hover:bg-slate-100">
          View plans
        </button>
      </div>
    </div>
  </div>

  {/* Right side with image and colored section */}
  <div className="w-full lg:w-[35%] flex flex-col">
    {/* Image with blend */}
    <div className="relative">
      <Image
        src={`/membershipimages/${currentImage.img}`}
        width={700}
        height={1000}
        alt={currentImage.title}
        className="w-full h-auto object-cover shadow-none"
        priority
      />
      <div 
        className={`absolute bottom-0 left-0 w-full h-16 lg:h-24 bg-gradient-to-b from-transparent ${
          currentImage.color === 'pink' ? 'to-pink-200' :
          currentImage.color === 'blue' ? 'to-blue-200' :
          currentImage.color === 'green' ? 'to-green-200' :
          'to-gray-200'
        } pointer-events-none z-10`} 
      />
    </div>

    {/* Solid color block with top outside shadow */}
    <div 
      className={`relative w-full flex-grow z-0 ${
        currentImage.color === 'pink' ? 'bg-pink-200' :
        currentImage.color === 'blue' ? 'bg-blue-200' :
        currentImage.color === 'green' ? 'bg-green-200' :
        'bg-gray-200'
      }`}
    >
      <div className="absolute -top-4 left-0 w-full h-4 shadow-md rounded-t-full z-0 opacity-20" />
      <div className="flex flex-col justify-around h-full p-4 lg:p-6">
        <div>
          <button className="px-4 py-2 rounded-full bg-amber-400 text-black border border-gray-500 transition-all text-sm md:text-base ml-2 lg:ml-4 cursor-pointer font-semibold hover:bg-slate-100">
            Members only story
          </button>
        </div>
        <div className="ml-2 lg:ml-4 text-lg md:text-xl">
          {currentImage.title}
        </div>
        <div className="flex items-center gap-3 ml-2 lg:ml-4">
          <div 
            className={`h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center font-semibold text-white justify-center text-center ${
              currentImage.color === 'pink' ? 'bg-pink-500' :
              currentImage.color === 'blue' ? 'bg-blue-500' :
              currentImage.color === 'green' ? 'bg-green-500' :
              'bg-gray-500'
            }`}
          >
            User
          </div>
          <div>
            <div className="text-sm md:text-base">{currentImage.user}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  <section className=" flex  w-full bg-white">
  {/* LEFT Sticky Section */}
  <div className="   lg:block w-[35%]">
    <div className="sticky top-22   flex items-center  flex-col  ">
      <div className="flex flex-col h-full py-16">
        <div>
          <h2 className="text-7xl pl-6  text-gray-800 leading-snug mb-4">
            Why membership?
          </h2>
        </div>
      </div>
    </div>
  </div>

  {/* RIGHT Scrollable Content */}
  <div className="w-full lg:w-[65%]">
    <div className="space-y-16 py-16 px-6 lg:px-16">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md p-8 transition hover:shadow-lg"
        >
          <h3 className="text-2xl lg:text-3xl font-semibold mb-3 text-gray-900">
            Section {index + 1} - Reward Writers
          </h3>
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
            Your membership directly supports the writers, editors, curators,
            and teams who make Medium a vibrant, inclusive home for human
            stories. A portion of your membership is allocated to the writers
            of the stories you read and interact with.
          </p>
        </div>
      ))}
    
    </div>
  </div>
</section>
  <section className=" flex  w-full bg-white">
  {/* LEFT Sticky Section */}
  <div className="   lg:block w-[35%]">
    <div className="sticky top-22   flex items-center  flex-col  ">
      <div className="flex flex-col h-full py-16">
        <div>
          <h2 className="text-7xl pl-6  text-gray-800 leading-snug mb-4">
            What members are saying
          </h2>
        </div>
      </div>
    </div>
  </div>

  {/* RIGHT Scrollable Content */}
  <div className="w-full lg:w-[65%]">
    <div className="space-y-16 py-16 px-6 lg:px-16">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-white flex gap-4 rounded-2xl shadow-md p-8 transition hover:shadow-lg"
        >
          <div className="h-[50px] w-[50px] rounded-full flex justify-center items-center bg-gray-300">
            You
          </div>
          <div className="w-full">

          <h3 className="text-2xl lg:text-3xl font-semibold mb-3 text-gray-900">
            Section {index + 1} - Reward Writers
          </h3>
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
            Your membership directly supports the writers, editors, curators,
            and teams who make Medium a vibrant, inclusive home for human
            stories. A portion of your membership is allocated to the writers
            of the stories you read and interact with.
          </p>
          </div>
        </div>
      ))}
    
    </div>
  </div>
</section>
  <section className=" flex  w-full bg-white">
  {/* LEFT Sticky Section */}
  <div className="   lg:block w-[35%]">
    <div className="sticky top-22   flex items-center  flex-col  ">
      <div className="flex flex-col h-full py-16">
        <div>
          <h2 className="text-7xl pl-6  text-gray-800 leading-snug mb-4">
            Membership plans
          </h2>
        </div>
      </div>
    </div>
  </div>

  {/* RIGHT Scrollable Content */}
<div className="w-full lg:w-[65%] p-4">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    
    {/* Free Plan */}
    <div className="shadow-lg rounded-2xl p-6 min-h-[400px] flex flex-col justify-between hover:shadow-xl transition duration-300 bg-white">
      <div>
        <h2 className="text-xl font-semibold mb-2">Free Plan</h2>
        <p className="text-gray-500 mb-4">Basic access to read articles.</p>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>✓ Access to public posts</li>
          <li>✓ Commenting allowed</li>
          <li>✗ No premium content</li>
        </ul>
      </div>
      <button className="w-full py-2 mt-6 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg">
      <Link href={"/userdashboard"}>
        Get Started
      </Link>
      </button>
    </div>

    {/* Pro Plan */}
    <div className="shadow-2xl rounded-2xl p-6 min-h-[400px] flex flex-col justify-between bg-gray-900 text-white relative overflow-hidden hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition duration-300">
      <div className="absolute top-0  right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
        Most Popular
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Pro Plan</h2>
        <p className="text-gray-300 mb-4">Full access for avid readers.</p>
        <ul className="text-sm text-gray-200 space-y-2">
          <li>✓ Unlimited premium articles</li>
          <li>✓ Offline reading</li>
          <li>✓ Ad-free experience</li>
        </ul>
      </div>
      <button className="cursor-pointer w-full py-2 mt-6 bg-yellow-400 hover:bg-yellow-300 text-black font-medium rounded-lg">
        <Link href={"/plans"}>
        Subscribe – $9/mo
        </Link>
      </button>
    </div>

    {/* Premium Plan */}
    <div className="shadow-lg rounded-2xl p-6 min-h-[400px] flex flex-col justify-between hover:shadow-xl transition duration-300 bg-white">
      <div>
        <h2 className="text-xl font-semibold mb-2">Premium Plan</h2>
        <p className="text-gray-500 mb-4">Support creators and unlock perks.</p>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>✓ All Pro benefits</li>
          <li>✓ Support writers directly</li>
          <li>✓ Early access to new features</li>
        </ul>
      </div>
      <button className="w-full cursor-pointer py-2 mt-6 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg">
        <Link href={"/plans"}>
        Subscribe – $15/mo
        </Link>
      </button>
    </div>
  </div>
</div>


</section>

<section className="w-full border-y  flex gap-5 mt-6 items-center justify-center py-24 flex-col">
      <h2 className="text-3xl md:text-6xl  mb-8 text-center">Unlock a world of wisdom</h2>
      <div> 
        <button className="bg-black text-white px-4 py-2 text-md rounded-full cursor-pointer">
          <Link href={"/plans"}>
          Upgrade
          </Link>
          </button>
      </div>
</section>

<section className="w-full flex items-center justify-between">
      <div> <Logo/></div>
      <div  > 
        <ul className="flex flex-wrap gap-2 text-[12px] text-gray-800">
  <li className="underline cursor-pointer"> <Link href={"/about"}>about</Link></li>
  <li className="underline cursor-pointer">Terms</li>
  <li className="underline cursor-pointer">Privacy</li>
  <li className="underline cursor-pointer">Help</li>
  <li className="underline cursor-pointer">Teams</li>
  <li className="underline cursor-pointer">Press</li>
</ul>

      </div>
</section>

</main>
  )
}