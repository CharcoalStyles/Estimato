import { AppLayout, ProjectForm } from "@/components";
import { TaskForm } from "@/components/TaskForm";
import { useProject } from "@/hooks/useProject";
import { useUser } from "@/hooks/useUser";
import { supabaseAtom } from "@/util/supabase";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

export default function NewTask() {
  const [supabase] = useAtom(supabaseAtom);

  const router = useRouter();
  const projectId = router.query.projectId as string;
  const { data, refetch } = useProject(projectId);

  return (
    <AppLayout
      openSidebarItem="project"
      pageTitle="New Task"
      subtitle="What are you building?"
    >
      <TaskForm
        onSubmit={async (task) => {
          console.log({ task });
          if (data) {
            try {
              let { error, status } = await supabase.rpc("create_task", {
                project_id: Number.parseInt(projectId),
                task_name: task.name,
                task_desc: task.description,
                task_estimation: task.estimation || 0,
                task_public: task.public,
                task_test_estimation: task.test_estimation || 0,
                tech_ids: task.tech.map((t) => t.id),
              });
              if (error) throw error;

              if (status === 204) {
                const { data } = await refetch();
                return { redirect: `/app/project/${projectId}` };
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
