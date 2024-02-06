import { test, expect, Page } from "@playwright/test";
import os from "os";

const isMac = os.platform() === "darwin";
const modifier = isMac ? "Meta" : "Control";

async function gotoMail7(page: Page, emailAddress: string) {
  await page.goto("https://mail7.io/");

  await page
    .locator("form")
    .filter({ hasText: "@mail7.io Go to inbox or Try" })
    .getByRole("textbox")
    .click();
  await page
    .locator("form")
    .filter({ hasText: "@mail7.io Go to inbox or Try" })
    .getByRole("textbox")
    .fill(emailAddress);
  await page
    .locator("form")
    .filter({ hasText: "@mail7.io Go to inbox or Try" })
    .getByRole("button")
    .click();

  await page.waitForURL(({ hostname }) => hostname === "console.mail7.io");
}

test.describe("User Authentication", () => {
  const emailAddress = "est2e-" + Date.now();
  test.describe.configure({ mode: "serial" });

  test("Signup", async ({ page }) => {
    test.slow();
    await gotoMail7(page, emailAddress);

    await page.goto("/");
    await page.getByRole("button", { name: "Sign up" }).click();

    await expect(page.locator(".pure-modal")).toBeVisible();

    await page.getByPlaceholder("Your email address").click();
    await page
      .getByPlaceholder("Your email address")
      .fill(`${emailAddress}@mail7.io`);

    await page.getByPlaceholder("Your password").click();
    await page.getByPlaceholder("Your password").fill("Password1234!");

    await page
      .getByTestId("sb-auth-modal")
      .getByRole("button", { name: "Sign up" })
      .click();

    await expect(page.getByText("Check your email for the")).toBeVisible({
      timeout: 10000,
    });
  });

  test("Signup confirmtion and new user flow", async ({ page, browserName }) => {    
    await gotoMail7(page, emailAddress);

    await page.getByText("Estomato test email").click();

    await expect(
      page.getByText("Follow this link to confirm your user:")
    ).toBeVisible();

    const confirmUrl = await page
      .frameLocator("iframe")
      .getByRole("link", { name: "Confirm your mail" })
      .getAttribute("href");

    expect(confirmUrl).not.toBeNull();

    await page.goto(confirmUrl!);

    await page.waitForURL("/new-user");

    await page.getByTestId("firstNameInput").click();
    await page.getByTestId("firstNameInput").fill(browserName);

    await page.getByTestId("lastNameInput").click();
    await page.getByTestId("lastNameInput").fill("Doe");

    await page.getByRole("button", { name: "Submit" }).click();

    await page.waitForTimeout(250);

    expect(
      page.getByRole("button", { name: browserName, exact: false })
    ).toBeVisible();

    await page.waitForTimeout(250);
  });
});
