"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import Loadblog from "./loadblogs/page"
const Page = () => {
   const { data: session } = useSession();
   console.log(session,"session in userdashboard page");
  return (
    <>
    <Loadblog />
    
    </>
    // <div>this si the user dashboard and welcome {session?.user?.username || session?.user?.name || session?.user?.email}</div>
  )
}

export default Page
