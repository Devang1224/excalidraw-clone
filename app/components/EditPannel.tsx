import React, { useState } from 'react'
import StrokeInput from './ui/StrokeInput'
import FillColorInput from './ui/FillColorInput'
import FillStateInput from './ui/FillStateInput'


const EditPannel = () => {

const[strokeColor,setStrokeColor] = useState('#000000')

const [editOptions,setEditOptions] = useState({
  strokeColor:"#000000",
  fillColor:"transparent",
  fillState:false,  // true for full
})


  return (
    <div className='flex flex-col z-20 gap-4 absolute top-[80px] left-[20px]  border rounded-md shadow-md p-2 h-[200px]'>
      <div className='flex flex-col gap-2'>
        <p className='text-[12px]'>Stroke</p>
        <StrokeInput editOptions={editOptions} setEditOptions={setEditOptions}/>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-[12px]'>Background</p>
        <FillColorInput editOptions={editOptions} setEditOptions={setEditOptions}/>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-[12px]'>Fill</p>
        <FillStateInput setEditOptions={setEditOptions} fillState={editOptions.fillState}/>
      </div>

    </div>

  )
}

export default EditPannel