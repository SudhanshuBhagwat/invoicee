"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { FormElementInstance } from "./form-element";

interface ElementsContextType {
  elements: FormElementInstance[];
  addElement: (data: FormElementInstance) => void;
}

const ElementsContext = createContext<ElementsContextType | null>(null);

export default function ElementsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);

  function addElement(data: FormElementInstance) {
    setElements((currentElements) => [
      ...currentElements,
      {
        ...data,
      },
    ]);
  }

  return (
    <ElementsContext.Provider value={{ elements, addElement }}>
      {children}
    </ElementsContext.Provider>
  );
}

export function useElements() {
  const context = useContext(ElementsContext);

  if (!context) {
    throw new Error("useElements must be used within a ElementsContext");
  }

  return context;
}
