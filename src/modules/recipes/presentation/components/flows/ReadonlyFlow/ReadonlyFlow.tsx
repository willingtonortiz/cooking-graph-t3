import type { Edge, Node, NodeTypes } from "reactflow";
import { Background, Controls, ReactFlow } from "reactflow";

type Props = {
  nodes: Node<unknown>[];
  edges: Edge<unknown>[];
  nodeTypes: NodeTypes;
};

export const ReadonlyFlow = ({ nodes, edges, nodeTypes }: Props) => {
  return (
    <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
      <Background />

      <Controls />
    </ReactFlow>
  );
};
