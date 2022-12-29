import { FormHelperText } from "@chakra-ui/react";
import type { ControlHelperTextProps } from "./ControlHelperText.types";
import { Show } from "../Show/Show";

export const ControlHelperText = ({ show, text }: ControlHelperTextProps) => {
  return (
    <Show when={show}>
      <FormHelperText>{text}</FormHelperText>
    </Show>
  );
};
