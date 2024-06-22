"use client";

import { useDraggable } from "@dnd-kit/core";
import { ReactNode } from "react";

export default function Draggable({ children }: { children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      className="border rounded-md h-20 bg-red-300"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
  );
}
