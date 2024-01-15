import React, { PropsWithChildren, useMemo } from "react";
import { clsx } from "clsx";

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
    const colour = () => {
      switch (variant) {
        case "primary":
          return "text-primary";
        case "secondary":
          return "text-secondary";
        case "accent":
          return "text-accent";
        case "success":
          return "text-green-500";
        case "danger":
          return "text-red-500";
        default:
          return "text-text";
      }
    };
    const size = () => {
      switch(fontSize){
        case "sm":
          return "text-sm"
        case "base":
          return "text-base"
        case "xl":
          return "text-xl"
        case "2xl":
          return "text-2xl"
        case "3xl":
          return "text-3xl"
        case "4xl":
          return "text-4xl"
        case "5xl":
          return "text-5xl"
        default:
          return "text-base"
      }
    }

    return clsx([
      colour(),
      size(),
      {
        "font-heading": fontType === "heading",
        "font-body": fontType === "body",
      },
    ]);

    // return `text-${fontSize} ${
    //   fontType === "heading" ? "font-heading" : "font-body"
    // } ${variant ? `text-${v}` : "text-text"}`;
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
