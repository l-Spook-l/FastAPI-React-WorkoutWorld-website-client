import jwt_decode from "jwt-decode";
import { $authHost, $host } from "./index";

export const registration = async (first_name, last_name, email, password, phone='') => {
  //console.log('registration', first_name, last_name, email, password, username)
  const response = await $host.post("auth/register/", { email, password, first_name, last_name, phone })
  //console.log("регистрация response", response);
  return response.data
}

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
  localStorage.setItem("token", response.data.access_token);
  console.log("авторизация response.data.access_token", response.data.access_token); 
  console.log("авторизация jwt_decode(response.data.access_token)", jwt_decode(response.data.access_token)); 
  console.log("авторизация jwt_decode(response.data.access_token)", jwt_decode(response.data.access_token).sub); 

  // const userId = jwt_decode(localStorage.getItem("token")).sub  protected-route
  // const responseUserMe = await $authHost.get(`api/v1/user-info/${userId}/`);
  const responseUserMe = await $authHost.get(`protected-route`);
  console.log("авторизация auth/users/me/ responseUserMe", responseUserMe);
  console.log("авторизация auth/users/me/ responseUserMe data", responseUserMe.data);

  return response
}

// Проверка токена на валидность
// Получение данных о пользователя, если токен не валиден ничего не получим
export const check = async () => {
  //console.log("check in userAPI is work")
  localStorage.setItem("token", localStorage.getItem("token"));
  //console.log("check in userAPI ", jwt_decode(localStorage.getItem("token")))
  //console.log("check in userAPI is work token")

  //const userId = jwt_decode(localStorage.getItem("token")).user_id
  //const response = await $authHost.get(`api/v1/user-info/${userId}/`);
  const response = await $authHost.get(`protected-route`);

  //console.log("check auth/users/me/ token test", `Bearer ${localStorage.getItem("token")}`);
  //console.log("check auth/users/me/ response user-info", response);
  //console.log("check auth/users/me/ response.data user-info", response.data);

  return response.data
}

export const updateUserData = async (data) => {
  const response = await $authHost.patch(`/users/me`, data);
  return response.data
}

export const forgotUserPassword = async (email) => {
  const response = await $host.post('/request-password-reset', {email})
  return response.data
}

export const resetUserPassword = async (token, password) => {
  const response = await $host.post('auth/reset-password', {token, password})
  return response.data
}

export const adminPanel = async () => {
  const response = await $authHost.post('admin')
  return response.data
}

export const adminFetchWorkout = async (workout_id) => {
  const response = await $authHost.get(`admin/workout/${workout_id}`)
  return response.data
}
