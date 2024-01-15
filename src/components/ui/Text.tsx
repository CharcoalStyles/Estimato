import React, { PropsWithChildren, useMemo } from "react";

type TextProps = {
  tag?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  fontSize?: "sm" | "base" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  fontType?: "heading" | "body";
  variant?: "primary" | "secondary" | "accent" | "success" | "danger";
};

export const sizes: Array<TextProps["fontSize"]> = [
  "sm",
  "base",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
];
export const variants: Array<TextProps["variant"]> = [
  undefined,
  "primary",
  "secondary",
  "accent",
  "success",
  "danger",
];
export const fontTypes: Array<TextProps["fontType"]> = ["heading", "body"];

export const Text = ({
  tag = "p",
  fontSize = "base",
  fontType = "body",
  variant,
  children,
}: PropsWithChildren<TextProps>) => {
  const className = useMemo(() => {
    let v = "text";

    switch (variant) {
      case "primary":
      case "secondary":
      case "accent":
        v = variant;
        break;
      case "success":
        v = "green-500";
        break;
      case "danger":
        v = "red-500";
        break;
    }

    return `text-${fontSize} ${
      fontType === "heading" ? "font-heading" : "font-body"
    } ${variant ? `text-${v}` : "text-text"}`;
  }, [fontSize, fontType, variant]);

  switch (tag) {
    case "h1":
      return <h1 className={className}>{children}</h1>;
    case "h2":
      return <h2 className={className}>{children}</h2>;
    case "h3":
      return <h3 className={className}>{children}</h3>;
    case "h4":
      return <h4 className={className}>{children}</h4>;
    case "h5":
      return <h5 className={className}>{children}</h5>;
    case "h6":
      return <h6 className={className}>{children}</h6>;
    default:
      return <p className={className}>{children}</p>;
  }
  return <p className="text-">{children}</p>;
};
