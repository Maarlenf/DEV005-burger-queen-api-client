/**
 * @jest-environment jsdom
 */
import Chef from "./Chef";
import React from "react";
import {
  fireEvent,
  render,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import { getProducts, cutEmail, createOrder, updateOrder, getOrders } from "../../lib/api";
import { useNavigate } from "react-router-dom";
jest.mock("../../images.js", () => ({
  bannerBurger: "banner-opacity.png",
}));
jest.mock("../Chef/Chef.css", () => ({
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
        status: "pending",
      },
    ]),
    // Promise.reject({error: 'Ha ocurrido un error'});
),
  cutEmail: jest.fn(),
  updateOrder: jest.fn(() => Promise.resolve({status: 200}))
}));
describe("Chef component", () => {
  test("renders orders correctly", async () => {
    render(<Chef />);

    await waitFor(() => {
      screen.getByTestId("tableOrders");
    });
    expect(screen.getByText("Juanito")).toBeInTheDocument();
    expect(screen.getByText("2023-07-05 10:30:00hrs.")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByAltText("img product")).toBeInTheDocument();
    expect(screen.getByText("Burger")).toBeInTheDocument();
    expect(screen.getByText("Realizado")).toBeInTheDocument();
    cleanup();
  });
  test("call confirmUpdate", async () => {
    const {container } = render(<Chef />);

    await waitFor(() => {
      screen.getByTestId("tableOrders");
    });

    const changeStatus = container.querySelector('#btnUpdate');
    fireEvent.click(changeStatus);
    expect(updateOrder).toHaveBeenCalled();
    cleanup();
  })
  test('something it"s bad', async () => {
    getOrders.mockRejectedValue({error: 'error'});
    const {container} = render(<Chef />);
  
    await waitFor(() => {
        screen.getByTestId("ordersError")
    });
    expect(screen.getByText('Ha ocurrido un error')).toBeInTheDocument();
    expect(container).toHaveTextContent('Ha ocurrido un error');
    cleanup();
  })
});
