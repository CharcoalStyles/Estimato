import { useUserDetails } from "./useUserDetails";
import { useUserProjects, useUserProjectsProps } from "./useUserProjects";

type useUserProps = useUserProjectsProps;

export const useUser = (props?: useUserProps) => {
  const userDetails = useUserDetails();
  const userProjects = useUserProjects({
    limit: props?.limit,
  });

  return {
    isLoading: userDetails.isLoading || userProjects.isLoading,
    userDetails,
    userProjects,
    error: userDetails.error || userProjects.error,
  };
};
