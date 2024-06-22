import { randomUUID } from "crypto";
import { ReactNode, createContext, useContext, useState } from "react";

interface ElementsContextType {
  elements: any[];
  addElement: (data: any) => void;
}

const ElementsContext = createContext<ElementsContextType | null>(null);

export default function ElementsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<any[]>([]);

  function addElement(data: any) {
    setElements((currentElements) => [
      ...currentElements,
      {
        id: randomUUID(),
        data,
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
  return useContext(ElementsContext);
}
