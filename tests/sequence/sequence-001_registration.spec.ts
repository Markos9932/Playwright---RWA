import test from '../../setup/BaseTest';
import registrationData from '../../test-data/home/registration';
import registrationUserData from '../../test-data/users/registration_user';
import RegistrationPage from '../../pages/registration';

test.describe('Check functionalities of a registration form', () => {
  let registrationPage: RegistrationPage;

  // Setup executed before each test case
  test.beforeEach(async ({ registrationPage: page }) => {
    registrationPage = page;
    await registrationPage.navigateToRegistrationPage();
  });

  // Teardown executed after each test case
  test.afterEach(async () => {
    // Add any cleanup logic if needed
  });

  // Teardown executed after test suite
  test.afterAll(async () => {
    // Add any cleanup logic if needed
  });

  test.describe('Check various scenarios', () => {
    test('Validate registration form is present', async () => {
      await registrationPage.verifySignUpTitle(registrationData.signUpTitle);
      await registrationPage.verifySignUpButtonEnabled();
      await registrationPage.verifySigninLink(registrationData.signInLinkText);
      await registrationPage.verifySigninLink(registrationData.signInLinkText1);
    });

    test('Check registration with empty fields', async () => {
      await registrationPage.clickOnSignUpButton();
      await registrationPage.verifyFirstNameIsRequired(registrationData.firstNameText);
      await registrationPage.verifySignUpButtonDisabled();
    });

    test('Check registration with invalid password - 3 characters', async () => {
      await registrationPage.populateFirstNameField(registrationUserData.firstName);
      await registrationPage.populateLastNameField(registrationUserData.lastName);
      await registrationPage.populateUsernameField(registrationUserData.username);
      await registrationPage.populatePasswordField(registrationUserData.passwordWrong);

      await registrationPage.verifyWrongPasswordText(registrationData.wrongPassText);
      await registrationPage.verifySignUpButtonDisabled();
    });

    test('Check registration with non-matching passwords', async () => {
      await registrationPage.populateFirstNameField(registrationUserData.firstName);
      await registrationPage.populateLastNameField(registrationUserData.lastName);
      await registrationPage.populateUsernameField(registrationUserData.username);
      await registrationPage.populatePasswordField(registrationUserData.password);
      await registrationPage.populateConfirmPasswordField(registrationUserData.confirmPassWrong);

      await registrationPage.verifyWrongConfirmPassText(registrationData.wrongConfirmPassText);
      await registrationPage.verifySignUpButtonDisabled();
    });
    test('Check registration with valid credentials', async ({ registrationPage, loginPage }) => {
      // Navigate to registration page and populate data
      await registrationPage.navigateToRegistrationPage();
      await registrationPage.populateAndRegisterUserData(
        registrationUserData.firstName,
        registrationUserData.lastName,
        registrationUserData.username,
        registrationUserData.password,
        registrationUserData.password // Assuming confirm password is the same as password
      );
    
      // Wait for login page to load
      await loginPage.waitLoginPageLoadingResponse();
    
      // Verify login page elements
      await loginPage.verifySignInTitle(registrationData.signInTitle);
      await loginPage.verifySignUpLink(registrationData.signUpLinkText);
      await loginPage.verifySignInButtonPresence();
    });
  });
});


