export const modifyShape = ({selectedShape,canvas,editOptions,syncShapeInStorage}:any)=>{

  const selectedElement = canvas?.getActiveObject();

    if(selectedShape){

        if(selectedElement?.type=="i-text"){
            selectedElement?.set({
              fontFamily: editOptions.fontFamily,
              fontSize:editOptions.fontSize,
              fill:editOptions.textColor
            })
          }
       else if(selectedElement?.type=="line"){
         selectedElement?.set({
            stroke:editOptions.stroke,
            strokeWidth:editOptions.strokeWidth,
         })
       }
       else if(selectedElement?.type=="image"){
        selectedElement?.set({
            stroke:editOptions.stroke,
         })
       }
       else{
        selectedElement?.set({
            stroke: editOptions.stroke,
            fill: editOptions.fill,
            strokeWidth: editOptions.strokeWidth, //  semi-bold:2, bold:4, extra-bold: 6
         })
       }
       syncShapeInStorage(selectedElement)
    }
}