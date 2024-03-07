import { render } from "../../../utils/jest-utils";
import App from "../../../../src/pages/app/dashboard";
import "@testing-library/jest-dom";
import { mockUser, generateMockProjects } from "../../../utils/mockGens";
import { useUserDetails } from "../../../../src/hooks/useUserDetails";
import { useUserProjects } from "../../../../src/hooks/useUserProjects";

jest.mock(".../../../../src/hooks/useUserDetails");
export const mockUseUserDetails = useUserDetails as jest.MockedFunction<
  typeof useUserDetails
>;

jest.mock("../../../../src/hooks/useUserProjects");
export const mockUseUserProjects = useUserProjects as jest.MockedFunction<
  typeof useUserProjects
>;

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: {
        slug: ["dashboard"],
      },
    };
  },
}));

describe("App/Dashboard", () => {
  it("renders the sidebar", async () => {
    mockUseUserProjects.mockImplementation(() => {
      return {
        data: null,
        error: null,
        isLoading: false,
        clear: jest.fn(),
        refetch: jest.fn(),
      };
    });
    mockUseUserDetails.mockImplementation(() => {
      return {
        user: mockUser(),
        userData: {
          first_name: "Test",
          id: "1",
          last_name: "User",
        },
        error: null,
        isLoading: false,
        refetch: jest.fn(),
        clear: jest.fn(),
      };
    });

    const page = render(<App />);

    expect(page).toBeDefined();

    const sidebar = page.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();
    expect(sidebar.children.length).toBe(2);

    const upperSidebar = sidebar.children[0];

    expect(upperSidebar.children[0].textContent).toBe("Estomato");
    expect(upperSidebar.children[1].textContent).toBe("Dashboard");
    expect(upperSidebar.children[2].textContent).toBe("Projects");

    const miniUserBadge = page.getByTestId("miniUserBadge");
    expect(miniUserBadge).toBeInTheDocument();
    expect(miniUserBadge).toHaveTextContent("Test User");
  });

  it("renders the loader when waiting for projects", async () => {
    mockUseUserProjects.mockImplementation(() => {
      return {
        data: null,
        error: null,
        isLoading: true,
        clear: jest.fn(),
        refetch: jest.fn(),
      };
    });

    const page = render(<App />);

    expect(page).toBeDefined();

    expect(page.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders the main page (no Projects)", async () => {
    mockUseUserProjects.mockImplementation(() => {
      return {
        data: null,
        error: null,
        isLoading: false,
        clear: jest.fn(),
        refetch: jest.fn(),
      };
    });
    mockUseUserDetails.mockImplementation(() => {
      return {
        user: mockUser(),
        userData: {
          first_name: "Test",
          id: "1",
          last_name: "User",
        },
        error: null,
        isLoading: false,
        refetch: jest.fn(),
        clear: jest.fn(),
      };
    });

    const page = render(<App />);

    expect(page).toBeDefined();

    //get all the project cards by using hte start of the data-testid
    const projectCards = page.getAllByTestId("card", {
      normalizer: (id) => {
        const x = id.split("-")[0];
        return x;
      },
    });
    expect(projectCards).toHaveLength(1);

    expect(projectCards[0]).toHaveTextContent("New Project");
  });

  it("renders the main page (Projects)", async () => {
    mockUseUserProjects.mockImplementation(() => {
      return generateMockProjects({
        data: [
          {
            created_at: "now",
            description: "Test Project",
            id: 1,
            name: "Test Project",
            user_id: "1",
            public: false,
          },
        ],
        error: null,
        isLoading: false,
      });
    });
    mockUseUserDetails.mockImplementation(() => {
      return {
        user: mockUser(),
        userData: {
          first_name: "Test",
          id: "1",
          last_name: "User",
        },
        error: null,
        isLoading: false,
        refetch: jest.fn(),
        clear: jest.fn(),
      };
    });

    const page = render(<App />);

    expect(page).toBeDefined();
    const projectCards = page.getAllByTestId("card", {
      normalizer: (id) => {
        const x = id.split("-")[0];
        return x;
      },
    });
    expect(projectCards).toHaveLength(2);

    expect(projectCards[0]).toHaveTextContent("New Project");
    expect(projectCards[1]).toHaveTextContent("Test Project");
  });
});
