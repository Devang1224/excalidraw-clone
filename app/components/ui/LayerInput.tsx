import Image from 'next/image'
import React, { useState } from 'react'
import LayerUp from "@/public/assets/icons/LayerUp"
import LayerDown from "@/public/assets/icons/LayerDown"
import LayerBottom from "@/public/assets/icons/LayerBottom"
import LayerTop from "@/public/assets/icons/LayerTop"
import { SelectedLayer } from '@/types/types'
import { LayerButtons } from '@/constants/constants'



const LayerInput = ({setEditOptions,layerType}:any) => {

const handleLayerChange = (e:any)=>{
const name = e.target.name;
setEditOptions((prev:any)=>({...prev,layerType:name}));
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
    name={item.name}
    onClick={handleLayerChange}
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