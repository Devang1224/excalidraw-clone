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