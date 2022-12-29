import { Input } from "@chakra-ui/react";
import { useController } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";
import type { TextInputControlProps } from "./TextInputControl.types";
import { TextInputCommon } from "../TextInputCommon/TextInputCommon";

export const TextInputControl = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  rules,
  label,
  helperText,
  placeholder,
  type,
}: TextInputControlProps<TFieldValues, TName>) => {
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
      <Input {...field} placeholder={placeholder} type={type} />
    </TextInputCommon>
  );
};
