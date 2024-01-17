import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
// import { useUser } from "@/hooks/userHook";
import { useUser } from "@supabase/auth-helpers-react";
import SbAuth from "./SbAuth";
import { UserBadge } from "./UserBadge";

export const Header = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authView, setAuthView] = useState<"sign_in" | "sign_up">("sign_in");
  const user = useUser();

  return (
    <>
      <div className="flex flex-row p-4">
        <div className="w-full flex items-center justify-between">
          <a
            className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            href="#">
            <Text fontSize="5xl" fontType="heading" tag="h1" variant="primary">
              Estomato
            </Text>
          </a>

          <div className="flex w-1/2 justify-end content-center">
            {user ? (
              <UserBadge user={user} />
            ) : (
              <>
                <Button
                  variant="primary"
                  label="Login"
                  size="large"
                  className="mr-4"
                  onClick={() => {
                    setShowAuth(true);
                    setAuthView("sign_in");
                  }}
                />
                <Button
                  variant="secondary"
                  label="Sign up"
                  size="large"
                  onClick={() => {
                    setAuthView("sign_up");
                    setShowAuth(true);
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <SbAuth
        open={showAuth}
        view={authView}
        onClose={() => {
          setShowAuth(false);
        }}
      />
    </>
  );
};
