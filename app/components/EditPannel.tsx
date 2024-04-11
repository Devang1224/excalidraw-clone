import React, { useEffect, useState } from 'react'
import StrokeInput from './ui/StrokeInput'
import FillColorInput from './ui/FillColorInput'
import FillStateInput from './ui/FillStateInput'
import StrokeWidth from './ui/StrokeWidth'
import LayerInput from './ui/LayerInput'
import { EditOptions } from '@/types/types'


interface Props {
  fabricRef:React.MutableRefObject<fabric.Canvas | null>,
  editPannelActive:boolean
}

const EditPannel = ({fabricRef,editPannelActive}:Props) => {

const[strokeColor,setStrokeColor] = useState('#000000')

const [editOptions,setEditOptions] = useState<EditOptions>({
  strokeColor:"#000000",
  fillColor:"transparent",
  fillState:false,  // true for full
  strokeType:"semiBold",   //  semi-bold:2, bold:4, extra-bold: 6 
  layerType:null,
})



  return (

   editPannelActive && (<div className='flex flex-col z-10 gap-4 absolute top-[80px] left-[20px] bg-white border rounded-md shadow-md p-2'>
        <StrokeInput editOptions={editOptions} setEditOptions={setEditOptions}/>
        <FillColorInput editOptions={editOptions} setEditOptions={setEditOptions}/>
        <FillStateInput setEditOptions={setEditOptions} fillState={editOptions.fillState}/>
        <StrokeWidth setEditOptions={setEditOptions} strokeType={editOptions.strokeType}/>
        <LayerInput setEditOptions={setEditOptions} layerType={editOptions.layerType}/>
    </div>)
  


  )
}

export default EditPannel