/**
 * @jest-environment jsdom
 */

import { editUser } from "../../lib/api";
import ModalEdit from "./ModalEdit";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("../ModalEdit/ModalEdit.css", () => ({
  banner: {},
}));

jest.mock("../Input/Input.css", () => ({
  banner: {},
}));

jest.mock("../../lib/api", () => ({
  editUser: jest.fn().mockResolvedValue(),
}));

describe("ModalEdit component", () => {
  test("have a function to send edit", () => {
    const mockEmployes = [
      {
        email: "maria@falso.com",
        password:
          "$2a$10$nbW9si8FeEHUCYhXa690s.i4zLC.pBsUA/r5f9T8FLLkqGOMUlfPm",
        role: "chef",
        id: 5,
      },
    ];
    const onCloseMock = jest.fn();
    const { getByLabelText } = render(
      <ModalEdit userData={mockEmployes} onClose={onCloseMock} />
    );
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

    const buttonConfirm = screen.getByTestId("confirmEditUsers");
    fireEvent.click(buttonConfirm);
    expect(editUser).toHaveBeenCalled();
  });
  it("test modal opens with correct data", () => {
    const onClose = jest.fn();
    const userData = {
      email: "test@test.com",
      role: "admin",
      id: "123",
    };
    const token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4NzkwNjE0OCwiZXhwIjoxNjg3OTA5NzQ4LCJzdWIiOiIyIn0.3UMxVmEnrtk1fVill17SU4O2zPI1PzCL0BHDULz47p0";

    const { getByLabelText, getByText } = render(
      <ModalEdit onClose={onClose} userData={userData} token={token} />
    );

    expect(getByLabelText("Correo Electrónico")).toHaveValue(userData.email);
    expect(getByLabelText("Contraseña")).toHaveValue("");
    expect(getByText("Administrador/a")).toBeInTheDocument();
  });
});
