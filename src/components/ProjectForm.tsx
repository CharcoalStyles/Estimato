import { Database } from "@/util/schema";
import { Button, Checkbox, Input, Text, TextArea } from "./ui";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useTech } from "@/hooks/useTech";
import { TechIcon } from "./TechIcon";
import clsx from "clsx";
import { TechSearch } from "./TechSearch";

type ProjectDetails = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  "description" | "name" | "public"
> & { description: string };

const nullProject: ProjectDetails = {
  name: "",
  description: "",
  public: false,
};

export type ProjectFormProps = {
  projectDetails?: ProjectDetails;
  onInvalid?: () => void;
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
  onInvalid,
}: ProjectFormProps) => {
  const router = useRouter();
  const [project, setProject] = useState<ProjectDetails>(projectDetails);
  
  const [hasFormError, setHasFormError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  return (
    <form
      className="w-1/2"
      onInvalid={() => {
        onInvalid && onInvalid();
        setHasFormError(true);
      }}
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
      }}
    >
      <Input
        data-testid="projectForm-name"
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
        data-testid="projectForm-description"
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

      <TechSearch onSelect={() => {}} selectedTech={[]} />

      <Checkbox
        data-testid="projectForm-public"
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
