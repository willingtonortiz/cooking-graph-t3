import type { FC } from "react";
import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import type { EditableCookingStepNodeProps } from "./EditableCookingStepNode.types";
import { CookingStepNode } from "../CookingStepNode/CookingStepNode";
import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import { RemoveCookingStepNodeModal } from "../../modals/RemoveCookingStepNodeModal/RemoveCookingStepNodeModal";

type Props = NodeProps<EditableCookingStepNodeProps>;

const handlerStyles = {
  width: 10,
  height: 50,
  backgroundColor: "white",
  borderRadius: 0,
  border: "1px solid #323232",
};

export const EditableCookingStepNode: FC<Props> = ({ id, data }) => {
  const { onEdit, onRemove } = data;
  const deleteNodeModal = useDisclosure();

  const onRemoveHandler = () => {
    onRemove?.(id);
    deleteNodeModal.onClose();
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={true}
        style={{ ...handlerStyles, left: -5 }}
      />

      <CookingStepNode data={data}>
        <HStack>
          <Button
            colorScheme={"orange"}
            onClick={() => onEdit?.(id)}
            size={"sm"}
          >
            Editar
          </Button>

          <Button
            colorScheme={"red"}
            onClick={deleteNodeModal.onOpen}
            size={"sm"}
          >
            Eliminar
          </Button>
        </HStack>
      </CookingStepNode>

      <RemoveCookingStepNodeModal
        isOpen={deleteNodeModal.isOpen}
        onClose={deleteNodeModal.onClose}
        onRemove={onRemoveHandler}
      />

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={true}
        style={{ ...handlerStyles, right: -5 }}
      />
    </>
  );
};
