import { useRouter } from "next/router";
import { Button, Container, VStack } from "@chakra-ui/react";
import { useLoginForm } from "../../modules/auth/presentation/hooks/useLoginForm/useLoginForm";
import { TextInputControl } from "../../modules/shared/presentation/components/molecules/TextInputControl/TextInputControl";
import type { LoginFormFields } from "../../modules/auth/presentation/hooks/useLoginForm/useLoginForm.types";
import { useLogin } from "../../modules/auth/presentation/hooks/useLogin/useLogin";
import type { NextPageWithLayout } from "../_app";
import { trpc } from "../../utils/trpc";

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { control, handleSubmit } = useLoginForm();
  const utils = trpc.useContext();
  const loginMutation = useLogin({
    onSuccess: async () => {
      await utils.user.me.invalidate();
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
