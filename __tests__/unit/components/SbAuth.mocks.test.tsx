import { render } from "../../utils/jest-utils";
import "@testing-library/jest-dom";
import SbAuth from "@/components/SbAuth";
import { useUserDetails } from "../../../src/hooks/useUserDetails";

jest.mock("../../../src/hooks/useUserDetails");
const mockUseUserDetails = useUserDetails as jest.MockedFunction<
  typeof useUserDetails
>;

describe("Supabase Auth (with mocked data)", () => {
  it("returns empty HTML if the user is logged in", async () => {
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

    const page = render(<SbAuth />);

    expect(page.container).toBeEmptyDOMElement();
  });
});
