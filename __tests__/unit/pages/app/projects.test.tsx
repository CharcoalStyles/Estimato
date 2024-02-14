import { render } from "../../../utils/jest-utils";
import Project from "../../../../src/pages/app/projects/[projectId]";
import "@testing-library/jest-dom";
import { useProject } from "../../../../src/hooks/useProject";

const routerPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: {
        slug: ["dashboard"],
      },
      push: routerPush,
    };
  },
}));

jest.mock("../../../../src/hooks/useProject");
const mockUserProject = useProject as jest.MockedFunction<typeof useProject>;

const generateMockProject = (
  data:
    | {
        created_at: string;
        description: string | null;
        id: number;
        name: string;
        public: boolean;
        user_id: string;
      }
    | null
    | undefined = undefined,
  error: Error | null = null,
  isLoading: boolean = true
) => {
  mockUserProject.mockImplementation(() => {
    return {
      data,
      error,
      isLoading,
    };
  });
};

describe("App/Dashboard", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the sidebar", async () => {
    generateMockProject();
    const page = render(<Project />);

    expect(page).toBeDefined();

    const sidebar = page.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();
    expect(sidebar.children.length).toBe(3);
    expect(sidebar.children[0].textContent).toBe("Estomato");
    expect(sidebar.children[1].textContent).toBe("Dashboard");
    expect(sidebar.children[2].textContent).toBe("Projects");
  });

  it("renders the loader when waiting for the project", async () => {
    generateMockProject();
    const page = render(<Project />);

    expect(page).toBeDefined();

    expect(page.getByText("Loading...")).toBeInTheDocument();

    expect(page.getByTestId("content-heading")).toBeInTheDocument();

    expect(page.getByTestId("content-heading").children[0]).toBeInTheDocument();
    expect(page.getByTestId("content-heading").children[1]).toBeInTheDocument();

    expect(
      page.getByTestId("content-heading").children[0]
    ).toBeEmptyDOMElement();
    expect(
      page.getByTestId("content-heading").children[1]
    ).toBeEmptyDOMElement();
  });

  it("renders the Project", async () => {
    generateMockProject(
      {
        created_at: "2021-06-17T00:00:00.000Z",
        description: "A project",
        id: 1,
        name: "Project",
        public: true,
        user_id: "1",
      },
      null,
      false
    );

    const page = render(<Project />);

    expect(page).toBeDefined();

    expect(page.getByTestId("content-heading")).toBeInTheDocument();

    expect(page.getByTestId("content-heading").children[0]).toHaveTextContent(
      "Project"
    );
    expect(
      page.getByTestId("content-heading").children[1]
    ).toBeEmptyDOMElement();

    expect(page.getByText("A project")).toBeInTheDocument();
  });

  it("Pushes the user back to /app/projects on error", async () => {
    generateMockProject(
      {
        created_at: "2021-06-17T00:00:00.000Z",
        description: "A project",
        id: 1,
        name: "Project",
        public: true,
        user_id: "1",
      },
      { message: "Error", name: "Error" },
      false
    );

    const page = render(<Project />);

    expect(routerPush).toHaveBeenCalledWith("/app/projects");
  });
});
