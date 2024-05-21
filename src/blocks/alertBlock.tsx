import type { Block } from "payload/types";

export const alertBlock: Block = {
  slug: "alertBlock",
  interfaceName: "AlertBlockType",
  fields: [
    {
      name: "buttonText",
      label: "Button Text",
      type: "text",
      defaultValue: "Foo",
    },
    {
      name: "alertMessage",
      label: "Alert Message",
      type: "text",
      defaultValue: "Bar",
    },
  ],
};
