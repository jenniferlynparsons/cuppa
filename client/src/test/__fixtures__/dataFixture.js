const mockUserID = "5c6313a4c318bb62298b23d4";

const loginData = {
  email: "test@example.com",
  password: "testpassword"
};

const registerData = {
  name: "JP",
  email: "test@example.com",
  password: "testpassword",
  password2: "testpassword"
};

const history = {
  length: 10,
  action: "PUSH",
  location: { pathname: "/dashboard", search: "", hash: "", key: "zh4boo" },
  push: jest.fn()
};

const response = {
  success: true,
  token: "Bearer 5cCI6IkpXVCJ9.oxNTkwNTI4NjA3fQ.1Nd3GGE8"
};

const decodedToken = {
  id: "5c6313a4b62298b23d4",
  name: "JP",
  iat: 1559234664,
  exp: 1590791590
};

const dataFixture = {
  mockUserID,
  loginData,
  registerData,
  history,
  response,
  decodedToken
};

export default dataFixture;
