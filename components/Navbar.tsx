import React, { useState } from "react";
import NavButtons from "./ui/NavButtons";
import { navButtons } from "@/constants/constants";
import { handleImageUpload } from "@/lib/shapes";
import EditPannel from "./EditPannel";
import { NavBarProps } from "@/types/types";
import Image from "next/image";
import { exportToPdf } from "@/lib/exportToPdf";

const Navbar = ({
  selectedMode,
  fabricRef,
  shapeRef,
  setSelectedModeState,
  selectedModeState,
  setEditPannelState,
  syncShapeInStorage,
}: NavBarProps) => {

  
  return (
    <div className="p-2 z-10 flex gap-2 rounded-lg bg-white border shadow-primary absolute left-[50%] top-2 translate-x-[-50%]">
      {navButtons?.map((item, index) => (
        <NavButtons
          key={index}
          item={item}
          selectedMode={selectedMode}
          selectedModeState={selectedModeState}
          setSelectedModeState={setSelectedModeState}
          handleImageUpload={(e: any) => {
            // prevent the default behavior of the input element
            e.stopPropagation();
            handleImageUpload({
              file: e.target.files[0],
              canvas: fabricRef as any,
              shapeRef,
              syncShapeInStorage,
            });
            e.target.value = "";
          }}
          setEditPannelState={setEditPannelState}
        />
      ))}
      <button
        className={`p-2 rounded-lg flex justify-center items-center hover:bg-[#E0DFFE]`}
        onClick={exportToPdf}
      >
        <Image
          src={"../assets/icons/saveIcon.svg"}
          alt=""
          width={20}
          height={20}
          className="w-auto h-auto"
        />
      </button>
    </div>
  );
};

export default Navbar;
