import { render } from "../../../utils/jest-utils";
import Project from "../../../../src/pages/app/project/[projectId]";
import "@testing-library/jest-dom";
import { useUserProjects } from "@/hooks/useUserProjects";
import { generateMockProjects } from "../../../utils/mockGens";

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

jest.mock("../../../../src/hooks/useUserProjects");
export const mockUseUserProjects = useUserProjects as jest.MockedFunction<
  typeof useUserProjects
>;

describe("App/Dashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the sidebar", async () => {
    mockUseUserProjects.mockImplementation(() => {
      return generateMockProjects({
        data: [],
        error: null,
        isLoading: false,
      });
    });
    const page = render(<Project />);

    expect(page).toBeDefined();

    const sidebar = page.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();
    expect(sidebar.children.length).toBe(2);

    expect(sidebar.children[0].children[0].textContent).toBe("Estomato");
    expect(sidebar.children[0].children[1].textContent).toBe("Dashboard");
    expect(sidebar.children[0].children[2].textContent).toBe("Projects");
  });

  it("renders the loader when waiting for the project", async () => {
    mockUseUserProjects.mockImplementation(() => {
      return generateMockProjects({
        data: [],
        error: null,
        isLoading: true,
      });
    });
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

  it.failing("renders the Project", async () => {
    mockUseUserProjects.mockImplementation(() => {
      return generateMockProjects({
        data: [
          {
            created_at: "2021-06-17T00:00:00.000Z",
            description: "A project",
            id: 1,
            name: "Project",
            public: true,
            user_id: "1",
            tech: [],
          },
        ],
        error: null,
        isLoading: true,
      });
    });
    const page = render(<Project />);

    expect(page).toBeDefined();

    expect(page.getByTestId("content-heading")).toBeInTheDocument();
    console.log(page.getByTestId("content-heading").children[0].textContent);

    expect(page.getByTestId("content-heading").children[0]).toHaveTextContent(
      "Project"
    );

    expect(
      page.getByTestId("content-heading").children[1]
    ).toBeEmptyDOMElement();

    expect(page.getByText("A project")).toBeInTheDocument();
  });

  it.failing("Pushes the user back to /app/project on error", async () => {
    mockUseUserProjects.mockImplementation(() => {
      return generateMockProjects({
        data: [
          {
            created_at: "2021-06-17T00:00:00.000Z",
            description: "A project",
            id: 1,
            name: "Project",
            public: true,
            user_id: "1",
            tech: [],
          },
        ],
        error: { message: "Error", name: "Error" },
        isLoading: true,
      });
    });

    const page = render(<Project />);

    expect(routerPush).toHaveBeenCalledWith("/app/project");
  });
});
