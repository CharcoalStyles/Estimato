import { render, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "@/components/Header";
import SbAuth from "@/components/SbAuth";

describe("Home", () => {
  it ('doesn\'t render the auth modal when not open', () => {
    const page = render(<SbAuth open={false} view="sign_in" />);

    expect(page.queryByTestId("sb-auth-modal")).not.toBeInTheDocument();
  })

  it("shows the signup modal variant", () => {
    const page = render(<SbAuth open view="sign_up" />);

    const sbAuthModal =  page.getByTestId("sb-auth-modal");

    expect(sbAuthModal).toBeInTheDocument();
    expect(within(sbAuthModal).getByText("Sign up")).toBeInTheDocument();
    expect(within(sbAuthModal).getByText("Already have an account? Sign in")).toBeInTheDocument();
  })

  it("shows the login modal variant", () => {
    const page = render(<SbAuth open view="sign_in" />);

    const sbAuthModal =  page.getByTestId("sb-auth-modal");

    waitFor(() => expect(sbAuthModal).toBeInTheDocument(), {interval: 1000});

    expect(sbAuthModal).toBeInTheDocument();
    expect(within(sbAuthModal).getByText("Sign in")).toBeInTheDocument();
    expect(within(sbAuthModal).getByText("Forgot your password?")).toBeInTheDocument();
    expect(within(sbAuthModal).getByText("Don't have an account? Sign up")).toBeInTheDocument();
  })
});
