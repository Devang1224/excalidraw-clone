import React, { useState } from "react";
import ColorCheckBox from "./ColorCheckBox";
import { TextColors } from "@/constants/constants";
import { BlockPicker } from "react-color";

// interface Props {
//   strokeColor: string;
//   setStrokeColor: (color: string) => void;
// }
const TextColorInput = ({ editOptions, setEditOptions}: any) => {

  const [pickerActive, setPickerActive] = useState<boolean>(false);

  const handleSetTextColor = (color: string) => {
    setEditOptions((prev:any)=>({...prev,textColor:color}));
    setPickerActive(false);
  };

const OnChangeColorPicker = (color:any)=>{
    setEditOptions((prev:any)=>({...prev,textColor:color.hex}))
    setPickerActive(false);
}



  return (
    <div className='flex flex-col gap-2'>
        <p className='text-[12px]'>Color</p>

    <div className="flex relative">
      <div className="flex gap-2 border border-y-0 border-l-0 border-r-2 pr-2">

        {TextColors.map((item) => (
          <ColorCheckBox
            key={item}
            item={item}
            handleOnChange={handleSetTextColor}
            pickerActive={pickerActive}
            color={editOptions.textColor}
          />
        ))}
      </div>

      {editOptions.textColor == "transparent" ? (
        <button
          className={` w-[20px] h-[20px] ml-2 rounded-md border flex flex-col overflow-hidden
           ${pickerActive && "outline"} outline-offset-1 outline-[#6565f5]`}
           onClick={() => setPickerActive(true)}
        >
          <div className="w-[10px] h-[10px]  bg-[#80808052]" />
          <div className="w-[10px] h-[10px] bg-[#80808052] self-end" />
        </button>
      ) : (
        <button
          className={` w-[20px] h-[20px] rounded-md ml-2 ${
            pickerActive && "outline"
          } outline-offset-1 outline-[#6565f5]`}
          style={{ backgroundColor: editOptions.fill }}
          onClick={() => setPickerActive(true)}
        />
      )}

      {pickerActive && (
        <div className="absolute translate-x-[100%] right-[-20px]">
          <BlockPicker
            color={editOptions.fill}
            onChange={OnChangeColorPicker}
          />
        </div>
      )}
    </div>
    </div>
  );
};

export default TextColorInput;
