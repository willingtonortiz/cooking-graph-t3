import type { EdgeProps } from "reactflow";

export type DeletableEdgeProps = EdgeProps<{
  onRemove: (id: string) => void;
}>;
