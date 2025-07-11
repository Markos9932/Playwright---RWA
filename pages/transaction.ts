import { Page } from '@playwright/test';
import Commands from '../utils/helpers/Commands';

export default class TransactionPage extends Commands {
  private searchField = '#user-list-search-input';
  private userList = '.MuiListItemText-root.MuiListItemText-multiline';
  private amount = '#amount';
  private note = '#transaction-create-description-input';
  private payButton = '[data-test="transaction-create-submit-payment"]';
  private transactionHeader = 'div[class="MuiGrid-root MuiGrid-container css-1hbmzt3-MuiGrid-root"] h2[class="MuiTypography-root MuiTypography-h6 MuiTypography-gutterBottom css-mpyo7s-MuiTypography-root"]';
  private returnToTransButton = '[data-test="new-transaction-return-to-transactions"]';
  private createAnotherTrans = '[data-test="new-transaction-create-another-transaction"]';
  private newTransactionContainer = '.MuiListItemText-root.MuiListItemText-multiline';

  constructor(page: Page) {
    super(page); // Prosleđivanje Page objekta klasi Commands
  }

  async populateSearchField(value: string): Promise<void> {
    await this.clearAndPopulateTextElement(this.searchField, value);
  }

  async clickOnUserWithName(name: string): Promise<void> {
    const userLocator = this.page.locator(this.userList).filter({ hasText: name });
    await userLocator.click();
  }
  async populateAmountField(value: string): Promise<void> {
    await this.clearAndPopulateTextElement(this.amount, value);
  }

  async verifyAmountField(value: string): Promise<void> {
    await this.verifyVisibilityOfElementWithValue(this.amount, value);
  }

  async populateNoteField(value: string): Promise<void> {
    await this.clearAndPopulateTextElement(this.note, value);
  }

  async clickOnPayButton(): Promise<void> {
    await this.clickOnElement(this.payButton);
  }

  async verifyPaymentHeader(text: string): Promise<void> {
    await this.verifyVisibilityOfElementWithText(this.transactionHeader, text);
  }

  async clickReturnToTransButton(): Promise<void> {
    await this.clickOnElement(this.returnToTransButton);
  }

  async clickCreateAnotherTransButton(): Promise<void> {
    await this.clickOnElement(this.createAnotherTrans);
  }

  async clickOnPaymentElement(text: string): Promise<void> {
    await this.clickOnPaymentContainer(this.newTransactionContainer, text);
  }
}