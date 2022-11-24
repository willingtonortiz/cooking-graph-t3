import type { IngredientData } from "../../../../domain/types/graph-node.types";

export type LiveIngredientNodeProps = IngredientData & {
  onStart?: (id: string) => void;
  onComplete?: (id: string) => void;
};
