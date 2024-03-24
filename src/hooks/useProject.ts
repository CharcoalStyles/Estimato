import { supabaseAtom } from "@/util/supabase";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

export const useProject = (projectId: string) => {
  const [supabase] = useAtom(supabaseAtom);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*, tech(*)")
        .eq("id", projectId)
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
  });

  return { data, error, isLoading, refetch };
};
