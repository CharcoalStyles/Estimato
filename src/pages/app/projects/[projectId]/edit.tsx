import { AppLayout, Loader, ProjectForm } from "@/components/";
import { Text } from "@/components/ui";
import { useProject } from "@/hooks/useProject";
import { useUser } from "@/hooks/useUser";
import { Database } from "@/util/schema";
import { supabaseAtom } from "@/util/supabase";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type projectDetails = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  "description" | "name" | "public"
>;

export default function EditProject() {
  const router = useRouter();
  const { data } = useProject(router.query.projectId as string);

  const [project, setProject] = useState<
    projectDetails & { description: string }
  >({
    name: "",
    description: "",
    public: false,
  });

  useEffect(() => {
    if (data) {
      setProject({
        name: data.name,
        description: data.description ? data.description : "",
        public: data.public,
      });
      setIsLoading(false);
    }
  }, [data]);

  const [isLoading, setIsLoading] = useState(true);
  const [supabase] = useAtom(supabaseAtom);
  const {
    userDetails: { userData },
  } = useUser();

  const [hasFormError, setHasFormError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  return (
    <AppLayout
      openSidebarItem="projects"
      pageTitle=" Edit Project"
      subtitle="Ooh, what's changed?">
      {isLoading && <Loader />}
      {!isLoading && (
        <ProjectForm
          projectDetails={project}
          onCancel={() => {
            router.push(`/app/projects/${data!.id}`);
          }}
          onSubmit={async (project) => {
            if (userData) {
              try {
                const { error, status } = await supabase
                  .from("projects")
                  .update({
                    ...project,
                  })
                  .eq("id", data!.id);

                if (status === 204) {
                  return { redirect: `/app/projects/${data!.id}` };
                }

                return {
                  error: new Error(
                    error
                      ? `${error.message}\n${error.hint}`
                      : "Project not created"
                  ),
                };
              } catch (error) {
                console.error("Error saving project", error);
              } finally {
                setIsSaving(false);
              }
            }
            return { error: new Error("User not found") };
          }}
        />
      )}
    </AppLayout>
  );
}
