import { trpc } from "../../../../../utils/trpc";

export const useGetAllRecipes = () => {
  return trpc.recipes.getAllByUserId.useQuery();
};
