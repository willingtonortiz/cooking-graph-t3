import type { PropsWithChildren } from "react";
import { createContext, useState } from "react";
import type { Nullable } from "../../../../shared/infrastructure/utils/utility-types";

export type UserContextProps = {
  user: Nullable<{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }>;
  setUser: (user: UserContextProps["user"]) => void;
};

export const UserContext = createContext<Nullable<UserContextProps>>({
  user: null,
  setUser: () => ({}),
});

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<Nullable<UserContextProps["user"]>>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserContextConsumer = UserContext.Consumer;
