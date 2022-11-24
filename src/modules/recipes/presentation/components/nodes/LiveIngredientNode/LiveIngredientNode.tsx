import type { FC } from "react";
import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";
import type { LiveIngredientNodeProps } from "./LiveIngredientNode.types";

type Props = NodeProps<LiveIngredientNodeProps>;

export const LiveIngredientNode: FC<Props> = ({
  data: { title, description, imageUrl },
}) => {
  return (
    <>
      <Handle type="target" position={Position.Left} isConnectable={false} />

      <HStack
        w={500}
        maxH={150}
        border={"1px solid grey"}
        borderRadius="md"
        bgColor={"white"}
        overflow={"hidden"}
        shadow={"lg"}
        transition={"all 0.5s ease"}
        _hover={{ transform: "scale(1.01)" }}
      >
        <Image maxW={150} h={"full"} src={imageUrl} fit="contain" alt={title} />

        <Box>
          <Heading size={"md"}>{title}</Heading>
          <Text fontSize={"sm"}>{description}</Text>
        </Box>
      </HStack>

      <Handle type="source" position={Position.Right} isConnectable={false} />
    </>
  );
};
