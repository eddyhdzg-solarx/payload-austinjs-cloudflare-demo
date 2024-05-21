import React from "react";
import { blocks } from "@/blocks";

interface RenderBlock {
  blockType: string;
}

export const RenderBlock: React.FC<RenderBlock> = (props) => {
  // @ts-ignore
  const Block = blocks[props.blockType];

  if (Block) {
    return <Block {...props} />;
  }

  return null;
};
