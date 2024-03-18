import { Database } from "@/util/schema";
import { Variants, getTextColor } from "@/util/tailwind";
import clsx from "clsx";
import { HTMLAttributes } from "react";

type Tech = Database["public"]["Tables"]["tech"]["Row"];

type TechIconProps = Pick<HTMLAttributes<HTMLDivElement>, "className"> & {
  tech: Tech;
  size?: "sm" | "md" | "lg";
  tooltip?: boolean;
  variant?: Variants;
  onClick?: () => void;
};

const getSimpleIconName = (name: string) =>
  name
    .toLowerCase()
    .replace(".", "dot")
    .replace("+", "plus")
    .replace("#", "sharp")
    .replace(/[^a-z0-9]/g, "");

export const TechIcon = ({
  tech: { name },
  size = "md",
  className,
  onClick,
  tooltip,
  variant,
}: TechIconProps) => {

  const whSize = clsx(
    size === "sm" && "w-4 h-4",
    size === "md" && "w-8 h-8",
    size === "lg" && "w-12 h-12"
  );

  const fontSize = clsx(
    size === "sm" && "text-base",
    size === "md" && "text-2xl",
    size === "lg" && "text-4xl"
  );

  return (
    <div
      className={clsx(className, whSize, tooltip && "group relative")}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {tooltip && (
        <div className="opacity-0 w-28 bg-black text-white font-body text-center border border-gray-600 rounded-lg absolute z-10 group-hover:opacity-100 bottom-full -left-10 pointer-events-none">
          {name}
        </div>
      )}
      <img
        className={clsx(whSize, "grayscale")}
        src={`https://cdn.simpleicons.org/${getSimpleIconName(name)}/ffffff`}
        alt={`Icon for ${name}`}
      />
    </div>
  );
};
