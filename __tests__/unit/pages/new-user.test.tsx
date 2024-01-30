import { render } from "../../utils/jest-utils";
import NewUser from "@/pages/new-user";
import "@testing-library/jest-dom";
import { useUserDetails } from "../../../src/hooks/useUserDetails";
import { useRouter } from "next/navigation";

jest.mock("../../../src/hooks/useUserDetails");
const mockUseUserDetails = useUserDetails as jest.MockedFunction<
  typeof useUserDetails
>;

jest.mock("next/navigation");
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockPush = jest.fn();
mockUseRouter.mockImplementation(() => {
  return {
    push: mockPush,
    back: jest.fn(),
    prefetch: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  };
});

describe("Home", () => {
  it("navigates to root if there is no user", async () => {
    mockUseUserDetails.mockImplementation(() => {
      return {
        user: null,
        error: null,
        userData: null,
        isLoading: false,
        clear: jest.fn(),
        refetch: jest.fn(),
      };
    });

    render(<NewUser />);

    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("renders the new user form", async () => {
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
        userData: [],
        isLoading: false,
        clear: jest.fn(),
        refetch: jest.fn(),
      };
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

  it("navigates to root if user already has a row", async () => {
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
            first_name: "Test",
            last_name: "User",
            email: "abc@abc.com",
          },
        ],
        isLoading: false,
        clear: jest.fn(),
        refetch: jest.fn(),
      };
    });

    render(<NewUser />);

    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
