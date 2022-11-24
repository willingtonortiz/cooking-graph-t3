import type { Node as RFNode, Edge as RFEdge } from "reactflow";

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
