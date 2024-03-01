import { test, expect, Page } from "@playwright/test";

test.describe("Projects", () => {
  const projectData = {
    name: "Test project for e2e testing",
    description:
      "This is just a test project for me to do some automated e2e testing.",
  };
  const projectData2 = {
    name: "Edited project for e2e testing",
    description: "This is just a test project that I have edited.",
  };

  test.describe.configure({ mode: "serial" });

  const loadUser = async ({ page, browserName }:{
    page: Page,
    browserName: string
  }) => {
      const userBadge = page.getByTestId("miniUserBadge");
      await page.getByTestId("loader").waitFor({ state: "detached" });
      await expect(userBadge).toBeVisible();
      await expect(userBadge).toHaveText(`${browserName} ${browserName}`);
    };

  test("New user has no projects", async ({ page, browserName }) => {
    await page.goto("/app/dashboard");

    await loadUser({ page, browserName });
    const projectCards = page.locator('[data-testid^="projectCard-"]');
    expect(await projectCards.count()).toBe(1);

    const newProjectCard = page.getByTestId("projectCard-New Project");
    await expect(newProjectCard).toBeInViewport();
  });

  let projectId = "";

  test("User can create a new project", async ({ page, browserName }) => {
    await page.goto("/app/dashboard");
    
    await loadUser({ page, browserName });

    const newProjectCard = page.getByTestId("projectCard-New Project");
    await expect(newProjectCard).toBeInViewport();
    await newProjectCard.click();

    await page.waitForURL("/app/projects/new", {waitUntil: "domcontentloaded"});
    await page.getByTestId("loader").waitFor({ state: "detached" });

    await page.getByTestId("projectForm-name").click();
    await page.getByTestId("projectForm-name").fill(projectData.name);
    await page.getByTestId("projectForm-name").press("Tab");
    await page
      .getByTestId("projectForm-description")
      .fill(projectData.description);
    await page.getByTestId("projectForm-submit").click();
    await loadUser({ page, browserName });

    await page.waitForURL(/\/app\/projects\/\d+/, {waitUntil: "domcontentloaded"});
    await page.getByTestId("loader").waitFor({ state: "detached" });

    const x = page.url().match(/\/app\/projects\/(\d+)/);
    expect(x).not.toBeNull();

    projectId = x![0];
  });

  test("User can view a project", async ({ page, browserName }) => {
    await page.goto("/app/projects", {waitUntil: "domcontentloaded"});

    await loadUser({ page, browserName });

    await page.getByTestId("loader").waitFor({ state: "detached" });

    const projectCards = page.locator('[data-testid^="projectCard-"]');
    expect(await projectCards.count()).toBe(2);
    const newProject = projectCards.nth(1);
    await expect(newProject).toBeVisible();

    await newProject.click();

    await page.waitForTimeout(50);
    await loadUser({ page, browserName });
    await page.waitForURL(`${projectId}`, {waitUntil: "domcontentloaded"});
    await page.getByTestId("loader").waitFor({ state: "detached" });

    expect(page.getByTestId("layout-title")).toHaveText(projectData.name);
    expect(page.getByTestId("description")).toHaveText(projectData.description);
  });

  test("User can edit a project", async ({ page, browserName }) => {
    await page.goto("/app/dashboard");
    
    await loadUser({ page, browserName });

    await page.goto(`${projectId}`);
    await page.getByTestId("loader").waitFor({ state: "detached" });

    const editButton = page.getByRole("button", { name: "✏️" });
    expect(editButton).toBeVisible();
    await editButton.click({ force: true, clickCount: 2 });

    await page.waitForURL(`${projectId}/edit`, {waitUntil: "domcontentloaded"});
    
    await loadUser({ page, browserName });

    await page.getByTestId("projectForm-name").click();
    await page.getByTestId("projectForm-name").fill(projectData2.name);
    await page.getByTestId("projectForm-name").press("Tab");
    await page
      .getByTestId("projectForm-description")
      .fill(projectData2.description);
    await page.getByTestId("projectForm-submit").click();
    await loadUser({ page, browserName });

    await page.waitForURL(`${projectId}`, {waitUntil: "domcontentloaded"});
    await page.getByTestId("loader").waitFor({ state: "detached" });

    await expect(page.getByTestId("layout-title")).toHaveText(projectData2.name);
    await expect(page.getByTestId("description")).toHaveText(
      projectData2.description
    );
  });

  test("User can delete a project", async ({ page, browserName }) => {
    await page.goto("/app/dashboard");
    
    await loadUser({ page, browserName });

    await page.goto(`${projectId}`);
    await page.getByTestId("loader").waitFor({ state: "detached" });

    const deleteButton = page.getByRole("button", { name: "🗑️" });
    expect(deleteButton).toBeVisible();
    await deleteButton.click({ force: true });

    await expect(page.getByTestId("deleteModal")).toBeVisible();

    const cancelButtonModal = page.getByRole("button", { name: "No" });
    await expect(cancelButtonModal).toBeVisible();

    const deleteButtonModal = page.getByRole("button", { name: "Yes" });
    await expect(deleteButtonModal).toBeVisible();
    await deleteButtonModal.click();

    await page.waitForTimeout(50);

    await page.waitForURL("/app/projects"), {waitUntil: "domcontentloaded"};

    await loadUser({ page, browserName });

    await expect(await page.locator('[data-testid^="projectCard-"]').count()).toBe(1);
  });
});
