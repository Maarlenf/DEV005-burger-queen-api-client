/**
 * @jest-environment jsdom
 */
import { deleteProduct, deleteUser } from "../../lib/api";
import ModalDelete from "./ModalDelete";
import {
  fireEvent,
  render,
  waitFor,
  getByTestId,
  screen,
} from "@testing-library/react";

jest.mock("../ModalDelete/ModalDelete.css", () => ({
  banner: {},
}));
jest.mock("../../lib/api", () => ({
  ...jest.requireActual("../../lib/api"),
  deleteUser: jest.fn(() =>
    Promise.resolve({
      success: true,
    })
  ),
  deleteProduct: jest.fn(() =>
    Promise.resolve({
      success: true,
    })
  ),
}));

describe("ModalDeleteComponent", () => {
  test("have a button to confirm delete employee", () => {
    const mockEmployes = [
      {
        email: "maria@falso.com",
        password:
          "$2a$10$nbW9si8FeEHUCYhXa690s.i4zLC.pBsUA/r5f9T8FLLkqGOMUlfPm",
        role: "chef",
        id: 5,
      },
    ];
    render(
      <ModalDelete
        id={mockEmployes.id}
        text='Acción irreversible, ¿Desea continuar con la eliminación?'
        optToDelete='user'
      />
    );
    const buttonConfirm = screen.getByTestId("confirmDelete");
    fireEvent.click(buttonConfirm);
    expect(deleteUser).toHaveBeenCalled();
  });
  test("have a button to confirm delete products", () => {
    const mockProduct = {
      dateEntry: "2022-03-05 15:14:10",
      id: 3,
      image:
        "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
      name: "Agua 500ml",
      price: 500,
      type: "Almuerzo",
    };
    render(
      <ModalDelete
        id={mockProduct.id}
        text='Acción irreversible, ¿Desea continuar con la eliminación?'
        optToDelete='product'
      />
    );
    const buttonConfirm = screen.getByTestId("confirmDelete");
    fireEvent.click(buttonConfirm);
    expect(deleteProduct).toHaveBeenCalled();
  });
});
