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
}

const EditPannel = ({
  canvas,
  editPannelState,
  selectedModeState,
  selectedShape,
  syncShapeInStorage
}: Props) => {

  const [editOptions, setEditOptions] = useState<EditOptions>({
    stroke: "#000000",
    fill: "transparent",
    textColor:"black",
    strokeWidth: 2, //  semi-bold:2, bold:4, extra-bold: 6
    layerType: null,
    fontFamily: "Helvetica",
    fontSize: 36,
  });

  useEffect(() => {

    modifyShape({
      selectedShape: selectedShape.current,
      canvas,
      editOptions,
      syncShapeInStorage,
    });

  }, [editOptions]);

  
  if (editPannelState) {
    if (editPannelState == "i-text") {
      return (
        <div className="flex flex-col z-10 gap-4 absolute top-[80px] left-[20px] bg-white border rounded-md shadow-md p-2">
             <TextColorInput
             editOptions={editOptions}
             setEditOptions={setEditOptions}
             />

          <FontSizeInput
            setEditOptions={setEditOptions}
            fontSize={editOptions.fontSize}
          />
          <FontFamilyInput
            setEditOptions={setEditOptions}
            fontFamily={editOptions.fontSize}
          />
          <LayerInput
            setEditOptions={setEditOptions}
            layerType={editOptions.layerType}
          />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col z-10 gap-4 absolute top-[80px] left-[20px] bg-white border rounded-md shadow-md p-2">
          <StrokeInput
            editOptions={editOptions}
            setEditOptions={setEditOptions}
          />
          {selectedShape.current?.type != "line" &&
            selectedShape.current?.type != "image" && (
              <FillColorInput
                editOptions={editOptions}
                setEditOptions={setEditOptions}
              />
            )}
          {selectedShape.current?.type != "image" && (
            <StrokeWidth
              setEditOptions={setEditOptions}
              strokeWidth={editOptions.strokeWidth}
            />
          )}
          <LayerInput
            setEditOptions={setEditOptions}
            layerType={editOptions.layerType}
          />
        </div>
      );
    }
  } else {
    return;
  }
};

export default React.memo(EditPannel);
