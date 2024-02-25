import { fireEvent, render, waitFor } from "../../utils/jest-utils";
import "@testing-library/jest-dom";
import { ProjectForm } from "@/components";

describe("Header", () => {
  it("Form submits with just Title", async () => {
    const testProject = {
      name: "Test Project",
      description: "",
      public: false,
    };

    const onSubmit = jest.fn(async (project: any) => {
      expect(project.description).toEqual(testProject.description);
      expect(project.name).toEqual(testProject.name);
      expect(project.public).toEqual(testProject.public);

      return {};
    });
    const onInvalid = jest.fn();

    const page = render(
      <ProjectForm onSubmit={onSubmit} onInvalid={onInvalid} />
    );

    expect(page).toBeDefined();

    const title = page.getByTestId("projectForm-name");
    expect(title).toBeInTheDocument();
    fireEvent.change(title, { target: { value: testProject.name } });

    const submitButton = page.getByTestId("projectForm-submit");
    expect(submitButton).toBeInTheDocument();

    expect(fireEvent.click(submitButton)).toBeTruthy();

    await waitFor(() => {
      expect(onInvalid).not.toHaveBeenCalled();
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it("Form submits with Title and Description", async () => {
    const testProject = {
      name: "Test Project",
      description: "This is a test description",
      public: false,
    };

    const onSubmit = jest.fn(async (project: any) => {
      expect(project.description).toEqual(testProject.description);
      expect(project.name).toEqual(testProject.name);
      expect(project.public).toEqual(testProject.public);

      return {};
    });
    const onInvalid = jest.fn();

    const page = render(
      <ProjectForm onSubmit={onSubmit} onInvalid={onInvalid} />
    );

    expect(page).toBeDefined();

    const title = page.getByTestId("projectForm-name");
    expect(title).toBeInTheDocument();
    fireEvent.change(title, { target: { value: testProject.name } });

    const description = page.getByTestId("projectForm-description");
    fireEvent.change(description, {
      target: { value: testProject.description },
    });

    const submitButton = page.getByTestId("projectForm-submit");
    expect(submitButton).toBeInTheDocument();

    expect(fireEvent.click(submitButton)).toBeTruthy();

    await waitFor(() => {
      expect(onInvalid).not.toHaveBeenCalled();
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it("Form fails when no project title is entered", async () => {
    const onSubmit = jest.fn(async (project: any) => {
      return {};
    });
    const onInvalid = jest.fn();

    const page = render(
      <ProjectForm onSubmit={onSubmit} onInvalid={onInvalid} />
    );

    expect(page).toBeDefined();

    const title = page.getByTestId("projectForm-name");
    expect(title).toBeInTheDocument();

    const description = page.getByTestId("projectForm-description");
    fireEvent.change(description, {
      target: { value: "Some text" },
    });

    const submitButton = page.getByTestId("projectForm-submit");
    expect(submitButton).toBeInTheDocument();

    expect(fireEvent.click(submitButton)).toBeTruthy();

    await waitFor(() => {
      expect(onInvalid).toHaveBeenCalled();
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  it("Form submits with correct public option", async () => {
    const testProject = {
      name: "Test Project",
      description: "",
      public: true,
    };

    const onSubmit = jest.fn(async (project: any) => {
      expect(project.description).toEqual(testProject.description);
      expect(project.name).toEqual(testProject.name);
      expect(project.public).toEqual(testProject.public);

      return {};
    });
    const onInvalid = jest.fn();

    const page = render(
      <ProjectForm onSubmit={onSubmit} onInvalid={onInvalid} />
    );

    expect(page).toBeDefined();

    const title = page.getByTestId("projectForm-name");
    expect(title).toBeInTheDocument();
    fireEvent.change(title, { target: { value: testProject.name } });

    const publicCheckbox = page.getByTestId("projectForm-public");
    expect(publicCheckbox).toBeInTheDocument();

    fireEvent.click(publicCheckbox);

    const submitButton = page.getByTestId("projectForm-submit");
    expect(submitButton).toBeInTheDocument();

    expect(fireEvent.click(submitButton)).toBeTruthy();

    await waitFor(() => {
      expect(onInvalid).not.toHaveBeenCalled();
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
