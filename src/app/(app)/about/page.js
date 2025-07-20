"use client";
import React from 'react'
import Navbarwithoutsignin from "@/componenets/navbarwithoutsignin/page";
import Link from 'next/link';
const Page = () => {
  return (
    <div className='bg-white w-full min-h-screen'>
      <div>
        <Navbarwithoutsignin/>
      </div>
      
      {/* About Section */}
      <div className='max-w-4xl mx-auto px-6 py-20'>
        {/* Hero Section */}
        <div className='text-center mb-24'>
          <h1 className='text-6xl md:text-7xl font-normal text-black mb-8 leading-tight tracking-tight'>
            Everyone has a<br />story to tell.
          </h1>
          <p className='text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light'>
            Medium is a place to write, read, and connect<br />
            Its composed of deeper stories, ideas, and perspectives<br />
            on topics you care about.
          </p>
        </div>

        {/* Divider */}
        <div className='border-t border-gray-200 mb-20'></div>

        {/* Mission Statement */}
        <div className='mb-24 text-center'>
          <h2 className='text-4xl md:text-5xl font-normal text-black mb-12 leading-tight'>
            Ultimately, our goal is to<br />
            deepen our collective understanding<br />
            of the world through the power<br />
            of writing.
          </h2>
          <div className='max-w-2xl mx-auto'>
            <p className='text-lg md:text-xl text-gray-700 leading-relaxed mb-8 font-light'>
              Over 100 million people connect and share their wisdom on Medium every month. 
              Many are professional writers, but just as many arent — theyre CEOs, computer scientists, 
              U.S. presidents, amateur novelists, and anyone burning to share what they think is important.
            </p>
            <p className='text-lg md:text-xl text-gray-700 leading-relaxed font-light'>
              They write about what theyre working on, whats keeping them up at night, 
              what theyve lived through, and what theyve learned that the rest of us might want to know too.
            </p>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className='mb-24'>
          <div className='text-center mb-16'>
            <h3 className='text-3xl md:text-4xl font-normal text-black mb-8'>
              Instead of selling ads or selling your data,<br />
              were supported by a growing community<br />
              of Medium members.
            </h3>
          </div>
          
          <div className='grid md:grid-cols-2 gap-16 items-start'>
            <div>
              <h4 className='text-2xl font-normal text-black mb-6'>For readers</h4>
              <p className='text-lg text-gray-700 leading-relaxed mb-6 font-light'>
                Medium curates the most important stories on any topic, from world-renowned experts and emerging voices alike.
              </p>
              <p className='text-lg text-gray-700 leading-relaxed font-light'>
                Follow your curiosity and read without limits — well introduce you to perspectives 
                that will make you think differently.
              </p>
            </div>
            
            <div>
              <h4 className='text-2xl font-normal text-black mb-6'>For writers</h4>
              <p className='text-lg text-gray-700 leading-relaxed mb-6 font-light'>
                Medium is the perfect place to read, write, and learn. Explore topics youre 
                curious about, follow authors and publications you love.
              </p>
              <p className='text-lg text-gray-700 leading-relaxed font-light'>
                Start a blog, grow an audience, and earn money for your writing. 
                Join our Partner Program and earn for the stories you publish.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className='mb-24 text-center'>
          <h3 className='text-3xl md:text-4xl font-normal text-black mb-16'>
            We believe that what you read and write matters.
          </h3>
          
          <div className='grid md:grid-cols-3 gap-12 max-w-5xl mx-auto'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-black rounded-full mx-auto mb-6 flex items-center justify-center'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'/>
                </svg>
              </div>
              <h5 className='text-xl font-normal text-black mb-4'>Quality writing</h5>
              <p className='text-base text-gray-600 leading-relaxed font-light'>
                We reward thoughtful, well-crafted stories that deepen understanding.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-black rounded-full mx-auto mb-6 flex items-center justify-center'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'/>
                </svg>
              </div>
              <h5 className='text-xl font-normal text-black mb-4'>Diverse voices</h5>
              <p className='text-base text-gray-600 leading-relaxed font-light'>
                Anyone can contribute to the conversation, from any background or experience.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-black rounded-full mx-auto mb-6 flex items-center justify-center'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'/>
                </svg>
              </div>
              <h5 className='text-xl font-normal text-black mb-4'>Human connection</h5>
              <p className='text-base text-gray-600 leading-relaxed font-light'>
                Stories that bring people together and help us understand each other better.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className='text-center border-t border-gray-200 pt-20'>
          <h3 className='text-3xl md:text-4xl font-normal text-black mb-8'>
            Start reading, writing,<br />
            or creating your own<br />
            publication today.
          </h3>
          <div className='flex flex-col sm:flex-row gap-4 justify-center mt-12'>
            <button className='bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-full text-lg font-normal transition-colors'>
              <Link href={"/writing"}>
              Start writing
              </Link>
            </button>
            <button className='border border-black hover:bg-black hover:text-white text-black px-8 py-4 rounded-full text-lg font-normal transition-all'>
              <Link href={"/userdashboard"}>
              Start reading
              </Link>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className='text-center mt-24 pt-12 border-t border-gray-200'>
          <p className='text-gray-500 font-light'>
            To learn more about how Medium works, <span className='underline cursor-pointer'>read our story</span> or <span className='underline cursor-pointer'>browse our help center</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page