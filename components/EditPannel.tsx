import React, { useEffect, useMemo, useState } from "react";
import StrokeInput from "./ui/StrokeInput";
import FillColorInput from "./ui/FillColorInput";
import FillStateInput from "./ui/FillStateInput";
import StrokeWidth from "./ui/StrokeWidth";
import LayerInput from "./ui/LayerInput";
import { EditOptions, EditPannelProps, SelectedMode } from "@/types/types";
import FontSizeInput from "./ui/FontSizeInput";
import FontFamilyInput from "./ui/FontFamilyInput";
import { modifyShape } from "@/lib/modifyElement";
import TextColorInput from "./ui/TextColorInput";



const EditPannel = ({
  canvas,
  editPannelState,
  selectedModeState,
  selectedShape,
  syncShapeInStorage,
  editOptions,
  setEditOptions,
}: EditPannelProps) => {

  const handleInputChange = (property: string, value: string) => {

    setEditOptions((prev: any) => ({ ...prev, [property]: value }));

    modifyShape({
      canvas: canvas,
      property,
      value,
      selectedShape,
      syncShapeInStorage,
    });
  };

  const memoizedContent = useMemo(() => {

    if (editPannelState) {
     
        return (
          <div className="flex flex-col z-10 gap-4 absolute top-[80px] left-[20px] bg-white border rounded-md shadow-md p-2">
         
            {selectedShape.current?.type != "image" &&
              selectedShape.current?.type != "i-text" && (
                <>
                  <StrokeInput
                    editOptions={editOptions}
                    handleInputChange={handleInputChange}
                  />
                  
                  { selectedShape.current?.type!="line" && (
                       <FillColorInput
                         editOptions={editOptions}
                         handleInputChange={handleInputChange}
                        />
                       )
                   }
                   <StrokeWidth
                     handleInputChange={handleInputChange}
                    strokeWidth={editOptions.strokeWidth}
                   />

                </>
              )}
            {selectedShape.current?.type == "i-text" && (
              <>
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
              </>
            )}

            <LayerInput 
              canvas={canvas}
              selectedShape={selectedShape}
              syncShapeInStorage={syncShapeInStorage}
            />
          </div>
        );
    }

  }, [editOptions, editPannelState]);

  return memoizedContent;
};

export default EditPannel;
