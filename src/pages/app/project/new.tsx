import { AppLayout, ProjectForm } from "@/components";
import { useUser } from "@/hooks/useUser";
import { supabaseAtom } from "@/util/supabase";
import { useAtom } from "jotai";


export default function NewProject() {
  const [supabase] = useAtom(supabaseAtom);
  const {
    userDetails: { userData },
    userProjects: { refetch },
  } = useUser();

  return (
    <AppLayout
      openSidebarItem="project"
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
                return { redirect: `/app/project/${data![0].id}` };
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
