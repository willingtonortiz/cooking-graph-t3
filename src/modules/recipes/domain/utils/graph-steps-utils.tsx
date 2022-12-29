/* eslint-disable @typescript-eslint/no-non-null-assertion */
import produce from "immer";
import toast from "react-hot-toast";
import type { Edge, Node } from "reactflow";
import type { LiveCookingStepNodeProps } from "../../presentation/components/nodes/LiveCookingStepNode/LiveCookingStepNode.types";
import { RequiredDependenciesAlert } from "../../presentation/components/atoms/RequiredDependenciesAlert/RequiredDependenciesAlert";

export const canStepStart = (
  nodes: Node<LiveCookingStepNodeProps>[],
  edges: Edge<unknown>[],
  nodeId: string
) => {
  const dependenciesIds = edges
    .filter((edge) => edge.target === nodeId)
    .map((edge) => edge.source);

  const dependencies = nodes.filter(
    (node) =>
      dependenciesIds.includes(node.id) &&
      ["NOT_STARTED", "IN_PROGRESS"].includes(node.data.status)
  );

  if (dependencies.length === 0) {
    toast.success("Paso iniciado", { position: "top-right" });
    return true;
  }

  const nodeTitleList = dependencies.map((node) => {
    return node?.data.title;
  });

  toast.error(<RequiredDependenciesAlert dependencies={nodeTitleList} />, {
    icon: null,
    duration: 5000,
  });
  return false;
};

export const startStep = (
  nodes: Node<LiveCookingStepNodeProps>[],
  nodeId: string
) =>
  produce(nodes, (draft) => {
    const nodeIndex = draft.findIndex((x) => x.id === nodeId);
    draft[nodeIndex]!.data.status = "IN_PROGRESS";
  });

export const completeStep = (
  nodes: Node<LiveCookingStepNodeProps>[],
  nodeId: string
) =>
  produce(nodes, (draft) => {
    const nodeIndex = draft.findIndex((x) => x.id === nodeId);
    draft[nodeIndex]!.data.status = "COMPLETED";
  });
