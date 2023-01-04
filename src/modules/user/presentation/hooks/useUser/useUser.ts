import { trpc } from "../../../../../utils/trpc";

export const useUser = () => {
  return trpc.user.me.useQuery();
};
