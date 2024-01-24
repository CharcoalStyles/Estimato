import { render, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "@/components/Header";

describe("Home", () => {
  it("renders the app title", () => {
    const page = render(<Header />);

    expect(page).toBeDefined();

    expect(page.getByText("Estomato")).toBeInTheDocument();
    expect(page.getByText("Estomato")).toHaveClass("text-5xl");
  });

  it("renders the login buttons", () => {
    const page = render(<Header />);

    expect(page.getByText("Login")).toBeInTheDocument();
    expect(page.getByText("Sign up")).toBeInTheDocument();
  });
});
