import { render, waitFor } from "../../utils/jest-utils";
import "@testing-library/jest-dom";
import { Header } from "@/components/Header";
import { useUserDetails } from "../../../src/hooks/useUserDetails";

jest.mock("../../../src/hooks/useUserDetails");
const mockUseUserDetails = useUserDetails as jest.MockedFunction<
  typeof useUserDetails
>;

describe("Header (with mocks)", () => {
  
  it("renders no auth while waiting for UserDetails", async () => {
    mockUseUserDetails.mockImplementation(() => {
      return {
        user: null,
        error: null,
        userData: null,
        isLoading: true,
        clear: jest.fn(),
        refetch: jest.fn(),
      };
    });

    const page = render(<Header />);

    expect(page.getByTestId("loading-fragment")).toBeInTheDocument();

  });

  it("renders the user badge when logged in", async () => {
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

    const page = render(<Header />);

    await waitFor(
      () => expect(page.getByTestId("auth-userbadge")).toBeInTheDocument(),
      { interval: 1000 }
    );

    expect(page.getByText(`${firstName} ${lastName}`)).toBeInTheDocument();
  });
});
