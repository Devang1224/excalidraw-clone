import { FontFamilyData } from '@/constants/constants'
import React from 'react'

const FontFamilyInput = ({setEditOptions,fontFamily,handleInputChange}:any) => {

const handleOnStyleChange = (value:string)=>{

  handleInputChange("fontFamily",value);
    
}

  return (
    <div className='flex flex-col gap-2'>
    <p className='text-[12px]'>Font family</p>
    <div className="flex gap-2">
        {
            FontFamilyData.map((item)=>(
                <button
                key={item.id}
                title={item.toolTip}
                className={`w-[30px] h-[30px] text-[#000000b3] font-light flex items-center justify-center bg-[#00000010] rounded-lg hover:bg-[#E0DFFE] ${fontFamily==item.value && "bg-[#E0DFFE" }`}
                onClick={()=>handleOnStyleChange(item.value)}
                
               >
                 <item.icon/>
             </button>
            ))
        }
    </div>
    </div>
  )
}

export default FontFamilyInput