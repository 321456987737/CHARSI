"use client"
import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import Link from 'next/link'
const Suggesttoptopics = () => {
const [toptopics, setToptopics] = useState([])
   
useEffect(() => {
   fetchtoptopics()
}, [])
const fetchtoptopics = async ()=>{
   const res = await axios.get("/api/toptopics")
   setToptopics(res.data.category)
   console.log(res.data.category)
   }
return (
    <div className="space-y-2 w-full">
  <h3 className="text-lg font-semibold">Top Categories</h3>
  <div className="flex w-full flex-wrap gap-2">
    {toptopics.map((cat) => (
  <Link href={`/userdashboard/categoryblog/${cat._id}`} key={cat._id}>
    <div
      className="cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all text-sm px-4 py-2 rounded-full shadow-sm"
    >
      <span className="font-medium text-gray-800">{cat._id}</span>
      <span className="text-gray-500 ml-2">({cat.count})</span>
    </div>
  </Link>

    ))}
  </div>
</div>

   )
}

export default Suggesttoptopics