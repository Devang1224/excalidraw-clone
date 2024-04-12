"use client";

import Navbar from "./components/Navbar";
import Canvas from "./components/Canvas";
import {useEffect, useRef, useState } from "react";
import { handleOnMouseDown, handleOnMouseMove, handleOnMouseUp, initializeFabric } from "@/lib/canvas";
import {
  useMutation,
  useMyPresence,
  useOthers,
  useStorage,
} from "@/liveblocks.config";
import LiveCursors from "./components/cursor/LiveCursors";
import { LineObject, SelectedMode } from "@/types/types";
import EditPannel from "./components/EditPannel";

export default function Home() {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef<boolean>(false);  // when drawing lines
  const selectedMode = useRef<SelectedMode>("cursor");
  const [selectedModeState,setSelectedModeState] = useState<SelectedMode>("cursor"); // for Nav Buttons only 
  const shapeRef = useRef<fabric.Object | null>(null);  // to update the shapes
  const selectedShape = useRef<fabric.Object | null>(null)
  const [editPannelActive,setEditPannelActive] = useState<boolean>(true);

  // const canvasObjects = useStorage((root) => root.canvasObjects);

  // const addShapeInStorage = useMutation(({ storage }, object) => {
  //   if (!object) return;
  //   const { objectId } = object;
  //   const shapeData = object.toJson();
  //   shapeData.obejctId = objectId;

  //   const canvasObjects = storage.get("canvasObjects");
  //   canvasObjects.set(objectId, shapeData);
  // }, []);

  useEffect(() => {

    const canvas = initializeFabric({
      canvasRef,
      fabricRef,
    });
    
    canvas.on("mouse:down", (options) => {
      handleOnMouseDown({
        canvas,
        options,
        fabricRef,
        isDrawing,
        selectedMode,
        setSelectedModeState,
        shapeRef,
        selectedShape,
        setEditPannelActive,
      });
    });

   canvas.on("mouse:move",(options)=>{
      handleOnMouseMove({
        isDrawing,
        selectedMode,
        setSelectedModeState,
        options,
        canvas,
        shapeRef,

      })
   })
   
    canvas.on("mouse:up",(options)=>{
       handleOnMouseUp({
        isDrawing,
        selectedMode,
        setSelectedModeState,
        options,
        canvas,
        shapeRef,
       })
    })


console.log("rendering");
  }, [canvasRef]);  // run this only once when the component mounts


  return (
    <main className="h-screen">
      <Navbar 
       selectedMode={selectedMode} 
       setSelectedModeState={setSelectedModeState}
       selectedModeState={selectedModeState}
       fabricRef={fabricRef}
       shapeRef={shapeRef}
       />
      <EditPannel 
       fabricRef={fabricRef} 
       editPannelActive={editPannelActive}
       selectedModeState={selectedModeState}
       />
      <Canvas canvasRef={canvasRef}/>
    </main>
  );
}
