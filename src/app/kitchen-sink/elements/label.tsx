import { ElementsType, FormElement } from "../form-element";

const type: ElementsType = "Label";
const extraAttributes = {};

export const LabelElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    label: "Text Field",
  },
  designerComponent: () => <div>Label Designer</div>,
  sidebarComponent: () => <div>Label Sidebar</div>,
};
