import { ProjectCard, AppLayout, Loader } from "@/components";
import { useUserProjects } from "@/hooks/useUserProjects";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const router = useRouter();
  const { isLoading, data } = useUserProjects();
  console.log({ isLoading, data })

  return (
    <AppLayout openSidebarItem="projects" pageTitle="Your Projects">
      {isLoading || data === undefined ? (
        <Loader />
      ) : (
        <div className="flex flex-row flex-wrap">
          <ProjectCard
            title="New Project"
            variant="primary"
            onClick={() => {
              router.push("/app/projects/new");
            }}
          />
          {data?.map(({ description, id, name }) => (
            <ProjectCard
              key={id}
              title={name}
              description={description ? description : undefined}
              onClick={() => {
                router.push(`/app/projects/${id}`);
              }}
            />
          ))}
        </div>
      )}
    </AppLayout>
  );
}
