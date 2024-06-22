import { FormElement } from "../form-element";

export const LabelElement: FormElement = {
  type: "Label",
  designerComponent: () => <div>Label Designer</div>,
  sidebarComponent: () => <div>Label Sidebar</div>,
};
