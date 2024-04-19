import Image from 'next/image'
import React, { useState } from 'react'
import { SelectedLayer } from '@/types/types'
import { LayerButtons } from '@/constants/constants'
import { updateStackOfElement } from '@/lib/shapes'




const LayerInput = ({canvas,selectedShape,syncShapeInStorage}:any) => {

const handleLayerChange = (type:string)=>{

   updateStackOfElement({canvas,selectedShape,type,syncShapeInStorage})
}


  return (
    <div className="flex flex-col gap-2">
    <p className="text-[12px]">Layers</p>

    <div className="flex gap-2">
{
  LayerButtons.map((item)=>(
    <button
    key={item.id}
    className={`w-[30px] h-[30px] flex items-center justify-center bg-[#00000010] rounded-lg hover:bg-[#E0DFFE]`}
    title={item.title}
    onClick={()=>handleLayerChange(item.name)}
   >
   <item.icon/>
  </button>
  ))
}
    </div>
  </div>
  )
}

export default LayerInput