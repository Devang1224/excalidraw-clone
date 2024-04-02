import React, { useState } from 'react'
import NavButtons from './ui/NavButtons'
import { navButtons } from '@/constants/constants'
import { handleImageUpload } from '@/lib/shapes';

interface Props{
  isDrawingMode: React.MutableRefObject<boolean>,
  selectedMode: React.MutableRefObject<string | null>,
  fabricRef:React.MutableRefObject<fabric.Canvas | null>,
}

const Navbar = ({isDrawingMode,selectedMode,fabricRef}:Props) => {

  const [currentMode,setCurrentMode] = useState<string | null>(null);


  return (

      <div className='p-2 z-10 flex gap-2 rounded-lg bg-white border shadow-primary absolute left-[50%] top-2 translate-x-[-50%]'>
      {
        navButtons?.map((item,index)=>(
          <NavButtons
            key={index}
            item={item} 
            isDrawingMode={isDrawingMode} 
            selectedMode={selectedMode}
            currentMode={currentMode}
            setCurrentMode={setCurrentMode}  
            handleImageUpload={(e: any) => {
              // prevent the default behavior of the input element
              e.stopPropagation();
              handleImageUpload({
                file: e.target.files[0],
                canvas: fabricRef as any,
                // shapeRef,
                // syncShapeInStorage,
              });
            }}
           />
        ))
      }
       </div>
  )
}

export default Navbar