
export interface CustomFabricObject<T extends fabric.Object>
  extends fabric.Object {
  objectId?: string;
}

export interface LineObject {
  line: fabric.Line | null,
  drawingLine: boolean;
}

export type SelectedMode = "hand" | "cursor" | "rect" | "circle" | 
                           "triangle" | "line" | "freedraw" |
                            "text" | "image" | "delete";

export type SelectedLayer = null | "Up" | 'Down' | "Bottom" | "Top";

export type SelectedStroke = "semiBold" | "bold" | "extraBold";

export type FontFamilyType = "Helvetica" | "Virgil" | "Cascadia"



export interface EditOptions {
  stroke:string,
  fill:string,
  textColor:string,
  strokeWidth:number,
  layerType:SelectedLayer,
  fontFamily:FontFamilyType,
  fontSize:number,
}

export type RenderCanvas = {
  fabricRef: React.MutableRefObject<fabric.Canvas | null>;
  canvasObjects: any;
  selectedShape: any;
};

export type HandleOnMouseDown = {
  options:any,
  canvas:any,
  fabricRef:any,
  isDrawing:React.MutableRefObject<boolean>,
  selectedMode:React.MutableRefObject<SelectedMode>, 
  shapeRef:React.MutableRefObject<fabric.Object | null>,
  selectedShape:React.MutableRefObject<fabric.Object | null>,
  setEditPannelState:(state:boolean)=>void,
  setSelectedModeState:(mode:SelectedMode)=>void,
  deleteShapeFromStorage:(id: string) => void,
  syncShapeInStorage: (shape: fabric.Object) => void;
}

export type HandleOnMouseMove={
  isDrawing:React.MutableRefObject<boolean>,
  selectedMode:React.MutableRefObject<SelectedMode>,
  options:any,
  canvas:any,
  shapeRef:any,
  setSelectedModeState:(mode:SelectedMode)=>void,
  syncShapeInStorage: (shape: fabric.Object) => void;

}

export type HandleOnMouseUp={
  isDrawing:React.MutableRefObject<boolean>,
  selectedMode:React.MutableRefObject<SelectedMode>,
  options:any,
  canvas:any,
  shapeRef:React.MutableRefObject<fabric.Object | null>,
  setSelectedModeState:(mode:SelectedMode)=>void,
  syncShapeInStorage: (shape: fabric.Object) => void;
}