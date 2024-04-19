"use client";

import { ReactNode } from "react";
import { RoomProvider } from "../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveList, LiveMap } from "@liveblocks/client";
import Loader from "@/components/ui/Loader";

export function Room({ children }: { children: ReactNode }) {
  return (
    <RoomProvider
     id="my-room"
     initialPresence={{cursor:null,cursorColor:null}}
     initialStorage={{
      canvasObjects:new LiveList()
    }}
    >
      <ClientSideSuspense fallback={<Loader/>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}