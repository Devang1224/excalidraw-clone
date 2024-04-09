import {fabric} from "fabric"
import { createLine, createSpecificShape } from "./shapes";
import { CustomFabricObject, LineObject } from "@/types/types";
import { v4 as uuidv4 } from "uuid";


export const initializeFabric = ({
    canvasRef,
    fabricRef,
  }: {
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
    fabricRef: any;
  }) => {
    // get canvas element
    const canvasElement = document.getElementById("canvas");
  
    // create fabric canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasElement?.clientWidth,
      height: canvasElement?.clientHeight,
    });
  
    // set canvas reference to fabricRef so we can use it later anywhere outside canvas listener
    fabricRef.current = canvas

    return canvas;
  };




type onMouseDownParameters = {
    options:any,
    canvas:any,
    fabricRef:any,
    isDrawing:React.MutableRefObject<boolean>,
    selectedMode:React.MutableRefObject<string | null>,
    shapeRef:React.MutableRefObject<fabric.Object | null>,
    selectedShape:React.MutableRefObject<fabric.Object | null>
}
export function handleOnMouseDown({
    canvas, 
    options, 
    isDrawing, 
    fabricRef, 
    selectedMode, 
    shapeRef,
    selectedShape
}:onMouseDownParameters){ 


const pointer = canvas.getPointer(options.e);  // to get pointer coordinates
const target = canvas.findTarget(options.e,false); 

console.log("mode: ",selectedMode.current);
console.log("target: ",target);

if(selectedMode.current == "cursor"){
    if(target)selectedShape.current = target;
    canvas.isDrawingMode = false;
    canvas.selection = true; // to enable group selection
    canvas.selectionColor = 'rgba(0,0,0,0)'; 
    canvas.selectionBorderColor = 'blue'; 
    return;
}

if(selectedMode.current == "delete"){
   if(target){
    canvas.remove(target);
   }
   return;
}

if(selectedMode.current == "freeDraw"){
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 5;
    return;
}


if(target && selectedMode.current!=="cursor") 
{
    canvas.selection = false;
    return;
}


if(selectedMode.current=="image"){
   selectedMode.current="cursor";
   return;
}
else{
    canvas.isDrawingMode = false;
    shapeRef.current = createSpecificShape(selectedMode,pointer,isDrawing);

    if(shapeRef?.current!=null){
      canvas.add(shapeRef.current);
     }
    if(selectedMode.current!=="line")selectedMode.current="cursor";
}

}


////////////// mouse move   ////////

type handleOnMouseMoveTypes={
    isDrawing:React.MutableRefObject<boolean>,
    selectedMode:React.MutableRefObject<string | null>,
    options:any,
    canvas:any,
    shapeRef:any,
}
export function handleOnMouseMove({
    isDrawing,
    selectedMode,
    options,
    canvas,
    shapeRef,
}:handleOnMouseMoveTypes
){

  if (selectedMode.current == "freeDraw") return;
  if(!isDrawing.current)return;

  let pointer = canvas.getPointer(options.e);

  if (
    shapeRef.current &&
    selectedMode.current == "line" &&
    isDrawing.current
  ) {
    canvas.isDrawingMode = false;
    canvas.selectionBorderColor = "rgba(0,0,0,0";
    canvas.selectionColor = "rgba(0,0,0,0";
    shapeRef.current.set({
      x2: pointer.x,
      y2: pointer.y,
    });
    canvas.renderAll();
  }

}

type handleOnMouseUpTypes={
    isDrawing:React.MutableRefObject<boolean>,
    selectedMode:React.MutableRefObject<string | null>,
    options:any,
    canvas:any,
    shapeRef:React.MutableRefObject<fabric.Object | null>,
}
export function handleOnMouseUp({
isDrawing,
selectedMode,
options,
canvas,
shapeRef
}:handleOnMouseUpTypes){

if(selectedMode.current=="line"  && isDrawing.current){
   isDrawing.current = false; // canceling the line drawing state once mouse is up
   selectedMode.current="cursor"    
   return;
}
 
}