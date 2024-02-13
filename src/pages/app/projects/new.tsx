import { AppLayout } from "@/components/AppLayout";
import { Button, Text } from "@/components/ui";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { useUser } from "@/hooks/useUser";
import { useUserDetails } from "@/hooks/useUserDetails";
import { Database } from "@/util/schema";
import { supabaseAtom } from "@/util/supabase";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";

type projectDetails = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  "description" | "name" | "public"
>;

export default function DashboardPage() {
  const router = useRouter();
  const [supabase] = useAtom(supabaseAtom);
  const {
    userDetails: { userData },
    userProjects: { refetch },
  } = useUser();
  const [project, setProject] = useState<
    projectDetails & { description: string }
  >({
    name: "",
    description: "",
    public: false,
  });
  const [hasFormError, setHasFormError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  return (
    <AppLayout
      openSidebarItem="projects"
      pageTitle="New Project"
      subtitle="Tell me all about it!"
    >
      <form
        className="w-1/2"
        onInvalid={() => setHasFormError(true)}
        onSubmit={(e) => {
          e.preventDefault();
          console.log({ userData });
          if (userData) {
            setIsSaving(true);
            console.log("Saving...");
            try {
              supabase
                .from("projects")
                .insert({
                  ...project,
                  user_id: userData.id,
                })
                .throwOnError()
                .then((insert) => {
                  console.log({ insert });
                  refetch().then((refresh) => {
                    console.log({ refresh });
                    router.push("/app/projects");
                  });
                });
            } catch (error) {
              console.error(error);
            }
          }
        }}
      >
        <Input
          label="Project Name *"
          value={project.name}
          type="text"
          required
          onChange={(v) =>
            setProject((original) => ({
              ...original,
              name: v,
            }))
          }
          showErrors={hasFormError}
          disabled={isSaving}
        />
        <TextArea
          label="Project Description"
          value={project.description}
          onChange={(v) =>
            setProject((original) => ({
              ...original,
              description: v,
            }))
          }
          disabled={isSaving}
        />
        <Checkbox
          label="Make it public?"
          checked={project.public}
          onChange={(v) =>
            setProject((original) => ({
              ...original,
              public: v,
            }))
          }
          disabled={isSaving}
        />

        <Button label={isSaving ? "Submitting..." : "Submit"} type="submit" />
      </form>
    </AppLayout>
  );
}
