import type { Node } from "reactflow";
import type { AddCookingStepNodeFormFields } from "../../forms/AddCookingStepNodeForm/AddCookingStepNodeForm.types";
import type { CookingStepData } from "../../../../domain/types/graph-node.types";

export type EditCookingStepNodeDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  node?: Node<CookingStepData>;
  onEdit: (id: string, values: AddCookingStepNodeFormFields) => void;
};
