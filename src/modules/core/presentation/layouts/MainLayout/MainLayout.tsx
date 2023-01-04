import type { PropsWithChildren } from "react";
import { Navbar } from "../../components/Navbar/Navbar";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />

      {children}
    </>
  );
};
