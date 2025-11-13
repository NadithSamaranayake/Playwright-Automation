import { test, expect } from '@playwright/test';

test.describe('Swag Labs E-Commerce Flow', () => {

    test('should login and add an item to the cart', async ({ page }) => {
        // 1. Go to the login page
        await page.goto('https://www.saucedemo.com/');

        // 2. Fill in the username and password
        // (These are public demo credentials provided by the site)
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');

        // 3. Click Login
        await page.locator('[data-test="login-button"]').click();

        // 4. Verify we are on the inventory page
        await expect(page).toHaveURL(/.*inventory.html/);

        // 5. Add "Sauce Labs Backpack" to the cart
        // We use the specific 'data-test' attribute which is best practice
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // 6. Go to the Cart
        await page.locator('.shopping_cart_link').click();

        // 7. Assert that the Backpack is actually in the cart
        await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
        
        // 8. (Optional) check that quantity is 1
        await expect(page.locator('.cart_quantity')).toHaveText('1');
    });

});