'use client;'

import { useMyPresence, useOthers } from '@/liveblocks.config';
import React, { useCallback } from 'react'
import LiveCursors from './cursor/LiveCursors';

type Props = {
 canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}


const Canvas = ({canvasRef}:Props) => {

  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
  const others = useOthers();

  const handlePointerMove = useCallback((e:React.PointerEvent)=>{
    const cursor = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
    updateMyPresence({ cursor });
  },[]) 
  
   const handlePointerLeave=useCallback((e:React.PointerEvent)=>{
      updateMyPresence({ cursor: null });
   },[]);




  return (
    <div className='h-full w-full' id="canvas"
       onPointerMove={handlePointerMove}
       onPointerLeave={handlePointerLeave}
    >
        <canvas ref={canvasRef}/>
        <LiveCursors others={others}/>

    </div>
  )
}

export default React.memo(Canvas);