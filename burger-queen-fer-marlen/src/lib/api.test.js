/**
 * @jest-environment jsdom
 */

import {
  getLogin,
  getEmployees,
  createUser,
  cutEmail,
  deleteUser,
  getProducts,
  editProduct,
  editUser,
  deleteProduct,
  createOrder,
  createProduct,
  getOrders,
} from "../lib/api";

global.fetch = jest.fn(() => Promise.resolve({}));
describe("getLogin", () => {
  test("getLogin toBe object of promise", () => {
    expect(typeof getLogin()).toBe("object");
  });
});
describe("getLogin function", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("log in successfully with valid credentials", () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest
        .fn()
        .mockResolvedValueOnce({ success: true, message: "Login successful" }),
    });

    return expect(getLogin("test@example.com", "password")).resolves.toEqual({
      success: true,
      message: "Login successful",
    });
  });
});

describe("getemployees", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("should all employees when authorization is ok", () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        email: "maria@falso.com",
        password:
          "$2a$10$nbW9si8FeEHUCYhXa690s.i4zLC.pBsUA/r5f9T8FLLkqGOMUlfPm",
        role: "chef",
        id: 5,
      }),
    });

    // getEmployees('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4NzkwNjE0OCwiZXhwIjoxNjg3OTA5NzQ4LCJzdWIiOiIyIn0.3UMxVmEnrtk1fVill17SU4O2zPI1PzCL0BHDULz47p0').then((res) => console.log(res));
    getEmployees(
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4NzkwNjE0OCwiZXhwIjoxNjg3OTA5NzQ4LCJzdWIiOiIyIn0.3UMxVmEnrtk1fVill17SU4O2zPI1PzCL0BHDULz47p0"
    ).then((res) =>
      expect(res).toEqual({
        email: "maria@falso.com",
        password:
          "$2a$10$nbW9si8FeEHUCYhXa690s.i4zLC.pBsUA/r5f9T8FLLkqGOMUlfPm",
        role: "chef",
        id: 5,
      })
    );
  });
  test("chould message error when res is fail", () => {
    const messageError = "token expirado";
    global.fetch = jest.fn().mockRejectedValue({
      json: jest.fn(),
      error: messageError,
    });
    const consoleMessage = jest.spyOn(console, "log").mockImplementation();
    getEmployees("23421253648687").catch((err) =>
      expect(err).toEqual({ messageError })
    );
  });
});

describe("createUser", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
      });
  test("should return the ok response", () => {
    const email = "test@example.com";
    const password = "password123";
    const role = "user";

    const mockResponse = { success: true };
    global.fetch.mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    return createUser(email, password, role).then((response) => {
      expect(response).toEqual(mockResponse);
    });
  });

  test("should show error message if the request fail", () => {
    const email = "test@example.com";
    const password = "password123";
    const role = "user";

    const errorMessage = "Request failed";

    global.fetch.mockRejectedValue({ message: errorMessage });
    const consoleMessage = jest.spyOn(console, "log").mockImplementation();
    return createUser(email, password, role).catch(() => {
      expect(consoleMessage).toHaveBeenCalledWith(errorMessage);
    });
  });
});

describe("cuteEmail", () => {
  test("should cut the email", () => {
    const email = "maria@falso.com";
    const expectEmail = "maria";

    const result = cutEmail(email);

    expect(result).toBe(expectEmail);
  });
});

describe("deleteUser", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
      });
  test("should delete worker selected", () => {
    const mockEmployes = [
      {
        email: "maria@falso.com",
        password:
          "$2a$10$nbW9si8FeEHUCYhXa690s.i4zLC.pBsUA/r5f9T8FLLkqGOMUlfPm",
        role: "chef",
        id: 5,
      },
    ];
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4NzkwNjE0OCwiZXhwIjoxNjg3OTA5NzQ4LCJzdWIiOiIyIn0.3UMxVmEnrtk1fVill17SU4O2zPI1PzCL0BHDULz47p0";
    const mockResponse = { success: true };
    global.fetch.mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    return deleteUser(mockEmployes.id, token).then((res) =>
      expect(res).toEqual(mockResponse)
    );
  });
  test('should err when don"t exist token or id', () => {
    const errorMessage = "Request failed";
    global.fetch.mockRejectedValue({ message: errorMessage });
    const consoleMessage = jest.spyOn(console, "log").mockImplementation();
    return deleteUser(2, "1234567").catch((err) =>
      expect(err).toEqual(consoleMessage)
    );
  });
});

