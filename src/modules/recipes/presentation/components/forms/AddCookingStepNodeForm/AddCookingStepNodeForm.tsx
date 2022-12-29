import type { FC } from "react";
import { Button, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import type {
  AddCookingStepNodeFormFields,
  AddCookingStepNodeFormProps,
} from "./AddCookingStepNodeForm.types";
import { getAddCookingStepNodeFormDefaultValues } from "./AddCookingStepNodeForm.types";
import { TextInputControl } from "../../../../../shared/presentation/components/molecules/TextInputControl/TextInputControl";
import { TextAreaControl } from "../../../../../shared/presentation/components/molecules/TextAreaControl/TextAreaControl";

export const AddCookingStepNodeForm: FC<AddCookingStepNodeFormProps> = ({
  type,
  initialValues = getAddCookingStepNodeFormDefaultValues(),
  onSubmit,
}) => {
  const { control, handleSubmit } = useForm<AddCookingStepNodeFormFields>({
    defaultValues: initialValues,
    mode: "all",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={8} mb={12}>
        <TextInputControl
          control={control}
          name={"title"}
          rules={{
            required: { value: true, message: "Campo requerido" },
            minLength: { value: 5, message: "Mínimo 5 caracteres" },
          }}
          label={"* Título"}
          helperText={`Ingresa el título de la receta. Ejm: "Mezclar ingredientes"`}
        />

        <TextAreaControl
          control={control}
          name={"description"}
          rules={{
            required: { value: true, message: "Campo requerido" },
            minLength: { value: 5, message: "Mínimo 5 caracteres" },
          }}
          label={"* Descripción"}
          helperText={`Ingrese la descripción. Ejm: "Se debe separar la clara de huevo con..."`}
        />

        <TextInputControl
          control={control}
          name={"imageUrl"}
          label={"Url de imagen"}
          placeholder={"Agregue el url de una imagen"}
        />

        <TextInputControl
          control={control}
          name={"quantity"}
          label={"Cantidad"}
          placeholder={"Agregue la cantidad"}
          helperText={`Ejm: "50 ml"`}
        />

        <TextInputControl
          control={control}
          name={"time"}
          label={"Tiempo"}
          placeholder={"Agregue el tiempo"}
          helperText={`Ejm: "5 minutos"`}
        />

        <Button type={"submit"}>
          {type === "ADD" ? "Agregar" : "Editar"} paso
        </Button>
      </VStack>
    </form>
  );
};
