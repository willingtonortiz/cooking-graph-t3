import type { UseFormReturn } from "react-hook-form";
import type { RecipeFormFields } from "../../../hooks/useRecipeForm/useRecipeForm.types";

export type RecipeFormProps = {
  form: UseFormReturn<RecipeFormFields>;
};
