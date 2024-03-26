import { Database } from "@/util/schema";
import { Text } from "@/components/ui";
import { TechIcon } from "./TechIcon";
import { Card, CardProps } from "./ui/Card";
import { useTasks } from "@/hooks/useTasks";
import { Loader } from ".";

type TaskListProps = {
  projectId: number;
};

export const TaskList = ({ projectId }: TaskListProps) => {
  const { tasks, isLoading } = useTasks(projectId);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader size="2xl" />
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex justify-center">
        <Text>No tasks found</Text>
      </div>
    );
  }

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="border">
            <Text variant="primary">Name</Text>
          </th>
          <th className="border">
            <Text variant="primary">Estimate</Text>
          </th>
          <th className="border">
            <Text variant="primary">Tech</Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td className="border px-2">
              <Text>{task.name}</Text>
            </td>
            <td className="border px-2">
              <Text>{task.estimation}</Text>
            </td>
            <td className="border p-2k">
              <div className="flex flex-row flex-wrap gap-1 px-2">
                {task.tech.map((tech) => (
                  <div key={tech.id}>
                    <TechIcon size="sm" tech={tech} variant="basic" />
                  </div>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const trimString = (str: string, length: number) => {
  return str.length > length ? str.substring(0, length) + "..." : str;
};
