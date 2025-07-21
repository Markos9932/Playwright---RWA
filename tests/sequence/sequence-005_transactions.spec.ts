import test from '../../setup/BaseTest';
import registrationUserData from '../../test-data/users/registration_user';
import transactionData from '../../test-data/home/transaction';
import homeData from '../../test-data/home/home';
import LoginPage from '../../pages/login';
import HomePage from '../../pages/home';
import TransactionPage from '../../pages/transaction';

test.describe('Check Transactions and payments', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let transactionPage: TransactionPage;
  test.beforeEach(async ({ loginPage: login, homePage: home, transactionPage: transaction }) => {
    loginPage = login;
    homePage = home;
    transactionPage = transaction;

    // Navigate to login page and log in
    await loginPage.navigateToLoginPage();
    await loginPage.userLogin(registrationUserData.username, registrationUserData.password);
  });

  test('Create a new transaction and validate the form', async () => {
    // Navigate to new transaction page
    // await homePage.clickOnNextButton();
    
    //       await homePage.verifyCreateBankAccountTitle(homeData.createBankAccountText);
    //       await homePage.populateBankNameField(homeData.bankNameField);
    //       await homePage.populateAccountNumberField(homeData.accountNumber);
    //       await homePage.populateRoutingNumberField(homeData.routingNumber);
    //       await homePage.clickOnSaveButton();
    //       await homePage.clickOnDoneButton();
    


    await homePage.homePageLoadingResponse();
    await homePage.waitHomePageLoadingResponse();
    await homePage.clickOnNewButton();

    // Fill out transaction form
    await transactionPage.populateSearchField(transactionData.transactionPartner);
    await transactionPage.clickOnUserWithName(transactionData.transactionPartner);
    await transactionPage.verifyVisibilityOfText(transactionData.transactionPartnerHeader);

    await transactionPage.populateAmountField(transactionData.amount);
    await transactionPage.verifyAmountField(transactionData.value);
    await transactionPage.populateNoteField(transactionData.note);
    await transactionPage.clickOnPayButton();

    // Verify transaction details
    await transactionPage.verifyPaymentHeader(transactionData.paidText);
    //await transactionPage.verifyPaymentHeader(transactionData.amount);
   // await transactionPage.verifyPaymentHeader(transactionData.forText);
   // await transactionPage.verifyPaymentHeader(transactionData.note);

    // Return to transactions and log out
    await transactionPage.clickReturnToTransButton();
    await homePage.clickOnLogoutButton();
  });
});