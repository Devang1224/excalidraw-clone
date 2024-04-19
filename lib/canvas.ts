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
    syncShapeInStorage,
    setEditOptions
}:HandleOnMouseDown){ 


const pointer = canvas.getPointer(options.e);  // to get pointer coordinates
const target = canvas.findTarget(options.e,false); 



if(selectedMode.current == "cursor"){
    if(target && target.type!="activeSelection")
      {
        selectedShape.current = target;
        setEditPannelState(target.type);
        handleSelectionCreated({target,setEditOptions})
      }else {
         setEditPannelState(false);
      }
    canvas.isDrawingMode = false;
    canvas.selection = true; // to enable group selection
    canvas.selectionColor = 'rgba(0,0,0,0)'; 
    canvas.selectionBorderColor = 'blue'; 
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
    selectedShape.current=null;
   }
   return;
}


if(selectedMode.current=="image"){
   selectedMode.current="cursor";
   setSelectedModeState("cursor");
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
   return;
}
if(selectedMode.current!=="freedraw" && selectedMode.current!="delete"){
  selectedMode.current="cursor"    
  setSelectedModeState("cursor")
}
 
}

export const handleSelectionCreated = ({
  target,
  setEditOptions
}:any)=>{

  setEditOptions({

    fill: target?.fill?.toString() || "transparent",
    stroke: target?.stroke || "#000000",
    // @ts-ignore
    fontSize: target?.fontSize || 36,
    // @ts-ignore
    fontFamily: target?.fontFamily || "Helvetica",
    // @ts-ignore
    strokeWidth:target?.strokeWidth || 1,
    textColor:target?.fill?.toString() || "#000000",

  });

}


export const renderCanvas = ({
  fabricRef,
  canvasObjects,
  selectedShape,
}: RenderCanvas) => {

  //to clear canvas
  fabricRef.current?.clear();

  // render all objects on canvas
 canvasObjects.forEach((item:any)=>{

    //  enlivenObjects: http://fabricjs.com/docs/fabric.util.html#.enlivenObjectEnlivables

    fabric.util.enlivenObjects(
      [item],
      (enlivenedObjects: fabric.Object[]) => {
        enlivenedObjects.forEach((enlivenedObj) => {
          // if element is active, keep it in active state so that it can be edited further
          if (selectedShape.current?.objectId === item.objectId) {
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


export const handleCanvasObjectModified = ({options,syncShapeInStorage}:any)=>{
  
  const selectedElement = options?.target; // Ensure options and target are defined

  if (selectedElement && selectedElement.type!="activeSelection") {
    if( selectedElement.type != "circle" && 
        selectedElement.type!="i-text" && 
        selectedElement.type!="image" &&
        selectedElement.type!="path" 
      ){

     const scaledWidth = selectedElement?.scaleX
    ? selectedElement?.width! * selectedElement?.scaleX
    : selectedElement?.width;

  const scaledHeight = selectedElement?.scaleY
    ? selectedElement?.height! * selectedElement?.scaleY
    : selectedElement?.height;

    // Set new dimensions and reset scale to 1
    selectedElement.set({
      width: scaledWidth,
      height: scaledHeight,
      scaleX: 1,
      scaleY: 1,
    });

  }

    // Sync changes to storage
    syncShapeInStorage(selectedElement);
  }

}

export const handlePathCreated = ({
  options,
  syncShapeInStorage
}:any)=>{

  const path = options.path;
  if (!path) return;

  path.set({
    objectId: uuidv4(),
  });

  syncShapeInStorage(path);
   
}