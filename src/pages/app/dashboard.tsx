import { AppLayout } from "@/components/AppLayout";
import { ProjectCard } from "@/components/ProjectCard";
import { Text } from "@/components/ui";
import { useUser } from "@/hooks/useUser";
import { useUserDetails } from "@/hooks/useUserDetails";
import { useUserProjects } from "@/hooks/useUserProjects";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const { isDetailsLoading, isLoading, userDetails, userProjects } = useUser();
  const router = useRouter();

  return (
    <AppLayout
      openSidebarItem="dashboard"
      pageTitle={
        isDetailsLoading ? "Hello!" : `Hello, ${userDetails?.first_name}!`
      }
      subtitle="What have you been working on?">
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <div className="flex flex-row">
          <ProjectCard
            title="New Project"
            variant="primary"
            onClick={() => {
              router.push("/app/projects/new");
            }}
          />

          {userProjects?.map(({ description, id, name }) => (
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
