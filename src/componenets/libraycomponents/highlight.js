import React from 'react'
import Staffpicked from "@/componenets/heightlightcomponents/staffpicked";
import Storysection from "@/componenets/heightlightcomponents/storysection";
import Statessection from "@/componenets/heightlightcomponents/statessection";
const Highlightedlist = () => {
  return (
    <div className='flec flex-col'>
      <Staffpicked />
      <Storysection />
      <Statessection />
    </div>
  )
}

export default Highlightedlist