import { Database } from "@/util/schema";
import { currentUserAtom, supabaseAtom, /*getSupabase*/ } from "@/util/supabase";
// import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const useUserDetails = () => {
  const [supabase] = useAtom(supabaseAtom);
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  useEffect(() => {
    if (currentUser === null) {
      supabase
        .auth.getUser()
        .then(({ data: { user } }) => {
          if (user === null) {
            return;
          }

          setCurrentUser(user);
          refetch();
        });
    }
  }, []);

  const { data, error, isLoading, refetch } = useQuery({
    enabled: false,
    queryKey: ["userData", currentUser?.id ?? ""],
    queryFn: async () => {
      if (currentUser === null) {
        return [];
      }

      const { data, error: dbError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id);

      if (dbError) {
        console.error("Error fetching records:", dbError);
        throw dbError;
      }
      return data;
    },
    // retry: (retries, error) => {
    //   if (error.message === "User not loaded") {
    //     return true;
    //   } else if (error.message === "JWT expired") {
    //     return false;
    //   } else {
    //     return retries < 5; // Retry for all other errors
    //   }
    // },
  });

  if (currentUser === null) {
    return {
      user: currentUser,
      userData: null,
      error,
      isLoading: false,
      refetch,
      clear: () => {
        setCurrentUser(null);
      },
    };
  }

  return {
    user: currentUser,
    userData: data,
    error,
    isLoading,
    refetch,
    clear: () => {
      queryClient.invalidateQueries({ queryKey: [currentUser.id] });
      setCurrentUser(null);
    },
  };
};
