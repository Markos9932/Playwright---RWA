import { Page } from '@playwright/test';
import Commands from '../utils/helpers/Commands';

export default class RegistrationPage extends Commands {
  private registrationPageUrl = '/signup';
  private signUpTitle = "[data-test='signup-title']";
  private signUpButton = '[data-test="signup-submit"]';
  private linkSignIn = '[href="\\/signin"]';
  private firstNameText = '#firstName-helper-text';
  private firstNameField = '#firstName';
  private lastNameField = '#lastName';
  private usernameField = '#username';
  private passwordField = '#password';
  private confirmPassField = '#confirmPassword';
  private passwordHelperText = '#password-helper-text';
  private confirmPassHelperText = '#confirmPassword-helper-text';

  constructor(page: Page) {
    super(page); 
  }

  async navigateToRegistrationPage(): Promise<void> {
    await this.page.goto(this.registrationPageUrl);
  }

  async verifySignUpTitle(text: string): Promise<void> {
    await this.verifyVisibilityOfElementWithText(this.signUpTitle, text);
  }

  async verifySignUpButtonDisabled(): Promise<void> {
    await this.verifyDisabledElement(this.signUpButton);
  }

  async verifySignUpButtonEnabled(): Promise<void> {
    await this.verifyEnabledElement(this.signUpButton);
  }

  async verifySigninLink(text: string): Promise<void> {
    await this.verifyVisibilityOfElementWithText(this.linkSignIn, text);
  }

  async clickOnSignUpButton(): Promise<void> {
    await this.clickOnElement(this.signUpButton);
  }

  async verifyFirstNameIsRequired(text: string): Promise<void> {
    await this.verifyVisibilityOfElementWithText(this.firstNameText, text);
  }

  async populateFirstNameField(value: string): Promise<void> {
    await this.clearAndPopulateTextElement(this.firstNameField, value);
  }

  async populateLastNameField(value: string): Promise<void> {
    await this.clearAndPopulateTextElement(this.lastNameField, value);
  }

  async populateUsernameField(value: string): Promise<void> {
    await this.clearAndPopulateTextElement(this.usernameField, value);
  }

  async populatePasswordField(value: string): Promise<void> {
    await this.clearAndPopulateTextElement(this.passwordField, value);
  }

  async populateConfirmPasswordField(value: string): Promise<void> {
    await this.clearAndPopulateTextElement(this.confirmPassField, value);
  }

  async verifyWrongPasswordText(text: string): Promise<void> {
    await this.verifyVisibilityOfElementWithText(this.passwordHelperText, text);
  }

  async verifyWrongConfirmPassText(text: string): Promise<void> {
    await this.verifyVisibilityOfElementWithText(this.confirmPassHelperText, text);
  }

  async populateAndRegisterUserData(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    confirmPassword: string
  ): Promise<void> {
    await this.populateFirstNameField(firstName);
    await this.populateLastNameField(lastName);
    await this.populateUsernameField(username);
    await this.populatePasswordField(password);
    await this.populateConfirmPasswordField(confirmPassword);
    await this.clickOnSignUpButton();
  }
}