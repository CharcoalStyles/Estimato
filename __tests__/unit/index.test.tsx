import { render } from "@testing-library/react";
import Home from "../../src/pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders the app title", () => {
    const page = render(<Home />);

    expect(page).toBeDefined();

    expect(page.getByText("Estomato")).toBeInTheDocument();
    expect(page.getByText("Estomato")).toHaveClass("text-5xl");
  });

  it("renders the login buttons", () => {
    const page = render(<Home />);

    expect(page.getByText("Login")).toBeInTheDocument();
    expect(page.getByText("Sign up")).toBeInTheDocument();
  });
});
