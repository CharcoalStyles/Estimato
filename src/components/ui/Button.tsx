import React, { HTMLAttributes, ReactNode } from "react";
import { clsx, ClassDictionary } from "clsx";
import { Text } from "./Text";

export type ButtonProps = Pick<
  HTMLAttributes<HTMLButtonElement>,
  "className"
> & {
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  variant?: "basic" | "primary" | "secondary" | "accent" | "success" | "danger";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  iconOnly?: boolean;
  label?: string;
  fullWidth?: boolean;
};

export const sizes: Array<ButtonProps["size"]> = ["small", "medium", "large"];
export const variants: Array<ButtonProps["variant"]> = [
  "basic",
  "primary",
  "secondary",
  "accent",
  "success",
  "danger",
];

export const Button = ({
  onClick,
  size = "medium",
  variant = "basic",
  icon,
  iconPosition = "left",
  iconOnly = false,
  label,
  fullWidth = false,
  className,
}: ButtonProps) => {
  const getButtonSizeClasses = () => {
    switch (size) {
      case "small":
        return "px-2 py-1";
      case "medium":
        return "px-3 py-2";
      case "large":
        return "px-4 py-2";
    }
  };
  const getTextSizeClasses = () => {
    switch (size) {
      case "small":
        return "sm";
      case "medium":
        return "base";
      case "large":
        return "xl";
    }
  };

  const getStatusClasses = () => {
    switch (variant) {
      case "basic":
        return "border-gray-400 text-text hover:bg-gray-700";
      case "primary":
        return `border-primary text-text hover:bg-primary`;
      case "secondary":
        return `border-secondary text-text hover:bg-secondary`;
      case "accent":
        return `border-accent text-text hover:bg-accent`;
      case "success":
        return "bg-green-600 text-text border-green-500 hover:bg-green-500 hover:text-text";
      case "danger":
        return "bg-red-600 text-text border-red-500 hover:bg-red-500 hover:text-text";
    }
  };

  const getIconClasses = () => {
    if (iconOnly) {
      return "mr-2";
    } else {
      return iconPosition === "left" ? "mr-2" : "ml-2";
    }
  };

  return (
    <button
      className={clsx([
        "inline-flex items-center border h-min justify-center rounded-md",
        getStatusClasses(),
        getButtonSizeClasses(),
        fullWidth ? "w-full" : "",
        className,
      ])}
      onClick={onClick}>
      {icon && iconPosition === "left" && (
        <span className={getIconClasses()}>{icon}</span>
      )}
      {!iconOnly && (
        <Text fontType="body" fontSize={getTextSizeClasses()}>
          {label}
        </Text>
      )}
      {icon && iconPosition === "right" && (
        <span className={getIconClasses()}>{icon}</span>
      )}
    </button>
  );
};
