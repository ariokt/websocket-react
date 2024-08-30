import axios from "axios";

const URL = 'http://34.132.193.158';
// const URL = 'http://localhost:8000';

export const apiLogin = async (username, password) => {
  const res = await axios.post(`${URL}/auth/login`, {
    username,
    password,
  });
  return res;
}

export const apiRegister = async (dataRegister) => {
  try {
    const res = await axios.post(`${URL}/auth/register`, {
      name: dataRegister.name,
      email: dataRegister.email,
      username: dataRegister.username,
      password: dataRegister.password
    });
    return res;
  } catch (error) {
    return error.response;
  }
  
}