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
import { LineObject } from "@/types/types";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawingMode = useRef(false);
  const selectedMode = useRef(null);
  const lineObject = useRef({
    line:null,
    drawingLine:false,
  });

  const canvasObjects = useStorage((root) => root.canvasObjects);

  const addShapeInStorage = useMutation(({ storage }, object) => {
    if (!object) return;
    const { objectId } = object;
    const shapeData = object.toJson();
    shapeData.obejctId = objectId;

    const canvasObjects = storage.get("canvasObjects");
    canvasObjects.set(objectId, shapeData);
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
        isDrawingMode,
        selectedMode,
        lineObject,
      });
    });

   canvas.on("mouse:move",(options)=>{
      handleOnMouseMove({
        lineObject,
        isDrawingMode,
        selectedMode,
        options,
        canvas,
      })
   })
   
    canvas.on("mouse:up",(options)=>{
       handleOnMouseUp({
        lineObject,
        isDrawingMode,
        selectedMode,
        options,
        canvas,
       })
    })
canvas.selection = false;  // to avoid the selection background


console.log("rendering");
  }, []);
  return (
    <main className="h-screen ">
      <Navbar isDrawingMode={isDrawingMode} selectedMode={selectedMode}/>
      <Canvas canvasRef={canvasRef} />
    </main>
  );
}
