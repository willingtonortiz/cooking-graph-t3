import { trpc } from "../../../../../utils/trpc";
import type { UseRegisterProps } from "./useRegister.types";

export const useRegister = ({ onSuccess, onError }: UseRegisterProps) => {
  return trpc.auth.register.useMutation({ retry: false, onSuccess, onError });
};
