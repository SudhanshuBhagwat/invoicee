"use client";

import { cn } from "@/lib/utils";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useElements } from "../elements-context";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "../form-element";
import { v4 } from "uuid";

export default function Designer() {
  const { elements, addElement } = useElements();
  const { isOver, setNodeRef } = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      const isDroppingOverDesignerDropArea =
        over.data?.current?.isDesignerDropArea;

      const droppingSidebarBtnOverDesignerDropArea =
        isDesignerBtnElement && isDroppingOverDesignerDropArea;

      console.log(event);
      if (droppingSidebarBtnOverDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(v4());

        addElement(newElement);
        return;
      }
    },
  });

  return (
    <div
      className={cn(
        "w-full h-60 rounded-lg border-2 border-dashed flex justify-start flex-col ",
        isOver && "border-solid border-blue-400"
      )}
      ref={setNodeRef}
    >
      {!isOver && elements.length === 0 && (
        <p className="text-3xl text-muted-foreground font-bold flex items-center justify-center h-full">
          Drop here
        </p>
      )}

      {elements.map((element: FormElementInstance) => {
        const DesignerComponent = FormElements[element.type].designerComponent;
        return (
          <div key={element.id}>
            <DesignerComponent elementInstance={element} />
          </div>
        );
      })}
    </div>
  );
}
