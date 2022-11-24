import { useCallback, useMemo, useState } from "react";
import type { Connection, Edge, Node } from "reactflow";
import { addEdge, updateEdge, useEdgesState, useNodesState } from "reactflow";
import { useDisclosure } from "@chakra-ui/react";
import toast from "react-hot-toast";
import type { AddCookingStepNodeFormFields } from "../../components/forms/AddCookingStepNodeForm/AddCookingStepNodeForm.types";
import type { CookingStepData } from "../../../domain/types/graph-node.types";
import { useAddRecipe } from "../useAddRecipe/useAddRecipe";
import {
  parseRFEdgeToDBEdge,
  parseRFNodeToDBNode,
} from "../useGetRecipe/useGetRecipe.utils";
import {
  buildNewFlowNode,
  editCookingStepNodeById,
  removeEdgeFromList,
  removeNodeFromEdges,
  removeNodeFromList,
} from "./useAddRecipePage.utils";

export const useAddRecipePage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<CookingStepData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<unknown>([]);
  const [editingNode, setEditingNode] = useState<
    Node<CookingStepData> | undefined
  >();
  const addCookingStepDrawer = useDisclosure();
  const editCookingStepDrawer = useDisclosure();
  const addRecipeMutation = useAddRecipe({
    onSuccess: () => {
      toast.success("Receta creada con éxito");
    },
  });

  const onConnect = useCallback(
    (params: Connection) => {
      // ? Support for other edge types
      const paramsWithType = { ...params, type: "DELETABLE_EDGE" };

      setEdges((eds) => addEdge(paramsWithType, eds));
    },
    [setEdges]
  );

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge<unknown>, newConnection: Connection) =>
      setEdges((eds) => updateEdge(oldEdge, newConnection, eds)),
    [setEdges]
  );

  const addCookingStepNode = (values: AddCookingStepNodeFormFields) => {
    setNodes((nodes) => [
      ...nodes,
      buildNewFlowNode("EDITABLE_COOKING_STEP", values),
    ]);
    addCookingStepDrawer.onClose();
  };

  const editCookingStepNode = (
    id: string,
    values: AddCookingStepNodeFormFields
  ) => {
    setNodes((nodes) => editCookingStepNodeById(nodes, id, values));
    editCookingStepDrawer.onClose();
  };

  const nodesWithMethods = useMemo(() => {
    const openEditCookingStepNodeDrawer = (id: string) => {
      setEditingNode(nodes.find((node) => node.id === id));
      editCookingStepDrawer.onOpen();
    };

    const removeNode = (id: string) => {
      setNodes((nds) => removeNodeFromList(nds, id));
      setEdges((eds) => removeNodeFromEdges(eds, id));
    };

    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onEdit: openEditCookingStepNodeDrawer,
        onRemove: removeNode,
      },
    }));
  }, [nodes, setEdges, setNodes, editCookingStepDrawer]);
  const edgesWithMethods = useMemo(() => {
    const removeEdge = (id: string) => {
      setEdges((eds) => removeEdgeFromList(eds, id));
    };

    return edges.map((edge) => ({
      ...edge,
      data: { onRemove: removeEdge },
    }));
  }, [edges, setEdges]);

  const addRecipe = () => {
    if (nodes.length === 0) {
      toast.error("Debe añadir al menos un paso");
      return;
    }
    addRecipeMutation.mutate({
      name: "NUEVA_RECETA",
      nodes: nodes.map(parseRFNodeToDBNode),
      edges: edges.map(parseRFEdgeToDBEdge),
    });
  };

  return {
    nodes: nodesWithMethods,
    edges: edgesWithMethods,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onEdgeUpdate,
    addCookingStepNode,
    editCookingStepNode,
    editingNode,
    addCookingStepDrawer,
    editCookingStepDrawer,
    addRecipe,
  };
};
