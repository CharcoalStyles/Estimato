import { useUserDetails } from "./useUserDetails"
import { useUserProjects } from "./useUserProjects";

export const useUser = () => {
  const {isLoading: detailsLoading, userData, error: detailsError} = useUserDetails();
  const {isLoading: projectsLoading, data, error: projectsError} = useUserProjects();

  return {
    isLoading: detailsLoading || projectsLoading,
    isDetailsLoading: detailsLoading,
    isProjectsLoading: projectsLoading,
    userDetails: userData,
    userProjects: data,
    error: detailsError || projectsError
  }
}