import { test, expect } from '@playwright/test';
import registrationUserData from '../../test-data/users/registration_user';
interface BankAccount {
    bankName: string;
    accountNumber: string;
    routingNumber: string;
  }

test.describe('Validate the response by checking available bank account information', () => {
  test('GraphQL API test for bank accounts after login', async ({ page, request }) => {
    // Navigacija na stranicu za prijavu
    await page.goto('http://localhost:3000/signin');

    // Popunjavanje polja za prijavu
    await page.fill('#username', registrationUserData.username);
    await page.fill('#password', registrationUserData.password);

    // Klik na dugme za prijavu
    await page.click('[data-test="signin-submit"]');

    // Sačekajte da se učita početna stranica
    await page.waitForURL('http://localhost:3000/');

    // Klik na link za bankovne račune
    await page.click(' a:nth-child(3) div:nth-child(2) span:nth-child(1)');

    // Napravite GraphQL zahtev
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
    
      // Očekivanje uspešnog odgovora
      expect(response.status()).toBe(200);
    
      const responseBody = await response.json();
    
      // Validacija da li listBankAccount nije null i da je tip niz
      const listBankAccount: BankAccount[] = responseBody?.data?.listBankAccount ?? [];
    
      // Osigurajmo da je listBankAccount niz
      expect(Array.isArray(listBankAccount)).toBe(true);
    
      // Traženje odgovarajućeg bankovnog računa
      const foundAccount = listBankAccount.find((account: BankAccount) =>
        account.bankName === 'Test Bank' &&
        account.accountNumber === '888888888' &&
        account.routingNumber === '999999999'
      );
    
      // Verifikacija da li je pronađen očekivani račun
      expect(foundAccount).toBeTruthy();
      // Ispisivanje rezultata u logu
if (foundAccount) {
    console.log('Found Account:', foundAccount);
  } else {
    console.log('Account not found');
  }
    });
  });
