import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, ViewType } from "@supabase/auth-ui-shared";
import { useUser } from "@supabase/auth-helpers-react";
import { getSupabase } from "@/util/supabase";
import PureModal from "react-pure-modal";

type SbAuthProps = {
  open: boolean;
  view: ViewType;
  onClose?: () => void;
};

export default function SbAuth({ open, view, onClose }: SbAuthProps) {
  const user = useUser();
  const [authView, setAuthView] = useState<ViewType>(view);
  const [authOpen, setAuthOpen] = useState<boolean>(open);

  useEffect(() => {
    setAuthView(view);
  }, [view]);

  useEffect(() => {
    setAuthOpen(open);
  }, [open]);

  useEffect(() => {
    getSupabase().auth.getSession().then(() => {
      setAuthOpen(false);
    });
  }, []);

  if (!user) {
    return authOpen ? (
      <>
        <div
          className="opacity-40 fixed inset-0 bg-black"
          onClick={() => {
            console.log("click");
            setAuthOpen(false);
          }}
        />
        <PureModal
          isOpen={authOpen}
          onClose={() => {
            console.log("close");
            setAuthOpen(false);
            onClose && onClose();
          }}
          className="mx-auto mt-32 px-12 py-8 w-2/5 max-w-xl absolute inset-x-0 bg-black"
          >
          <Auth
            supabaseClient={getSupabase()}
            view={authView}
            appearance={{
              theme: ThemeSupa,
              variables: { default: { colors: { inputText: "white" } } },
            }}
            providers={["github", "gitlab", "bitbucket"]}
            socialLayout="horizontal"
          />
        </PureModal>
      </>
    ) : null;
  }
}
