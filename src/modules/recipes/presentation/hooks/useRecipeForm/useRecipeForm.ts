import { useForm } from "react-hook-form";
import type { RecipeFormFields } from "./useRecipeForm.types";
import { getRecipeFormDefaultValues } from "./useRecipeForm.types";

export const useRecipeForm = () => {
  return useForm<RecipeFormFields>({
    defaultValues: getRecipeFormDefaultValues(),
    mode: "all",
  });
};
