"use client";

import { DndContext } from "@dnd-kit/core";
import Designer from "./designer";
import { createSnapModifier } from "@dnd-kit/modifiers";
import SidebarBtnElement from "./sidebar-element";
import { FormElements } from "../form-element";
import DragOverlayWrapper from "./drag-overlay";
import { Separator } from "@/components/ui/separator";

export default function PreviewCreator() {
  return (
    <DndContext modifiers={[createSnapModifier(10)]}>
      <div className="mt-6 flex flex-col grow">
        <h3 className="text-xl font-bold">Template Creator</h3>
        <div className="mt-6 flex space-x-4">
          <div className="flex flex-col min-w-60">
            <p className="text-lg font-semibold">Items</p>
            <SidebarBtnElement formElement={FormElements.Label} />
          </div>
          <Separator orientation="vertical" />
          <div className="w-full">
            <p className="text-lg font-semibold">Preview</p>
            <Designer />
          </div>
        </div>
      </div>
      <DragOverlayWrapper />
    </DndContext>
  );
}
