import { Database } from "@/util/schema";
import clsx from "clsx";

type Tech = Database["public"]["Tables"]["tech"]["Row"];

export const TechIcon = ({
  tech: { name, "devicon-css": deviconCss, "other-icon": otherIcon },
  size = "md",
}: {
  tech: Tech;
  size?: "sm" | "md" | "lg";
}) => {
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
    <div className={whSize}>
      {deviconCss && <i className={clsx(deviconCss, fontSize, "text-white")} />}
      {otherIcon && (
        <img
          className={clsx(whSize, "grayscale")}
          src={otherIcon}
          alt={`Icon for ${name}`}
        />
      )}
    </div>
  );
};
