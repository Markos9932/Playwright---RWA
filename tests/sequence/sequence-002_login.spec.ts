import test from '../../setup/BaseTest';
import registrationData from '../../test-data/home/registration';
import loginData from '../../test-data/home/login';
import registrationUserData from '../../test-data/users/registration_user';
import homeData from '../../test-data/home/home';
import LoginPage from '../../pages/login';
import HomePage from '../../pages/home';

test.describe('Check functionalities of a login form', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

 
  test.beforeEach(async ({ loginPage: page, homePage: home }) => {
    loginPage = page;
    homePage = home;
    
    await loginPage.navigateToLoginPage();
  });


  test.describe('Check various scenarios', () => {
    test('Validate login form is present', async () => {
      await loginPage.verifySignInTitle(registrationData.signInTitle);
      await loginPage.verifySignUpLink(registrationData.signUpLinkText);
      await loginPage.verifySignInButtonPresence();
    });

    test('Check login with empty input fields', async () => {
      await loginPage.clickOnSignInButton();
      await loginPage.verifyUsernameRequiredText(loginData.usernameRequiredText);
      await loginPage.verifySignInButtonDisabled();
    });

    test('Check login with wrong password - 3 characters', async () => {
      await loginPage.populateUsernameField(registrationUserData.username);
      await loginPage.populatePasswordField(loginData.passwordWrong);
      await loginPage.clickOnUsernameField();
      await loginPage.verifyWrongPasswordText(registrationData.wrongPassText);
      await loginPage.verifySignInButtonDisabled();
    });

    test('Check login with invalid password', async () => {
      await loginPage.populateUsernameField(registrationUserData.username);
      await loginPage.populatePasswordField(loginData.invalidPassword);
      await loginPage.clickOnSignInButton();
      await loginPage.verifyInvalidUsernameOrPasswordText(loginData.invalidUsernameOrPasswordText);
    });

    test('Check login with valid credentials', async () => {
      await homePage.homePageLoadingResponse();
      await loginPage.populateUsernameField(registrationUserData.username);
      await loginPage.populatePasswordField(registrationUserData.password);
      await loginPage.clickOnSignInButton();
      await homePage.waitHomePageLoadingResponse();
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      await homePage.clickOnNextButton();

      await homePage.verifyCreateBankAccountTitle(homeData.createBankAccountText);
      await homePage.populateBankNameField(homeData.bankNameField);
      await homePage.populateAccountNumberField(homeData.accountNumber);
      await homePage.populateRoutingNumberField(homeData.routingNumber);
      await homePage.clickOnSaveButton();
      await homePage.clickOnDoneButton();

      await homePage.clickOnLogoutButton();
    });
  });
});