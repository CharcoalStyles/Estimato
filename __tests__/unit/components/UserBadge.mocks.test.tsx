import { fireEvent, render, waitFor, within } from "../../utils/jest-utils";
import "@testing-library/jest-dom";
import { useUserDetails } from "../../../src/hooks/useUserDetails";
import { UserBadge } from "@/components/UserBadge";

jest.mock("../../../src/hooks/useUserDetails");
const mockUseUserDetails = useUserDetails as jest.MockedFunction<
  typeof useUserDetails
>;

describe("User Badge", () => {
  it("Renders the user's name in the button", async () => {
    const firstName = "Test";
    const lastName = "User";
    mockUseUserDetails.mockImplementation(() => {
      return {
        user: {
          id: "string",
          app_metadata: {},
          user_metadata: {},
          aud: "string",
          created_at: "string",
        },
        error: null,
        userData: [
          {
            id: "string",
            first_name: firstName,
            last_name: lastName,
            email: "abc@abc.com",
          },
        ],
        isLoading: false,
        clear: jest.fn(),
        refetch: jest.fn(),
      };
    });

    const page = render(<UserBadge />);

    await waitFor(
      () =>
        expect(
          page.getByRole("button", { name: `${firstName} ${lastName}` })
        ).toBeInTheDocument(),
      { interval: 1000 }
    );
  });

  it("Shows the menu when clicked", async () => {
    const firstName = "Test";
    const lastName = "User";

    mockUseUserDetails.mockImplementation(() => {
      return {
        user: {
          id: "string",
          app_metadata: {},
          user_metadata: {},
          aud: "string",
          created_at: "string",
        },
        error: null,
        userData: [
          {
            id: "string",
            first_name: firstName,
            last_name: lastName,
            email: "abc@abc.com",
          },
        ],
        isLoading: false,
        clear: jest.fn(),
        refetch: jest.fn(),
      };
    });

    const page = render(<UserBadge />);

    await waitFor(
      () =>
        expect(
          page.getByRole("button", { name: `${firstName} ${lastName}` })
        ).toBeInTheDocument(),
      { interval: 1000 }
    );

    //get teh button
    const button = page.getByRole("button", {
      name: `${firstName} ${lastName}`,
    });

    //click the button
    fireEvent.click(button);

    expect(page.getByText("Dashboard")).toBeInTheDocument();
    expect(page.getByText("Logout")).toBeInTheDocument();
  });
});
