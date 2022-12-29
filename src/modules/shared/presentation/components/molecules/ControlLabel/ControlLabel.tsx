import { FormLabel } from "@chakra-ui/react";
import { Show } from "../Show/Show";
import type { ControlLabelProps } from "./ControlLabel.types";

export const ControlLabel = ({ label, name }: ControlLabelProps) => {
  return (
    <Show when={!!label}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
    </Show>
  );
};
