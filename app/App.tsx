"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import Canvas from "./components/Canvas";
import {useEffect, useRef } from "react";
import { handleOnMouseDown, handleOnMouseMove, handleOnMouseUp, initializeFabric } from "@/lib/canvas";
import {
  useMutation,
  useMyPresence,
  useOthers,
  useStorage,
} from "@/liveblocks.config";
import LiveCursors from "./components/cursor/LiveCursors";
import { LineObject, SelectedMode } from "@/types/types";

export default function Home() {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef<boolean>(false);  // when drawing lines
  const selectedMode = useRef<SelectedMode | null>("cursor");
  const shapeRef = useRef<fabric.Object | null>(null);  // to update the shapes
  const selectedShape = useRef<fabric.Object | null>(null)


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
        shapeRef,
        selectedShape
      });
    });

   canvas.on("mouse:move",(options)=>{
      handleOnMouseMove({
        isDrawing,
        selectedMode,
        options,
        canvas,
        shapeRef,

      })
   })
   
    canvas.on("mouse:up",(options)=>{
       handleOnMouseUp({
        isDrawing,
        selectedMode,
        options,
        canvas,
        shapeRef,
       })
    })


   


console.log("rendering");
  }, [canvasRef]);  // run this only once when the component mounts


  return (
    <main className="h-screen ">
      <Navbar 
       selectedMode={selectedMode} 
       fabricRef={fabricRef}
       shapeRef={shapeRef}
       />
      <Canvas canvasRef={canvasRef} />
    </main>
  );
}
