import { trpc } from "../../../../../utils/trpc";
import { isNullish } from "../../../../shared/infrastructure/utils/type-validations";

type UseGetRecipeProps = {
  recipeId: string | undefined;
};

export const useGetRecipe = ({ recipeId }: UseGetRecipeProps) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return trpc.recipes.getById.useQuery(recipeId!, {
    retry: false,
    enabled: !isNullish(recipeId),
    refetchOnWindowFocus: false,
  });
};
