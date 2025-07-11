import { test as baseTest } from '@playwright/test';
import  BankAccountPage  from '../pages/bank_account';
import  HomePage  from '../pages/home';
import  LoginPage  from '../pages/login';
import  MyAccountPage  from '../pages/my_account';
import  PersonalPage  from '../pages/personal';
import RegistrationPage from '../pages/registration';
import  TransactionPage  from '../pages/transaction';

const test = baseTest.extend<{
  bankAccountPage: BankAccountPage;
  homePage: HomePage;
  loginPage: LoginPage;
  myAccountPage: MyAccountPage;
  personalPage: PersonalPage;
  registrationPage: RegistrationPage;
  transactionPage: TransactionPage;
}>({
  bankAccountPage: async ({ page, context }, use) => {
    await use(new BankAccountPage(page));
  },

  homePage: async ({ page, context }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page, context }, use) => {
    await use(new LoginPage(page));
  },

  myAccountPage: async ({ page, context }, use) => {
    await use(new MyAccountPage(page));
  },

  personalPage: async ({ page, context }, use) => {
    await use(new PersonalPage(page));
  },

  registrationPage: async ({ page, context }, use) => {
    await use(new RegistrationPage(page));
  },

  transactionPage: async ({ page, context }, use) => {
    await use(new TransactionPage(page));
  },
});

export default test;