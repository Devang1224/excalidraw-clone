import React, { useState } from "react";
import ColorCheckBox from "./ColorCheckBox";
import { StrokeColors } from "@/constants/constants";
import { BlockPicker } from "react-color";

// interface Props {
//   strokeColor: string;
//   setStrokeColor: (color: string) => void;
// }

const StrokeInput = ({ editOptions,setEditOptions}: any) => {

  const [pickerActive, setPickerActive] = useState<boolean>(false);

  const handleSetStrokeColor = (color: string) => {
     setEditOptions((prev:any)=>({...prev,strokeColor:color}))
     setPickerActive(false);
     
  };

const OnChangeColorPicker = (color:any)=>{
  setEditOptions((prev:any)=>({...prev,strokeColor:color.hex}))
  setPickerActive(false);
}
console.log(editOptions.strokeColor);

  return (
    <div className="flex relative">
      <div className="flex gap-2 border border-y-0 border-l-0 border-r-2 pr-2">
        {StrokeColors.map((item) => (
          <ColorCheckBox
            key={item}
            item={item}
            handleOnChange={handleSetStrokeColor}
            pickerActive={pickerActive}
            color={editOptions.strokeColor}
          />
        ))}
      </div>
      <button
        className={` w-[20px] h-[20px] rounded-md ml-2  ${
          pickerActive && "outline"
        } outline-offset-1 outline-[#6565f5]`}
        style={{ backgroundColor: editOptions.strokeColor }}
        onClick={() => setPickerActive(true)}
      />
      {  pickerActive && <div className="absolute translate-x-[100%] right-[-20px]">
            <BlockPicker color={editOptions.strokeColor} onChange={OnChangeColorPicker}/>
         </div>
      }
    </div>
  );
};

export default StrokeInput;
