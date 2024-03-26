import { Database } from "@/util/schema";
import { supabaseAtom } from "@/util/supabase";
import { useQuery } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";


export const useTasks = (projectId: number) => {
  const [supabase] = useAtom(supabaseAtom);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["task", projectId],
    queryFn: async () => {
      const { data, error: dbError } = await supabase
        .from("tasks")
        .select("*, tech(*)");
      if (dbError) {
        console.error("Error fetching records:", dbError);
        throw dbError;
      }

      return data;
    },
  });

  return { tasks: data? data: [], error, isLoading, refetch };
};

export type UseTask = ReturnType<typeof useTasks>['tasks'][0];