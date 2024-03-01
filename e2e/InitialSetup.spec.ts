import { test as setup, expect } from "@playwright/test";
import fs from "fs";

const chromiumAuth = "playwright/.auth/chromium/auth.json";
const webkitAuth = "playwright/.auth/webkit/auth.json";

setup.describe(() => {
  setup("Create Auth Files", async () => {
    fs.writeFileSync(chromiumAuth, JSON.stringify({}));
    fs.writeFileSync(webkitAuth, JSON.stringify({}));
  });
});
