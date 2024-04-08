import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { handleImageUpload } from '@/lib/shapes';

interface Props{
  isDrawingMode: React.MutableRefObject<boolean>,
  item:{
    icon:string,
    name:string
  },
  selectedMode: React.MutableRefObject<string | null>,
  handleImageUpload:(e:React.ChangeEvent<HTMLInputElement>)=>void,

}

const NavButtons = ({
   item,
   isDrawingMode,
   selectedMode,
   handleImageUpload,
  }:Props ) => {


  const handleDrawingMode = () =>{
        isDrawingMode.current = true;
         selectedMode.current = item.name;
  }


if(item.name!="image") {
  return (
         <button 
          className={`p-2 rounded-lg flex justify-center items-center hover:bg-[#E0DFFE]`}
          onClick={handleDrawingMode}
          >
            <Image
             src={item.icon}
             alt=""
             width={20}
             height={20}
             className='w-auto h-auto'
            />
         </button>
  )
}

return (
  <>
  <label 
  className={`p-2 rounded-lg flex justify-center items-center hover:bg-[#E0DFFE]`}
  htmlFor='image'
  onClick={handleDrawingMode}
  >
     <Image
             src={item.icon}
             alt=""
             width={20}
             height={20}
             className='w-auto h-auto cursor-pointer'
       />
 </label>
  <input
   type="file"
   id="image"
   accept="image/*"
   className='hidden'
   onChange={handleImageUpload}
  />
  </>

)

}

export default NavButtons