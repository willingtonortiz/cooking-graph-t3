import type { FieldPath, FieldValues } from "react-hook-form";
import type { TextInputCommonProps } from "../TextInputCommon/TextInputCommon.types";
import type { RHFControlProps } from "../../types/rhf-control-props/rhf-control-props";

export type TextInputControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<TextInputCommonProps, "error" | "name"> &
  RHFControlProps<TFieldValues, TName> & {
    type?: string;
    placeholder?: string;
  };
