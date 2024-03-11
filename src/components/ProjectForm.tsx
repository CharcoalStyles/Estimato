import { Database } from "@/util/schema";
import { Button, Checkbox, Input, TextArea } from "./ui";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TechSearch } from "./TechSearch";

type ProjectDetails = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  "description" | "name" | "public"
> & {
  description: string;
  tech: Database["public"]["Tables"]["tech"]["Row"][];
};

const nullProject: ProjectDetails = {
  name: "",
  description: "",
  public: false,
  tech: [],
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
      }}>
      <div className="flex flex-row gap-4">
        <div className="flex-1">
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
            rows={6}
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
        </div>
        <div className="flex-1">
          <TechSearch
            onSelect={(tech) => {
              //toggle the tech
              const isSelected = project.tech.some((t) => t.id === tech.id);
              setProject((original) => ({
                ...original,
                tech: isSelected
                  ? original.tech.filter((t) => t.id !== tech.id)
                  : [...original.tech, tech],
              }));
            }}
            selectedTech={project.tech}
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
