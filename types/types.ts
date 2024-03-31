export interface CustomFabricObject<T extends fabric.Object>
  extends fabric.Object {
  objectId?: string;
}