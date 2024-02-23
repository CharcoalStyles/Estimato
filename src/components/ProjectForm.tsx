import { Database } from "@/util/schema";
import { Button, Checkbox, Input, TextArea } from "./ui";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ProjectDetails = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  "description" | "name" | "public"
> & { description: string };

const nullProject: ProjectDetails = {
  name: "",
  description: "",
  public: false,
};

type ProjectFormProps = {
  projectDetails?: ProjectDetails;
  onSubmit: (project: ProjectDetails) => Promise<{
    error?: Error;
    redirect?: string;
  }>;
  onCancel?: () => void;
};

export const ProjectForm = ({
  onSubmit,
  projectDetails = nullProject,
  onCancel,
}: ProjectFormProps) => {
  const router = useRouter();
  const [project, setProject] = useState<ProjectDetails>(projectDetails);

  const [hasFormError, setHasFormError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  return (
    <form
      className="w-1/2"
      onInvalid={() => setHasFormError(true)}
      onSubmit={(e) => {
        e.preventDefault();
        setIsSaving(true);
        onSubmit(project).then(({ error, redirect }) => {
          setIsSaving(false);
          if (error) {
            console.error(error);
          } else if (redirect) {
            router.push(redirect);
          }
        });
      }}>
      <Input
        label="Project Name *"
        value={project.name}
        type="text"
        required
        onChange={(v) =>
          setProject((original) => ({
            ...original,
            name: v,
          }))
        }
        showErrors={hasFormError}
        disabled={isSaving}
      />
      <TextArea
        label="Project Description"
        value={project.description}
        onChange={(v) =>
          setProject((original) => ({
            ...original,
            description: v,
          }))
        }
        disabled={isSaving}
      />
      <Checkbox
        label="Make it public?"
        checked={project.public}
        onChange={(v) =>
          setProject((original) => ({
            ...original,
            public: v,
          }))
        }
        disabled={isSaving}
      />

      <div className="flex flex-row gap-2">
        <Button
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
