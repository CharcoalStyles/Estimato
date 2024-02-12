import { AppLayout } from "@/components/AppLayout";
import { Button, Text } from "@/components/ui";
import { Input } from "@/components/ui/Input";
import { Database } from "@/util/schema";
import { useState } from "react";

type projectDetails = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  "description" | "name" | "public"
>;

export default function DashboardPage() {
  const [project, setProject] = useState<projectDetails>({
    name: "",
    description: "",
    public: false,
  });
  return (
    <AppLayout
      openSidebarItem="projects"
      pageTitle="New Project"
      subtitle="Tell me all about it!">
      {/* add a form getting the project name and a description */}
      <form
        onSubmit={() => {
          alert("FDFD");
        }}>
        <Input
          placeholder="Project Name"
          value={project.name}
          type="text"
          onChange={(v) =>
            setProject((original) => ({
              ...original,
              name: v,
            }))
          }
        />
        <Button label="Submit" type="submit" />
      </form>
    </AppLayout>
  );
}
