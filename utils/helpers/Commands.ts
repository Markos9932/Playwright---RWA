import { Page } from '@playwright/test';

export default class Commands {
  protected page: Page;
  private waitInterval: number;

  constructor(page: Page) {
    this.page = page;
    this.waitInterval = 30000;
  }

  async verifyVisibilityOfElementWithText(locator: string, text: string): Promise<void> {
    await this.page.locator(locator).filter({ hasText: text }).waitFor({ timeout: this.waitInterval });
    const isVisible = await this.page.locator(locator).filter({ hasText: text }).isVisible();
    if (!isVisible) throw new Error(`Element with text "${text}" is not visible`);
  }

  async verifyEnabledElement(locator: string): Promise<void> {
    const isEnabled = await this.page.locator(locator).isEnabled();
    if (!isEnabled) throw new Error(`Element "${locator}" is not enabled`);
  }

  async verifyDisabledElement(locator: string): Promise<void> {
    const isDisabled = await this.page.locator(locator).isDisabled();
    if (!isDisabled) throw new Error(`Element "${locator}" is not disabled`);
  }

  async clearAndPopulateTextElement(locator: string, value: string): Promise<void> {
    await this.page.locator(locator).fill(value);
  }

  async verifyVisibilityOfElement(locator: string): Promise<void> {
    const isVisible = await this.page.locator(locator).isVisible();
    if (!isVisible) throw new Error(`Element "${locator}" is not visible`);
  }

  async clickOnElement(locator: string): Promise<void> {
    await this.verifyVisibilityOfElement(locator);
    await this.page.locator(locator).click();
  }

  async verifyVisibilityOfElementWithValue(locator: string, text: string): Promise<void> {
    const value = await this.page.locator(locator).inputValue();
    if (value !== text) throw new Error(`Expected value "${text}" but got "${value}"`);
  }

  async waitPeriod(value: number): Promise<void> {
    await this.page.waitForTimeout(value);
  }

  async verifyVisibilityOfText(text: string): Promise<void> {
    const isVisible = await this.page.locator(`text=${text}`).isVisible();
    if (!isVisible) throw new Error(`Text "${text}" is not visible`);
  }

  async clickOnFirstElement(locator: string): Promise<void> {
    await this.verifyVisibilityOfElement(locator);
    await this.page.locator(locator).first().click();
  }

  async clickOnPaymentContainer(containerLocator: string, text: string): Promise<void> {
    await this.page.locator(containerLocator, { hasText: text }).click();
  }

  async forceClickOnElement(locator: string): Promise<void> {
    await this.verifyVisibilityOfElement(locator);
    await this.page.locator(locator).click({ force: true });
  }

  async clickOnSliderElementCenter(locator: string, x: number, y: number): Promise<void> {
    const element = this.page.locator(locator);
    await element.scrollIntoViewIfNeeded();
    await element.click({ position: { x, y } });
  }
}