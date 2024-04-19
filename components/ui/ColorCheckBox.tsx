import React from 'react'

interface Props{
    item:string,
    color:string,
    handleOnChange:(color:string)=>void,
    pickerActive:boolean,
}

const ColorCheckBox = ({item,handleOnChange,color,pickerActive}:Props)=> {

const handleSetColor = ()=>{
   handleOnChange(item);
}

  return (
    <button className={` w-[20px] h-[20px] rounded-md ${(item==color && !pickerActive) && 'outline'} border outline-offset-1 outline-[#6565f5]`} style={{backgroundColor:item}} onClick={handleSetColor}/>
  )
}

export default ColorCheckBox