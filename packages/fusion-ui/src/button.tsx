"use client";

import { PropsWithChildren, ReactNode } from "react";

interface Props {
  primary?: boolean;
  size?: "small" | "large";
  label?: string;
  children?: React.ReactNode
}

export const Button = ({
  primary = false,
  label = "Boop",
  size = "small",
}: Props): ReactNode => {
  return (
    <button
      style={{
        backgroundColor: primary ? "red" : "blue",
        fontSize: size === "large" ? "24px" : "14px",
      }}
    >
      {label}
    </button>
  );
};
