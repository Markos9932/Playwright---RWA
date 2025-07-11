import { Page } from '@playwright/test';
import Commands from '../utils/helpers/Commands';

export default class BankAccountPage extends Commands {
  private bankAccountHeader = '.MuiTypography-h6.MuiTypography-gutterBottom';
  private bankAccountDelete = '[data-test="bankaccount-delete"]';
  private bankAccountCreate = '[data-test="bankaccount-new"]';
  private createAccountHeader = '//h2[normalize-space()="Create Bank Account"]';
  private bankNameField = '#bankaccount-bankName-input';
  private routingNumber = '#bankaccount-routingNumber-input';
  private accountNumber = '#bankaccount-accountNumber-input';
  private saveButton = '[data-test="bankaccount-submit"]';
  private bankAccountText = '[data-test="bankaccount-list"]';

  constructor(page: Page) {
    super(page); // Prosleđivanje Page objekta klasi Commands
  }

  async verifyBankAccountHeader(text: string): Promise<void> {
    await this.verifyVisibilityOfElementWithText(this.bankAccountHeader, text);
  }

  async clickOnDeleteButton(): Promise<void> {
    await this.clickOnElement(this.bankAccountDelete);
  }

  async clickOnCreateButton(): Promise<void> {
    await this.clickOnElement(this.bankAccountCreate);
  }

  async verifyCreateAccountHeader(text: string): Promise<void> {
    await this.verifyVisibilityOfElementWithText(this.createAccountHeader, text);
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

  async verifyBankAccountTitle(text: string): Promise<void> {
    await this.verifyVisibilityOfElementWithText(this.bankAccountText, text);
  }
}