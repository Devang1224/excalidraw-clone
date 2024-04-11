
import { SelectedMode } from './../types/types';

interface navButtonTypes{
    name:SelectedMode,
    icon:string
}

export const navButtons:navButtonTypes[] = [
    {
        name:"hand",
        icon:'/assets/icons/hand.svg'
    },
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

export const LayerButtons = [
{
    id:1,
    name:"Bottom",
    icon:require('@/public/assets/icons/LayerBottom').default,
    title:"Layer Bottom",
},
{
    id:2,
    name:"Down",
    icon:require('@/public/assets/icons/LayerDown').default,
    title:"Layer Down"

},
{
    id:3,
    name:"Up",
    icon:require('@/public/assets/icons/LayerUp').default,
    title:"Layer Up"

},
{
    id:4,
    name:"Top",
    icon:require('@/public/assets/icons/LayerTop').default,
    title:"Layer Top"

},

]