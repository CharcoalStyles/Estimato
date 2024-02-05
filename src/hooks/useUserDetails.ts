import { Database } from "@/util/schema";
import { currentUserAtom, supabaseAtom /*getSupabase*/ } from "@/util/supabase";
import { User } from "@supabase/supabase-js";
// import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  QueryObserverResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

export const useUserDetails = () => {
  const [supabase] = useAtom(supabaseAtom);
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user === null) {
        return;
      }

      setCurrentUser(user);
      refetch();
    });
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

  console.log({ isLoading, currentUser });
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
