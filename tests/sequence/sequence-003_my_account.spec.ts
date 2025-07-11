import test from '../../setup/BaseTest';
import registrationUserData from '../../test-data/users/registration_user';
import homeData from '../../test-data/home/home';
import LoginPage from '../../pages/login';
import HomePage from '../../pages/home';
import MyAccountPage from '../../pages/my_account';

test.describe('Check modifications to account information', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let myAccountPage: MyAccountPage;
  let x;
  let firstNameChanged: string;
  let lastNameChanged: string;

  // Setup executed before each test case
  test.beforeEach(async ({ loginPage: login, homePage: home, myAccountPage: myAccount }) => {
    loginPage = login;
    homePage = home;
    myAccountPage = myAccount;

    // Generate random data for test
    x = Math.floor(Math.random() * 100000000 + 1);
    firstNameChanged = registrationUserData.firstName + x;
    lastNameChanged = registrationUserData.lastName + x;

    // Navigate to login page and log in
    await loginPage.navigateToLoginPage();
    await loginPage.userLogin(registrationUserData.username, registrationUserData.password);
  });

  test('Modify account information', async () => {
  //  await homePage.clickOnNextButton();
  //  await homePage.verifyCreateBankAccountTitle(homeData.createBankAccountText);
  //  await homePage.populateBankNameField(homeData.bankNameField);
  //  await homePage.populateAccountNumberField(homeData.accountNumber);
  //  await homePage.populateRoutingNumberField(homeData.routingNumber);
  //  await homePage.clickOnSaveButton();
  //  await homePage.clickOnDoneButton();
    
    // Verify initial account information
    await myAccountPage.verifySidenavFirstName(registrationUserData.firstName);
    await myAccountPage.verifySidenavUsername(registrationUserData.username);

    // Navigate to My Account page
    await homePage.clickOnMyAccountLink();

    // Modify account information
    await myAccountPage.populateFirstNameField(firstNameChanged);
    await myAccountPage.populateLastNameField(lastNameChanged);
    await myAccountPage.populateEmailField(registrationUserData.email);
    await myAccountPage.populatePhoneField(registrationUserData.phoneNumber);
    await myAccountPage.clickSaveButton();
    await myAccountPage.waitPeriod(2000);

    // Verify changes
    await myAccountPage.clickHomeLink();
    await homePage.clickOnMyAccountLink();
    await myAccountPage.verifySidenavFirstName(firstNameChanged);
    await myAccountPage.verifySidenavUsername(registrationUserData.username);
    await myAccountPage.verifyFirstNameChanged(firstNameChanged);
    await myAccountPage.verifyLastNameChanged(lastNameChanged);

    // Log out
    await myAccountPage.clickOnLogoutButton();
  });
});