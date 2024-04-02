import {fabric} from "fabric"
import { createLine, createSpecificShape } from "./shapes";
import { CustomFabricObject, LineObject } from "@/types/types";
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
    selectedMode:React.MutableRefObject<string | null>,
    lineObject:React.MutableRefObject<LineObject>
}
export function handleOnMouseDown({
    canvas, 
    options, 
    isDrawingMode, 
    fabricRef, 
    selectedMode, 
    lineObject
}:onMouseDownParameters){ 

    const pointer = canvas.getPointer(options.e);  // to get pointer coordinates
    const target = canvas.findTarget(options.e,false); 


if(selectedMode.current == "cursor"){
    canvas.isDrawingMode = false;
    return;
}

    if(selectedMode.current == "freeDraw"){
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.width = 5;
        return;
    }
console.log(selectedMode.current);
console.log(target?.type);
console.log(canvas);
// if an object is selected no need to make the shape on mousedown
if(target) 
{
    canvas.setActiveObject(target);
    target.setCoords();
    return;
}


// when drawing a line
    if(selectedMode.current=="line"){
        canvas.isDrawingMode = false;
       
           lineObject.current.line = createLine(pointer);
            if(lineObject.current.line){
                canvas.add(lineObject.current.line);
            }
            lineObject.current.drawingLine = true;   // start drawing the line
    }
    else {
     canvas.isDrawingMode = false;
     
     const shape = createSpecificShape(selectedMode,pointer);
    //  if(selectedMode.current=="text")selectedMode.current = null;

      if(shape){
        canvas.add(shape);
      }
    }
  
}

type handleOnMouseMoveTypes ={
    isDrawingMode:React.MutableRefObject<boolean>,
    selectedMode:React.MutableRefObject<string | null>,
    lineObject:React.MutableRefObject<LineObject>,
    options:any,
    canvas:any
   
}
export function handleOnMouseMove({
    lineObject,
    isDrawingMode,
    selectedMode,
    options,
    canvas
}:handleOnMouseMoveTypes
){


if(lineObject.current.line && selectedMode.current == "line" && lineObject.current.drawingLine){
    
    let pointer  = canvas.getPointer(options.e);
    lineObject.current.line.set({
     x2:pointer.x,
     y2:pointer.y
    })
     canvas.requestRenderAll();
}


}

type handleOnMouseUpTypes ={
    isDrawingMode:React.MutableRefObject<boolean>,
    selectedMode:React.MutableRefObject<string | null>,
    lineObject:React.MutableRefObject<LineObject>,
    options:any,
    canvas:any
   
}
export function handleOnMouseUp({
isDrawingMode,
selectedMode,
lineObject,
options,
canvas
}:handleOnMouseUpTypes){


if(selectedMode.current=="line" && lineObject.current.drawingLine){
  lineObject.current.drawingLine = false;     // canceling the line drawing state once mouse is up
   return;
}
 
}