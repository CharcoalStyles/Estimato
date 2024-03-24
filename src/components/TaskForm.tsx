import { Database } from "@/util/schema";
import { Button, Checkbox, Input, TextArea } from "./ui";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TechSearch } from "./TechSearch";

type TaskDetails = Pick<
  Database["public"]["Tables"]["tasks"]["Row"],
  | "description"
  | "name"
  | "public"
  | "estimation"
  | "test_estimation"
  | "actual"
  | "test_actual"
  | "notes"
> & {
  description: string;
  tech: Database["public"]["Tables"]["tech"]["Row"][];
};

const nullTask: TaskDetails = {
  name: "",
  description: "",
  public: false,
  estimation: 0,
  test_estimation: 0,
  tech: [],
  actual: 0,
  notes: "",
  test_actual: 0,
};

export type TaskFormProps = {
  taskDetails?: TaskDetails;
  onInvalid?: () => void;
  onSubmit: (project: TaskDetails) => Promise<{
    error?: Error;
    redirect?: string;
  }>;
  onCancel?: () => void;
};

export const TaskForm = ({
  onSubmit,
  taskDetails = nullTask,
  onCancel,
  onInvalid,
}: TaskFormProps) => {
  const router = useRouter();
  const [task, setTask] = useState<TaskDetails>(taskDetails);

  const [hasFormError, setHasFormError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  return (
    <form
      onInvalid={() => {
        onInvalid && onInvalid();
        setHasFormError(true);
      }}
      onSubmit={(e) => {
        e.preventDefault();
        setIsSaving(true);
        onSubmit(task).then(({ error, redirect }) => {
          setIsSaving(false);
          if (error) {
            console.error(error);
          } else if (redirect) {
            router.push(redirect);
          }
        });
      }}
    >
      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <Input
            data-testid="taskForm-name"
            label="Task Name *"
            value={task.name}
            type="text"
            required
            onChange={(v) =>
              setTask((original) => ({
                ...original,
                name: v,
              }))
            }
            showErrors={hasFormError}
            disabled={isSaving}
          />
          <TextArea
            data-testid="taskForm-description"
            label="Project Description"
            rows={6}
            value={task.description}
            onChange={(v) =>
              setTask((original) => ({
                ...original,
                description: v,
              }))
            }
            disabled={isSaving}
          />

          <div className="flex flex-row flex-wrap">
            <div className="w-1/2 p-4">
              <Input
                label="Estimation (minutes)*"
                type="number"
                value={(task.estimation || 0).toString()}
                onChange={(v) => {
                  setTask((original) => ({
                    ...original,
                    estimation: parseInt(v),
                  }));
                }}
              />
            </div>

            <div className="w-1/2 p-4">
              <Input
                label="Real Time (minutes)*"
                type="number"
                value={(task.actual || 0).toString()}
                onChange={(v) => {
                  setTask((original) => ({
                    ...original,
                    actual: parseInt(v),
                  }));
                }}
              />
            </div>

            <div className="w-1/2 p-4">
              <Input
                label="Test Estimation (minutes)"
                type="number"
                value={(task.test_estimation || 0).toString()}
                onChange={(v) => {
                  setTask((original) => ({
                    ...original,
                    test_estimation: parseInt(v),
                  }));
                }}
              />
            </div>
            <div className="w-1/2 p-4">
              <Input
                label="Test Real Time (minutes)"
                type="number"
                value={(task.test_actual || 0).toString()}
                onChange={(v) => {
                  setTask((original) => ({
                    ...original,
                    test_actual: parseInt(v),
                  }));
                }}
              />
            </div>
          </div>
          
          <TextArea
            data-testid="taskForm-notes"
            label="Notes"
            rows={4}
            value={task.notes || ""}
            onChange={(v) =>
              setTask((original) => ({
                ...original,
                notes: v,
              }))
            }
            disabled={isSaving}
          />

          <Checkbox
            data-testid="taskForm-public"
            label="Make it public?"
            checked={task.public}
            onChange={(v) =>
              setTask((original) => ({
                ...original,
                public: v,
              }))
            }
            disabled={isSaving}
          />
        </div>
        <div className="flex-1">
          <TechSearch
            onSelect={(tech) => {
              const isSelected = task.tech.some((t) => t.id === tech.id);
              setTask((original) => ({
                ...original,
                tech: isSelected
                  ? original.tech.filter((t) => t.id !== tech.id)
                  : [...original.tech, tech],
              }));
            }}
            selectedTech={task.tech}
          />
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <Button
          data-testid="projectForm-submit"
          variant="primary"
          disabled={isSaving}
          label={isSaving ? "Submitting..." : "Submit"}
          type="submit"
        />
        {onCancel && (
          <Button
            variant="secondary"
            disabled={isSaving}
            label={"Cancel"}
            type="button"
            onClick={() => {
              if (!isSaving) {
                onCancel();
              }
            }}
          />
        )}
      </div>
    </form>
  );
};
