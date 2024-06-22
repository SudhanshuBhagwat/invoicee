import { LabelElement } from "./elements/label";

export type ElementsType = "Label";

export type FormElement = {
  type: ElementsType;
  sidebarComponent: React.FC;
  designerComponent: React.FC;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  Label: LabelElement,
};
