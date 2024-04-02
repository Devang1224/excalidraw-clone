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
  currentMode:string | null,
  setCurrentMode:(mode: string | null) => void,
  handleImageUpload:(e:React.ChangeEvent<HTMLInputElement>)=>void,


}

const NavButtons = ({
   item,
   isDrawingMode,
   selectedMode,
   currentMode,
   setCurrentMode,
   handleImageUpload,
  }:Props ) => {


  const handleDrawingMode = () =>{
        isDrawingMode.current = true;
         selectedMode.current = item.name;
         setCurrentMode(selectedMode.current);
  }

if(item.name!="image") {
  return (
         <button 
          className={`p-2 rounded-lg flex justify-center items-center hover:bg-[#E0DFFE] ${(currentMode==item.name)?"bg-[#E0DFFE]":"bg-white"} `}
          onClick={handleDrawingMode}
          >
            <Image
             src={item.icon}
             alt=""
             width={20}
             height={20}
             className='w-5 h-5'
            />
         </button>
  )
}

return (
  <>
  <label 
  className={`p-2 rounded-lg flex justify-center items-center hover:bg-[#E0DFFE]`}
  htmlFor='image'
  >
     <Image
             src={item.icon}
             alt=""
             width={20}
             height={20}
             className='w-5 h-5 cursor-pointer'
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