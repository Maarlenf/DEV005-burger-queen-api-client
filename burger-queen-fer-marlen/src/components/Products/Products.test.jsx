/**
 * @jest-environment jsdom
 */

import { useNavigate } from "react-router-dom";
import Products from "./Products";
import {
  fireEvent,
  render,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import { getProducts } from "../../lib/api";

jest.mock("../../images.js", () => ({
  bannerBurger: "banner-opacity.png",
}));
jest.mock("../Banner/Banner.css", () => ({
  banner: {},
}));
jest.mock("../Footer/Footer.css", () => ({
  banner: {},
}));
jest.mock("../Header/Header.css", () => ({
  banner: {},
}));
jest.mock("../Button/Button.css", () => ({
  banner: {},
}));
jest.mock("../Products/Products.css", () => ({
  banner: {},
}));
jest.mock("../ModalEditProduct/ModalEditProduct.css", () => ({
  banner: {},
}));
jest.mock("../Title/Title.css", () => ({
  banner: {},
}));
jest.mock("../Input/Input.css", () => ({
  banner: {},
}));
jest.mock("../ModalDelete/ModalDelete.css", () => ({
  banner: {},
}));
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("../../lib/api", () => ({
  ...jest.requireActual("../../lib/api"),
  getProducts: jest.fn(() =>
    Promise.resolve([
      {
        dateEntry: "2022-03-05 15:14:10",
        id: 3,
        image:
          "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
        name: "Agua 500ml",
        price: 500,
        type: "Almuerzo",
      },
    ])
  ),
}));
describe("Products component", () => {
  test("have a list for delete product", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const { container } = render(<Products />);
    await waitFor(() => {
      screen.getByTestId("tableProducts");
    });
    expect(container.querySelector(".icon1")).toBeInTheDocument();
    cleanup();
  });
  test("have a button for navigate to employees", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const { container } = render(<Products />);
    await waitFor(() => {
      screen.getByTestId("tableProducts");
    });
    const buttonNavigate = container.querySelector("#btnEmployee");
    fireEvent.click(buttonNavigate);
    expect(navigate).toHaveBeenCalled();
    cleanup();
  });
  test("have a button for editing product", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const { container } = render(<Products />);
    await waitFor(() => {
      screen.getByTestId("tableProducts");
    });
    const buttonEdit = screen.getByTestId("checkEditProduct");
    fireEvent.click(buttonEdit);
    expect(container.querySelector("#modalEditProduct")).toBeTruthy();
    cleanup();
    expect(container.querySelector("#modalEditProduct")).not.toBeTruthy();
  });
  test("have a button for delete product", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const { container } = render(<Products />);
    await waitFor(() => {
      screen.getByTestId("tableProducts");
    });
    const buttonDelete = screen.getByTestId("deleteProduct");
    fireEvent.click(buttonDelete);
    expect(container.querySelector("#modalDelete")).toBeTruthy();
    cleanup();
    expect(container.querySelector("#modalDelete")).not.toBeTruthy();
  });
  test("have a checked for filter for type", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const { container } = render(<Products />);
    await waitFor(() => {
      screen.getByTestId("tableProducts");
    });
    const radioDes = container.querySelector("#toppingDes");
    const radioAlm = container.querySelector("#toppingAlm");
    const radioCen = container.querySelector("#toppingCen");
    expect(screen.getByTestId("checkEditProduct")).toBeTruthy();
    fireEvent.click(radioDes);
    expect(radioDes).toBeChecked();
    expect(radioAlm).not.toBeChecked();
    expect(radioCen).not.toBeChecked();
    expect(container.querySelector(".icon1")).not.toBeTruthy();
    fireEvent.click(radioDes);
    expect(container.querySelector(".icon1")).toBeTruthy();
    cleanup();
  });
  test("have a checked for filter for type", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const { container } = render(<Products />);

    await waitFor(() => {
      screen.getByTestId("tableProducts");
    });
    const radioDes = container.querySelector("#toppingDes");
    const radioAlm = container.querySelector("#toppingAlm");
    const radioCen = container.querySelector("#toppingCen");
    expect(screen.getByTestId("checkEditProduct")).toBeTruthy();
    fireEvent.click(radioCen);
    expect(radioDes).not.toBeChecked();
    expect(radioAlm).not.toBeChecked();
    expect(radioCen).toBeChecked();
    fireEvent.click(radioAlm);
    fireEvent.click(radioCen);
    expect(radioDes).not.toBeChecked();
    expect(radioAlm).toBeChecked();
    expect(radioCen).not.toBeChecked();
    cleanup();
  });
  test('if don"t product show modal for create', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const { container } = render(<Products />);
    await waitFor(() => {
      screen.getByTestId("tableProducts");
    });
    const buttonCreate = container.querySelector(".addProduct");
    fireEvent.click(buttonCreate);
    expect(container.querySelector("#modalEditProduct")).toBeTruthy();
    cleanup();
  });
});
