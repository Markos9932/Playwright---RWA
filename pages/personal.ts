import { Page } from '@playwright/test';
import Commands from '../utils/helpers/Commands';

export default class PersonalPage extends Commands {
  private personalRoute = '**/personal';
  private transactionContainer = 'body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > main:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > li:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > p:nth-child(1) > span:nth-child(3)';
  private amountSlider = '[data-test="transaction-list-filter-amount-range-button"]';
  private rangeSlider = '[data-test="transaction-list-filter-amount-range-slider"]';
  private transactionContainerAmount = '//span[@class="MuiTypography-root MuiTypography-body1 TransactionAmount-amountNegative css-1tlfly5-MuiTypography-root"]'

  constructor(page: Page) {
    super(page); // Prosleđivanje Page objekta klasi Commands
  }

  async personalPageLoadingResponse(): Promise<void> {
    await this.page.route(this.personalRoute, (route) => route.continue());
  }

  async waitPersonalPageLoadingResponse(): Promise<void> {
    const response = await this.page.waitForResponse(this.personalRoute);
    if (response.status() !== 200) throw new Error('Personal page did not load successfully');
  }

  async verifyTransactionIsPresent(text: string): Promise<void> {
    await this.verifyVisibilityAndUserDataInContainer(this.transactionContainer,text);
  }
  async verifyTransactionAmountIsPresent(text: string): Promise<void> {
    await this.verifyVisibilityAndUserDataInContainer(this.transactionContainerAmount,text);
  }

  async verifyVisibilityAndUserDataInContainer(
    containerLocator: string,

    text: string
  ): Promise<void> {
    const container = this.page.locator(containerLocator).first();
    const isVisible = await container.isVisible();
    if (!isVisible) {
      throw new Error(`Container with locator "${containerLocator}" is not visible.`);
    }

    const content = await container.textContent();
    if (!content?.includes(text)) {
      throw new Error(
        `Container does not contain the expected text "${text}".`
      );
    }
  }

  async clickOnAmountSlider(): Promise<void> {
    await this.forceClickOnElement(this.amountSlider);
  }

  async settingSliderValueCenter(x: number, y: number): Promise<void> {
    await this.clickOnSliderElementCenter(this.rangeSlider, x, y);
  }
}