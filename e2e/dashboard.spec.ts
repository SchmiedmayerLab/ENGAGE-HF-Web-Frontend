//
// This source file is part of the ENGAGE-HF Web Frontend open-source project
//
// SPDX-FileCopyrightText: 2026 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { expect, test, type Page } from "@playwright/test";

// Credentials come from the ENGAGE-HF-Firebase debug seed (data/debug/users.json).
const adminEmail = "engagehf-admin0@stanford.edu";
const adminPassword = "password";
const adminName = "Engage Admin0";

const signIn = async (page: Page) => {
  await page.goto("/sign-in");
  await page.getByLabel("Email").fill(adminEmail);
  await page.getByLabel("Password").fill(adminPassword);
  await page.getByRole("button", { name: "Sign In", exact: true }).click();
  await expect(page.getByRole("button", { name: adminName })).toBeVisible({
    timeout: 15_000,
  });
};

const openPatients = async (page: Page) => {
  await page.getByRole("link", { name: "Patients", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Patients", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Stanford Patient0")).toBeVisible({
    timeout: 15_000,
  });
};

test("presents the identity providers and the email sign-in form", async ({
  page,
}) => {
  await page.goto("/sign-in");
  await expect(
    page.getByRole("button", { name: "Sign in with Stanford" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Sign in with Johns Hopkins" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Sign in with Michigan" }),
  ).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
});

test("signs an administrator in and shows the home dashboard", async ({
  page,
}) => {
  await signIn(page);
  await expect(
    page.getByRole("heading", { name: "Notifications" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Upcoming Appointments" }),
  ).toBeVisible();
});

test("lists the seeded patients and opens a patient page", async ({ page }) => {
  await signIn(page);
  await openPatients(page);
  await page.getByText("Stanford Patient0").first().click();
  await expect(
    page.getByRole("heading", { name: /Stanford Patient0/ }),
  ).toBeVisible({ timeout: 15_000 });
});

test("walks the patient page tabs", async ({ page }) => {
  await signIn(page);
  await openPatients(page);
  await page.getByText("Stanford Patient0").first().click();
  await expect(
    page.getByRole("heading", { name: /Stanford Patient0/ }),
  ).toBeVisible({ timeout: 15_000 });
  for (const tab of ["Medications", "Labs", "Appointments", "Measurements"]) {
    await page.getByRole("tab", { name: tab }).click();
    await expect(page.getByRole("tab", { name: tab })).toHaveAttribute(
      "data-state",
      "active",
    );
  }
});

test("shows the notifications page", async ({ page }) => {
  await signIn(page);
  await page.getByRole("link", { name: "Notifications", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Notifications", exact: true }),
  ).toBeVisible();
});

test("shows the clinic users to an administrator", async ({ page }) => {
  await signIn(page);
  await page.getByRole("link", { name: "Users" }).click();
  await expect(
    page.getByRole("heading", { name: "Users", exact: true }),
  ).toBeVisible();
  await expect(page.getByText(adminEmail).first()).toBeVisible({
    timeout: 15_000,
  });
});

test("signs the administrator out again", async ({ page }) => {
  await signIn(page);
  await page.getByRole("button", { name: adminName }).click();
  await page.getByRole("menuitem", { name: "Sign Out" }).click();
  await expect(page.getByLabel("Email")).toBeVisible({ timeout: 15_000 });
});
