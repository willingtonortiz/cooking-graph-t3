import type { FieldError } from "react-hook-form";

export type TextInputCommonProps = {
  name: string;
  label?: string;
  helperText?: string;
  error?: FieldError;
};
