import React from 'react'
import Logo from '../logo/page'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
const Page = () => {
  const { data: session } = useSession();
   return (
    <div><header className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
          <div className="w-32 md:w-40">
            <Logo />
          </div>
          {!session && (
            <div className="flex gap-2">
              <Link
                className="px-4 py-2 border rounded-lg border-gray-300 hover:bg-gray-100 cursor-pointer text-sm md:text-base"
                href="/signup"
              >
                Sign Up
              </Link>
              <Link
                className="px-4 py-2 border rounded-lg border-gray-300 bg-gray-700 hover:bg-gray-600 text-white cursor-pointer text-sm md:text-base"
                href="/signin"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </header></div>
  )
}

export default Page