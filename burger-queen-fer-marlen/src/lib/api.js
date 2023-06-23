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
    method: "GET",
    headers: {
      Authorization: token,
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
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err + "Error al eliminar el usuario");
    });
}
export function editUser(token, uid, email, password, role) {
  return fetch(`${http}users/${uid}`, {
    method: "PATCH",
    headers: {
      "Content-type": stringJSON,
      Authorization: token,
    },
    body: JSON.stringify({
      email: email,
      password: password,
      role: role,
    }),
  })
    .then((res) => {
      res;
    })
    .catch((err) => console.log(err.message));
}

export function getProducts(token) {
  return fetch(`${http}products`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((res) => 
    
      res.json())
    .catch((err) => {
      console.log(err.message);
      return err;
    });
}
export function deleteProduct(id, token) {
  return fetch(`${http}products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err + "Error al eliminar el producto");
    });
}
export function editProduct(token, uid, product, price, image, type) {
  return fetch(`${http}products/${uid}`, {
    method: "PATCH",
    headers: {
      "Content-type": stringJSON,
      Authorization: token,
    },
    body: JSON.stringify({
      product: product,
      price: price,
      image: image,
      type: type,
      dateEntry: new Date(),
    }),
  })
    .then((res) => {
      res;
    })
    .catch((err) => console.log(err.message));
}
export function createProduct(token, product, price, image, type) {
  return fetch(`${http}products`, {
    method: "POST",
    headers: {
      "Content-type": stringJSON,
      Authorization: token,
    },
    body: JSON.stringify({
      name: product,
      price: price,
      image: image,
      type: type,
      dateEntry: new Date(),
    }),
  })
    .then((res) => {
    res.json()})
    .catch((err) => {
      console.log(err.message);
    });
}

export function createOrder(token, object) {
  return fetch(`${http}orders`, {
    method: "POST",
    headers: {
      "Content-type": stringJSON,
      Authorization: token,
    },
    body: JSON.stringify( object ),
  })
    .then((res) => {
      console.log(res);
      res.json()
    })
    .catch((err) => {
      console.log(err.message);
    });
}
