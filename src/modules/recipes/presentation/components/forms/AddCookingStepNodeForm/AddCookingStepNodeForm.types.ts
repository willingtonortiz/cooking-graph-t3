export type AddCookingStepNodeFormFields = {
  title: string;
  description: string;
  imageUrl?: string;
  time?: string;
  quantity?: string;
};

export const getAddCookingStepNodeFormDefaultValues =
  (): AddCookingStepNodeFormFields => ({
    title: "",
    description: "",
    imageUrl: "",
    time: "",
    quantity: "",
  });

export type AddCookingStepNodeFormProps = {
  type: "ADD" | "EDIT";
  initialValues?: Partial<AddCookingStepNodeFormFields>;
  onSubmit: (values: AddCookingStepNodeFormFields) => void;
};
