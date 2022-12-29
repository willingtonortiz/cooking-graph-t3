import { FormErrorMessage } from "@chakra-ui/react";
import type { ControlErrorMessageProps } from "./ControlErrorMessage.types";
import { isNullish } from "../../../../infrastructure/utils/type-validations";

export const ControlErrorMessage = ({ error }: ControlErrorMessageProps) => {
  if (isNullish(error)) {
    return null;
  }

  return <FormErrorMessage>{error.message}</FormErrorMessage>;
};
