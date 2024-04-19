import { EditOptions } from "@/types/types";
import React, { useState } from "react";


const StrokeWidth = ({ setEditOptions, strokeWidth,handleInputChange }: any) => {



  const handleStrokeChange = (e:any,value:number) => {

    handleInputChange("strokeWidth",value);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[12px]">Stroke Width</p>

      <div className="flex gap-2">
        <button
          className={`w-[30px] h-[30px] flex items-center justify-center bg-[#00000010] rounded-lg hover:bg-[#E0DFFE] 
          ${strokeWidth==1 &&"bg-[#E0DFFE]"}`}
          title="semi bold"
          name="semiBold"
          onClick={(e:any)=>{handleStrokeChange(e,1)}}
        >
          <div className="w-[12px] h-[2px] bg-black rounded" />
        </button>
        <button
          className={`w-[30px] h-[30px] flex items-center justify-center bg-[#00000010] rounded-lg hover:bg-[#E0DFFE]
          ${(strokeWidth==2)&&"bg-[#E0DFFE]"}`}
          title="bold"
          name="bold"
          onClick={(e)=>{handleStrokeChange(e,2)}}

        >
          <div className="w-[12px] h-[4px] bg-black rounded " />
        </button>
        <button
          className={`w-[30px] h-[30px] flex items-center justify-center bg-[#00000010] rounded-lg hover:bg-[#E0DFFE] 
          ${strokeWidth==4 &&"bg-[#E0DFFE]"}`}
          title="extra bold"
          name="extraBold"
          onClick={(e)=>{handleStrokeChange(e,4)}}
        >
          <div className="w-[12px] h-[6px] bg-black rounded " />
        </button>
      </div>
    </div>
  );
};

export default StrokeWidth;
