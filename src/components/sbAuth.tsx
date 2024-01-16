import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, ViewType } from "@supabase/auth-ui-shared";
import { useUser } from "@/hooks/userHook";
import { supabase } from "@/util/supabase";

type SbAuthProps = {
  open: boolean;
  view: ViewType;
  onClose?: () => void;
};

export default function SbAuth({ open, view, onClose }: SbAuthProps) {
  const [user, setUser] = useUser();
  const [authView, setAuthView] = useState<ViewType>(view);
  const [authOpen, setAuthOpen] = useState<boolean>(open);

  useEffect(() => {
    setAuthView(view);
  }, [view]);

  useEffect(() => {
    setAuthOpen(open);
  }, [open]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("session", session);
      setUser(session ? session.user : null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? session.user : null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!user) {
    return authOpen ? (
      <>
        <div
          className="opacity-60 fixed inset-0 bg-black"
          onMouseMove={() => {
            console.log("move");
            // setAuthOpen(false);
          }}
          onClick={() => {
            console.log("click");
            setAuthOpen(false);
          }}
        />
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto px-32 py-16 mx-auto max-w-3xl bg-black">
            <button
              className="absolute top-0 right-0 text-white"
              onClick={() => {
                setAuthOpen(false);
                onClose && onClose();
              }}>
              X
            </button>
            <Auth
              supabaseClient={supabase}
              view={authView}
              appearance={{
                theme: ThemeSupa,
                variables: { default: { colors: { inputText: "white" } } },
              }}
              providers={["github", "gitlab", "bitbucket"]}
              socialLayout="horizontal"
            />
          </div>
        </div>
      </>
    ) : null;
  }
}
