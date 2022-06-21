const ROUTES = {
  welcome: "/welcome",
  getUsers: "/api/v1/users",
  registerUser: "/api/v1/register",
  loginUser: "/api/v1/login",
  getUserById: /\/api\/v1\/users\/id=([0-9a-f\-]+$)/,
  getUserByNickname: /\/api\/v1\/users\/nickname=([a-zA-Z0-9_!\s.\(\)]+$)/,
  getUserByEmail: /\/api\/v1\/users\/email=(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

};

module.exports = {
  ROUTES,
};
