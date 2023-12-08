import { $authHost, $host } from "./index";

export const registration = async (first_name, last_name, email, password, phone='') => {
  const response = await $host.post("auth/register/", { email, password, first_name, last_name, phone })
  return response.data
}

export const login = async ( username, password ) => {
  const response = await $host.post("auth/jwt/login/", 
    { username, password }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  localStorage.setItem("token", response.data.access_token);
  return response
}

// Checking the token for validity
// Retrieving user data; if the token is not valid, we won't get anything
export const check = async () => {
  localStorage.setItem("token", localStorage.getItem("token"));
  const response = await $authHost.get(`protected-route`);
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

export const sendMessageToAdmin = async (name, email, message) => {
  const response = await $host.post(`/send-message-admin`, {name, email, message})
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
