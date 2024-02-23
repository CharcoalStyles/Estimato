import { AppLayout } from "@/components/AppLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Modal, Text } from "@/components/ui";
import { useProject } from "@/hooks/useProject";
import { useAtom } from "jotai";
import { supabaseAtom } from "@/util/supabase";

export default function ProjectDetailsPage() {
  const router = useRouter();
  const project = useProject(router.query.projectId as string);
  const [isLoading, setIsLoading] = useState(true);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
          <Modal
            isOpen={isDeleteOpen}
            onClose={() => {
              setIsDeleteOpen(false);
            }}>
            <DeleteModalBody onClose={()=> {
              setIsDeleteOpen(false);
            }} projectId={project.data!.id} />
          </Modal>
          <div className="flex mb-4 flex-row gap-2">
            <Button
              size="small"
              label="✏️"
              variant="basic"
              onClick={() => {
                router.push(`/app/projects/${router.query.projectId}/edit`);
              }}
            />
            <Button
              size="small"
              label="🗑️"
              variant="black"
              onClick={() => {
                setIsDeleteOpen(true);
              }}
            />
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
            supabase.from("projects").delete().eq("id", projectId).then(({status, error}) => {
              if (error) {
                console.error(error);
              }

              if (status === 204) {
                router.push("/app/projects");
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
