import { test, expect } from '@playwright/test';

test.describe('Places App E2E', () => {
  const testUser = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'testpass123',
  };

  test.beforeEach(async ({ page }) => {
    // Navigate to the app before each test
    await page.goto('/');
  });

  test('complete user journey', async ({ page }) => {
    // 1. Sign up
    await test.step('Sign up', async () => {
      await page.click('text=AUTHENTICATE');
      await page.click('text=SWITCH TO SIGNUP');

      await page.fill('input[type="text"]', testUser.name);
      await page.fill('input[type="email"]', testUser.email);
      await page.fill('input[type="password"]', testUser.password);

      await page.click('button:has-text("SIGNUP")');

      // Wait for successful signup
      await expect(page.locator('text=MY PLACES')).toBeVisible();
    });

    // 2. Create a new place
    await test.step('Create new place', async () => {
      await page.click('text=ADD PLACE');

      await page.fill('input[name="title"]', 'Test Place');
      await page.fill(
        'textarea[name="description"]',
        'This is a test place description'
      );
      await page.fill('input[name="address"]', '123 Test Street, Test City');

      // Create a test image file
      const imageBuffer = Buffer.from('fake-image-content');
      await page.setInputFiles('input[type="file"]', {
        name: 'test-image.jpg',
        mimeType: 'image/jpeg',
        buffer: imageBuffer,
      });

      await page.click('button:has-text("ADD PLACE")');

      // Wait for successful place creation
      await expect(page.locator('text=Test Place')).toBeVisible();
    });

    // 3. View place details
    await test.step('View place details', async () => {
      await expect(page.locator('text=Test Place')).toBeVisible();
      await expect(
        page.locator('text=This is a test place description')
      ).toBeVisible();
      await expect(
        page.locator('text=123 Test Street, Test City')
      ).toBeVisible();
    });

    // 4. Edit place
    await test.step('Edit place', async () => {
      await page.click('button:has-text("Edit")');

      await page.fill('input[name="title"]', 'Updated Test Place');
      await page.fill(
        'textarea[name="description"]',
        'This is an updated description'
      );

      await page.click('button:has-text("UPDATE PLACE")');

      // Verify updates
      await expect(page.locator('text=Updated Test Place')).toBeVisible();
      await expect(
        page.locator('text=This is an updated description')
      ).toBeVisible();
    });

    // 5. Delete place
    await test.step('Delete place', async () => {
      await page.click('button:has-text("Delete")');
      await page.click('button:has-text("DELETE")');

      // Verify place is deleted
      await expect(page.locator('text=Updated Test Place')).not.toBeVisible();
    });

    // 6. Logout
    await test.step('Logout', async () => {
      await page.click('text=LOGOUT');

      // Verify logged out state
      await expect(page.locator('text=AUTHENTICATE')).toBeVisible();
    });
  });

  test('handles invalid login', async ({ page }) => {
    await page.click('text=AUTHENTICATE');

    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');

    await page.click('button:has-text("LOGIN")');

    // Verify error message
    await expect(page.locator('text=/Could not log you in/i')).toBeVisible();
  });

  test('validates place form inputs', async ({ page }) => {
    // Login first
    await page.click('text=AUTHENTICATE');
    await page.fill('input[type="email"]', testUser.email);
    await page.fill('input[type="password"]', testUser.password);
    await page.click('button:has-text("LOGIN")');

    await page.click('text=ADD PLACE');

    // Try to submit empty form
    await page.click('button:has-text("ADD PLACE")');

    // Verify validation messages
    await expect(
      page.locator('text=/Please enter a valid title/i')
    ).toBeVisible();
    await expect(
      page.locator('text=/Please enter a valid description/i')
    ).toBeVisible();
    await expect(
      page.locator('text=/Please enter a valid address/i')
    ).toBeVisible();
  });
});
