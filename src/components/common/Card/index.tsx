import { ReactNode } from "react";

export interface Props {
  children?: ReactNode;
  className?: string;
}

export function Card({ children, className }: Props) {
  return <div className={`card ${className}`}>{children}</div>;
}
