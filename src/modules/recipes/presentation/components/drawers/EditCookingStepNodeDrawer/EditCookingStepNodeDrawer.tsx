import type { EditCookingStepNodeDrawerProps } from "./EditCookingStepNodeDrawer.types";
import type { FC } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
} from "@chakra-ui/react";
import { AddCookingStepNodeForm } from "../../forms/AddCookingStepNodeForm/AddCookingStepNodeForm";
import type { AddCookingStepNodeFormFields } from "../../forms/AddCookingStepNodeForm/AddCookingStepNodeForm.types";

type Props = EditCookingStepNodeDrawerProps;

export const EditCookingStepNodeDrawer: FC<Props> = ({
  isOpen,
  onClose,
  node,
  onEdit,
}) => {
  const data = node?.data;
  const onEditHandler = (values: AddCookingStepNodeFormFields) => {
    if (!node) {
      return;
    }
    onEdit(node.id, values);
  };

  if (!node) {
    return null;
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size={"md"}>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>
          <Heading size={"lg"}>Editar paso de receta</Heading>
        </DrawerHeader>

        <DrawerBody>
          <AddCookingStepNodeForm
            type={"EDIT"}
            initialValues={data}
            onSubmit={onEditHandler}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
