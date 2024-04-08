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

export const createLine = (pointer:PointerEvent)=>{
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

export const createSpecificShape = (selectedShape:React.MutableRefObject<string | null>,pointer:PointerEvent)=>{
    
    switch(selectedShape.current){
      case 'rect':
         return createRectangle(pointer);
      case 'triangle':
        return createTriangle(pointer);
      case 'circle':
        return createCircle(pointer);
      case 'arrowline':
        return createArrowLine();
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




function createArrowLine() {

// Usage example:
const startPoint = { x: 100, y: 100 };
const endPoint = { x: 200, y: 200 };

  const HEAD_LENGTH = 20;
  const HEAD_ANGLE = Math.PI / 6;  // 30 deg

    // Create the line
    const line = new fabric.Line([startPoint.x, startPoint.y, endPoint.x, endPoint.y], {
      stroke: 'black',
      strokeWidth: 2,
      selectable: true, // Make the line selectable
  });

  // Calculate the angle of the arrow line
  const angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x); 


  // Calculate the coordinates of the arrowhead lines
  const x1 = endPoint.x - HEAD_LENGTH * Math.cos(angle - HEAD_ANGLE);
  const y1 = endPoint.y - HEAD_LENGTH * Math.sin(angle - HEAD_ANGLE);
  const x2 = endPoint.x - HEAD_LENGTH * Math.cos(angle + HEAD_ANGLE);
  const y2 = endPoint.y - HEAD_LENGTH * Math.sin(angle + HEAD_ANGLE);

  // Create the two lines for the arrowhead
  const arrowLine1 = new fabric.Line([endPoint.x, endPoint.y, x1, y1], {
      stroke: 'black',
      strokeWidth: 2,
      selectable: true, 
  });
  const arrowLine2 = new fabric.Line([endPoint.x, endPoint.y, x2, y2], {
      stroke: 'black',
      strokeWidth: 2,
      selectable: true,
  });

  // Group the line and arrowhead lines together
  const arrowLine = new fabric.Group([line, arrowLine1, arrowLine2], {
      selectable: true, // Make the whole arrow line selectable
  });

  return arrowLine;
}




