import type { ShowProps } from "./Show.types";

export const Show = ({ when, children, fallback = null }: ShowProps) => {
  return <>{when ? children : fallback}</>;
};
