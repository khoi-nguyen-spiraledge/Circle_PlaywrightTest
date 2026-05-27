import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const username = process.env.LOGIN_USERNAME || 'testuser';
const password = process.env.LOGIN_PASSWORD || '123456';

test.describe('Login page', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(username, password);
    await loginPage.expectLoginSuccess();
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('wrong_user', 'wrong_password');
    await loginPage.expectLoginFailed();
  });
});
