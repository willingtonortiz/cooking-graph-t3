export type RegisterFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const getRegisterFormDefaultValues = (): RegisterFormFields => ({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
});
