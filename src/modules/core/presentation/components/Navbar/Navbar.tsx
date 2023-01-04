import { useContext } from "react";
import { Box, Link as CLink, Text } from "@chakra-ui/react";
import Link from "next/link";
import { UserContext } from "../../../../auth/presentation/contexts/user-context/user-context";

export const Navbar = () => {
  const user = useContext(UserContext);

  return (
    <Box
      bgColor={"blue.400"}
      p={"4"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Text>Bienvenido {user?.firstName}</Text>

      <Link href={"/recipes"} passHref legacyBehavior>
        <CLink>Recetas</CLink>
      </Link>
    </Box>
  );
};
