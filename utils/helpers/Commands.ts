import { Page } from '@playwright/test';


export default class Commands {
 
  protected page: Page;

  private waitInterval: number;

  constructor(page: Page) {
    this.page = page;
    this.waitInterval = 30000;
  }

  /**
   * Waits for an element with specific text to be visible.
   * @param locator Selector for the element.
   * @param text Text that the element should contain.
   * @throws Error if the element is not visible.
   */
  async verifyVisibilityOfElementWithText(locator: string, text: string): Promise<void> {
  const isVisible = await this.page.locator(locator).filter({ hasText: text }).isVisible();
  if (!isVisible) throw new Error(`Element with text "${text}" is not visible`);
}

  /**
   * Verifies that an element is enabled.
   * @param locator Selector for the element.
   * @throws Error if the element is not enabled.
   */
  async verifyEnabledElement(locator: string): Promise<void> {
    const isEnabled = await this.page.locator(locator).isEnabled();
    if (!isEnabled) throw new Error(`Element "${locator}" is not enabled`);
  }

  /**
   * Verifies that an element is disabled.
   * @param locator Selector for the element.
   * @throws Error if the element is not disabled.
   */
  async verifyDisabledElement(locator: string): Promise<void> {
    const isDisabled = await this.page.locator(locator).isDisabled();
    if (!isDisabled) throw new Error(`Element "${locator}" is not disabled`);
  }

  /**
   * Clears and fills a text input element.
   * @param locator Selector for the input element.
   * @param value Value to fill in the input.
   */
  async clearAndPopulateTextElement(locator: string, value: string): Promise<void> {
    await this.page.locator(locator).fill(value);
  }

  /**
   * Verifies that an element is visible.
   * @param locator Selector for the element.
   * @throws Error if the element is not visible.
   */
  async verifyVisibilityOfElement(locator: string): Promise<void> {
    const isVisible = await this.page.locator(locator).isVisible();
    if (!isVisible) throw new Error(`Element "${locator}" is not visible`);
  }

  /**
   * Clicks on an element after verifying its visibility.
   * @param locator Selector for the element.
   */
  async clickOnElement(locator: string): Promise<void> {
    await this.verifyVisibilityOfElement(locator);
    await this.page.locator(locator).click();
  }

  /**
   * Verifies that an input element has the expected value.
   * @param locator Selector for the input element.
   * @param text Expected value.
   * @throws Error if the value does not match.
   */
  async verifyVisibilityOfElementWithValue(locator: string, text: string): Promise<void> {
    const value = await this.page.locator(locator).inputValue();
    if (value !== text) throw new Error(`Expected value "${text}" but got "${value}"`);
  }

  /**
   * Waits for a specified period.
   * @param value Time in milliseconds to wait.
   */
  async waitPeriod(value: number): Promise<void> {
    await this.page.waitForTimeout(value);
  }

  /**
   * Verifies that a specific text is visible on the page.
   * @param text Text to check for visibility.
   * @throws Error if the text is not visible.
   */
  async verifyVisibilityOfText(text: string): Promise<void> {
    const isVisible = await this.page.locator(`text=${text}`).isVisible();
    if (!isVisible) throw new Error(`Text "${text}" is not visible`);
  }

  /**
   * Clicks on the first element matching the locator after verifying its visibility.
   * @param locator Selector for the elements.
   */
  async clickOnFirstElement(locator: string): Promise<void> {
    await this.verifyVisibilityOfElement(locator);
    await this.page.locator(locator).first().click();
  }

  /**
   * Clicks on a container element that contains specific text.
   * @param containerLocator Selector for the container element.
   * @param text Text that the container should contain.
   */
  async clickOnPaymentContainer(containerLocator: string, text: string): Promise<void> {
    await this.page.locator(containerLocator, { hasText: text }).click();
  }

  /**
   * Force-clicks on an element after verifying its visibility.
   * @param locator Selector for the element.
   */
  async forceClickOnElement(locator: string): Promise<void> {
    await this.verifyVisibilityOfElement(locator);
    await this.page.locator(locator).click({ force: true });
  }

  /**
   * Clicks on a specific position (center) of a slider element.
   * @param locator Selector for the slider element.
   * @param x X coordinate for the click position.
   * @param y Y coordinate for the click position.
   */
  async clickOnSliderElementCenter(locator: string, x: number, y: number): Promise<void> {
    const element = this.page.locator(locator);
    await element.scrollIntoViewIfNeeded();
    await element.click({ position: { x, y } });
  }
}