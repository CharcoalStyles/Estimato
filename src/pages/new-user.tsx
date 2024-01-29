import React, { useEffect, useState } from "react";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useUserDetails } from "@/hooks/useUserData";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { supabaseAtom } from "@/util/supabase";

const NewUserPage: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [supabase] = useAtom(supabaseAtom);
  const { user, userData, error, refetch } = useUserDetails();

  useEffect(() => {
    if (error) {
      router.push("/");
    }
  }, [error]);

  useEffect(() => {
    if (userData) {
      if (userData.length === 0) {
        return;
      }
      router.push("/");
    } else {
      refetch();
    }
  }, [userData, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Text fontSize="2xl" variant="primary" fontType="body">
          Getting everything ready...
        </Text>
      </div>
    );
  }

  return (
    <NewUserForm
      onSubmit={(result) => {
        if (!user) return;

        setLoading(true);
        supabase
          .from("profiles")
          .insert({
            id: user.id,
            first_name: result.firstName,
            last_name: result.lastName,
          })
          .then(({ error, status }) => {
            if (error) {
              console.error("Error inserting user:", error);
              return;
            }
            if (status !== 201) {
              console.error("Error inserting user:", status);
              return;
            }
            queryClient.invalidateQueries({ queryKey: [user.id] });
            setLoading(false);
            router.push("/");
          });
      }}
    />
  );
};

export default NewUserPage;

type NewUserFormProps = {
  onSubmit: (result: { firstName: string; lastName: string }) => void;
};

const NewUserForm = ({ onSubmit }: NewUserFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName === "" || lastName === "") return;

    onSubmit({ firstName, lastName });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Text fontSize="3xl" fontType="heading" variant="primary">
        Welcome!
      </Text>
      <Text fontSize="xl" fontType="body">
        Let's get you setup
      </Text>
      <div className="pt-4 flex flex-col">
        <form className="pt-4 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstNameInput">
            <Text>First Name:</Text>
          </label>
          <input
            type="text"
            id="firstNameInput"
            placeholder="Kaysen"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-2"
          />
          <label htmlFor="lastNameInput">
            <Text>Last Name:</Text>
          </label>
          <input
            type="text"
            id="lastNameInput"
            placeholder="Ridenour"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-2"
          />
          <Button variant="secondary" label="Submit" />
        </form>
      </div>
    </div>
  );
};
