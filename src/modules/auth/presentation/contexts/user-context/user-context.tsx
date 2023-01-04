import type { PropsWithChildren } from "react";
import { createContext } from "react";
import type { Nullable } from "../../../../shared/infrastructure/utils/utility-types";

export type UserContextProps = Nullable<{
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}>;
export const UserContext = createContext<UserContextProps>(null);

export const UserContextProvider = ({
  user,
  children,
}: PropsWithChildren<{ user: UserContextProps }>) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const UserContextConsumer = UserContext.Consumer;
