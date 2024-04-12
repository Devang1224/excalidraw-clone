import { FontSizeData } from '@/constants/constants'
import React from 'react'

const FontSizeInput = ({
    setEditOptions,
    fontSize,
}:any) => {


const handleOnSizeChange = (e:any)=>{
const value = e.target.value;
setEditOptions((prev:any)=>({...prev,fontSize:value}));
}


  return (
    <div className='flex flex-col gap-2'>
    <p className='text-[12px]'>Font Size</p>
    <div className="flex gap-2">
        {
            FontSizeData.map((item)=>(
                <button
                key={item.id}
                title={item.name}
                value={item.value}
                className={`w-[30px] h-[30px] text-[#000000b3] font-light flex items-center justify-center bg-[#00000010] rounded-lg hover:bg-[#E0DFFE]`}
                onClick={handleOnSizeChange}
               >
                {item.text}
             </button>
            ))
        }
    </div>
    </div>
  )
}

export default FontSizeInput