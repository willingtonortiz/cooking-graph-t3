import type { FC } from "react";
import type { CookingStepNodeProps } from "./CookingStepNode.types";
import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  Image,
  Text,
} from "@chakra-ui/react";

type Props = CookingStepNodeProps;

export const CookingStepNode: FC<Props> = ({
  data: { title, description, imageUrl, quantity, time },
  children,
}) => {
  const hasTable = quantity || time;

  return (
    <Box
      w={300}
      border={"1px solid grey"}
      borderRadius="md"
      bgColor={"white"}
      overflow={"hidden"}
      shadow={"xl"}
    >
      {imageUrl && <Image src={imageUrl} fit={"cover"} alt={title} />}

      <Box px={2} py={2}>
        <Heading size={"md"}>{title}</Heading>

        <Text fontSize={"sm"} textAlign="justify">
          {description}
        </Text>

        {hasTable && (
          <TableContainer shadow={"sm"} my={4}>
            <Table variant="simple" size={"sm"}>
              <Tbody>
                {quantity && (
                  <Tr>
                    <Td>Cantidad</Td>
                    <Td>{quantity}</Td>
                  </Tr>
                )}

                {time && (
                  <Tr>
                    <Td>Tiempo</Td>
                    <Td>{time}</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        )}

        {children}
      </Box>
    </Box>
  );
};
