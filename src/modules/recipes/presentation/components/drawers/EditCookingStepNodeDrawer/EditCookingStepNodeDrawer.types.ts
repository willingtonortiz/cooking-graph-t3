import type { AddCookingStepNodeFormFields } from "../../forms/AddCookingStepNodeForm/AddCookingStepNodeForm.types";

export type EditCookingStepNodeDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  node?: Node<CookingStepData>;
  onEdit: (id: string, values: AddCookingStepNodeFormFields) => void;
};
