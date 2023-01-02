import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Button, Container, VStack } from "@chakra-ui/react";
import { TextInputControl } from "../../modules/shared/presentation/components/molecules/TextInputControl/TextInputControl";
import { useRegisterForm } from "../../modules/auth/presentation/hooks/useRegisterForm/useRegisterForm";
import { useRegister } from "../../modules/auth/presentation/hooks/useRegister/useRegister";
import type { RegisterFormFields } from "../../modules/auth/presentation/hooks/useRegisterForm/useRegisterForm.types";

const RegisterPage: NextPage = () => {
  const router = useRouter();
  const { control, handleSubmit } = useRegisterForm();
  const registerMutation = useRegister({
    onSuccess: async () => {
      await router.push("/auth/login");
    },
  });

  const onSubmit = (values: RegisterFormFields) => {
    registerMutation.mutate(values);
  };

  return (
    <Container>
      <VStack pt={"20vh"} as={"form"} onSubmit={handleSubmit(onSubmit)}>
        <TextInputControl
          placeholder={"Nombres"}
          control={control}
          name={"firstName"}
          rules={{
            required: "El nombre es requerido",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          }}
        />

        <TextInputControl
          placeholder={"Apellidos"}
          control={control}
          name={"lastName"}
          rules={{
            required: "El apellido es requerido",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          }}
        />

        <TextInputControl
          placeholder={"Correo electrónico"}
          control={control}
          name={"email"}
          rules={{
            required: "El correo electrónico es requerido",
            minLength: { value: 5, message: "Mínimo 5 caracteres" },
          }}
        />

        <TextInputControl
          type={"password"}
          placeholder={"Contraseña"}
          control={control}
          name={"password"}
          rules={{
            required: "La contraseña es requerida",
            minLength: { value: 5, message: "Mínimo 5 caracteres" },
          }}
        />

        <TextInputControl
          type={"password"}
          placeholder={"Confirmar contraseña"}
          control={control}
          name={"confirmPassword"}
          rules={{
            required: "La confirmación de la contraseña es requerida",
            minLength: { value: 5, message: "Mínimo 5 caracteres" },
          }}
        />

        <Button type={"submit"} isLoading={registerMutation.isLoading}>
          Registrarse
        </Button>
      </VStack>
    </Container>
  );
};

export default RegisterPage;
