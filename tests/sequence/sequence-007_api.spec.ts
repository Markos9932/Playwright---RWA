import { test, expect } from '@playwright/test';
import registrationUserData from '../../test-data/users/registration_user';
interface BankAccount {
    bankName: string;
    accountNumber: string;
    routingNumber: string;
  }

test.describe('Validate the response by checking available bank account information', () => {
  test('GraphQL API test for bank accounts after login', async ({ page, request }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000/signin');

    // Fill in the login fields
    await page.fill('#username', registrationUserData.username);
    await page.fill('#password', registrationUserData.password);

    // Click the login button
    await page.click('[data-test="signin-submit"]');

    // Wait for the home page to load
    await page.waitForURL('http://localhost:3000/');

    // Click on the bank accounts link
    await page.click(' a:nth-child(3) div:nth-child(2) span:nth-child(1)');

    // Make a GraphQL request
    const response = await page.request.post('http://localhost:3001/graphql', {
        data: {
          query: `
            query {
              listBankAccount {
                bankName
                accountNumber
                routingNumber
              }
            }
          `
        }
      });
    
      // Expect a successful response
      expect(response.status()).toBe(200);
    
      const responseBody = await response.json();
    
      // Validate that listBankAccount is not null and is an array
      const listBankAccount: BankAccount[] = responseBody?.data?.listBankAccount ?? [];
    
      // Ensure that listBankAccount is an array
      expect(Array.isArray(listBankAccount)).toBe(true);
    
      // Find the matching bank account
      const foundAccount = listBankAccount.find((account: BankAccount) =>
        account.bankName === 'Test Bank' &&
        account.accountNumber === '888888888' &&
        account.routingNumber === '999999999'
      );
    
      // Verify that the expected account was found
      expect(foundAccount).toBeTruthy();
      // Log the result
      if (foundAccount) {
        console.log('Found Account:', foundAccount);
      } else {
        console.log('Account not found');
      }
    });
  });