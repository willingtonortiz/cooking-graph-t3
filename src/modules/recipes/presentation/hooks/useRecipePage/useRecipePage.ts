import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import type { Edge, Node } from "reactflow";
import type { LiveCookingStepNodeProps } from "../../components/nodes/LiveCookingStepNode/LiveCookingStepNode.types";
import type { LiveIngredientNodeProps } from "../../components/nodes/LiveIngredientNode/LiveIngredientNode.types";
import { useGetRecipe } from "../useGetRecipe/useGetRecipe";
import {
  canStepStart,
  completeStep,
  startStep,
} from "../../../domain/utils/graph-steps-utils";
import { isNullish } from "../../../../shared/infrastructure/utils/type-validations";

type NodeProps = LiveCookingStepNodeProps | LiveIngredientNodeProps;

type UseRecipePageProps = {
  recipeId: string | undefined;
};

export const useRecipePage = ({ recipeId }: UseRecipePageProps) => {
  const { isLoading, data, isError } = useGetRecipe({ recipeId });
  const [nodes, setNodes] = useState<Node<NodeProps>[]>([]);
  const [edges, setEdges] = useState<Edge<unknown>[]>([]);

  const processedNodes = useMemo(() => {
    const onCompleteHandler = (nodeId: string) => {
      setNodes(completeStep(nodes, nodeId));
      toast.success("Paso completado");
    };

    const onStartHandler = (nodeId: string) => {
      const canStart = canStepStart(nodes, edges, nodeId);

      if (canStart) {
        const result = startStep(nodes, nodeId);
        setNodes(result);
      }
    };

    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onStart: onStartHandler,
        onComplete: onCompleteHandler,
      },
    }));
  }, [nodes, edges]);
  const processedEdges = useMemo(() => edges, [edges]);

  useEffect(() => {
    if (isError) {
      toast.error("Error al cargar la receta");
    }
  }, [isError]);

  useEffect(() => {
    if (!isNullish(data)) {
      const { nodes, edges } = data;
      setNodes(nodes);
      setEdges(edges);
    }
  }, [data]);

  return {
    isLoading,
    nodes: processedNodes,
    edges: processedEdges,
  };
};
