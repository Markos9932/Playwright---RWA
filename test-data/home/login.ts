export interface LoginTestData {
  usernameRequiredText: string;
  passwordWrong: string;
  invalidPassword: string;
  invalidUsernameOrPasswordText: string;
}

const loginTestData: LoginTestData = {
  usernameRequiredText: "Username is required",
  passwordWrong: "111",
  invalidPassword: "2222",
  invalidUsernameOrPasswordText: "Username or password is invalid"
};

export default loginTestData;