
import { SelectedMode } from './../types/types';

interface navButtonTypes{
    name:SelectedMode,
    icon:string
}

export const navButtons:navButtonTypes[] = [
    // {
    //     name:"hand",
    //     icon:'/assets/icons/hand.svg'
    // },
    {
        name:"cursor",
        icon:'/assets/icons/cursor.svg'
    }, {
        name:"rect",
        icon:'/assets/icons/square.svg'
    }, {
        name:"triangle",
        icon:'/assets/icons/triangle.svg'
    }, {
        name:"circle",
        icon:'/assets/icons/circle.svg'
    },
     {
        name:"line",
        icon:'/assets/icons/line.svg'
    }, {
        name:"freedraw",
        icon:'/assets/icons/pencil.svg'
    }, {
        name:"text",
        icon:'/assets/icons/text.svg'
    }, {
        name:"image",
        icon:'/assets/icons/image.svg'
    },
    {
        name:"delete",
        icon:'/assets/icons/trash.svg'
    },
    
    
]

export const COLORS = [
    "#E57373",
    "#9575CD",
    "#4FC3F7",
    "#81C784",
    "#FFF176",
    "#FF8A65",
    "#F06292",
    "#7986CB",
  ];


export const StrokeColors = [
    "#000000",
    "#e03131",
    "#2f9e44",
    "#1971c2",
    "#f08c00",
]

export const FillColors=[
    "#ffc9c9",
    "#b2f2bb",
    "#a5d8ff",
    "#ffec99"
]

export const TextColors= [
    "#000",
    "#ffc9c9",
    "#b2f2bb",
    "#a5d8ff",
    "#ffec99"
]

export const LayerButtons = [
{
    id:1,
    name:"Bottom",
    icon:require('@/public/assets/icons/LayerBottom').default,
    title:"To Bottom",
},
{
    id:2,
    name:"Down",
    icon:require('@/public/assets/icons/LayerDown').default,
    title:"Bring Down"

},
{
    id:3,
    name:"Top",
    icon:require('@/public/assets/icons/LayerTop').default,
    title:"To Top"

},
{
    id:4,
    name:"Up",
    icon:require('@/public/assets/icons/LayerUp').default,
    title:"Bring Up"

},
]

export const FontSizeData =[
    {
        id:'1',
        name:"small",
        text:"S",
        value:16,
    },
    {
        id:'2',
        name:"medium",
        text:"M",
        value:24,
    },
    {
        id:'3',
        name:"large",
        text:"L",
        value:34,
    },
    {
        id:'4',
        name:"extra large",
        text:"XL",
        value:54,
    },
]

export const FontFamilyData = [
    {
        id:"1",
        value:"Comic Sans MS",
        icon:require('@/public/assets/icons/PenIcon').default,
        toolTip:"Comic Sans MS",
    },
    {
        id:"2",
        value:"Helvetica",
        icon:require('@/public/assets/icons/AIcon').default,
        toolTip:"Helvetica",

    },
    {
        id:"3",
        value:"Monospace",
        icon:require('@/public/assets/icons/CodeIcon').default,
        toolTip:"Monospace",

    }
]