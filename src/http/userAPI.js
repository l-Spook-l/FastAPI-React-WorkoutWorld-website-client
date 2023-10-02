import jwt_decode from "jwt-decode";
import { $authHost, $host } from "./index";
//import { createBasketForUser, createWishListForUser } from "./productAPI";

export const registration = async (first_name, last_name, email, password, username, phone=0) => {
  //console.log('registration', first_name, last_name, email, password, username)
  const response = await $host.post("auth/register/", { email, password, username, first_name, last_name, phone });  // Ответ от сервера
  //console.log("регистрация response", response);
  //createBasketForUser({user: response.data.id})  // создаем корзину
  //createWishListForUser({user: response.data.id})  // создаем список желаний 
  return response.data
};

export const login = async ( username, password ) => {
  console.log('login', username, password)
  const response = await $host.post("auth/jwt/login/", 
    { username, password }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  console.log("авторизация response", response); 
  console.log("авторизация data", response.data);
  localStorage.setItem("token", response.data.access_token); // глянь на этот ответ 2:11:7
  console.log("авторизация response.data.access_token", response.data.access_token); 
  console.log("авторизация jwt_decode(response.data.access_token)", jwt_decode(response.data.access_token)); 
  console.log("авторизация jwt_decode(response.data.access_token)", jwt_decode(response.data.access_token).sub); 

  // const userId = jwt_decode(localStorage.getItem("token")).sub  protected-route
  // const responseUserMe = await $authHost.get(`api/v1/user-info/${userId}/`);
  const responseUserMe = await $authHost.get(`protected-route`);
  console.log("авторизация auth/users/me/ responseUserMe", responseUserMe);
  console.log("авторизация auth/users/me/ responseUserMe data", responseUserMe.data);

  //return responseUserMe.data.results[0];
  return response;
};

// Проверка токена на валидность
// Получение данных о пользователя, если токен не валиден ничего не получим
export const check = async () => {
  console.log("check in userAPI is work")
  localStorage.setItem("token", localStorage.getItem("token"));
  console.log("check in userAPI ", jwt_decode(localStorage.getItem("token")))
  console.log("check in userAPI is work token")

  const userId = jwt_decode(localStorage.getItem("token")).user_id
  //const response = await $authHost.get(`api/v1/user-info/${userId}/`);
  const response = await $authHost.get(`protected-route`);

  console.log("check auth/users/me/ token test", `Bearer ${localStorage.getItem("token")}`);
  console.log("check auth/users/me/ response user-info", response);
  console.log("check auth/users/me/ response.data user-info", response.data);

  //return response.data.results[0]
  return response.data
};