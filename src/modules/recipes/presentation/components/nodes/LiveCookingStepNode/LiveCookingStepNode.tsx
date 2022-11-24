import type { FC } from "react";
import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import type { LiveCookingStepNodeProps } from "./LiveCookingStepNode.types";
import { CookingStepNode } from "../CookingStepNode/CookingStepNode";
import { Button, Flex, Tag, Text, Wrap } from "@chakra-ui/react";
import { CheckIcon, TimeIcon } from "@chakra-ui/icons";

type Props = NodeProps<LiveCookingStepNodeProps>;

export const LiveCookingStepNode: FC<Props> = ({ id, data }) => {
  const { status, onStart, onComplete } = data;
  const isNotStarted = status === "NOT_STARTED";
  const isInProgress = status === "IN_PROGRESS";
  const isCompleted = status === "COMPLETED";

  return (
    <>
      <Handle type="target" position={Position.Left} isConnectable={false} />

      <CookingStepNode data={data}>
        <Wrap mt={2}>
          {isInProgress && (
            <Tag colorScheme={"yellow"}>
              <TimeIcon />

              <Text ml={2}>En progreso</Text>
            </Tag>
          )}

          {isCompleted && (
            <Tag colorScheme={"green"}>
              <CheckIcon />

              <Text ml={2}>Completado</Text>
            </Tag>
          )}
        </Wrap>

        {(isNotStarted || isInProgress) && (
          <Flex mt={6} justifyContent={"center"}>
            {isNotStarted && (
              <Button
                size="sm"
                colorScheme={"green"}
                onClick={() => onStart?.(id)}
              >
                Iniciar
              </Button>
            )}

            {isInProgress && (
              <Button
                size="sm"
                colorScheme={"green"}
                onClick={() => onComplete?.(id)}
              >
                Completar
              </Button>
            )}
          </Flex>
        )}
      </CookingStepNode>

      <Handle type="source" position={Position.Right} isConnectable={false} />
    </>
  );
};
