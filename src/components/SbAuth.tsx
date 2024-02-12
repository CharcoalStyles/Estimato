import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, ViewType } from "@supabase/auth-ui-shared";
import { useUserDetails } from "../hooks/useUserDetails";
import { supabaseAtom } from "@/util/supabase";
import { useAtom } from "jotai";
import { Modal, Text } from "@/components/ui";

type SbAuthProps = {
  isOpen?: boolean;
  view?: ViewType;
  onClose?: () => void;
};

export function SbAuth({ isOpen, view, onClose }: SbAuthProps) {
  const [supabase] = useAtom(supabaseAtom);
  const { user } = useUserDetails();
  const [authView, setAuthView] = useState<ViewType>(view || "sign_in");

  useEffect(() => {
    setAuthView(view || "sign_in");
  }, [view]);

  useEffect(() => {
    supabase.auth.getSession();
  }, []);

  if (user) {
    return null;
  }

  if (!user) {
    return isOpen? (
      <Modal isOpen={isOpen} onClose={() => onClose && onClose()}>
        <>
          {authView === "sign_in" && (
            <Text>
              Note, logging in doesn&apos;t redirect or automatically refresh
              the state right now. You&apos;ll need to refresh the page to log
              in properly.
            </Text>
          )}
          <div data-testid="sb-auth-modal">
            <Auth
              supabaseClient={supabase}
              view={authView}
              appearance={{
                theme: ThemeSupa,
                variables: { default: { colors: { inputText: "white" } } },
              }}
              providers={["github", "gitlab", "bitbucket"]}
              socialLayout="horizontal"
              redirectTo={redirect(authView)}
            />
          </div>
        </>
      </Modal>
    ): null;
  }
}

const redirect = (authType: ViewType) => {
  const currentLocation = window.location.origin;

  switch (authType) {
    case "sign_in":
      return `${currentLocation}/app`;
    case "sign_up":
    default:
      return `${currentLocation}/`;
  }
};
