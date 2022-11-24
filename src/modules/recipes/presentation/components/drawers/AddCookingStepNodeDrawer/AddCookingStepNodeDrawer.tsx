import type { FC } from "react";
import type { AddCookingStepNodeDrawerProps } from "./AddCookingStepNodeDrawer.types";
import {
  DrawerHeader,
  Heading,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerBody,
} from "@chakra-ui/react";
import { AddCookingStepNodeForm } from "../../forms/AddCookingStepNodeForm/AddCookingStepNodeForm";

type Props = AddCookingStepNodeDrawerProps;

export const AddCookingStepNodeDrawer: FC<Props> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} size={"md"}>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>
          <Heading size={"lg"}>Paso de receta</Heading>
        </DrawerHeader>

        <DrawerBody>
          <AddCookingStepNodeForm type={"ADD"} onSubmit={onAdd} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
