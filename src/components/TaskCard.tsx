import { Database } from "@/util/schema";
import { Text } from "@/components/ui";
import { TechIcon } from "./TechIcon";
import { Card, CardProps } from "./ui/Card";

type ProjectCardProps = Pick<CardProps, "onClick" | "variant"> & {
  task: Database["public"]["Tables"]["tasks"]["Row"] & {
    tech: Database["public"]["Tables"]["tech"]["Row"][];
  };
};

export const TaskCard = ({
  task: { description, tech, name, actual, estimation },
  ...cardRest
}: ProjectCardProps) => {
  return (
    <Card title={name} {...cardRest}>
      <div className="flex-shrink">
        {description && (
          <Text
            data-testid="description"
            fontType="body"
            fontSize="base"
            closeLines
          >
            {trimString(description || "", 100)}
          </Text>
        )}
        <Text fontType="body" fontSize="sm">
          {estimation}{actual && `/${actual}`}
        </Text>
      </div>

      {tech && (
        <div className="flex flex-row flex-wrap gap-1 mt-2">
          {tech.map((tech) => (
            <div key={tech.id} className="flex-shrink">
              <TechIcon size="sm" tech={tech} variant="basic" />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

const trimString = (str: string, length: number) => {
  return str.length > length ? str.substring(0, length) + "..." : str;
};
