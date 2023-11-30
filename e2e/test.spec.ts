import { test, expect } from '@playwright/test';

test('Opens correct NextJS docs', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Docs -> Find in-depth' }).click();
  const page1 = await page1Promise;
  await page1.waitForLoadState('networkidle');
  expect(page1.url()).toContain('https://nextjs.org/docs');
});