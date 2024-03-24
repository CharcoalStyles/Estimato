import { AppLayout, Loader, ProjectCard } from "@/components";
import { Text } from "@/components/ui";
import { Card } from "@/components/ui/Card";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const {
    isLoading,
    userDetails: { userData, isLoading: userLoading },
    userProjects,
  } = useUser({ limit: 5 });
  const router = useRouter();

  return (
    <AppLayout
      openSidebarItem="dashboard"
      pageTitle={
        userLoading || userData === null
          ? "Hello!"
          : `Hello, ${userData.first_name}!`
      }
      subtitle="What have you been working on?"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-row flex-wrap">
          <Card
            title="New Project"
            variant="primary"
            onClick={() => {
              router.push("/app/project/new");
            }}
          />
          {userProjects &&
            userProjects.data?.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => {
                  router.push(`/app/project/${project.id}`);
                }}
              />
            ))}
        </div>
      )}
    </AppLayout>
  );
}
