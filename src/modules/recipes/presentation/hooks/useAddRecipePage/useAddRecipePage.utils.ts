import type { Edge, Node } from "reactflow";
import { v4 as uuidv4 } from "@lukeed/uuid";
import type { NodeType } from "../../../domain/types/node-type.types";
import type { CookingStepData } from "../../../domain/types/graph-node.types";
import type { AddCookingStepNodeFormFields } from "../../components/forms/AddCookingStepNodeForm/AddCookingStepNodeForm.types";

export const removeNodeFromList = (nodes: Node[], id: string) => {
  return nodes.filter((node) => node.id !== id);
};

export const removeNodeFromEdges = (edges: Edge[], id: string) => {
  return edges.filter((edge) => edge.source !== id && edge.target !== id);
};

export const buildNewFlowNode = (
  type: NodeType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): Node<CookingStepData> => {
  const id = uuidv4();
  return {
    id,
    type,
    position: { x: 0, y: 0 },
    data: {
      ...data,
      id,
      type,
      status: "NOT_STARTED",
    },
  };
};

export const removeEdgeFromList = (edges: Edge[], id: string) => {
  return edges.filter((edge) => edge.id !== id);
};

export const editCookingStepNodeById = (
  nodes: Node[],
  id: string,
  data: AddCookingStepNodeFormFields
) => {
  return nodes.map((node) => {
    if (node.id === id) {
      return { ...node, data: { ...node.data, ...data } };
    }

    return node;
  });
};
