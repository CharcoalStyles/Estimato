import { render, waitFor } from "../../utils/jest-utils";
import "@testing-library/jest-dom";
import { Header } from "@/components";

describe("Header", () => {
  it("renders the app title", async () => {
    const page = render(<Header>this is a test</Header>);

    expect(page).toBeDefined();

    expect(page.getByText("this is a test")).toBeInTheDocument();
  });

  it("renders the login buttons", async () => {
    const page = render(<Header />);

    await waitFor(
      () => expect(page.getByTestId("auth-userbadge")).toBeInTheDocument(),
      { interval: 1000 }
    );

    expect(page.getByText("Login")).toBeInTheDocument();
    expect(page.getByText("Sign up")).toBeInTheDocument();
  });
});
