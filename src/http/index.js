import axios from "axios";

//console.log(process.env.REACT_APP_API_URL)
const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
/*   console.log('config.headers.authorization', config.headers.authorization)
  console.log('config.headers', config.headers)
  console.log('config', config) */
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
