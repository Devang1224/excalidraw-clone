import React from 'react'
import NavButtons from './ui/NavButtons'
import { navButtons } from '@/constants/constants'

interface Props{
  isDrawingMode: React.MutableRefObject<boolean>,
  selectedMode: React.MutableRefObject<string | null>,
}

const Navbar = ({isDrawingMode,selectedMode}:Props) => {
  return (

      <div className='p-2 z-10 flex gap-2 rounded-lg bg-white border shadow-primary absolute left-[50%] top-2 translate-x-[-50%]'>
      {
        navButtons?.map((item,index)=>(
          <NavButtons
            key={index}
            item={item} 
            isDrawingMode={isDrawingMode} 
            selectedMode={selectedMode}/>
        ))
      }
       </div>
  )
}

export default Navbar