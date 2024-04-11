import { CustomFabricObject } from "@/types/types";
import {fabric} from "fabric"
import { v4 as uuidv4 } from "uuid";




export const createRectangle = (pointer:PointerEvent)=>{
    const rect = new fabric.Rect({
         left:pointer.x,
         top:pointer.y,
         width: 100,
         height: 100,
         fill:"#97E7E1",
         stroke:"black",
         strokeWidth:2,
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
      strokeWidth: 2,
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
     fill:"#97E7E1",
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
      fill: "#aabbcc",
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
   selectedShape:React.MutableRefObject<string | null>,
   pointer:PointerEvent,
   isDrawing:React.MutableRefObject<boolean>
  )=>{
    
    switch(selectedShape.current){
      case 'rect':
         return createRectangle(pointer);
      case 'triangle':
        return createTriangle(pointer);
      case 'circle':
        return createCircle(pointer);
      case 'line':
         return createLine(pointer,isDrawing);
      case 'text':
        return createText(pointer,"Enter text...");
      default :
      return null;
}

}


type ImageUpload = {
  file: File;
  canvas: React.MutableRefObject<fabric.Canvas>;
  shapeRef: React.MutableRefObject<fabric.Object | null>;
  // syncShapeInStorage: (shape: fabric.Object) => void;
}
export const handleImageUpload = ({
  file,
  canvas, // fabricRef
  shapeRef,
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
    //   syncShapeInStorage(img);
      canvas.current.requestRenderAll();
    });
  };
  reader.onerror = (error) => {
    console.error('Error reading file:', error);
  };
  reader.readAsDataURL(file);
};









