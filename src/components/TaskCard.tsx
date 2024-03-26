import { Button, Card, Text } from "@/components/ui";
import { UseTask } from "@/hooks/useTasks";
import clsx from "clsx";
import { useState } from "react";

type TaskCardProps = { task: UseTask };

export const TaskCard = ({
  task: {
    actual,
    created_at,
    description,
    estimation,
    name,
    notes,
    tech,
    test_actual,
    test_estimation,
  },
}: TaskCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="sm:w-full md:w-1/3 md:min-w-60 xl:w-1/4 md:flex-grow">
      <Card
        title={
          <div className="w-full flex flex-row items-center justify-between">
            <div className="flex-shrink">
              <Text fontType="heading" fontSize="xl" closeLines>
                {name}
              </Text>
            </div>
            <div className="flex flex-row items-center">
              <div>
                <Text fontSize="sm">Estimation</Text>
                <Text>
                  {estimation}
                  {actual && `/${actual}`}
                </Text>
              </div>
              {test_estimation != 0 && (
                <div className="ml-4">
                  <Text fontSize="sm">Test</Text>
                  <Text>
                    {test_estimation}
                    {test_actual && `/${test_actual}`}
                  </Text>
                </div>
              )}
            </div>
          </div>
        }
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        fullWidth
        noHeightLimit
      >
        <div
          className={clsx(
            "flex flex-col flex-grow items-end  w-full",
            isOpen ? "h-full" : "h-0 overflow-hidden"
          )}
        >
          <div className="w-full">
            <div className="flex flex-col">
              {description && (
                <>
                  <hr className="my-2" />
                  <Text fontSize="sm">Description</Text>
                  <Text>{description}</Text>
                </>
              )}
              {notes && (
                <>
                  <hr className="my-2" />
                  <Text fontSize="sm">Notes</Text>
                  <Text>{notes}</Text>
                </>
              )}
            </div>
            <hr className="my-2" />
            <div>
              <Button
                size="small"
                fullWidth
                label="✏️ Edit"
                variant="basic"
                onClick={(e) => {
                  e.stopPropagation();
                  // router.push(`/app/project/${router.query.projectId}/edit`);
                }}
              />
              <Button
                size="small"
                fullWidth
                label="🗑️ Delete"
                variant="black"
                onClick={(e) => {
                  e.stopPropagation();
                  // setIsDeleteOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const trimString = (str: string, length: number) => {
  return str.length > length ? str.substring(0, length) + "..." : str;
};
