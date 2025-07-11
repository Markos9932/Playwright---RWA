import { Page } from '@playwright/test';
import Commands from '../utils/helpers/Commands';

export default class MyAccountPage extends Commands {
  private sidenavFirstName = '[data-test="sidenav-user-full-name"]';
  private sidenavUsername = '[data-test="sidenav-username"]';
  private firstNameField = '#user-settings-firstName-input';
  private lastNameField = '#user-settings-lastName-input';
  private emailField = '#user-settings-email-input';
  private phoneField = '#user-settings-phoneNumber-input';
  private saveButton = '[data-test="user-settings-submit"]';
  private homeLink = '[data-test="sidenav-home"]';
  private logoutButton = '[data-test="sidenav-signout"]';

  constructor(page: Page) {
    super(page); // Prosleđivanje Page objekta klasi Commands
  }

  async verifySidenavFirstName(expectedFirstName: string): Promise<void> {
    await this.verifyVisibilityOfElementWithText(this.sidenavFirstName, expectedFirstName);
  }

  async verifySidenavUsername(expectedUsername: string): Promise<void> {
    await this.verifyVisibilityOfElementWithText(this.sidenavUsername, expectedUsername);
  }

  async populateFirstNameField(value: string): Promise<void> {
    await this.clearAndPopulateTextElement(this.firstNameField, value);
  }

  async populateLastNameField(value: string): Promise<void> {
    await this.clearAndPopulateTextElement(this.lastNameField, value);
  }

  async populateEmailField(value: string): Promise<void> {
    await this.clearAndPopulateTextElement(this.emailField, value);
  }

  async populatePhoneField(value: string): Promise<void> {
    await this.clearAndPopulateTextElement(this.phoneField, value);
  }

  async clickSaveButton(): Promise<void> {
    await this.clickOnElement(this.saveButton);
  }

  async clickHomeLink(): Promise<void> {
    await this.clickOnElement(this.homeLink);
  }

  async verifyFirstNameChanged(expectedFirstName: string): Promise<void> {
    await this.verifyVisibilityOfElementWithValue(this.firstNameField, expectedFirstName);
  }

  async verifyLastNameChanged(expectedLastName: string): Promise<void> {
    await this.verifyVisibilityOfElementWithValue(this.lastNameField, expectedLastName);
  }

  async clickOnLogoutButton(): Promise<void> {
    await this.clickOnElement(this.logoutButton);
  }
}