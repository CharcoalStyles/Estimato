import { test, expect } from "@playwright/test";
import os from "os";

const isMac = os.platform() === "darwin";
const modifier = isMac ? "Meta" : "Control";

test.describe("User Authentication", () => {
  test.describe.configure({mode: "serial"});

  test("Signup, confirm and new user flow", async ({ page }) => {
    await page.goto("https://internxt.com/temporary-email");
    await page.getByRole("button", { name: "Delete email" }).click();

    const emailDiv = await page
      .locator("div")
      .filter({ hasText: /@(crankymonkey\.info|cashbenties\.com)/ })
      .nth(1)
      .innerText(); //.click();

    const email = emailDiv.split("\n").filter((e) => e.includes("@"))[0];

    await page.goto("/");
    await page.getByRole("button", { name: "Sign up" }).click();

    await expect(page.locator(".pure-modal")).toBeVisible();

    await page.getByPlaceholder("Your email address").click();
    await page.getByPlaceholder("Your email address").fill(email);

    await page.getByPlaceholder("Your password").click();
    await page.getByPlaceholder("Your password").fill("Password1234!");

    await page
      .getByTestId("sb-auth-modal")
      .getByRole("button", { name: "Sign up" })
      .click();

    await expect(page.getByText("Check your email for the")).toBeVisible();
    
    await page.goto("https://internxt.com/temporary-email");
    await page
      .locator("div")
      .filter({ hasText: /^Inbox$/ })
      .getByRole("img")
      .nth(1)
      .click();

    await page
      .getByRole("button", { name:  /[a-zA-Z0-9._%+-]+@charcoalstyles\.com/ })
      .click();
    await page.getByRole("link", { name: "Confirm your mail" }).click();

    //expect to bre redirected to http://localhost:3000/new-user
    await page.waitForURL(({hostname}) => hostname === "localhost")

    //split the page url
    const url = page.url().split("#")[0];

    expect(url).toBe("/new-user");

    await page.getByTestId("firstNameInput").click();
    await page.getByTestId("firstNameInput").fill("John");

    await page.getByTestId("lastNameInput").click();
    await page.getByTestId("lastNameInput").fill("Doe");

    await page.getByRole('button', { name: 'Submit' }).click();
    
    //wait for 2 seconds
    await page.waitForTimeout(250);

    expect(page.getByRole('button', { name: 'John Doe' })).toBeVisible();
  });
});
