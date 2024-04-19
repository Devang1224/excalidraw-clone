import React, { useState } from "react";
import ColorCheckBox from "./ColorCheckBox";
import { FillColors } from "@/constants/constants";
import { BlockPicker } from "react-color";

// interface Props {
//   strokeColor: string;
//   setStrokeColor: (color: string) => void;
// }
const FillColorInput = ({ editOptions, setEditOptions,handleInputChange }: any) => {

  const [pickerActive, setPickerActive] = useState<boolean>(false);

  const handleSetFillColor = (color: string) => {
    handleInputChange("fill",color)
    setPickerActive(false);
  };

const OnChangeColorPicker = (color:any)=>{
  handleInputChange("fill",color.hex);
    setPickerActive(false);
}



  return (
    <div className='flex flex-col gap-2'>
        <p className='text-[12px]'>Fill</p>

    <div className="flex relative">
      <div className="flex gap-2 border border-y-0 border-l-0 border-r-2 pr-2">
         <button
          className={` w-[20px] h-[20px] rounded-md border flex flex-col overflow-hidden ${
            editOptions.fill == "transparent" && !pickerActive && "outline"
          } outline-offset-1 outline-[#6565f5]`}
          onClick={() => handleSetFillColor("transparent")}
        >
          <div className="w-[10px] h-[10px]  bg-[#80808052]" />
          <div className="w-[10px] h-[10px] bg-[#80808052] self-end" />
        </button>
        {FillColors.map((item) => (
          <ColorCheckBox
            key={item}
            item={item}
            handleOnChange={handleSetFillColor}
            pickerActive={pickerActive}
            color={editOptions.fill}
          />
        ))}
      </div>

      {editOptions.fill == "transparent" ? (
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

export default FillColorInput;
