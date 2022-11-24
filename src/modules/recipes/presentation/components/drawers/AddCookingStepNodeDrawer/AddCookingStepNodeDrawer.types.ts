import type { AddCookingStepNodeFormFields } from "../../forms/AddCookingStepNodeForm/AddCookingStepNodeForm.types";

export type AddCookingStepNodeDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (values: AddCookingStepNodeFormFields) => void;
};
