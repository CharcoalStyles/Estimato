import { AppLayout, ProjectForm } from "@/components";
import { useUser } from "@/hooks/useUser";
import { Database } from "@/util/schema";
import { supabaseAtom } from "@/util/supabase";
import { useAtom } from "jotai";
import { useState } from "react";

type projectDetails = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  "description" | "name" | "public"
>;

export default function NewProject() {
  const [supabase] = useAtom(supabaseAtom);
  const {
    userDetails: { userData },
    userProjects: { refetch },
  } = useUser();
  const [project, setProject] = useState<
    projectDetails & { description: string }
  >({
    name: "",
    description: "",
    public: false,
  });

  return (
    <AppLayout
      openSidebarItem="projects"
      pageTitle="New Project"
      subtitle="Tell me all about it!">
      <ProjectForm
        onSubmit={async (project) => {
          if (userData) {
            try {
              let { error, status } = await supabase.rpc(
                "create_project_with_tech",
                {
                  project_desc: project.description,
                  project_name: project.name,
                  project_public: project.public,
                  tech_ids: project.tech.map((t) => t.id),
                }
              );
              if (error) throw error;

              if (status === 204) {
                const { data } = await refetch();
                return { redirect: `/app/projects/${data![0].id}` };
              }
            } catch (error) {
              return { error: error as Error };
            }
          }
          return { error: new Error("User not found") };
        }}
      />
    </AppLayout>
  );
}
