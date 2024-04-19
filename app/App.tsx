"use client";

import Navbar from "./components/Navbar";
import Canvas from "./components/Canvas";
import {useEffect, useRef, useState } from "react";
import { handleCanvasObjectModified, handleOnMouseDown, handleOnMouseMove, handleOnMouseUp, handlePathCreated, handleSelectionCreated, initializeFabric, renderCanvas } from "@/lib/canvas";
import {
  useMutation,
  useMyPresence,
  useOthers,
  useStorage,
} from "@/liveblocks.config";
import LiveCursors from "./components/cursor/LiveCursors";
import { EditOptions, LineObject, SelectedMode } from "@/types/types";
import EditPannel from "./components/EditPannel";

export default function Home() {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef<boolean>(false);  // when drawing lines
  const selectedMode = useRef<SelectedMode>("cursor");
  const [selectedModeState,setSelectedModeState] = useState<SelectedMode>("cursor"); // for Nav Buttons only 
  const shapeRef = useRef<fabric.Object | null>(null);  // to update the shapes
  const selectedShape = useRef<fabric.Object | null>(null)
  const [editPannelState,setEditPannelState] = useState<string | boolean>(false);  // to store the type of object and to trigger active pannel

  const [editOptions, setEditOptions] = useState<EditOptions>({
    stroke: "#000000",
    fill: "transparent",
    textColor:"#000000",
    strokeWidth: 1, //  thin:1, semi-bold:2, extra-bold: 4
    fontFamily: "Helvetica",
    fontSize: 36,
  });

  // to use liveblocks storage
  const canvasObjects = useStorage((root) => root.canvasObjects);

  
  const syncShapeInStorage = useMutation(({ storage }, object) => {

    if (!object) return;
    
    const canvasObjects = storage.get("canvasObjects");
  

      const { objectId } = object;

     const shapeData = object.toJSON();
    shapeData.objectId = objectId;

    canvasObjects.set(objectId, shapeData); 


  }, []);


  const deleteShapeFromStorage = useMutation(({ storage }, shapeId) => {
    const canvasObjects = storage.get("canvasObjects");
    console.log(canvasObjects);
    canvasObjects.delete(shapeId);
  }, []);

  useEffect(() => {

    const canvas = initializeFabric({
      canvasRef,
      fabricRef,
    });
canvas.preserveObjectStacking = true;

    // canvas.perPixelTargetFind = true;
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
        setEditOptions,
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


    canvas.on("object:modified", (options) => {

      handleCanvasObjectModified({
        options,
        syncShapeInStorage,
      });
    });

    canvas.on("path:created", (options) => {
      handlePathCreated({
        options,
        syncShapeInStorage,
      });
    });

return (()=>{
  canvas.dispose();
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
       setEditPannelState={setEditPannelState}
       syncShapeInStorage={syncShapeInStorage}
       />
      <EditPannel 
       canvas={fabricRef.current as fabric.Canvas} 
       editPannelState={editPannelState}
       selectedModeState={selectedModeState}
       selectedShape={selectedShape}
       syncShapeInStorage={syncShapeInStorage}
       editOptions={editOptions}
       setEditOptions={setEditOptions}
       />
      <Canvas canvasRef={canvasRef}/>
    </main>
  );
}
