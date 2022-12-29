import type { PropsWithChildren } from "react";
import { FormControl } from "@chakra-ui/react";
import { ControlLabel } from "../ControlLabel/ControlLabel";
import { ControlErrorMessage } from "../ControlErrorMessage/ControlErrorMessage";
import { ControlHelperText } from "../ControlHelperText/ControlHelperText";
import type { TextInputCommonProps } from "./TextInputCommon.types";

export const TextInputCommon = ({
  children,
  error,
  helperText,
  label,
  name,
}: PropsWithChildren<TextInputCommonProps>) => {
  const hasError = !!error;

  return (
    <FormControl isInvalid={hasError}>
      <ControlLabel label={label} name={name} />
      {children}
      <ControlErrorMessage error={error} />
      <ControlHelperText show={!error} text={helperText} />
    </FormControl>
  );
};
