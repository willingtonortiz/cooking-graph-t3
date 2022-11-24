import type { CookingStepData } from "../../../../domain/types/graph-node.types";

export type LiveCookingStepNodeProps = CookingStepData & {
  onStart?: (id: string) => void;
  onComplete?: (id: string) => void;
};
