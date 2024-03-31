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

export const createDiamond = (pointer:PointerEvent)=>{
    const rect = new fabric.Rect({
        left:pointer.x,
        top:pointer.y,
        width: 100,
        height: 100,
        fill:"#97E7E1",
        rx:5,
        ry:5,
        angle:45,
        objectId:uuidv4()
    }as fabric.IRectOptions & { objectId?: string }
  )

  return rect;
}


// export const createTriangle  = (pointer:PointerEvent)=>{
//     const triangle = new fabric.Triangle({
//      left:pointer.x,
//      top:pointer.y,
//      width:100,
//      height:100,
//      fill:"#97E7E1",
//      rx:5,
//      ry:5,
//      objectId:uuidv4(),
//     } as fabric.ITriangleOptions 
//   )

//   return triangle;
// }

export const createCircle = (pointer: PointerEvent) => {
    return new fabric.Circle({
      left: pointer.x,
      top: pointer.y,
      radius: 100,
      fill: "#aabbcc",
      objectId: uuidv4(),
    } as any);

  };

 

export const createSpecificShape = (selectedShape:React.MutableRefObject<string | null>,pointer:PointerEvent)=>{
    
    switch(selectedShape.current){
      case 'square':
         return createRectangle(pointer);
      case 'diamond':
        return createDiamond(pointer);
      case 'circle':
        return createCircle(pointer);
    //   case 'arrowright':
    //     // return createArrowRight(pointer);
    //   case 'text':
    //     // return createText(pointer);
      default :
    return null;
}

}