import type { ReactNode } from "react";
import type { CookingStepData } from "../../../../domain/types/graph-node.types";

export type CookingStepNodeProps = {
  data: CookingStepData;
  children: ReactNode;
};
