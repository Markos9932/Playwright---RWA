import test from '../../setup/BaseTest';
import registrationUserData from '../../test-data/users/registration_user';
import bankAccountData from '../../test-data/home/bank-account';
import homeData from '../../test-data/home/home';
import LoginPage from '../../pages/login';
import HomePage from '../../pages/home';
import BankAccountPage from '../../pages/bank_account';
import MyAccountPage from '../../pages/my_account';

test.describe('Check account creating', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let bankAccountPage: BankAccountPage;
  let myAccountPage: MyAccountPage;

  
  test.beforeEach(async ({ loginPage: login, homePage: home, bankAccountPage: bankAccount,myAccountPage: myAccount }) => {
    loginPage = login;
    homePage = home;
    bankAccountPage = bankAccount;
    myAccountPage = myAccount;

    // Navigate to login page and log in
    await loginPage.navigateToLoginPage();
    await loginPage.userLogin(registrationUserData.username, registrationUserData.password);
  });

  test('Create a bank account and validate that account is created', async () => {
    // Navigate to Bank Accounts page
    await homePage.homePageLoadingResponse();
    await homePage.waitHomePageLoadingResponse();
    await new Promise(resolve => setTimeout(resolve, 2000));
          // await homePage.clickOnNextButton();
    
          // await homePage.verifyCreateBankAccountTitle(homeData.createBankAccountText);
          // await homePage.populateBankNameField(homeData.bankNameField);
          // await homePage.populateAccountNumberField(homeData.accountNumber);
          // await homePage.populateRoutingNumberField(homeData.routingNumber);
          // await homePage.clickOnSaveButton();
          // await homePage.clickOnDoneButton();

    await homePage.clickOnBankAccountLink();
    await bankAccountPage.verifyBankAccountHeader(bankAccountData.bankAccountHeaderText);

    // Create a new bank account
    await bankAccountPage.clickOnCreateButton();
    await bankAccountPage.verifyCreateAccountHeader(bankAccountData.createAccountText);

    await bankAccountPage.populateBankNameField(bankAccountData.bankNameField1);
    await bankAccountPage.populateAccountNumberField(bankAccountData.accountNumber1);
    await bankAccountPage.populateRoutingNumberField(bankAccountData.routingNumber1);
    await bankAccountPage.clickOnSaveButton();

    // Verify the bank account is created
    await bankAccountPage.verifyBankAccountHeader(bankAccountData.bankAccountHeaderText);
    await bankAccountPage.verifyBankAccountTitle(bankAccountData.bankNameField1);
    // Log out
    await myAccountPage.clickOnLogoutButton();
  });
});