import { Button } from "./ui/Button";
import { useEffect, useState } from "react";
import { useUserDetails } from "@/hooks/useUserDetails";
import { useAtom } from "jotai";
import { supabaseAtom } from "@/util/supabase";
import { useRouter } from "next/router";

export const MiniUserBadge = () => {
  const [supabase] = useAtom(supabaseAtom);
  const [menuOpen, setMenuOpen] = useState(false);
  const { userData, refetch, clear } = useUserDetails();

  const [label, setLabel] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      setLabel(`${userData.first_name} ${userData.last_name}`);
    } else {
      refetch();
    }
  }, [userData]);

  return (
    <div data-testid="miniUserBadge" className="flex flex-col">
      {menuOpen ? (
        <div className="flex flex-row space-x-2">
          <Button
            className="flex-grow"
            label="Logout"
            variant="danger"
            noBorder
            onClick={() => {
              clear();
              supabase.auth.signOut();
              router;
            }}
          />
          <Button
            className="flex-1"
            variant="accent"
            size="medium"
            label="X"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          />
        </div>
      ) : (
        <Button
          className="flex-1"
          variant="accent"
          size="medium"
          label={label}
          isActive={menuOpen}
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        />
      )}
    </div>
  );
};
