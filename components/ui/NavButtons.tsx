import React, { useEffect, useState } from "react";
import Image from "next/image";
import { handleImageUpload } from "@/lib/shapes";
import { NavButtonsProps, SelectedMode } from "@/types/types";

const NavButtons = ({
  item,
  selectedMode,
  handleImageUpload,
  setSelectedModeState,
  selectedModeState,
  setEditPannelState,
}: NavButtonsProps) => {

  
  const handleDrawingMode = () => {
    selectedMode.current = item.name as SelectedMode;
    setSelectedModeState(item.name as SelectedMode);

    if (selectedMode.current != "cursor") {
      setEditPannelState(false);
    }
  };

  if (item.name != "image") {
    return (
      <button
        className={`p-2 rounded-lg flex justify-center items-center hover:bg-[#E0DFFE] ${
          selectedModeState == item.name && "bg-[#E0DFFE]"
        }`}
        onClick={handleDrawingMode}
      >
        <Image
          src={item.icon}
          alt=""
          width={20}
          height={20}
          className="w-auto h-auto"
        />
      </button>
    );
  }

  return (
    <>
      <label
        className={`p-2 rounded-lg flex justify-center items-center hover:bg-[#E0DFFE] ${
          selectedModeState == item.name && "bg-[#E0DFFE]"
        }`}
        htmlFor="image"
        onClick={handleDrawingMode}
      >
        <Image
          src={item.icon}
          alt=""
          width={20}
          height={20}
          className="w-auto h-auto cursor-pointer"
        />
      </label>
      <input
        type="file"
        id="image"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </>
  );
};

export default NavButtons;
