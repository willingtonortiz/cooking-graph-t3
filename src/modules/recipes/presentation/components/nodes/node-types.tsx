import type { NodeTypes } from "reactflow";
import { LiveCookingStepNode } from "./LiveCookingStepNode/LiveCookingStepNode";
import { EditableCookingStepNode } from "./EditableCookingStepNode/EditableCookingStepNode";
import { LiveIngredientNode } from "./LiveIngredientNode/LiveIngredientNode";
import { EditableIngredientNode } from "./EditableIngredientNode/EditableIngredientNode";

export const nodeTypes: NodeTypes = {
  LIVE_COOKING_STEP: LiveCookingStepNode,
  EDITABLE_COOKING_STEP: EditableCookingStepNode,
  LIVE_INGREDIENT: LiveIngredientNode,
  EDITABLE_INGREDIENT: EditableIngredientNode,
};
