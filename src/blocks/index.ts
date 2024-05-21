import { AlertBlock, Buttons } from "@/components";

export type BlockKeys = keyof typeof blocks;

export const blocks = {
  alertBlock: AlertBlock,
  buttonsBlock: Buttons,
};
