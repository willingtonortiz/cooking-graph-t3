import type { NextPage } from "next";
import { Button, Container, VStack } from "@chakra-ui/react";
import { useLoginForm } from "../../modules/auth/presentation/hooks/useLoginForm/useLoginForm";
import { TextInputControl } from "../../modules/shared/presentation/components/molecules/TextInputControl/TextInputControl";
import type { LoginFormFields } from "../../modules/auth/presentation/hooks/useLoginForm/useLoginForm.types";
import { useLogin } from "../../modules/auth/presentation/hooks/useLogin/useLogin";
import { useRouter } from "next/router";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { control, handleSubmit } = useLoginForm();
  const loginMutation = useLogin({
    onSuccess: async () => {
      await router.push("/recipes");
    },
  });

  const onSubmit = (values: LoginFormFields) => {
    loginMutation.mutate(values);
  };

  return (
    <Container>
      <VStack pt={"20vh"} as={"form"} onSubmit={handleSubmit(onSubmit)}>
        <TextInputControl
          placeholder={"Correo electrónico"}
          control={control}
          name="email"
          rules={{
            required: "El correo electrónico es requerido",
            minLength: { value: 5, message: "Mínimo 5 caracteres" },
          }}
        />

        <TextInputControl
          type={"password"}
          placeholder={"Contraseña"}
          control={control}
          name="password"
          rules={{
            required: "La contraseña es requerida",
            minLength: { value: 5, message: "Mínimo 5 caracteres" },
          }}
        />

        <Button type={"submit"} isLoading={loginMutation.isLoading}>
          Iniciar sesión
        </Button>
      </VStack>
    </Container>
  );
};

export default LoginPage;
