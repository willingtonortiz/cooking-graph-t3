import { trpc } from "../../../../../utils/trpc";
import type { UseLoginProps } from "./useLogin.types";

export const useLogin = ({ onSuccess, onError }: UseLoginProps) => {
  return trpc.auth.login.useMutation({
    retry: false,
    onSuccess: ({ token }) => {
      localStorage.setItem("token", token);
      onSuccess?.();
    },
    onError,
  });
};
