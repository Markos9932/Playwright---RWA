import test from '../../setup/BaseTest';
import loginData from '../../test-data/home/login';
import homeData from '../../test-data/home/home';
import personalData from '../../test-data/home/personal';
import transactionData from '../../test-data/home/transaction';
import registrationUserData from '../../test-data/users/registration_user';
import LoginPage from '../../pages/login';
import HomePage from '../../pages/home';
import PersonalPage from '../../pages/personal';


test.describe('Validation of transaction present', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let personalPage: PersonalPage;

  // Setup executed before each test case
  test.beforeEach(async ({ loginPage: login, homePage: home, personalPage: personal }) => {
    loginPage = login;
    homePage = home;
    personalPage = personal;

    // Navigate to login page
    await loginPage.navigateToLoginPage();
    await loginPage.userLogin(registrationUserData.username, registrationUserData.password);
  });

  

  test('Check if the transaction is present', async () => {
    // Simulate loading responses
    await homePage.homePageLoadingResponse();
    //await personalPage.personalPageLoadingResponse();

    
    // Wait for home page to load
    await homePage.waitHomePageLoadingResponse();
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Navigate to personal page
    await homePage.navigateToPersonalPage();
    await new Promise(resolve => setTimeout(resolve, 2000));
    //await personalPage.waitPersonalPageLoadingResponse();

    // Verify transactions
    await personalPage.verifyTransactionIsPresent(transactionData.transactionPartnerHeader);
    // Uncomment the following line if needed
     await personalPage.verifyTransactionAmountIsPresent(transactionData.valueAmount);
    //await personalPage.verifyTransactionIsPresent(personalData.numberOfTransaction, transactionData.negativeAmount);
  });
});