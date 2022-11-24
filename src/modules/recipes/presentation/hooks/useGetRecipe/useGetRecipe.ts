import { trpc } from "../../../../../utils/trpc";
import { isNullish } from "../../../../shared/infrastructure/utils/type-validations";
import { parseDbEdgeToRFEdge, parseDbNodeToRFNode } from "./useGetRecipe.utils";

type UseGetRecipeProps = {
  recipeId: string | undefined;
};

export const useGetRecipe = ({ recipeId }: UseGetRecipeProps) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return trpc.recipes.getById.useQuery(recipeId!, {
    select: ({ nodes, edges, ...data }) => ({
      ...data,
      nodes: nodes.map(parseDbNodeToRFNode),
      edges: edges.map(parseDbEdgeToRFEdge),
    }),
    retry: false,
    enabled: !isNullish(recipeId),
    refetchOnWindowFocus: false,
  });
};
