
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
  strokeColor:string,
  fillColor:string,
  fillState:boolean,
  strokeType:SelectedStroke,
  layerType:SelectedLayer,
  fontFamily:FontFamilyType,
  fontSize:number,
}
