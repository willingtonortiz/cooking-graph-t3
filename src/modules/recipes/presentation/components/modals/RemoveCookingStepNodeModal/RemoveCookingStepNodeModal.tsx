import type { FC } from "react";
import type { RemoveCookingStepNodeModalProps } from "./RemoveCookingStepNodeModal.types";
import {
  Button,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

type Props = RemoveCookingStepNodeModalProps;

export const RemoveCookingStepNodeModal: FC<Props> = ({
  isOpen,
  onClose,
  onRemove,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>
          <Text>¿Estás seguro que deseas eliminar este paso?</Text>
        </ModalHeader>

        <ModalCloseButton />

        <ModalFooter>
          <HStack>
            <Button variant={"outline"} colorScheme={"red"} onClick={onRemove}>
              Eliminar
            </Button>

            <Button variant={"outline"} onClick={onClose}>
              Cancelar
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
