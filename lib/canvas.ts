import {fabric} from "fabric"
import { createLine, createSpecificShape } from "./shapes";
import { CustomFabricObject, HandleOnMouseDown, HandleOnMouseMove, HandleOnMouseUp, LineObject, RenderCanvas, SelectedMode } from "@/types/types";
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



export function handleOnMouseDown({
    canvas, 
    options, 
    isDrawing, 
    fabricRef, 
    selectedMode, 
    shapeRef,
    selectedShape,
    setEditPannelState,
    setSelectedModeState,
    deleteShapeFromStorage,
    syncShapeInStorage
}:HandleOnMouseDown){ 


const pointer = canvas.getPointer(options.e);  // to get pointer coordinates
const target = canvas.findTarget(options.e,false); 

console.log("target: ",target);

if(selectedMode.current == "cursor"){
    if(target && target.type!="activeSelection")
      {
        selectedShape.current = target;
        setEditPannelState(target.type);
      }else {
         setEditPannelState(false);
      }
    canvas.isDrawingMode = false;
    canvas.selection = true; // to enable group selection
    canvas.selectionColor = 'rgba(0,0,0,0)'; 
    canvas.selectionBorderColor = 'blue'; 
    canvas.preserveObjectStacking = true;
    return;
}


if(selectedMode.current == "freedraw"){
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.width = 5;
  return;
}

if(selectedMode.current == "delete"){
   if(target){
    canvas.remove(target);
    deleteShapeFromStorage(target.objectId);
   }
   return;
}


if(selectedMode.current=="image"){
   selectedMode.current="cursor";
   setSelectedModeState("cursor");
   return;
}
else{
    canvas.isDrawingMode = false;
    shapeRef.current = createSpecificShape(selectedMode,pointer,isDrawing);

    if(shapeRef?.current!=null && selectedMode.current!="line"){
      canvas.add(shapeRef.current);
      syncShapeInStorage(shapeRef.current)
     }
    if(selectedMode.current!=="line")selectedMode.current="cursor";

}

}


////////////// mouse move   ////////


export function handleOnMouseMove({
    isDrawing,
    selectedMode,
    options,
    canvas,
    shapeRef,
    setSelectedModeState,
    syncShapeInStorage
    
}:HandleOnMouseMove
){

  if (selectedMode.current == "freedraw") return;
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
    syncShapeInStorage(shapeRef.current)
  }

}


export function handleOnMouseUp({
isDrawing,
selectedMode,
options,
canvas,
shapeRef,
setSelectedModeState,
syncShapeInStorage

}:HandleOnMouseUp){

if(selectedMode.current=="line"  && isDrawing.current){
   isDrawing.current = false; // canceling the line drawing state once mouse is up
   selectedMode.current="cursor"    
   setSelectedModeState("cursor")
   console.log(shapeRef.current);
   return;
}
if(selectedMode.current!=="freedraw"){
  selectedMode.current="cursor"    
  setSelectedModeState("cursor")
}
 
}


export const renderCanvas = ({
  fabricRef,
  canvasObjects,
  selectedShape,
}: RenderCanvas) => {

  //to clear canvas
  fabricRef.current?.clear();

  // render all objects on canvas
  Array.from(canvasObjects, ([objectId, objectData]) => {

    //  enlivenObjects: http://fabricjs.com/docs/fabric.util.html#.enlivenObjectEnlivables

    fabric.util.enlivenObjects(
      [objectData],
      (enlivenedObjects: fabric.Object[]) => {
        enlivenedObjects.forEach((enlivenedObj) => {
          // if element is active, keep it in active state so that it can be edited further
          if (selectedShape.current?.objectId === objectId) {
            fabricRef.current?.setActiveObject(enlivenedObj);
          }

          // add object to canvas
          fabricRef.current?.add(enlivenedObj);
        });
      },
      "fabric"
    );
  });

  fabricRef.current?.renderAll();
};
