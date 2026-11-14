import {expect, test} from "@playwright/test";
import {openFixture} from "./helpers";

test.beforeEach(async ({page}) => {
  await openFixture(page);
});

test("exposes both named and default uid exports from the built bundle", async ({page}) => {
  const isSame = await page.evaluate(() => typeof window.__uid === "function" && window.__uid === window.__defaultUid);
  expect(isSame).toBe(true);
});

test("generates URL-safe random UIDs of the expected length in Chromium", async ({page}) => {
  const result = await page.evaluate(() => {
    const defaultId = window.__uid();
    const customId = window.__uid(18);
    const batch = Array.from({length: 500}, () => window.__uid(12));
    return {
      defaultId,
      customId,
      uniqueCount: new Set(batch).size,
      allUrlSafe: batch.every(id => /^[A-Za-z0-9_-]+$/.test(id))
    };
  });

  expect(result.defaultId).toHaveLength(16);
  expect(result.customId).toHaveLength(24);
  expect(result.uniqueCount).toBe(500);
  expect(result.allUrlSafe).toBe(true);
});
