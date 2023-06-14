const http = "http://localhost:8080/";
const stringJSON = "application/json";

export function getLogin(email, password) {
  return fetch(`${http}login`, {
    method: "POST",
    headers: {
      "Content-type": stringJSON,
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.message);
    });
}

export function getEmployees(token) {
  return fetch(`${http}users`, {
    headers: {
      authorization: token,
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.message);
      return err;
    });
}

export function cutEmail(email) {
  const cutName = email.indexOf("@");
  const userInLine = email.substring(0, cutName);
  return userInLine;
}

export function createUser(email, password, role) {
  return fetch(`${http}users`, {
    method: "POST",
    headers: {
      "Content-type": stringJSON,
    },
    body: JSON.stringify({
      email: email,
      password: password,
      role: role,
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err.message);
    });
}

export function deleteUser(id, token) {
  return fetch(`${http}users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization : token
    }})
    .then((res) => 
    { console.log(res.statusText);
      res.json()})
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
}