import { trpc } from "../../../../../utils/trpc";
import { isNullOrUndefined } from "../../../../shared/infrastructure/utils/type-validations";

type UseGetRecipeProps = {
  recipeId: string | undefined;
};

export const useGetRecipe = ({ recipeId }: UseGetRecipeProps) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return trpc.recipes.getById.useQuery(recipeId!, {
    retry: false,
    enabled: !isNullOrUndefined(recipeId),
    refetchOnWindowFocus: false,
  });
};
