import { Database } from "@/util/schema";
import { User } from "@supabase/supabase-js";

type projectDetails = Database["public"]["Tables"]["projects"]["Row"];

export const mockUser = (user: Partial<User> | void): User => {
  const userData: User = {
    app_metadata: {},
    aud: "",
    created_at: "",
    id: "",
    user_metadata: {},
    email: "",
    ...user,
  };
  return userData;
};

export const generateMockProjects = ({
  data,
  ...rest
}: {
  data: Partial<projectDetails>[] | null | undefined;
  error: Error | null;
  isLoading: boolean;
}) => {
  const projectsData: {
    data: projectDetails[] | null | undefined;
    error: Error | null;
    isLoading: boolean;
  } = {
    data: data
      ? data.map(({ created_at, description, id, name, user_id, ...rest }) => ({
          created_at: created_at ?? "now",
          description: description ?? null,
          id: id ?? 1,
          name: name ?? "Test Project",
          user_id: user_id ?? "1",
          public: rest.public ?? false,
          tech:[]
        }))
      : null,
    ...rest,
  };

  return {
    ...projectsData,
    clear: jest.fn(),
    refetch: jest.fn(),
  };
};
