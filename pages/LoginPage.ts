import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  readonly usernameInput = this.page.locator('#username');
  readonly passwordInput = this.page.locator('#password');
  readonly loginButton = this.page.locator('#login-button');
  readonly errorMessage = this.page.locator('#error-message');
  readonly dashboard = this.page.getByTestId('dashboard');

  async goto(): Promise<void> {
    await this.page.goto('/login.html');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginSuccess(): Promise<void> {
    await expect(this.page).toHaveURL(/.*dashboard\.html/);
    //await expect(this.page).toHaveURL(/.*dashboard\.html/); noted
    await expect(this.dashboard).toBeVisible();
    await expect(this.dashboard).toContainText('Login success');
  }

  async expectLoginFailed(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText('Invalid username or password.');
  }
}
