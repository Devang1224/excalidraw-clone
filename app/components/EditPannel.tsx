import React, { useEffect, useState } from "react";
import StrokeInput from "./ui/StrokeInput";
import FillColorInput from "./ui/FillColorInput";
import FillStateInput from "./ui/FillStateInput";
import StrokeWidth from "./ui/StrokeWidth";
import LayerInput from "./ui/LayerInput";
import { EditOptions, SelectedMode } from "@/types/types";
import FontSizeInput from "./ui/FontSizeInput";
import FontFamilyInput from "./ui/FontFamilyInput";
import { modifyShape } from "@/lib/modifyElement";
import TextColorInput from "./ui/TextColorInput";

interface Props {
  editPannelState: string | boolean;
  selectedModeState: SelectedMode;
  selectedShape: React.MutableRefObject<fabric.Object | null>;
  canvas: fabric.Canvas;
  syncShapeInStorage: (shape: fabric.Object) => void;
  editOptions:EditOptions;
  setEditOptions:any;
}

const EditPannel = ({
  canvas,
  editPannelState,
  selectedModeState,
  selectedShape,
  syncShapeInStorage,
  editOptions,
  setEditOptions,
}: Props) => {

 

  const handleInputChange = (property: string, value: string) => {
    

    setEditOptions((prev : any) => ({ ...prev, [property]: value }));

    modifyShape({
      canvas: canvas,
      property,
      value,
      selectedShape,
      syncShapeInStorage,
    });
  };

  
  if (editPannelState) {
    if (editPannelState == "i-text") {
      return (
        <div className="flex flex-col z-10 gap-4 absolute top-[80px] left-[20px] bg-white border rounded-md shadow-md p-2">
             <TextColorInput
               editOptions={editOptions}
               handleInputChange={handleInputChange}
             />

          <FontSizeInput
            fontSize={editOptions.fontSize}
            handleInputChange={handleInputChange}

          />
          <FontFamilyInput
            fontFamily={editOptions.fontSize}
            handleInputChange={handleInputChange}
          />
          <LayerInput
            handleInputChange={handleInputChange}
          />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col z-10 gap-4 absolute top-[80px] left-[20px] bg-white border rounded-md shadow-md p-2">
          <StrokeInput
            editOptions={editOptions}
            handleInputChange={handleInputChange}

          />
          {selectedShape.current?.type != "line" &&
            selectedShape.current?.type != "image" && (
              <FillColorInput
                editOptions={editOptions}
                handleInputChange={handleInputChange}

              />
            )}
          {selectedShape.current?.type != "image" && (
            <StrokeWidth
              handleInputChange={handleInputChange}
              strokeWidth={editOptions.strokeWidth}
            />
          )}
          <LayerInput
            handleInputChange={handleInputChange}
          />
        </div>
      );
    }
  } else {
    return;
  }
};

export default EditPannel;
