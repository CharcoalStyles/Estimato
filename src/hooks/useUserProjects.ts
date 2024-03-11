import { supabaseAtom } from "@/util/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useUserDetails } from "./useUserDetails";
import { useEffect } from "react";

export type useUserProjectsProps = {
  limit?: number;
};

export const useUserProjects = (props?: useUserProjectsProps) => {
  const limit = props?.limit ?? 10;
  const [supabase] = useAtom(supabaseAtom);
  const queryClient = useQueryClient();
  const { user } = useUserDetails();

  useEffect(() => {
    if (user === null) {
      return;
    }
    queryClient
      .invalidateQueries({ queryKey: [user.id] })
      .then(() => refetch());
  }, [user]);

  const { data, error, isLoading, refetch } = useQuery({
    enabled: false,
    queryKey: ["userProjects", user?.id ?? ""],
    queryFn: async () => {
      if (user === null) {
        return null;
      }

      const { data, statusText, error: dbError } = await supabase
        .from("projects")
        .select("*,tech (*)")
        .order("created_at", { ascending: false })
        .eq("user_id", user.id)
        .limit(limit);

      if (dbError) {
        console.error("Error fetching records:", dbError);
        throw dbError;
      }
      return data;
    },
  });

  return {
    data,
    error,
    isLoading,
    refetch,
    clear: () => {
      if (user) queryClient.invalidateQueries({ queryKey: [user.id] });
    },
  };
};
