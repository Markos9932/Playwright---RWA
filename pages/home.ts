import { Page } from '@playwright/test';
import Commands from '../utils/helpers/Commands';

export default class HomePage extends Commands {
  private homeRoute = '**/localhost:3001/login';
  private personalPageUrl = '/personal';
  private myAccount = ' //span[normalize-space()="My Account"]';
  private bankAccount = ' a:nth-child(3) div:nth-child(2) span:nth-child(1)';
  private nextButton = '[data-test="user-onboarding-next"]';
  private createBankAccountTitle = '[data-test="user-onboarding-dialog-title"]';
  private bankNameField = '#bankaccount-bankName-input';
  private routingNumber = '#bankaccount-routingNumber-input';
  private accountNumber = '#bankaccount-accountNumber-input';
  private saveButton = '[data-test="bankaccount-submit"]';
  private doneButton = '[data-test="user-onboarding-next"]';
  private logoutButton = '[data-test="sidenav-signout"]';
  private newTransaction = '[data-test="nav-top-new-transaction"]';

  constructor(page: Page) {
    super(page); 
  }

  async homePageLoadingResponse(): Promise<void> {
    await this.page.route(this.homeRoute, (route) => route.continue());
  }

  async waitHomePageLoadingResponse(): Promise<void> {
    const response = await this.page.waitForResponse(this.homeRoute);
    if (response.status() !== 200) throw new Error('Home page did not load successfully');
  }

  async navigateToPersonalPage(): Promise<void> {
    await this.page.goto(this.personalPageUrl);
  }

  async clickOnMyAccountLink(): Promise<void> {
    await this.clickOnElement(this.myAccount);
  }

  async clickOnBankAccountLink(): Promise<void> {
    await this.clickOnElement(this.bankAccount);
  }

  async clickOnNextButton(): Promise<void> {
    await this.clickOnElement(this.nextButton);
  }

  async verifyCreateBankAccountTitle(text: string): Promise<void> {
    await this.verifyVisibilityOfElementWithText(this.createBankAccountTitle, text);
  }

  async populateBankNameField(value: string): Promise<void> {
    await this.clearAndPopulateTextElement(this.bankNameField, value);
  }

  async populateRoutingNumberField(value: string): Promise<void> {
    await this.clearAndPopulateTextElement(this.routingNumber, value);
  }

  async populateAccountNumberField(value: string): Promise<void> {
    await this.clearAndPopulateTextElement(this.accountNumber, value);
  }

  async clickOnSaveButton(): Promise<void> {
    await this.clickOnElement(this.saveButton);
  }

  async clickOnDoneButton(): Promise<void> {
    await this.clickOnElement(this.doneButton);
  }

  async clickOnLogoutButton(): Promise<void> {
    await this.clickOnElement(this.logoutButton);
  }

  async clickOnNewButton(): Promise<void> {
    await this.clickOnElement(this.newTransaction);
  }
}