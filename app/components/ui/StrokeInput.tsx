import React, { useState } from "react";
import ColorCheckBox from "./ColorCheckBox";
import { StrokeColors } from "@/constants/constants";
import { BlockPicker } from "react-color";



const StrokeInput = ({ editOptions,setEditOptions}: any) => {

  const [pickerActive, setPickerActive] = useState<boolean>(false);

  const handleSetStrokeColor = (color: string) => {
     setEditOptions((prev:any)=>({...prev,stroke:color}))
     setPickerActive(false);
     
  };

const OnChangeColorPicker = (color:any)=>{
  setEditOptions((prev:any)=>({...prev,stroke:color.hex}))
  setPickerActive(false);
}
console.log(editOptions.stroke);

  return (
    <div className='flex flex-col gap-2'>
        <p className='text-[12px]'>Stroke</p>

    <div className="flex relative">
      <div className="flex gap-2 border border-y-0 border-l-0 border-r-2 pr-2">
        {StrokeColors.map((item) => (
          <ColorCheckBox
            key={item}
            item={item}
            handleOnChange={handleSetStrokeColor}
            pickerActive={pickerActive}
            color={editOptions.stroke}
          />
        ))}
      </div>
      <button
        className={` w-[20px] h-[20px] rounded-md ml-2 
         ${ pickerActive && "outline"} outline-offset-1 outline-[#6565f5]`}
        style={{ backgroundColor: editOptions.stroke }}
        onClick={() => setPickerActive(true)}
      />
      {  pickerActive && <div className="absolute translate-x-[100%] right-[-20px]">
            <BlockPicker color={editOptions.stroke} onChange={OnChangeColorPicker}/>
         </div>
      }
    </div>
    </div>
  );
};

export default StrokeInput;
