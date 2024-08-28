// const URL = 'http://34.132.193.158';
const URL = 'http://localhost:8000';

export const apiLogin = async (username, password) => {
  const res = await fetch(`${URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password}),
  });
  const data = await res.json(); // Await the resolution of the JSON parsing
  return data;
}

export const apiRegister = async (dataRegister) => {
  const res = await fetch(`${URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
       name: dataRegister.name,
       email: dataRegister.email,
       username: dataRegister.username,
       password: dataRegister.password
      }),
  });
  const data = await res.json(); // Await the resolution of the JSON parsing
  return data;
}