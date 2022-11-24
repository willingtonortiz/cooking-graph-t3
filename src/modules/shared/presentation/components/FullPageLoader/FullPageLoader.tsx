import { Center } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export const FullPageLoader = ({ children }: PropsWithChildren) => {
  return (
    <Center w={"full"} h={"full"}>
      {children}
    </Center>
  );
};
