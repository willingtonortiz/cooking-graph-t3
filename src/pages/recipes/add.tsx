import { type NextPage } from "next";
import { Background, Controls, MarkerType, ReactFlow } from "reactflow";
import { Box, Button, VStack } from "@chakra-ui/react";
import { AddCookingStepNodeDrawer } from "../../modules/recipes/presentation/components/drawers/AddCookingStepNodeDrawer/AddCookingStepNodeDrawer";
import { EditCookingStepNodeDrawer } from "../../modules/recipes/presentation/components/drawers/EditCookingStepNodeDrawer/EditCookingStepNodeDrawer";
import { useAddRecipePage } from "../../modules/recipes/presentation/hooks/useAddRecipePage/useAddRecipePage";
import { nodeTypes } from "../../modules/recipes/presentation/components/nodes/node-types";
import { edgeTypes } from "../../modules/recipes/presentation/components/nodes/edge-types";

const flowGrid: [number, number] = [25, 25];

const defaultEdgeOptions = {
  animated: true,
  markerEnd: { type: MarkerType.ArrowClosed },
  style: { strokeWidth: 3 },
  type: "smoothstep",
};

const AddRecipePage: NextPage = () => {
  const {
    nodes,
    edges,
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
  } = useAddRecipePage();

  return (
    <Box w={"full"} h={"full"} position={"relative"}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeUpdate={onEdgeUpdate}
        snapToGrid
        snapGrid={flowGrid}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
      >
        <Background />

        <Controls />
      </ReactFlow>

      <VStack position={"absolute"} right={10} bottom={10} zIndex={10}>
        <Button onClick={addCookingStepDrawer.onOpen}>Agregar paso</Button>

        <Button onClick={addRecipe}>Guardar receta</Button>
      </VStack>

      <AddCookingStepNodeDrawer
        isOpen={addCookingStepDrawer.isOpen}
        onClose={addCookingStepDrawer.onClose}
        onAdd={addCookingStepNode}
      />

      <EditCookingStepNodeDrawer
        isOpen={editCookingStepDrawer.isOpen}
        onClose={editCookingStepDrawer.onClose}
        node={editingNode}
        onEdit={editCookingStepNode}
      />
    </Box>
  );
};

export default AddRecipePage;
