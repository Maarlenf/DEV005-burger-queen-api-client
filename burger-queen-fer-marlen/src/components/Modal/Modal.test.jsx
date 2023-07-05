/**
 * @jest-environment jsdom
 */

import Modal from "./Modal";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../lib/api";

jest.mock("../Modal/Modal.css", () => ({
  banner: {},
}));

jest.mock("../../lib/api", () => ({
  createUser: jest.fn().mockResolvedValue(),
}));
describe("modalCreateUser", () => {
  test("test render inputs", () => {
    render(<Modal />);
    const emailInput = screen.getByLabelText("Correo Electrónico");
    const passwordInput = screen.getByLabelText("Contraseña");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("check radio buttons", () => {
    const onClose = jest.fn();
    const { getByLabelText } = render(<Modal onClose={onClose} />);
    const emailInput = getByLabelText("Correo Electrónico");
    const passwordInput = getByLabelText("Contraseña");
    const adminRadio = screen.getByLabelText("Administrador/a");
    const chefRadio = screen.getByLabelText("Cocinera/o");
    const waiterRadio = screen.getByLabelText("Mesera/o");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(chefRadio);

    expect(adminRadio).not.toBeChecked();
    expect(chefRadio).toBeChecked();
    expect(waiterRadio).not.toBeChecked();
  });

  test("should call createUser and close the modal when clicked saveUser", async () => {
    const onCloseMock = jest.fn();
    render(<Modal onClose={onCloseMock} />);

    fireEvent.change(screen.getByLabelText("Correo Electrónico"), {
      target: { value: "example@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "password123" },
    });
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("saveUser"));
      expect(createUser).toHaveBeenCalledWith(
        "example@example.com",
        "password123",
        "admin"
      );
    });

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
    });
  });
});
