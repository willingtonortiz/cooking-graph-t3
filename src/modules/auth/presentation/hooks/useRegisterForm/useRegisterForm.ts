import { useForm } from "react-hook-form";
import type { RegisterFormFields } from "./useRegisterForm.types";
import { getRegisterFormDefaultValues } from "./useRegisterForm.types";

export const useRegisterForm = () => {
  return useForm<RegisterFormFields>({
    defaultValues: getRegisterFormDefaultValues(),
    mode: "all",
  });
};
