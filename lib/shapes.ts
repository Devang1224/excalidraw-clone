import { CustomFabricObject, SelectedMode } from "@/types/types";
import {fabric} from "fabric"
import { v4 as uuidv4 } from "uuid";




export const createRectangle = (pointer:PointerEvent)=>{
    const rect = new fabric.Rect({
         left:pointer.x,
         top:pointer.y,
         width: 100,
         height: 100,
         fill:"transparent",
         stroke:"#000000",
         strokeWidth:1,
         rx:5,           
         ry:5,            
         objectId:uuidv4()
    }as fabric.IRectOptions & { objectId?: string }) 
     
  return rect;
}

// export const createDiamond = (pointer:PointerEvent)=>{
//     const rect = new fabric.Rect({
//         left:pointer.x,
//         top:pointer.y,
//         width: 100,
//         height: 100,
//         fill:"#97E7E1",
//         rx:5,
//         ry:5,
//         angle:45,
//         objectId:uuidv4()
//     }as fabric.IRectOptions & { objectId?: string }
//   )

//   return rect;
// }

export const createLine = (pointer:PointerEvent,isDrawing:React.MutableRefObject<boolean>)=>{
  
  isDrawing.current = true;
 return new fabric.Line(
    [pointer.x, pointer.y, pointer.x, pointer.y],
    {
      stroke: "#000000",
      strokeWidth: 1,
      objectId: uuidv4(),
    } as CustomFabricObject<fabric.Line>
  );
}

export const createTriangle  = (pointer:PointerEvent)=>{
    const triangle = new fabric.Triangle({
     left:pointer.x,
     top:pointer.y,
     width:100,
     height:100,
     fill:"transparent",
     stroke:"#000000",
     strokeWidth:1,
     rx:5,
     ry:5,
     objectId:uuidv4(),
    } as fabric.ITriangleOptions 
  )
  return triangle;
}

export const createCircle = (pointer: PointerEvent) => {
    return new fabric.Circle({
      left: pointer.x,
      top: pointer.y,
      radius: 100,
      fill:"transparent",
      stroke:"#000000",
      strokeWidth:1,
      objectId: uuidv4(),
    } as any);

  };

  export const createText = (pointer: PointerEvent, text: string) => {
    return new fabric.IText(text, {
      left: pointer.x,
      top: pointer.y,
      fill: "#000",
      fontFamily: "Helvetica",
      fontSize: 36,
      fontWeight: "400",
      objectId: uuidv4()
    } as fabric.ITextOptions);
  };

export const createSpecificShape = (
   selectedMode:React.MutableRefObject<SelectedMode>,
   pointer:PointerEvent,
   isDrawing:React.MutableRefObject<boolean>,
  )=>{
    
    switch(selectedMode.current){
      case 'rect':
         return createRectangle(pointer);
      case 'triangle':
        return createTriangle(pointer);
      case 'circle':
        return createCircle(pointer);
      case 'line':
         return createLine(pointer,isDrawing);
      case 'text':
        return createText(pointer,"Tap to type");
      default :
      return null;
}

}


type ImageUpload = {
  file: File;
  canvas: React.MutableRefObject<fabric.Canvas>;
  shapeRef: React.MutableRefObject<fabric.Object | null>;
  syncShapeInStorage: (shape: fabric.Object) => void;
}
export const handleImageUpload = ({
  file,
  canvas, // fabricRef
  shapeRef,
  syncShapeInStorage
}: ImageUpload) => {
  const reader = new FileReader();

console.log("reading");

  reader.onload = () => {
    
    fabric.Image.fromURL(reader.result as string, (img) => {
      img.scaleToWidth(200);
      img.scaleToHeight(200);
      // @ts-ignore
      img.objectId = uuidv4();

      canvas.current.add(img)

      shapeRef.current = img;
      syncShapeInStorage(img);
      canvas.current.requestRenderAll();
    });
  };
  
  reader.readAsDataURL(file);
};


export const updateStackOfElement = ({
  canvas,
  selectedShape,
  type,
  syncShapeInStorage
}:any)=>{



  if (!selectedShape.current || selectedShape.current?.type === "activeSelection") return;

  // bring the selected element to the front
  if (type === "Top") {
    canvas.bringToFront(selectedShape.current);
  } else if (type === "Bottom") {
    canvas.sendToBack(selectedShape.current);
  }else if(type=="Up"){
    canvas.bringForward(selectedShape.current)
  }else{
    canvas.sendBackwards(selectedShape.current)
  }
canvas.renderAll();
  // syncShapeInStorage(selectedShape.current);

}






