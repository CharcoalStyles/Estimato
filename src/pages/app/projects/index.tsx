import { ProjectCard } from "@/components";
import { AppLayout } from "@/components/AppLayout";
import { Text } from "@/components/ui";
import { useUserProjects } from "@/hooks/useUserProjects";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const router = useRouter();
  const { isLoading, data } = useUserProjects();

  return (
    <AppLayout openSidebarItem="projects" pageTitle="Your Projects">
      {isLoading ? (
        <Text>Loading...</Text>
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
            />
          ))}
        </div>
      )}
    </AppLayout>
  );
}
