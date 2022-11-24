import { trpc } from "../../../../../utils/trpc";

type Props = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useAddRecipe = ({ onSuccess, onError }: Props = {}) => {
  return trpc.recipes.addOne.useMutation({ retry: false, onSuccess, onError });
};
