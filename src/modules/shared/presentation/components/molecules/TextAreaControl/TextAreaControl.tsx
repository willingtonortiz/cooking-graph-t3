import { Textarea } from "@chakra-ui/react";
import { useController } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";
import { TextInputCommon } from "../TextInputCommon/TextInputCommon";
import type { TextAreaControlProps } from "./TextAreaControl.types";

export const TextAreaControl = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  rules,
  label,
  helperText,
  placeholder,
}: TextAreaControlProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name, rules });

  return (
    <TextInputCommon
      name={name}
      label={label}
      helperText={helperText}
      error={error}
    >
      <Textarea {...field} placeholder={placeholder} />
    </TextInputCommon>
  );
};
