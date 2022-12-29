import type { ReactNode } from "react";

export type ShowProps = {
  when: boolean;
  children: ReactNode;
  fallback?: ReactNode;
};
