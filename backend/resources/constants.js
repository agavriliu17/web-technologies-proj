const ROUTES = {
  welcome: "/welcome",
  getUsers: "/api/v1/users",
  registerUser: "/api/v1/register",
  loginUser: "/api/v1/login",
  getUserById: /\/api\/v1\/users\/id=([0-9a-f\-]+$)/,
  getUserByNickname: /\/api\/v1\/users\/nickname=([a-zA-Z0-9_!\s.\(\)]+$)/,
  getUserByEmail: /\/api\/v1\/users\/email=(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  getServices: '/api/v1/services',
  addService: '/api/v1/add-service',
  findServiceById: /\/api\/v1\/services\/id=([0-9a-f\-]+$)/,
  findServicesByName: /\/api\/v1\/services\/name=([a-zA-Z0-9_!\s.\(\)]+$)/,
  getOrders: '/api/v1/orders',
  addOrder: '/api/v1/add-order',
  getOrderById: /\/api\/v1\/orders\/id=([0-9a-f\-]+$)/,
  getRSS: '/api/v1/services/rss',
  getUsersOrders: /\/api\/v1\/orders\/user=([0-9a-f\-]+$)/,
};

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, DELETE, PUT",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept", 
  "Content-Type": "application/json"
}

const SERVICE_IMAGE_DEFAULT = '../../../resources/images/services/service.jpg';

module.exports = {
  ROUTES,
  HEADERS,
  SERVICE_IMAGE_DEFAULT
};
