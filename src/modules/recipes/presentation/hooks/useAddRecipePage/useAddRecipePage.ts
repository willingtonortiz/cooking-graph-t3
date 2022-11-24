import { useCallback, useMemo, useState } from "react";
import type { Connection, Edge, Node } from "reactflow";
import { addEdge, updateEdge, useEdgesState, useNodesState } from "reactflow";
import { v4 as uuidv4 } from "@lukeed/uuid";
import { useDisclosure } from "@chakra-ui/react";
import toast from "react-hot-toast";

import type { AddCookingStepNodeFormFields } from "../../components/forms/AddCookingStepNodeForm/AddCookingStepNodeForm.types";
import type {
  NodeType,
  EditableNodeType,
} from "../../../domain/types/node-type.types";
import type { CookingStepData } from "../../../domain/types/graph-node.types";
import { useAddRecipe } from "../useAddRecipe/useAddRecipe";
import { editableToLiveNodeType } from "../../../domain/types/node-type.types";

const removeNodeFromList = (nodes: Node[], id: string) => {
  return nodes.filter((node) => node.id !== id);
};

const removeNodeFromEdges = (edges: Edge[], id: string) => {
  return edges.filter((edge) => edge.source !== id && edge.target !== id);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildNewFlowNode = (type: NodeType, data: any): Node<CookingStepData> => {
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

const removeEdgeFromList = (edges: Edge[], id: string) => {
  return edges.filter((edge) => edge.id !== id);
};

const editCookingStepNodeById = (
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

const reactFlowNodeToDbNode = ({
  id,
  position,
  data,
}: Node<CookingStepData>) => {
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

const reactFlowEdgeToDbEdge = ({
  id,
  source,
  target,
  animated = true,
}: Edge) => {
  return {
    id,
    sourceId: source,
    targetId: target,
    animated,
  };
};

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
      nodes: nodes.map(reactFlowNodeToDbNode),
      edges: edges.map(reactFlowEdgeToDbEdge),
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
