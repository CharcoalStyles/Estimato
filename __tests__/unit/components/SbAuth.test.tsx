import { render, waitFor, within } from "../../utils/jest-utils";
import "@testing-library/jest-dom";
import SbAuth from "@/components/SbAuth";
import * as Supabase from "@supabase/supabase-js";
import { supabase as mockSupabase } from "@/util/supabase";

jest.mock("@supabase/supabase-js", () => {
  return {
    __esModule: true,
    // ...jest.requireActual("@supabase/supabase-js"),
    createClient: jest.fn(() => ({
      auth: {
        onAuthStateChange: jest.fn(() => ({
          data: null,
          error: null,
          session: null,
        })),
        getUser: jest.fn(() => {
          console.log("top Mock");
          return { data: null, error: null, session: null };
        }),
      },
    })),
  };
});

describe("Home", () => {
  it("doesn't render the auth modal when not open", async () => {
    jest.spyOn(mockSupabase.auth, "getSession").mockImplementation(() => {
      return new Promise((resolve) =>
        resolve({ data: { session: null }, error: null })
      );
    });

    jest.spyOn(mockSupabase.auth, "getUser").mockImplementation(() => {
      return new Promise((resolve) =>
        resolve({
          data: {
            user: {
              id: "123",
              aud: "123",
              role: "authenticated",
              email: "",
              app_metadata: {},
              user_metadata: {},
              created_at: "",
            },
          },
          error: null,
        })
      );
    });
    const page = render(<SbAuth open={false} view="sign_in" />);

    expect(page.queryByTestId("sb-auth-modal")).not.toBeInTheDocument();
  });

  it("shows the signup modal variant", async () => {
    const page = render(<SbAuth open view="sign_up" />);

    const sbAuthModal = page.getByTestId("sb-auth-modal");

    expect(sbAuthModal).toBeInTheDocument();
    expect(within(sbAuthModal).getByText("Sign up")).toBeInTheDocument();
    expect(
      within(sbAuthModal).getByText("Already have an account? Sign in")
    ).toBeInTheDocument();
  });

  it("shows the login modal variant", async () => {
    const page = render(<SbAuth open view="sign_in" />);

    const sbAuthModal = page.getByTestId("sb-auth-modal");

    waitFor(() => expect(sbAuthModal).toBeInTheDocument(), { interval: 1000 });

    expect(sbAuthModal).toBeInTheDocument();
    expect(within(sbAuthModal).getByText("Sign in")).toBeInTheDocument();
    expect(
      within(sbAuthModal).getByText("Forgot your password?")
    ).toBeInTheDocument();
    expect(
      within(sbAuthModal).getByText("Don't have an account? Sign up")
    ).toBeInTheDocument();
  });
});
