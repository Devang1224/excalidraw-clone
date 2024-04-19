import React, { useState } from "react";
import ColorCheckBox from "./ColorCheckBox";
import { StrokeColors } from "@/constants/constants";
import { BlockPicker } from "react-color";

const StrokeInput = ({ editOptions, setEditOptions,handleInputChange }: any) => {
  const [pickerActive, setPickerActive] = useState<boolean>(false);

  const handleSetStrokeColor = (color: string) => {
    handleInputChange("stroke",color);
    setPickerActive(false);
  };

  const OnChangeColorPicker = (color: any) => {
    handleInputChange("stroke",color.hex);
    setPickerActive(false);
  };


  return (
    <div className="flex flex-col gap-2">
      <p className="text-[12px]">Stroke</p>

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

        {editOptions.stroke == "transparent" ? (
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
            className={` w-[20px] h-[20px] rounded-md ml-2 
         ${pickerActive && "outline"} outline-offset-1 outline-[#6565f5]`}
            style={{ backgroundColor: editOptions.stroke }}
            onClick={() => setPickerActive(true)}
          />
        )}

        {pickerActive && (
          <div className="absolute translate-x-[100%] right-[-20px]">
            <BlockPicker
              color={editOptions.stroke}
              onChange={OnChangeColorPicker}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StrokeInput;
