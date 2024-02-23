import { AppLayout } from "@/components/AppLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Text } from "@/components/ui";
import { useProject } from "@/hooks/useProject";

export default function ProjectDetailsPage() {
  const router = useRouter();
  const project = useProject(router.query.projectId as string);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (project && !project.isLoading) {
      const { error } = project;

      if (error) {
        router.push("/app/projects");
      } else {
        setIsLoading(false);
      }
    }
  }, [project]);

  return (
    <AppLayout
      openSidebarItem="projects"
      pageTitle={isLoading ? "" : project.data!.name}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <div className="flex mb-4 flex-row gap-2">
            <Button size="small" label="✏️" variant="basic" onClick={() => {
              router.push(`/app/projects/${router.query.projectId}/edit`);
            }}/>
            <Button size="small" label="🗑️" variant="black" />
          </div>
          <div className="flex flex-row flex-wrap">
            <div>
              <Text>{project.data!.description}</Text>
            </div>
          </div>
        </>
      )}
    </AppLayout>
  );
}
