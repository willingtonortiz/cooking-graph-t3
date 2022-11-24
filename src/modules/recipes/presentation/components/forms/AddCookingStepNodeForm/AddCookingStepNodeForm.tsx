import type { FC } from "react";

import type {
  AddCookingStepNodeFormFields,
  AddCookingStepNodeFormProps,
} from "./AddCookingStepNodeForm.types";
import { useForm, Controller } from "react-hook-form";
import { getAddCookingStepNodeFormDefaultValues } from "./AddCookingStepNodeForm.types";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";

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
        <Controller
          control={control}
          name={"title"}
          rules={{
            required: { value: true, message: "Campo requerido" },
            minLength: { value: 5, message: "Mínimo 5 caracteres" },
          }}
          render={({ field, fieldState: { error } }) => (
            <FormControl isInvalid={!!error}>
              <FormLabel>* Título</FormLabel>

              <Input {...field} />

              {error ? (
                <FormErrorMessage>{error.message}</FormErrorMessage>
              ) : (
                <FormHelperText>
                  Ingresa el título de la receta. Ejm: {'"'}Mezclar ingredientes
                  {'"'}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name={"description"}
          rules={{
            required: { value: true, message: "Campo requerido" },
            minLength: { value: 5, message: "Mínimo 5 caracteres" },
          }}
          render={({ field, fieldState: { error } }) => (
            <FormControl isInvalid={!!error}>
              <FormLabel>* Descripción</FormLabel>

              <Textarea {...field} />

              {error ? (
                <FormErrorMessage>{error.message}</FormErrorMessage>
              ) : (
                <FormHelperText>
                  Ingrese la descripción. Ejm: {'"'}Se debe separar la clara de
                  huevo con...{'"'}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name={"imageUrl"}
          render={({ field }) => (
            <FormControl>
              <FormLabel>Url de imagen</FormLabel>

              <Input {...field} placeholder="Agregue el url de una imagen" />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name={"quantity"}
          render={({ field }) => (
            <FormControl>
              <FormLabel>Cantidad</FormLabel>

              <Input {...field} placeholder="Agregue la cantidad" />

              <FormHelperText>
                Ejm: {'"'}50 ml{'"'}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name={"time"}
          render={({ field }) => (
            <FormControl>
              <FormLabel>Tiempo</FormLabel>

              <Input {...field} placeholder="Agregue el tiempo" />

              <FormHelperText>
                Ejm: {'"'}5 minutos{'"'}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Button type={"submit"}>
          {type === "ADD" ? "Agregar" : "Editar"} paso
        </Button>
      </VStack>
    </form>
  );
};
