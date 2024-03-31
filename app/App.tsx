"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import Canvas from "./components/Canvas";
import { useEffect, useRef } from "react";
import { handleOnMouseDown, initializeFabric, startDrawingLine } from "@/lib/canvas";
import {
  useMutation,
  useMyPresence,
  useOthers,
  useStorage,
} from "@/liveblocks.config";
import LiveCursors from "./components/cursor/LiveCursors";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawingMode = useRef(false);
  const selectedShape = useRef(null);
  const lineObject = useRef(null)

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
        selectedShape,
        lineObject,
      });
    });

   canvas.on("mouse:move",(options)=>{
      startDrawingLine({
        lineObject,
        isDrawingMode,
        selectedShape,
        options,
        canvas,
      })
   })

  }, []);
  return (
    <main className="h-screen ">
      <Navbar isDrawingMode={isDrawingMode} selectedShape={selectedShape}/>
      <Canvas canvasRef={canvasRef} />
    </main>
  );
}
