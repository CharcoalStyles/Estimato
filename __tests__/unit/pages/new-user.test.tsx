import { render } from "../../utils/jest-utils";
import NewUser from "@/pages/new-user";
import * as mockUseUserDetails from "../../../src/hooks/useUserData";

import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

jest.mock("../../../src/hooks/useUserData", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../../src/hooks/useUserData"),
  };
});

describe("Home", () => {
  it("renders the new user form", async () => {
    jest.spyOn(mockUseUserDetails, "useUserDetails").mockReturnValue({
      user: null,
      userData: null,
      error: null,
      isLoading: true,
      clear: () => null,
      refetch: () => {
        return new Promise((resolve) => resolve([] as any));
      },
    });

    const page = render(<NewUser />);

    expect(page).toBeDefined();

    const title = page.getByText("Welcome!");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("text-3xl");

    const subtitle = page.getByText("Let's get you setup");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass("text-xl");

    expect(page.getByLabelText("First Name:")).toBeInTheDocument();
    expect(page.getByLabelText("Last Name:")).toBeInTheDocument();

    expect(page.getByText("Submit")).toBeInTheDocument();
  });
});
