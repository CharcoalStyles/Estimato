import { Button } from "./ui/Button";
import { useState } from "react";
import { getSupabase } from "@/util/supabase";
import clsx from "clsx";
import { useUserDetails } from "@/hooks/useUserData";

export const UserBadge = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data } = useUserDetails();

  return (
    <div className="flex flex-col">
      <div className="relative">
        <Button
          variant="accent"
          size="medium"
          label={`${data?.[0].first_name} ${data?.[0].last_name}`}
          isActive={menuOpen}
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        />
        <div
          className={clsx(
            "dropdown-menu absolute h-auto border border-slate-600 rounded-lg bg-black w-full py-2",
            menuOpen ? "block" : "hidden"
          )}>
          <Button label="Dashboard" fullWidth noBorder />
          <Button
            label="Logout"
            fullWidth
            noBorder
            onClick={() => {
              getSupabase().auth.signOut();
            }}
          />
        </div>
      </div>
    </div>
  );
};
