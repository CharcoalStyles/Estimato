import { render, waitFor } from "../../utils/jest-utils";
import "@testing-library/jest-dom";
import { ProjectCard } from "@/components";

describe("Header", () => {
  it("renders the card", async () => {
    const page = render(
      <ProjectCard title="Test Title" description="Just a simple description" />
    );

    expect(page).toBeDefined();

    const title = page.getByText("Test Title");

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("text-xl font-heading");

    const description = page.getByText("Just a simple description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass("text-base font-body");
  });

  it("handles a click", async () => {
    const onClick = jest.fn();
    const page = render(
      <ProjectCard
        title="Test Title"
        description="Just a simple description"
        onClick={onClick}
      />
    );

    expect(page).toBeDefined();

    const card = page.getByTestId("projectCard-Test Title");

    card.click();

    await waitFor(() => {
      expect(onClick).toHaveBeenCalled();
    });
  });
});
