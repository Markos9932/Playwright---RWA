import { Page } from '@playwright/test';
import Commands from '../utils/helpers/Commands';

export default class LoginPage extends Commands {
  private loginPageUrl = '/signin';
  private loginRoute = '**/users';
  private signInTitle = '.MuiTypography-h5.MuiTypography-root';
  private linkSignUp = '[href="\\/signup"]';
  private signInButton = "[data-test='signin-submit']";
  private usernameHelperText = '#username-helper-text';
  private passwordHelperText = '#password-helper-text';
  private usernameField = '#username';
  private passwordField = '#password';
  private invalidUsernameOrPassText = 'div[role="alert"] > .MuiAlert-message';

  constructor(page: Page) {
    super(page); // Prosleđivanje Page objekta klasi Commands
  }

  async loginPageLoadingResponse(): Promise<void> {
    await this.page.route(this.loginRoute, (route) => route.continue());
  }

  async waitLoginPageLoadingResponse(): Promise<void> {
    const response = await this.page.waitForResponse(this.loginRoute);
    if (response.status() !== 201) throw new Error('Login page did not load successfully');
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto(this.loginPageUrl);
  }

  async verifySignInTitle(text: string): Promise<void> {
    await this.verifyVisibilityOfElementWithText(this.signInTitle, text);
  }

  async verifySignUpLink(text: string): Promise<void> {
    await this.verifyVisibilityOfElementWithText(this.linkSignUp, text);
  }

  async verifySignInButtonPresence(): Promise<void> {
    await this.verifyVisibilityOfElement(this.signInButton);
  }

  async populateUsernameField(value: string): Promise<void> {
    await this.clearAndPopulateTextElement(this.usernameField, value);
  }

  async populatePasswordField(value: string): Promise<void> {
    await this.clearAndPopulateTextElement(this.passwordField, value);
  }

  async verifyWrongPasswordText(text: string): Promise<void> {
    await this.verifyVisibilityOfElementWithText(this.passwordHelperText, text);
  }

  async verifyInvalidUsernameOrPasswordText(text: string): Promise<void> {
    await this.verifyVisibilityOfElementWithText(this.invalidUsernameOrPassText, text);
  }

  async clickOnSignInButton(): Promise<void> {
    await this.clickOnElement(this.signInButton);
  }

  async clickOnUsernameField(): Promise<void> {
    await this.clickOnElement(this.usernameField);
  }

  async verifyUsernameRequiredText(text: string): Promise<void> {
    await this.verifyVisibilityOfElementWithText(this.usernameHelperText, text);
  }

  async verifySignInButtonDisabled(): Promise<void> {
    await this.verifyDisabledElement(this.signInButton);
  }

  async userLogin(username: string, password: string): Promise<void> {
    await this.populateUsernameField(username);
    await this.populatePasswordField(password);
    await this.clickOnSignInButton();
  }
}