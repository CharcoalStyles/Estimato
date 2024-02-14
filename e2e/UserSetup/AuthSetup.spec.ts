import { test, expect, Page } from "@playwright/test";
import fs from "fs";

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
  await page.locator("#preloader").waitFor({ state: "hidden" });
}

test.describe("User Authentication", () => {
  const emailAddress = "est2e-" + Date.now();
  //generate a random password with letters and numbers
  const password = `${Math.random().toString(12).slice(4, 7)}Pa$$${Math.random()
    .toString(12)
    .slice(4, 7)}`;

  test.describe.configure({ mode: "serial" });

  test.beforeAll(async () => {
    console.log("beforeAll");
    //write email addess and password to JSON file
    fs.writeFileSync(
      "e2e/UserSetup/auth.json",
      JSON.stringify({ emailAddress, password })
    );
  });

  test("Generate Email", async ({ page }) => {
    await gotoMail7(page, emailAddress);
    expect(await page.getByRole("textbox").inputValue()).toBe(
      emailAddress + "@mail7.io"
    );
  });

  test("Signup", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign up" }).click();

    await expect(page.locator(".pure-modal")).toBeVisible();

    await page.getByPlaceholder("Your email address").click();
    await page
      .getByPlaceholder("Your email address")
      .fill(`${emailAddress}@mail7.io`);

    await page.getByPlaceholder("Your password").click();
    await page.getByPlaceholder("Your password").fill(password);

    await page
      .getByTestId("sb-auth-modal")
      .getByRole("button", { name: "Sign up" })
      .click();

    await expect(page.getByText("Check your email for the")).toBeVisible({
      timeout: 10000,
    });
  });

  let confirmUrl: string | null;

  test("Signup confirmtion", async ({ page }) => {
    await gotoMail7(page, emailAddress);

    await page.getByText("Estomato test email").click();

    await expect(
      page.getByText("Follow this link to confirm your user:")
    ).toBeVisible();

    confirmUrl = await page
      .frameLocator("iframe")
      .getByRole("link", { name: "Confirm your mail" })
      .getAttribute("href");

    expect(confirmUrl).not.toBeNull();
  });

  test("New user flow", async ({ page, browserName }) => {
    await page.goto(confirmUrl!);

    await page.waitForURL("/new-user");

    await page.getByTestId("firstNameInput").click();
    await page.getByTestId("firstNameInput").fill(browserName);

    await page.getByTestId("lastNameInput").click();
    await page.getByTestId("lastNameInput").fill(browserName);

    await page.getByRole("button", { name: "Submit" }).click();

    await page.waitForTimeout(500);

    expect(
      page.getByRole("button", {
        name: `${browserName} ${browserName}`,
        exact: false,
      })
    ).toBeVisible();

    await page.waitForTimeout(1000);
  });
});
