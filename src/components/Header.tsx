import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useUserDetails } from "@/hooks/useUserData";
import { UserBadge } from "./UserBadge";
import SbAuth from "./SbAuth";

export const Header = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authView, setAuthView] = useState<"sign_in" | "sign_up">("sign_in");
  const { user, isLoading } = useUserDetails();

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

          {isLoading ? null : (
            <div className="flex w-1/2 justify-end content-center">
              {user ? (
                <UserBadge />
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
          )}
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
