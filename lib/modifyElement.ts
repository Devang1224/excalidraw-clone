export const modifyShape = ({
  selectedShape,
  canvas,
  property,
  value,
  syncShapeInStorage,
}: any) => {

  const selectedElement = canvas?.getActiveObject();

  if (!selectedElement || selectedElement?.type === "activeSelection") return;

  if (selectedElement?.type == "i-text" && property=="textColor") {
    selectedElement?.set({
      fill: value
    })
  } else{
    if(selectedElement[property]===value)return;
    selectedElement.set(property as keyof object, value);
  }

  syncShapeInStorage(selectedElement);
};
