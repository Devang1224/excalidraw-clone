import React, { useState } from 'react'
import StrokeInput from './ui/StrokeInput'


const EditPannel = () => {

const[strokeColor,setStrokeColor] = useState('#000000')

const handleOnStrokeColorChange = (color:any)=>{
  setStrokeColor(color.hex)
}

  return (
    <div className='flex flex-col z-20 gap-4 absolute top-[80px] left-[20px]  border rounded-md shadow-md p-2 h-[200px]'>
      <div className='flex flex-col gap-2'>
        <p className='text-[12px]'>Stroke</p>
        <StrokeInput setStrokeColor={setStrokeColor} strokeColor={strokeColor}/>
      </div>
    </div>

  )
}

export default EditPannel