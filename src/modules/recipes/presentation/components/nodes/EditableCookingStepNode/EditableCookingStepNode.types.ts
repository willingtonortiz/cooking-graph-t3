import type { CookingStepData } from "../../../../domain/types/graph-node.types";

export type EditableCookingStepNodeProps = CookingStepData & {
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
};
