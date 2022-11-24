import type { NodeType } from "./node-type.types";
import type { NodeStatus } from "./node-status.types";

export type GraphNode = {
  id: string;
  xPos: number;
  yPos: number;
  data: CookingStepData | IngredientData;
};

export type CookingStepData = {
  id: string;
  type: NodeType;
  status: NodeStatus;
  title: string;
  description: string;
  imageUrl?: string;
  time?: string;
  quantity?: string;
};

export type IngredientData = {
  id: string;
  type: NodeType;
  status: NodeStatus;
  title: string;
  description: string;
  imageUrl?: string;
  quantity: string;
};
