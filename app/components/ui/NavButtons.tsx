import React from 'react'
import Image from 'next/image'

interface Props{
  isDrawingMode: React.MutableRefObject<boolean>,
  item:{
    icon:string,
    name:string
  },
  selectedMode: React.MutableRefObject<string | null>,

}

const NavButtons = ({
   item,
   isDrawingMode,
   selectedMode,
  }:Props ) => {


  const handleDrawingMode = () =>{
        isDrawingMode.current = true;
         selectedMode.current = item.name;
  }

  return (
         <button 
          className='p-2 rounded-lg flex justify-center items-center hover:bg-[#E0DFFE]'
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

export default NavButtons