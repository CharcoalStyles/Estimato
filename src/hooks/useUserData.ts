import { Database } from "@/util/schema";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";


export const useUserDetails = () => {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  
  return useQuery({
    queryKey: ["isNewUser"],
    queryFn: async () => {
      if (!user) {
        console.error("No user");
        throw new Error("No user");
      }

      const { data, error: dbError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id);

      if (dbError) {
        console.error("Error fetching records:", dbError);
        throw dbError;
      }
      return data;
    },
    retry: (_, error) => {
      if (error.message === "No user") {
        return false; // Don't retry if the error message is 'No user'
      } else {
        return true; // Retry for all other errors
      }
    },
  });
}