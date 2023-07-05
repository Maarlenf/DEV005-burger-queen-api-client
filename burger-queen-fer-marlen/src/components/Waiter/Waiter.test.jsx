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
  getProducts: jest.fn(),
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
    });
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
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

  test("have a checked for filter for type", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const { container } = render(<Waiter />);
    await waitFor(() => {
      screen.getByTestId("tableWaiter");
    });
    const radioDes = container.querySelector("#desTopping");
    const radioAlm = container.querySelector("#almTopping");
    const radioCen = container.querySelector("#cenTopping");
    fireEvent.click(radioCen);
    expect(radioDes).not.toBeChecked();
    expect(radioAlm).not.toBeChecked();
    expect(radioCen).toBeChecked();
    fireEvent.click(radioAlm);
    fireEvent.click(radioCen);
    expect(radioDes).not.toBeChecked();
    expect(radioAlm).toBeChecked();
    expect(radioCen).not.toBeChecked();
    fireEvent.click(radioDes);
    fireEvent.click(radioAlm);
    expect(radioDes).toBeChecked();
    expect(radioAlm).not.toBeChecked();
    expect(radioCen).not.toBeChecked();
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
    // const objectOrder = {
    //     userId: 3,
    //     client: nameClient,
    //     products: [
    //       {
    //         product
    //       }
    //     ],
    //     status: "pending",
    //     dateEntry: new Date()
    //   }
    //   const product = [
    //     {
    //       id: "1",
    //       name: "Product 1",
    //       price: 9.99,
    //       image: "product1.png",
    //       type: "Desayuno",
    //     }
    //   ];
    const buttonToSend = container.querySelector("#btnSend");
    fireEvent.click(buttonToSend);
    expect(createOrder).toHaveBeenCalled();
    cleanup();
  });
  // it("test add to order multiple products", () => {
  //   const product1 = {
  //     id: 1,
  //     name: "Product 1",
  //     price: 10,
  //     image: "image1.jpg",
  //     type: "Desayuno",
  //     dateEntry: "2023-07-04T01:23:05.486Z",
  //   };
  //   const product2 = {
  //     id: 2,
  //     name: "Product 2",
  //     price: 20,
  //     image: "image2.jpg",
  //     type: "Almuerzo",
  //     dateEntry: "2023-07-04T01:23:05.486Z",
  //   };
  //   const count = 2;
  //   const handleAddToOrder = jest.fn();
  //   const orderItems = [
  //     {
  //       dateEntry: "2023-07-04T01:23:05.486Z",
  //       id: 1,
  //       image: "image1.jpg",
  //       name: "Product 1",
  //       price: 10,
  //       qty: 2,
  //       type: "Desayuno",
  //     },
  //     {
  //       dateEntry: "2023-07-04T01:23:05.486Z",
  //       id: 2,
  //       image: "image2.jpg",
  //       name: "Product 2",
  //       price: 20,
  //       qty: 2,
  //       type: "Almuerzo",
  //     },
  //   ];
  //   const setOrderItems = (items) => {
  //     orderItems.push(...items);
  //   };
  //   handleAddToOrder(product1, count);
  //   handleAddToOrder(product2, count);
  //   expect(orderItems).toEqual([
  //     { ...product1, qty: count },
  //     { ...product2, qty: count },
  //   ]);
  // });
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
});
