import { AppLayout, Loader } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Modal, Text } from "@/components/ui";
import { useProject } from "@/hooks/useProject";
import { useAtom } from "jotai";
import { supabaseAtom } from "@/util/supabase";
import { TechIcon } from "@/components/TechIcon";
import { TaskCard } from "@/components/TaskCard";
import { TaskList } from "@/components/TaskList";
import { useTasks } from "@/hooks/useTasks";

export default function ProjectDetailsPage() {
  const router = useRouter();
  const project = useProject(router.query.projectId as string);
  const tasks = useTasks(Number.parseInt(router.query.projectId as string));
  const [isLoading, setIsLoading] = useState(true);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    if (project && !project.isLoading) {
      const { error } = project;

      if (error) {
        router.push("/app/project");
      } else {
        setIsLoading(false);
      }
    }
  }, [project]);

  return (
    <AppLayout
      openSidebarItem="project"
      pageTitle={isLoading ? "" : project.data!.name}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Modal
            data-testid="deleteModal"
            isOpen={isDeleteOpen}
            onClose={() => {
              setIsDeleteOpen(false);
            }}
          >
            <DeleteModalBody
              onClose={() => {
                setIsDeleteOpen(false);
              }}
              projectId={project.data!.id}
            />
          </Modal>
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <div className="flex flex-col">
                <Text data-testid="description">
                  {project.data!.description}
                </Text>
                <div className="mt-8">
                  <Text fontSize="2xl" fontType="heading" tag="h2">
                    Tasks
                  </Text>
                  <div className="my-4 w-full flex flex-row justify-around flex-wrap gap-2">
                    {tasks.isLoading && <Loader />}
                    {!tasks.isLoading && tasks.tasks.length === 0 && (
                      <Text>No tasks found</Text>
                    )}
                    {!tasks.isLoading &&
                      tasks.tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-48 border-l pl-4">
              <Text fontSize="xl" variant="secondary">
                Tools
              </Text>
              <div className="flex mb-4 flex-col gap-2">
                <Button
                  size="small"
                  fullWidth
                  label="➕ New Ticket"
                  variant="basic"
                  onClick={() => {
                    router.push(
                      `/app/project/${router.query.projectId}/task/new`
                    );
                  }}
                />
                <hr />
                <Button
                  size="small"
                  fullWidth
                  label="✏️ Edit"
                  variant="basic"
                  onClick={() => {
                    router.push(`/app/project/${router.query.projectId}/edit`);
                  }}
                />
                <Button
                  size="small"
                  fullWidth
                  label="🗑️ Delete"
                  variant="black"
                  onClick={() => {
                    setIsDeleteOpen(true);
                  }}
                />
              </div>

              <Text fontSize="xl" variant="secondary">
                Tech
              </Text>
              <div className="flex mb-4 flex-col gap-2">
                {project.data!.tech.map((t) => (
                  <div key={t.id} className="flex flex-row items-center">
                    <TechIcon tech={t} size="sm" className="text-white mr-2" />
                    <Text>{t.name}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </AppLayout>
  );
}

type DeleteModalBodyProps = {
  projectId: number;
  onClose: () => void;
};

const DeleteModalBody = ({ onClose, projectId }: DeleteModalBodyProps) => {
  const router = useRouter();
  const [supabase] = useAtom(supabaseAtom);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      <Text>Are you sure you want to delete this project?</Text>
      <div className="flex flex-row gap-2 mt-4">
        <Button
          disabled={isDeleting}
          label="Yes"
          variant="primary"
          onClick={() => {
            setIsDeleting(true);
            supabase
              .from("projects")
              .delete()
              .eq("id", projectId)
              .then(({ status, error }) => {
                if (error) {
                  console.error(error);
                }

                if (status === 204) {
                  router.push("/app/project");
                }
              });
          }}
        />
        <Button
          disabled={isDeleting}
          label="No"
          variant="basic"
          onClick={() => {
            onClose();
          }}
        />
      </div>
    </>
  );
};
