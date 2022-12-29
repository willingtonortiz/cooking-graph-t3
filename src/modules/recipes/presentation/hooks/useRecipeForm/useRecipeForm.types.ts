export type RecipeFormFields = {
  name: string;
  description: string;
};

export const getRecipeFormDefaultValues = (): RecipeFormFields => ({
  name: "",
  description: "",
});
