
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


//  thin:1, semi-bold:2, extra-bold: 4
type StrokeWidth = 1 | 2 | 4;


export type FontFamilyType = "Helvetica" |"Comic Sans MS" | "Monospace"



export interface EditOptions {
  stroke:string,
  fill:string,
  textColor:string,
  strokeWidth:StrokeWidth,
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
  setEditOptions: React.Dispatch<React.SetStateAction<EditOptions>>;
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

export type NavBarProps={
  selectedMode:React.MutableRefObject<SelectedMode>,
  setSelectedModeState:(mode:SelectedMode)=>void,
  selectedModeState:SelectedMode,
  fabricRef:React.MutableRefObject<fabric.Canvas | null>,
  shapeRef:React.MutableRefObject<fabric.Object | null>,
  syncShapeInStorage: (shape: fabric.Object) => void;
  setEditPannelState:React.Dispatch<React.SetStateAction<string | boolean>>;
}


export type NavButtonsProps={
  item:{
    icon:string,
    name:string
  },
  selectedMode: React.MutableRefObject<SelectedMode>,
  setSelectedModeState:(mode:SelectedMode)=>void
  handleImageUpload:(e:React.ChangeEvent<HTMLInputElement>)=>void,
  selectedModeState:SelectedMode,
  setEditPannelState:React.Dispatch<React.SetStateAction<string | boolean>>;
}

export type EditPannelProps={
  editPannelState: string | boolean;
  selectedModeState: SelectedMode;
  selectedShape: React.MutableRefObject<fabric.Object | null>;
  canvas: fabric.Canvas;
  syncShapeInStorage: (shape: fabric.Object) => void;
  editOptions: EditOptions;
  setEditOptions: any;
}