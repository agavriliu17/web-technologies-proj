const ROUTES = {
  welcome: "/welcome",
  getUsers: "/api/v1/users",
  registerUser: "/api/v1/register",
  loginUser: "/api/v1/login",
  getUserById: /\/api\/v1\/users\/id=([0-9a-f\-]+$)/,
  getUserByNickname: /\/api\/v1\/users\/nickname=([a-zA-Z0-9_!\s.\(\)]+$)/,
  getUserByEmail:
    /\/api\/v1\/users\/email=(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  getServices: "/api/v1/services",
  addService: "/api/v1/add-service",
  findServiceById: /\/api\/v1\/services\/id=([0-9a-f\-]+$)/,
  deleteServiceById: /\/api\/v1\/services\/delete-id=([0-9a-f\-]+$)/,
  findServicesByName: /\/api\/v1\/services\/name=([a-zA-Z0-9_!\s.\(\)]+$)/,
  getOrders: "/api/v1/orders",
  addOrder: "/api/v1/add-order",
  getOrderById: /\/api\/v1\/orders\/id=([0-9a-f\-]+$)/,
  getRSS: "/api/v1/services/rss",
  getUsersOrders: /\/api\/v1\/orders\/user=([0-9a-f\-]+$)/,
  updateUserPOST: /\/api\/v1\/users\/update-id=([0-9a-f\-]+$)/,
  deleteUserGET: /\/api\/v1\/users\/delete-id=([0-9a-f\-]+$)/,
  topRegionsByOrder: "/api/v1/stats/top-regions-by-order",
  topUsersByOrder: "/api/v1/stats/top-users-by-order",
  topServicesByOrder: "/api/v1/stats/top-services-by-order",
  topServicesPerRegion: "/api/v1/stats/top-services-per-region",
  totalOrders: "/api/v1/stats/total-orders",
  totalUsers: "/api/v1/stats/total-users",
  numberOfOrdersPerMonthForService: "/api/v1/stats/num-service-month",
  allServicesFromRegion: "/api/v1/stats/all-services-region",
  allRegions: "/api/v1/stats/all-regions",
};

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, DELETE, PUT",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept, Credentials, Authorization",
  "Access-Control-Allow-Credentials": "true",
  "Content-Type": "application/json",
};

const QUERRIES = {
  topRegionsByOrderCount:
    "SELECT count(o.id) as frequency, s.region FROM orders o INNER JOIN services s ON o.id_service = s.id GROUP BY s.region ORDER BY frequency DESC;",
  topUsersByOrderCount:
    "SELECT u.id, u.nickname, u.name, count(o.id) as order_count FROM users u INNER JOIN orders o ON o.id_user = u.id GROUP BY u.id ORDER BY order_count DESC;",
  topServicesByOrderCount:
    "SELECT s.id, s.name, count(o.id) as frequency FROM services s INNER JOIN orders o ON o.id_service = s.id GROUP BY s.id ORDER BY frequency DESC;",
  totalOrders: "SELECT count(id) FROM orders;",
  totalUsers: "SELECT count(id) FROM users;",
  topServicesPerRegion:
    "SELECT s.id, s.name, count(o.id), s.region as frequency FROM services s INNER JOIN orders o ON o.id_service = s.id GROUP BY s.id ORDER BY frequency DESC;",
  bestSellingServicePerMonth:
    "SELECT count(id) as frequency, id_service FROM orders WHERE EXTRACT(MONTH FROM date) = $1 GROUP BY id_service ORDER BY frequency DESC;",
  numberOfOrdersPerMonthForService:
    "SELECT count(id) as frequency FROM orders WHERE EXTRACT(MONTH FROM date) = $1 AND id_service = $2;",
  allServicesFromRegion: "SELECT id FROM services WHERE region = $1",
  allRegions: "SELECT region FROM services GROUP BY region",
};

const SERVICE_IMAGE_DEFAULT = "../../../resources/images/services/service.jpg";
const DEFAULT_REGIONS = ["Romania", "Greece", "Italy", "Hungary"];

module.exports = {
  ROUTES,
  HEADERS,
  SERVICE_IMAGE_DEFAULT,
  QUERRIES,
  DEFAULT_REGIONS,
};
