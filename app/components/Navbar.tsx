import React, { useState } from 'react'
import NavButtons from './ui/NavButtons'
import { navButtons } from '@/constants/constants'
import { handleImageUpload } from '@/lib/shapes';
import EditPannel from './EditPannel';
import { SelectedMode } from '@/types/types';

interface Props{
  selectedMode:React.MutableRefObject<SelectedMode>,
  setSelectedModeState:(mode:SelectedMode)=>void,
  selectedModeState:SelectedMode,
  fabricRef:React.MutableRefObject<fabric.Canvas | null>,
  shapeRef:React.MutableRefObject<fabric.Object | null>,
  syncShapeInStorage: (shape: fabric.Object) => void;
  setEditPannelState:React.Dispatch<React.SetStateAction<string | boolean>>;

}


const Navbar = (
  {
   selectedMode,
   fabricRef,
   shapeRef,
   setSelectedModeState,
   selectedModeState,
   setEditPannelState,
   syncShapeInStorage,

  }:Props) => {

  return (

      <div className='p-2 z-10 flex gap-2 rounded-lg bg-white border shadow-primary absolute left-[50%] top-2 translate-x-[-50%]'>
      {
        navButtons?.map((item,index)=>(
          <NavButtons
            key={index}
            item={item} 
            selectedMode={selectedMode}
            selectedModeState={selectedModeState}
            setSelectedModeState={setSelectedModeState}
            handleImageUpload={(e: any) => {
              // prevent the default behavior of the input element
              e.stopPropagation();
              handleImageUpload({
                file: e.target.files[0],
                canvas: fabricRef as any,
                shapeRef,
                syncShapeInStorage,
              });
              e.target.value="";
            }}
            setEditPannelState={setEditPannelState}
           />
        ))
      }
       </div>

  )
}

export default Navbar