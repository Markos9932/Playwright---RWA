export interface RegistrationTestData {
  signUpTitle: string;
  signInLinkText: string;
  signInLinkText1: string;
  firstNameText: string;
  wrongPassText: string;
  wrongConfirmPassText: string;
  signInTitle: string;
  signUpLinkText: string;
  signInButtonTitle: string;
}

const registrationTestData: RegistrationTestData = {
  signUpTitle: "Sign Up",
  signInLinkText: "Have an account?",
  signInLinkText1: "Sign In",
  firstNameText: "First Name is required",
  wrongPassText: "Password must contain at least 4 characters",
  wrongConfirmPassText: "Password does not match",
  signInTitle: "Sign in",
  signUpLinkText: "Don't have an account? Sign Up",
  signInButtonTitle: "Sign In"
};

export default registrationTestData;