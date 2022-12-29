import { Flex } from "@chakra-ui/react";
import type { RecipeFormProps } from "./RecipeForm.types";
import { TextInputControl } from "../../../../../shared/presentation/components/molecules/TextInputControl/TextInputControl";

export const RecipeForm = ({ form: { control } }: RecipeFormProps) => {
  return (
    <Flex p={4} gap={8}>
      <TextInputControl
        control={control}
        name={"name"}
        rules={{ required: { value: true, message: "Campo requerido" } }}
        label={"Nombre"}
        helperText={"Ingresa el nombre de la receta"}
        placeholder={"Nombre de la receta"}
      />

      <TextInputControl
        control={control}
        name={"description"}
        rules={{ required: { value: true, message: "Campo requerido" } }}
        label={"Descripción"}
        helperText={"Ingresa la descripción de la receta"}
        placeholder={"Descripción de la receta"}
      />
    </Flex>
  );
};
