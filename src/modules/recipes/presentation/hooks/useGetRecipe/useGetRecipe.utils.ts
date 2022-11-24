import type { Node as RFNode, Edge as RFEdge } from "reactflow";
import type { CookingStepData } from "../../../domain/types/graph-node.types";
import type { EditableNodeType } from "../../../domain/types/node-type.types";
import { editableToLiveNodeType } from "../../../domain/types/node-type.types";

type DbNode = {
  id: string;
  xPos: number;
  yPos: number;
  data: unknown;
};

type DbEdge = {
  id: string;
  sourceId: string;
  targetId: string;
  animated: boolean;
};

export const parseDbNodeToRFNode = ({
  id,
  xPos,
  yPos,
  data,
}: DbNode): RFNode => ({
  id,
  position: { x: xPos, y: yPos },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: (data as any).type,
  data,
});

export const parseDbEdgeToRFEdge = ({
  id,
  sourceId,
  targetId,
  animated,
}: DbEdge): RFEdge => ({
  id,
  source: sourceId,
  target: targetId,
  animated,
  type: "smoothstep",
});

export const parseRFNodeToDBNode = ({
  id,
  position,
  data,
}: RFNode<CookingStepData>) => {
  return {
    id,
    xPos: position.x,
    yPos: position.y,
    data: {
      ...data,
      type: editableToLiveNodeType[data.type as EditableNodeType],
    },
  };
};

export const parseRFEdgeToDBEdge = ({
  id,
  source,
  target,
  animated = true,
}: RFEdge) => {
  return {
    id,
    sourceId: source,
    targetId: target,
    animated,
  };
};
