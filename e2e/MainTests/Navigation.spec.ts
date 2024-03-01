import { test, expect } from "@playwright/test";

test("Authed user can get to dashboard", async ({ page, browserName }) => {
  await page.goto("/");

  const userButton = page.getByRole("button", { name: browserName });
  expect(userButton).toBeInViewport();
  await userButton.click();

  const dashboardButton = page.getByRole("button", { name: "Dashboard" });
  expect(dashboardButton).toBeInViewport();
  await dashboardButton.click();

  await page.waitForURL("/app/dashboard");
  await page.getByTestId("loader").waitFor({ state: "detached" });

  //wait for browserName to be visible as text 
  const greeting = page.getByText(`Hello, ${browserName}!`);
  await expect(greeting).toBeVisible();
});