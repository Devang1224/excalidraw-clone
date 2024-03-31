import {fabric} from "fabric"
import { createSpecificShape } from "./shapes";
import { CustomFabricObject } from "@/types/types";
import { v4 as uuidv4 } from "uuid";


export function initializeFabric({
        canvasRef,
        fabricRef,
    }:{
        canvasRef:React.MutableRefObject<HTMLCanvasElement | null>,
        fabricRef:React.MutableRefObject<fabric.Canvas | null>
    }){

   var canvasElement = document.getElementById("canvas");
   var canvas = new fabric.Canvas(canvasRef.current,{
       width: canvasElement?.clientWidth,
       height: canvasElement?.clientHeight
   });

   fabricRef.current = canvas;
   return canvas;

}


type onMouseDownParameters = {
    options:any,
    canvas:any,
    fabricRef:React.MutableRefObject<fabric.Canvas | null>,
    isDrawingMode:React.MutableRefObject<boolean>,
    selectedShape:React.MutableRefObject<string | null>,
    lineObject:React.MutableRefObject<fabric.Line | null>

}
export function handleOnMouseDown({
    canvas, 
    options, 
    isDrawingMode, 
    fabricRef, 
    selectedShape, 
    lineObject
}:onMouseDownParameters){ 

    const pointer = canvas.getPointer(options.e);  // to get pointer coordinates

    if(isDrawingMode.current && selectedShape.current==null){
        canvas.isDrawingMode = isDrawingMode.current;
        canvas.freeDrawingBrush.width = 5;
    }
    else if(isDrawingMode.current==false && selectedShape.current=="line"){
        canvas.isDrawingMode = false;

        // to make a controllable line
    
           lineObject.current = new fabric.Line(
              [pointer.x, pointer.y, pointer.x, pointer.y],
              {
                stroke: "#aabbcc",
                strokeWidth: 2,
                objectId: uuidv4(),
              } as CustomFabricObject<fabric.Line>
            );
            if(lineObject.current){
                canvas.add(lineObject.current);
            }
    }
    else {
     isDrawingMode.current = false;
     canvas.isDrawingMode = false;

     const rect = createSpecificShape(selectedShape,pointer);
     console.log(rect);
      if(rect){
        canvas.add(rect);
      }
    }
  

}

type startDrawingParameters ={
    isDrawingMode:React.MutableRefObject<boolean>,
    selectedShape:React.MutableRefObject<string | null>,
    lineObject:React.MutableRefObject<fabric.Line | null>,
    options:any,
    canvas:any
   
}

export function startDrawingLine({
    lineObject,
    isDrawingMode,
    selectedShape,
    options,
    canvas
}:startDrawingParameters
){

if(selectedShape.current!="line")return;
if(isDrawingMode.current)return;
if(!lineObject?.current)return;

let pointer  = canvas.getPointer(options.e);
lineObject.current.set({
 x2:pointer.x,
 y2:pointer.y
})
canvas.requestRenderAll();


}