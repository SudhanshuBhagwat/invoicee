"use client";

import { cn } from "@/lib/utils";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useElements } from "../elements-context";

export default function Droppable() {
  const { isOver, setNodeRef } = useDroppable({
    id: "drop-area",
  });
  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const data = active.data.current;

      console.log("DROPPED COMPONENT: ", data);
    },
  });
  const data = useElements();

  return (
    <>
      {!data?.elements ? (
        <div
          className={cn(
            "w-full h-60 rounded-lg border-2 border-dashed flex items-center justify-center",
            isOver && "border-solid border-blue-400"
          )}
          ref={setNodeRef}
        >
          Drop Here
        </div>
      ) : (
        <div>
          {data?.elements.map((element) => (
            <div>{element.id}</div>
          ))}
        </div>
      )}
    </>
  );
}
