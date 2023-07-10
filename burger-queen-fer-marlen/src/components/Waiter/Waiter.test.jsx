/**
 * @jest-environment jsdom
 */
import Waiter from "./Waiter";
import React from "react";
import {
  fireEvent,
  render,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import { getProducts, cutEmail, createOrder } from "../../lib/api";
import { useNavigate } from "react-router-dom";
jest.mock("../../images.js", () => ({
  bannerBurger: "banner-opacity.png",
}));
jest.mock("../Waiter/Waiter.css", () => ({
  banner: {},
}));
jest.mock("../Title/Title.css", () => ({
  banner: {},
}));
jest.mock("../Card/Card.css", () => ({
  banner: {},
}));
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("../../lib/api", () => ({
  ...jest.requireActual("../../lib/api"),
  getOrders: jest.fn(() =>
    Promise.resolve([
      {
        id: 1,
        client: "Juanito",
        dateEntry: "2023-07-05T10:30:00.102Z",
        products: [
          {
            product: [
              {
                id: 1,
                qty: 2,
                product: {
                  name: "Burger",
                  image: "burger.jpg",
                },
              },
            ],
          },
        ],
        status: "delivered",
      },
    ])
  ),
  getProducts: jest.fn(() =>
    Promise.resolve(
      {
        id: 1,
        name: "Product 1",
        price: 10,
        image: "image1.jpg",
        type: "Desayuno",
        dateEntry: "2023-07-04T01:23:05.486Z",
      },
      {
        id: 2,
        name: "Product 2",
        price: 20,
        image: "image2.jpg",
        type: "Almuerzo",
        dateEntry: "2023-07-04T01:23:05.486Z",
      }
    )
  ),
  createOrder: jest.fn(),
  cutEmail: jest.fn(),
}));

describe("waiter", () => {
  const navigateMock = jest.fn();
  it("renders the component and fetches products", async () => {
    const authorization =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4NzkwNjE0OCwiZXhwIjoxNjg3OTA5NzQ4LCJzdWIiOiIyIn0.3UMxVmEnrtk1fVill17SU4O2zPI1PzCL0BHDULz47p0";
    const user = "user@example.com";
    const userInLine = "user";
    const products = [
      {
        id: "1",
        name: "Product 1",
        price: 9.99,
        image: "product1.png",
        type: "Desayuno",
      },
      {
        id: "2",
        name: "Product 2",
        price: 14.99,
        image: "product2.png",
        type: "Almuerzo",
      },
    ];

    cutEmail.mockReturnValue(userInLine);
    getProducts.mockResolvedValue(products);

    render(<Waiter />);

    expect(screen.getByText("Mesero/a")).toBeInTheDocument();

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalled();

      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
    cleanup();
  });
  test("show all products, and have a input for find a product", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const { container } = render(<Waiter />);
    await waitFor(() => {
      screen.getByTestId("tableWaiter");
    });
    expect(container.querySelector(".productCards")).toBeInTheDocument();
    const inputForSearch = container.querySelector("#inputForSearch");
    fireEvent.change(inputForSearch, { target: { value: "Produ" } });
    expect(inputForSearch).toHaveValue("Produ");
    cleanup();
  });
  test("have a section for view item add in the order", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const { container } = render(<Waiter />);

    await waitFor(() => {
      screen.getByTestId("tableWaiter");
    });
    const addItem = container.querySelector("#btnOrder");
    fireEvent.click(addItem);
    expect(container.querySelector(".orderItem")).toBeTruthy();
    const buttonDeleteItem = container.querySelector("#deleteItemOrder");
    fireEvent.click(buttonDeleteItem);
    expect(container.querySelector(".orderItem")).not.toBeInTheDocument();
    const nameClient = container.querySelector("#nameClient");
    fireEvent.change(nameClient, { target: { value: "Rosa" } });
    expect(nameClient).toHaveValue("Rosa");
    cleanup();
  });
  test("have a button to send order", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const { container } = render(<Waiter />);

    await waitFor(() => {
      screen.getByTestId("tableWaiter");
    });
    const addItem = container.querySelector("#btnOrder");
    fireEvent.click(addItem);
    const nameClient = container.querySelector("#nameClient");
    fireEvent.change(nameClient, { target: { value: "Rosa" } });
    createOrder.mockResolvedValue(() => Promise.resolve({ status: 200 }));
    const buttonToSend = container.querySelector("#btnSend");
    fireEvent.click(buttonToSend);
    expect(createOrder).toHaveBeenCalled();
    cleanup();
  });
  test("test handleAddtoOrder", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const { container } = render(<Waiter />);

    await waitFor(() => {
      screen.getByTestId("tableWaiter");
    });
    const addItem = container.querySelector("#btnOrder");
    fireEvent.click(addItem);
    expect(container.querySelector(".orderItem")).toBeInTheDocument();
    const sum = container.querySelector("#plus");
    fireEvent.click(sum);
    fireEvent.click(sum);
    fireEvent.click(addItem);
    expect(container.querySelector(".orderItem")).toHaveTextContent("2");
    const rest = container.querySelector("#minus");
    fireEvent.click(rest);
    fireEvent.click(addItem);
    expect(container.querySelector(".orderItem")).toHaveTextContent("1");
    const nameClient = container.querySelector("#nameClient");
    fireEvent.change(nameClient, { target: { value: "Rosa" } });
    createOrder.mockResolvedValue(() => Promise.resolve({ status: 200 }));
    const buttonToSend = container.querySelector("#btnSend");
    fireEvent.click(buttonToSend);
    expect(createOrder).toHaveBeenCalled();
    cleanup();
  });
  test("have a button for go to orders readys", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const { container } = render(<Waiter />);

    await waitFor(() => {
      screen.getByTestId("tableWaiter");
    });
    const buttonReady = container.querySelector("#goToOrders");
    fireEvent.click(buttonReady);
    await waitFor(() => {
      expect(navigate).toHaveBeenCalled();
    });
    cleanup();
  });
});
