import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, ViewType } from "@supabase/auth-ui-shared";
import PureModal from "react-pure-modal";
import { useUserDetails } from "../hooks/useUserDetails";
import { supabaseAtom } from "@/util/supabase";
import { useAtom } from "jotai";
import { Text } from "./ui/Text";

type SbAuthProps = {
  open?: boolean;
  view?: ViewType;
  onClose?: () => void;
};

export default function SbAuth({ open, view, onClose }: SbAuthProps) {
  const [supabase] = useAtom(supabaseAtom);
  const { user } = useUserDetails();
  const [authView, setAuthView] = useState<ViewType>(view || "sign_in");
  const [authOpen, setAuthOpen] = useState<boolean>(open || false);

  useEffect(() => {
    setAuthView(view || "sign_in");
  }, [view]);

  useEffect(() => {
    setAuthOpen(open || false);
  }, [open]);

  useEffect(() => {
    supabase.auth.getSession();
  }, []);

  if (user) {
    return null;
  }

  if (!user) {
    return authOpen ? (
      <>
        <div
          className="opacity-40 fixed inset-0 bg-black"
          onClick={() => {
            setAuthOpen(false);
          }}
        />
        <PureModal
          isOpen={authOpen}
          onClose={() => {
            setAuthOpen(false);
            onClose && onClose();
          }}
          className="mx-auto mt-32 px-12 py-8 w-2/5 max-w-xl absolute inset-x-0 bg-black"
        >
          <>
            {authView === "sign_in" && (
              <Text>
                Note, logging in doesn&apos;t redirect or automatically refresh the
                state right now. You&apos;ll need to refresh the page to log in
                properly.
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
        </PureModal>
      </>
    ) : null;
  }
}

const redirect = (authType: ViewType) => {
  switch (authType) {
    case "sign_in":
      return "http://localhost:3000/app";
    case "sign_up":
      return "http://localhost:3000/new-user/";
    default:
      return "http://localhost:3000/";
  }
};
