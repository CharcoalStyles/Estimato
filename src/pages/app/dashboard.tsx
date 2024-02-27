import { AppLayout, Loader, ProjectCard } from "@/components";
import { Text } from "@/components/ui";
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
      subtitle="What have you been working on?">
      {isLoading ? (
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
          {userProjects &&
            userProjects.data?.map(({ description, id, name }) => (
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
