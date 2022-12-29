import { useForm } from "react-hook-form";
import type { LoginFormFields } from "./useLoginForm.types";
import { getLoginFormDefaultValues } from "./useLoginForm.types";

export const useLoginForm = () => {
  return useForm<LoginFormFields>({
    defaultValues: getLoginFormDefaultValues(),
    mode: "all",
  });
};
