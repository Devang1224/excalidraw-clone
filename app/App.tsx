"use client";

import Navbar from "./components/Navbar";
import Canvas from "./components/Canvas";
import {useEffect, useRef, useState } from "react";
import { handleOnMouseDown, handleOnMouseMove, handleOnMouseUp, initializeFabric, renderCanvas } from "@/lib/canvas";
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
  const [editPannelState,setEditPannelState] = useState<string | boolean>(false);

  // to use liveblocks storage
  const canvasObjects = useStorage((root) => root.canvasObjects);

  
  const syncShapeInStorage = useMutation(({ storage }, object) => {

    if (!object) return;
    const { objectId } = object;

    const shapeData = object.toJSON();
    shapeData.objectId = objectId;

    const canvasObjects = storage.get("canvasObjects");

    canvasObjects.set(objectId, shapeData);

  }, []);


  const deleteShapeFromStorage = useMutation(({ storage }, shapeId) => {
    const canvasObjects = storage.get("canvasObjects");
    canvasObjects.delete(shapeId);
  }, []);

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
        setEditPannelState,
        deleteShapeFromStorage,
        syncShapeInStorage,
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
        syncShapeInStorage,

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
        syncShapeInStorage,
       })
    })


console.log("rendering");
  }, [canvasRef]);  // run this only once when the component mounts


  useEffect(()=>{
    renderCanvas({
      fabricRef,
      canvasObjects,
      selectedShape
    })
  },[canvasObjects])

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
       canvas={fabricRef.current as fabric.Canvas} 
       editPannelState={editPannelState}
       selectedModeState={selectedModeState}
       selectedShape={selectedShape}
       syncShapeInStorage={syncShapeInStorage}
       />
      <Canvas canvasRef={canvasRef}/>
    </main>
  );
}
