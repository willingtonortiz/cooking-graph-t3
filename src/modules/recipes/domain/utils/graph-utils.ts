import type { Edge, Node } from "reactflow";
import type { GraphNode } from "../types/graph-node.types";
import type { LiveCookingStepNodeProps } from "../../presentation/components/nodes/LiveCookingStepNode/LiveCookingStepNode.types";
import type { LiveIngredientNodeProps } from "../../presentation/components/nodes/LiveIngredientNode/LiveIngredientNode.types";
import type { GraphEdge } from "../types/graph-edge.types";

export const buildReactFlowNodesFromGraphNodes = (
  nodes: GraphNode[]
): Node<LiveCookingStepNodeProps>[] => {
  return nodes.map((node) => buildReactFlowNodeFromGraphNode(node));
};

export const buildReactFlowNodeFromGraphNode = ({
  id,
  xPos,
  yPos,
  data,
}: GraphNode): Node<LiveCookingStepNodeProps | LiveIngredientNodeProps> => {
  return {
    id,
    position: { x: xPos, y: yPos },
    type: data.type,
    data,
  };
};

export const buildReactFlowEdgeFromGraphEdges = (
  edges: GraphEdge[]
): Edge<unknown>[] => {
  return edges.map((edge) => ({
    ...edge,
    style: { stroke: getRandomHexadecimalColor(), strokeWidth: 3 },
  }));
};

const getRandomHexadecimalColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
