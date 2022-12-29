import type { FieldPath, FieldValues } from "react-hook-form";
import type { TextInputCommonProps } from "../TextInputCommon/TextInputCommon.types";
import type { RHFControlProps } from "../../types/rhf-control-props/rhf-control-props";

export type TextAreaControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<TextInputCommonProps, "error" | "name"> &
  RHFControlProps<TFieldValues, TName> & {
    placeholder?: string;
  };
