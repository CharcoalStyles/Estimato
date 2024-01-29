import { render, waitFor } from "../../utils/jest-utils";
import "@testing-library/jest-dom";
import { Header } from "@/components/Header";

describe("Home", () => {
  it("renders the app title", async () => {
    const page = render(<Header />);

    expect(page).toBeDefined();

    expect(page.getByText("Estomato")).toBeInTheDocument();
    expect(page.getByText("Estomato")).toHaveClass("text-5xl");
  });

  it("renders the login buttons", async () => {
    const page = render(<Header />);
    
    await waitFor(() => expect(page.getByText("Login")).toBeInTheDocument(), {interval: 1000});

    expect(page.getByText("Login")).toBeInTheDocument();
    expect(page.getByText("Sign up")).toBeInTheDocument();
  });
});
