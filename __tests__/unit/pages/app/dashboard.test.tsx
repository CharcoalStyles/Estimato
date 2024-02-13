import { render, waitFor } from "../../../utils/jest-utils";
import App from "../../../../src/pages/app/dashboard";
import "@testing-library/jest-dom";
import { useUserProjects } from "../../../../src/hooks/useUserProjects";
import exp from "constants";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: {
        slug: ["dashboard"],
      },
    };
  },
}));

jest.mock("../../../../src/hooks/useUserProjects");
const mockUseUserProjects = useUserProjects as jest.MockedFunction<
  typeof useUserProjects
>;

const generateMockProjects = (
  data:
    | {
        created_at: string;
        description: string | null;
        id: number;
        name: string;
        public: boolean;
        user_id: string;
      }[]
    | null
    | undefined = undefined,
  error: Error | null = null,
  isLoading: boolean = true
) => {
  mockUseUserProjects.mockImplementation(() => {
    return {
      data,
      error,
      isLoading,
      clear: jest.fn(),
      refetch: jest.fn(),
    };
  });
};

describe("App/Dashboard", () => {
  it("renders the sidebar", async () => {
    generateMockProjects();
    const page = render(<App />);

    expect(page).toBeDefined();

    const sidebar = page.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();
    expect(sidebar.children.length).toBe(3);
    expect(sidebar.children[0].textContent).toBe("Estomato");
    expect(sidebar.children[1].textContent).toBe("Dashboard");
    expect(sidebar.children[2].textContent).toBe("Projects");
  });

  it("renders the loader when waiting for projects", async () => {
    const page = render(<App />);

    expect(page).toBeDefined();

    expect(page.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders the main page (no Projects)", async () => {
    generateMockProjects([], null, false);

    const page = render(<App />);

    expect(page).toBeDefined();

    //get all the project cards by using hte start of the data-testid
    const projectCards = page.getAllByTestId("projectCard", {
      normalizer: (id) => {
        const x = id.split("-")[0];
        return x;
      },
    });
    expect(projectCards).toHaveLength(1);

    expect(projectCards[0]).toHaveTextContent("New Project");
  });

  it("renders the main page (Projects)", async () => {
    generateMockProjects(
      [
        {
          created_at: "now",
          description: "This is a test project",
          id: 1,
          name: "Test Project",
          public: true,
          user_id: "1",
        },
      ],
      null,
      false
    );

    const page = render(<App />);

    expect(page).toBeDefined();
    const projectCards = page.getAllByTestId("projectCard", {
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
