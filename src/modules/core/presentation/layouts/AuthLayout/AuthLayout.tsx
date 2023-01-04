import type { PropsWithChildren } from "react";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <h1>Auth Header</h1>

      {children}
    </div>
  );
};
