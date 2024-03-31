import React from 'react'
import NavButtons from './ui/NavButtons'
import { navButtons } from '@/constants/constants'

interface Props{
  isDrawingMode: React.MutableRefObject<boolean>,
  selectedShape: React.MutableRefObject<string | null>,
}

const Navbar = ({isDrawingMode,selectedShape}:Props) => {
  return (

      <div className='p-2 z-10 flex gap-2 rounded-lg bg-white border shadow-primary absolute left-[50%] top-2 translate-x-[-50%]'>
      {
        navButtons?.map((item,index)=>(
          <NavButtons
            key={index}
            item={item} 
            isDrawingMode={isDrawingMode} 
            selectedShape={selectedShape}/>
        ))
      }
       </div>
  )
}

export default Navbar