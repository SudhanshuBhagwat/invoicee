"use client";

import { DndContext } from "@dnd-kit/core";
import Draggable from "./draggable";
import Droppable from "./droppable";
import { createSnapModifier } from "@dnd-kit/modifiers";

export default function PreviewCreator() {
  return (
    <DndContext modifiers={[createSnapModifier(10)]}>
      <div className="mt-6 flex flex-col grow">
        <h3 className="text-xl font-bold">Form Creator</h3>
        <div className="grid grid-cols-3 gap-20 mt-6">
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Items</p>
            <Draggable>Drag me</Draggable>
          </div>
          <div className="col-span-2">
            <p className="text-lg font-semibold">Preview</p>
            <Droppable />
          </div>
        </div>
      </div>
    </DndContext>
  );
}
