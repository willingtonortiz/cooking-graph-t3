export type LiveNodeType = "LIVE_COOKING_STEP" | "LIVE_INGREDIENT";
export type EditableNodeType = "EDITABLE_COOKING_STEP" | "EDITABLE_INGREDIENT";

export type NodeType = LiveNodeType | EditableNodeType;

export const editableToLiveNodeType: Record<EditableNodeType, LiveNodeType> = {
  EDITABLE_COOKING_STEP: "LIVE_COOKING_STEP",
  EDITABLE_INGREDIENT: "LIVE_INGREDIENT",
};
