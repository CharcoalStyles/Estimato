import { supabaseAtom } from "@/util/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useUserDetails } from "./useUserDetails";
import { useEffect } from "react";

export const useUserProjects = () => {
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

      const { data, error: dbError } = await supabase
        .from("projects")
        .select("*")
        .limit(10);

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

// type UserDetailsReturn = {
//   user: User;
//   userData: [Database["public"]["Tables"]["profiles"]["Row"]];
//   error: Error | null;
//   isLoading: boolean;
//   refetch: () => any;
//   clear: () => void;
// };

// type MockUserDetails = Partial<{
//   user: User;
//   userData: Database["public"]["Tables"]["profiles"]["Row"] | null;
//   error: Error | null;
//   isLoading: boolean;
//   refetch: () => any;
//   clear: () => void;
// }>;

// export const createMockUserDetails = ({
//   user,
//   userData,
//   error,
//   isLoading,
//   refetch,
//   clear,
// }: MockUserDetails) =>
//   ({
//     user,
//     userData: userData ? [userData] : [],
//     error,
//     isLoading,
//     refetch,
//     clear,
//   } as UserDetailsReturn);
