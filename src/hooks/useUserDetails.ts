import { Database } from "@/util/schema";
import { supabaseAtom } from "@/util/supabase";
import { User } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const userAtom = atom<User | null>(null);
const userDataAtom = atom<
  Database["public"]["Tables"]["profiles"]["Row"] | null
>(null);

export const useUserDetails = () => {
  const [supabase] = useAtom(supabaseAtom);
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [userData, setUserData] = useAtom(userDataAtom);

  useEffect(() => {
    if (currentUser === null) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user === null) {
          return;
        }
        setCurrentUser(user);
        if (!isLoading) refetchUserData();
      });
    }
  }, []);

  const { error, isLoading, refetch } = useQuery({
    enabled: false,
    queryKey: ["userData", currentUser?.id ?? ""],
    queryFn: async () => {
      if (userData) {
        return userData;
      }

      if (currentUser === null) {
        return null;
      }

      const { data, error: dbError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id);

      if (dbError) {
        console.error("Error fetching records:", dbError);
        throw dbError;
      }
      
      setUserData(data[0]);
      return userData;
    },
  });

  const refetchUserData = () => {
    refetch().then(({ data }) => {
      if (data) setUserData(data);
    });
  };

  return {
    user: currentUser,
    userData,
    error,
    isLoading,
    refetch: refetchUserData,
    clear: () => {
      if (currentUser) {
        queryClient.invalidateQueries({ queryKey: [currentUser.id] });
        setCurrentUser(null);
      }
    },
  };
};

type UserDetailsReturn = {
  user: User;
  userData: [Database["public"]["Tables"]["profiles"]["Row"]];
  error: Error | null;
  isLoading: boolean;
  refetch: () => any;
  clear: () => void;
};

type MockUserDetails = Partial<{
  user: User;
  userData: Database["public"]["Tables"]["profiles"]["Row"] | null;
  error: Error | null;
  isLoading: boolean;
  refetch: () => any;
  clear: () => void;
}>;

export const createMockUserDetails = ({
  user,
  userData,
  error,
  isLoading,
  refetch,
  clear,
}: MockUserDetails) =>
  ({
    user,
    userData: userData ? [userData] : [],
    error,
    isLoading,
    refetch,
    clear,
  } as UserDetailsReturn);
