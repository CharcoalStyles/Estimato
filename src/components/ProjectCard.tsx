import { Database } from "@/util/schema";
import { Text } from "@/components/ui";
import clsx from "clsx";

type ProjectCardProps = {
  title: string;
  description?: string;
  variant?: "base" | "primary" | "secondary";
  onClick?: () => void;
};

const generateStyle = (variant: ProjectCardProps["variant"]) => {
  const styles: Array<string> = [];

  switch (variant) {
    case "primary":
      styles.push("border-primary hover:bg-gradient-to-t hover:from-primary");
      break;
    case "secondary":
      styles.push(
        "border-secondary hover:bg-gradient-to-t hover:from-secondary"
      );
      break;
    default:
      styles.push(
        "border-slate-400 hover:border-slate-300 hover:bg-gradient-to-t hover:from-slate-700"
      );
      break;
  }

  return styles;
};

export const ProjectCard = ({
  description,
  title,
  variant = "base",
  onClick,
}: ProjectCardProps) => {
  return (
    <div
    data-testid={`projectCard-${title}`}
      className={clsx([
        "flex flex-col justify-between p-4 m-2 transition-colors bg-transparent border-2 max-w-48 max-h-52 rounded-2xl",
        ...generateStyle(variant),
      ])}
      onClick={() => {
        onClick && onClick();
      }}
    >
      <div className="pb-2">
        <Text fontType="heading" fontSize="xl" closeLines>
          {title}
        </Text>
      </div>

      <div className="flex-shrink">
        {description && (
          <Text fontType="body" fontSize="base" closeLines>
            {trimString(description || "", 100)}
          </Text>
        )}
      </div>
    </div>
  );
};

const trimString = (str: string, length: number) => {
  return str.length > length ? str.substring(0, length) + "..." : str;
};
