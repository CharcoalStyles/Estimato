import { AppLayout, Loader, ProjectForm } from "@/components/";
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
    projectDetails & {
      description: string;
      tech: Database["public"]["Tables"]["tech"]["Row"][];
    }
  >({
    name: "",
    description: "",
    public: false,
    tech: [],
  });

  useEffect(() => {
    if (data) {
      setProject({
        ...data,
        description: data.description ? data.description : "",
      });
      setIsLoading(false);
    }
  }, [data]);

  const [isLoading, setIsLoading] = useState(true);
  const [supabase] = useAtom(supabaseAtom);
  const {
    userDetails: { userData },
  } = useUser();

  return (
    <AppLayout
      openSidebarItem="projects"
      pageTitle=" Edit Project"
      subtitle="Ooh, what's changed?"
    >
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
                //compare data!.tech to project.tech
                const newTechIds = project.tech.map((t) => t.id);
                const oldTechIds = data!.tech.map((t) => t.id);
                const techIdsToAdd = newTechIds.filter(
                  (id) => !oldTechIds.includes(id)
                );
                const techIdsToRemove = oldTechIds.filter(
                  (id) => !newTechIds.includes(id)
                );

                let { error, status } = await supabase.rpc(
                  "edit_project_with_tech",
                  {
                    var_project_id: data!.id,
                    project_desc: project.description,
                    project_name: project.name,
                    project_public: project.public,
                    // tech_ids: project.tech.map((t) => t.id),
                    tech_ids_to_add: techIdsToAdd,
                    tech_ids_to_remove: techIdsToRemove,
                  }
                );
                if (error) throw error;

                if (status === 204) {
                  return {
                    redirect: `/app/projects/${
                      router.query.projectId as string
                    }`,
                  };
                }
              } catch (error) {
                console.error("Error saving project", error);
              }
            }
            return { error: new Error("User not found") };
          }}
        />
      )}
    </AppLayout>
  );
}
