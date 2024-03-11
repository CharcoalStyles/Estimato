import { Database } from "@/util/schema";
import { supabaseAtom } from "@/util/supabase";
import { useQuery } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";

type Tech = Database["public"]["Tables"]["tech"]["Row"];
const techAtom = atom<Tech[]>([]);

export const useTech = () => {
  const [supabase] = useAtom(supabaseAtom);
  const [tech, setTech] = useAtom(techAtom);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["tech"],
    queryFn: async () => {

      if (tech.length > 0) {
        return tech;
      }

      const {
        data,
        error: dbError,
      } = await supabase.from("tech").select("*")
      if (dbError) {
        console.error("Error fetching records:", dbError);
        throw dbError;
      }

      return data.sort((a, b) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())) as Tech[];
    },
  });

  if (data && data !== tech) {
    setTech(data);
  }

  return { tech, error, isLoading, refetch };
};
