import { ProjectCard } from "@/components/ProjectCard";
import { Text } from "@/components/ui";
import { useUserProjects } from "@/hooks/useUserProjects";

export const Dashboard = () => {
  const { isLoading, data } = useUserProjects();

  return (
    <div className="flex flex-col">
      <div className="mt-8">
        <Text fontSize="xl" fontType="heading" variant="base">
          Recent Projects
        </Text>

        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <div className="flex flex-row">
            <ProjectCard title="New Project" variant="primary" />

            {data?.map(({ description, id, name }) => (
              <ProjectCard
                key={id}
                title={name}
                description={description ? description : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
