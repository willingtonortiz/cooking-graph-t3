import { HStack, Text, VStack } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

export type Props = {
  dependencies: string[];
};

export const RequiredDependenciesAlert = ({ dependencies }: Props) => {
  return (
    <HStack alignItems={"flex-start"}>
      <WarningIcon color={"orange"} />

      <VStack alignItems={"flex-start"} spacing={0}>
        <Text fontWeight={"bold"}>Se deben completar los siguientes pasos</Text>

        {dependencies.map((nodeTitle) => (
          <Text key={nodeTitle}>
            {"- "}
            {nodeTitle}
          </Text>
        ))}
      </VStack>
    </HStack>
  );
};
