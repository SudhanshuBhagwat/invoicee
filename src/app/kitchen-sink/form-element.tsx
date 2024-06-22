import { LabelElement } from "./elements/label";

export type ElementsType = "Label";

export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;
  designerBtnElement: {
    label: string;
  };

  sidebarComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

export const FormElements: FormElementsType = {
  Label: LabelElement,
};
