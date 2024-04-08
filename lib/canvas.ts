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
    isDrawingMode:React.MutableRefObject<boolean>,
    selectedMode:React.MutableRefObject<string | null>,
    shapeRef:React.MutableRefObject<fabric.Object | null>,
}
export function handleOnMouseDown({
    canvas, 
    options, 
    isDrawingMode, 
    fabricRef, 
    selectedMode, 
    shapeRef,
}:onMouseDownParameters){ 


    const pointer = canvas.getPointer(options.e);  // to get pointer coordinates
    const target = canvas.findTarget(options.e,false); 

console.log("mode: ",selectedMode.current);
console.log("target: ",target);

if(selectedMode.current == "cursor"){
    canvas.isDrawingMode = false;
    canvas.selection = true; // to enable group selection
    canvas.selectionColor = 'rgba(0,0,0,0)'; 
    canvas.selectionBorderColor = 'blue'; 
    return;
}

    if(selectedMode.current == "freeDraw"){
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.width = 5;
        return;
    }



// if an object is selected no need to make the shape on mousedown
if(target) 
{
    canvas.setActiveObject(target);
    target.setCoords();
    return;
}


if(selectedMode.current=="image"){
   selectedMode.current="cursor";
   return;
}

// when drawing a line
    if(selectedMode.current=="line"){
        canvas.isDrawingMode = false;
        
          shapeRef.current = createLine(pointer);
            if(shapeRef.current){
                canvas.add(shapeRef.current);
            }
            isDrawingMode.current = true;   // start drawing the line
    }
    else {

     canvas.isDrawingMode = false;
     shapeRef.current = createSpecificShape(selectedMode,pointer);
    //  if(selectedMode.current=="text")selectedMode.current = null;

     if(shapeRef?.current!=null){
       canvas.add(shapeRef.current);
      }
      selectedMode.current="cursor";
    }
}


////////////// mouse move   ////////

type handleOnMouseMoveTypes={
    isDrawingMode:React.MutableRefObject<boolean>,
    selectedMode:React.MutableRefObject<string | null>,
    options:any,
    canvas:any,
    shapeRef:any
   
}
export function handleOnMouseMove({
    isDrawingMode,
    selectedMode,
    options,
    canvas,
    shapeRef,
}:handleOnMouseMoveTypes
){
if(selectedMode.current=="freeDraw")return;

let pointer  = canvas.getPointer(options.e);

// switch(selectedMode?.current){
//     case "image":
//         shapeRef.current?.set({
//             left:pointer.x,
//             top:pointer.y
//         })
//         break;
// }


if(shapeRef.current && selectedMode.current == "line" && isDrawingMode.current){
    
    canvas.selectionBorderColor = 'rgba(0,0,0,0';
    shapeRef.current.set({
     x2:pointer.x,
     y2:pointer.y
    })
     canvas.renderAll();
}

}

type handleOnMouseUpTypes={
    isDrawingMode:React.MutableRefObject<boolean>,
    selectedMode:React.MutableRefObject<string | null>,
    options:any,
    canvas:any,
    shapeRef:React.MutableRefObject<fabric.Object | null>,
   
}
export function handleOnMouseUp({
isDrawingMode,
selectedMode,
options,
canvas,
shapeRef
}:handleOnMouseUpTypes){


if(selectedMode.current=="line" && isDrawingMode.current){
  isDrawingMode.current = false;     // canceling the line drawing state once mouse is up
   return;
}
 
}