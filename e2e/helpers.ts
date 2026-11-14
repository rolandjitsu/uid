import {readFile} from "node:fs/promises";
import {extname, join} from "node:path";
import {fileURLToPath} from "node:url";
import type {Page} from "@playwright/test";

declare global {
  interface Window {
    __ready?: boolean;
    __uid: (byteLength?: number) => string;
    __defaultUid: (byteLength?: number) => string;
  }
}

export const ROOT = fileURLToPath(new URL("..", import.meta.url));

const MIME: Record<string, string> = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".map": "application/json"
};

// Serve the repo from disk via request interception, so the page and built bundle load over
// http://localhost (a secure context) with no dev server.
export async function openFixture(page: Page): Promise<void> {
  await page.route("**/*", async route => {
    const {pathname} = new URL(route.request().url());
    const rel = pathname === "/" ? "/e2e/fixture.html" : pathname;
    try {
      const body = await readFile(join(ROOT, rel));
      await route.fulfill({body, contentType: MIME[extname(rel)] ?? "application/octet-stream"});
    } catch {
      await route.fulfill({status: 404});
    }
  });
  await page.goto("http://localhost/");
  await page.waitForFunction(() => window.__ready === true);
}
