export type LoginFormFields = {
  email: string;
  password: string;
};

export const getLoginFormDefaultValues = (): LoginFormFields => ({
  email: "",
  password: "",
});
