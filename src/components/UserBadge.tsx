import { Button } from "./ui/Button";
import { useEffect, useState } from "react";
// import { getSupabase } from "@/util/supabase";
import clsx from "clsx";
import { useUserDetails } from "@/hooks/useUserDetails";
import { useAtom } from "jotai";
import { supabaseAtom } from "@/util/supabase";
import { useRouter } from "next/navigation";

export const UserBadge = () => {
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
    <div className="flex flex-col">
      <div className="relative">
        <Button
          variant="accent"
          size="medium"
          label={label}
          isActive={menuOpen}
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        />
        <div
          className={clsx(
            "dropdown-menu absolute h-auto border border-slate-600 bg-black w-full p-2",
            menuOpen ? "block" : "hidden"
          )}
        >
          <Button
            label="Dashboard"
            fullWidth
            noBorder
            onClick={() => {
              router.push("/app/dashboard");
            }}
          />
          <Button
            label="Logout"
            fullWidth
            noBorder
            onClick={() => {
              clear();
              supabase.auth.signOut();
            }}
          />
        </div>
      </div>
    </div>
  );
};