describe("getProducts", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
      });
  test('should all products when is authorization it"s ok', () => {
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4NzkwNjE0OCwiZXhwIjoxNjg3OTA5NzQ4LCJzdWIiOiIyIn0.3UMxVmEnrtk1fVill17SU4O2zPI1PzCL0BHDULz47p0";
    const mockRes = {
      dateEntry: "2022-03-05 15:14:10",
      id: 3,
      image:
        "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
      name: "Agua 500ml",
      price: 500,
      type: "Almuerzo",
    };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        dateEntry: "2022-03-05 15:14:10",
        id: 3,
        image:
          "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
        name: "Agua 500ml",
        price: 500,
        type: "Almuerzo",
      }),
    });
    return getProducts(token).then((res) => {
      console.log(res);
      expect(res).toEqual(mockRes);
    });
  });
  test('should error when authorization it"s fail', () => {
    const messageError = "token expirado";
    global.fetch = jest.fn().mockRejectedValue({
      json: jest.fn(),
      error: messageError,
    });
    const consoleMessage = jest.spyOn(console, "log").mockImplementation();
    getProducts("123456").catch((err) => expect(err).toEqual(consoleMessage));
  });
});

describe("editUser", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
      });
  test("should edit data user", () => {
    // token, uid, email, password, role;
    const http = "http://localhost:8080/";
    const uid = "2";
    const email = "test@example.com";
    const password = "password123";
    const role = "admin";
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4NzkwNjE0OCwiZXhwIjoxNjg3OTA5NzQ4LCJzdWIiOiIyIn0.3UMxVmEnrtk1fVill17SU4O2zPI1PzCL0BHDULz47p0";
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        status: 200,
      });
    });
    return editUser(token, uid, email, password, role).then(() => {
      expect(fetch).toHaveBeenCalledWith(`${http}users/${uid}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });
    });
  });
  it("shuld show error mesagges", () => {
    const errorMessage = "Hubo un error en la solicitud PATCH";
    jest.spyOn(console, "log").mockImplementation();

    global.fetch = jest.fn().mockRejectedValue(new Error(errorMessage));

    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4NzkwNjE0OCwiZXhwIjoxNjg3OTA5NzQ4LCJzdWIiOiIyIn0.3UMxVmEnrtk1fVill17SU4O2zPI1PzCL0BHDULz47p0";
    const uid = "123456";
    const email = "example@example.com";
    const password = "mypassword";
    const role = "admin";

    return editUser(token, uid, email, password, role).catch(() => {
      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
  });
});

describe("editProducts", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
      });
  test("should edit product data", () => {
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4NzkwNjE0OCwiZXhwIjoxNjg3OTA5NzQ4LCJzdWIiOiIyIn0.3UMxVmEnrtk1fVill17SU4O2zPI1PzCL0BHDULz47p0";
    const product = {
      product: "Agua 500ml",
      price: 1000,
      image:
        "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
      type: "Cena",
      dateEntry: new Date(),
    };
    const mockResponse = { success: true };
    const http = "http://localhost:8080/";
    const uid = 3;
    global.fetch = jest.fn(() => Promise.resolve({ success: true }));
    editProduct(
      token,
      uid,
      product.product,
      product.price,
      product.image,
      product.type
    ).then(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });
  it("should message error if promise reject", () => {
    const errorMessage = "Hubo un error en la solicitud PATCH";
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4NzkwNjE0OCwiZXhwIjoxNjg3OTA5NzQ4LCJzdWIiOiIyIn0.3UMxVmEnrtk1fVill17SU4O2zPI1PzCL0BHDULz47p0";
    const product = {
      product: "Agua 500ml",
      price: 1000,
      image:
        "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
      type: "Cena",
      dateEntry: new Date(),
    };
    const http = "http://localhost:8080/";
    const uid = 3;
    jest.spyOn(console, "log").mockImplementation();

    global.fetch = jest.fn().mockRejectedValue(new Error(errorMessage));

    editProduct(token, product.product).catch((err) =>
      expect(err).toEqual(errorMessage)
    );
  });
});

describe("deletePrduct", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
      });
  test("should delete product selected", () => {
    const mockProduct = [
      {
        id: 1,
        name: "Sandwich de jamón y queso",
        price: "2",
        image:
          "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/sandwich.png",
        type: "Almuerzo",
        dateEntry: "2023-06-20T18:40:22.658Z",
        product: "Sandwich de jamón y queso",
        date: "2023-06-19T17:46:09.874Z",
      },
    ];
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4NzkwNjE0OCwiZXhwIjoxNjg3OTA5NzQ4LCJzdWIiOiIyIn0.3UMxVmEnrtk1fVill17SU4O2zPI1PzCL0BHDULz47p0";
    const mockResponse = { success: true };
    global.fetch.mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    return deleteProduct(mockProduct.id, token).then((res) =>
      expect(res).toEqual(mockResponse)
    );
  });
  test('should error message when don"t exist token or id', () => {
    const errorMessage = "Request failed";
    global.fetch.mockRejectedValue({ message: errorMessage });
    const consoleMessage = jest.spyOn(console, "log").mockImplementation();
    return deleteProduct(500, "1234567").catch((err) =>
      expect(err).toEqual(consoleMessage)
    );
  });
});

describe("createOrder", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
      });
  test("should new order", () => {
    const objectOrder = {
      userId: 1,
      client: "Juan",
      products: [
        {
          qty: 2,
          product: {
            id: 2,
            name: "Hamburguesa Simple",
            price: 5,
            image:
              "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
            type: "Almuerzo",
            dateEntry: new Date(),
          },
        },
      ],
      status: "pending",
      dateEntry: new Date(),
    };
    const mockResponse = {Response: {statusText: 'Created' }};
    const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4NzkwNjE0OCwiZXhwIjoxNjg3OTA5NzQ4LCJzdWIiOiIyIn0.3UMxVmEnrtk1fVill17SU4O2zPI1PzCL0BHDULz47p0";
    global.fetch.mockResolvedValueOnce({
      mockResponse
    });
    // global.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse));
  createOrder(token, objectOrder)
  .then(() => {
    expect(fetch).toHaveBeenCalled()})
  });
  test('should error message when something it"s bad', () => {
    const errorMessage = "Request failed";
    const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4NzkwNjE0OCwiZXhwIjoxNjg3OTA5NzQ4LCJzdWIiOiIyIn0.3UMxVmEnrtk1fVill17SU4O2zPI1PzCL0BHDULz47p0";
    global.fetch.mockRejectedValue({ message: errorMessage });
    const consoleMessage = jest.spyOn(console, "log").mockImplementation();
    createOrder(token).catch((err) => {
      expect(err).toHaveBeenLastCalledWith(consoleMessage);
    })
  })
});

describe('createProduct', () => {
  test('should a new product', () => {
    const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4NzkwNjE0OCwiZXhwIjoxNjg3OTA5NzQ4LCJzdWIiOiIyIn0.3UMxVmEnrtk1fVill17SU4O2zPI1PzCL0BHDULz47p0";
  const mockRes = {
    dateEntry: "2022-03-05 15:14:10",
    id: 3,
    image:
      "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
    name: "Agua 500ml",
    price: 500,
    type: "Almuerzo",
  };
  const mockResponse = {Response: {statusText: 'Created' }};
  global.fetch.mockResolvedValueOnce({
    mockResponse
  });
  createProduct(token, mockRes)
  .then(() => expect(fetch).toHaveBeenCalled());
  })
})

describe('getOrders', () => {
  test('should orders', () => {
    const objectOrder = {
      userId: 1,
      client: "Juan",
      products: [
        {
          qty: 2,
          product: {
            id: 2,
            name: "Hamburguesa Simple",
            price: 5,
            image:
              "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
            type: "Almuerzo",
            dateEntry: new Date(),
          },
        },
      ],
      status: "pending",
      dateEntry: new Date(),
    };

    const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4NzkwNjE0OCwiZXhwIjoxNjg3OTA5NzQ4LCJzdWIiOiIyIn0.3UMxVmEnrtk1fVill17SU4O2zPI1PzCL0BHDULz47p0";
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
          userId: 1,
          client: "Juan",
          products: [
            {
              qty: 2,
              product: {
                id: 2,
                name: "Hamburguesa Simple",
                price: 5,
                image:
                  "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
                type: "Almuerzo",
                dateEntry: new Date(),
              },
            },
          ],
          status: "pending",
          dateEntry: new Date(),
      }),
    });
    getOrders(token).then((res) => expect(res).toEqual(objectOrder))
  })
  test('should error when don"t have token', () => {
    const errorMessage = "Request failed";
    const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4NzkwNjE0OCwiZXhwIjoxNjg3OTA5NzQ4LCJzdWIiOiIyIn0.3UMxVmEnrtk1fVill17SU4O2zPI1PzCL0BHDULz47p0";
    global.fetch.mockRejectedValue({ message: errorMessage });
    const consoleMessage = jest.spyOn(console, "log").mockImplementation();
    getOrders('12345').catch((err) => expect(err).toHaveBeenLastCalledWith(consoleMessage))
  })
})