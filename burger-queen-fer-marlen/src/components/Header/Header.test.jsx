/**
 * @jest-environment jsdom
 */
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";
jest.mock("../../images.js", () => ({
  logo: "logo.png",
}));
jest.mock("../Title/Title.css", () => ({
  h1: {},
}));
const logout = jest.fn();

describe("test forHeader component", () => {
  test("show the title", () => {
    const { getByText } = render(<Header user='Grace Hopper' />, {
      wrapper: MemoryRouter,
    });
    const titleElement = getByText("Administrador");
    expect(titleElement.textContent).toContain("Administrador");
  });

  test("show user in line", () => {
    const user = "gracee.hopper";
    const { getByText } = render(<Header user={user} />, {
      wrapper: MemoryRouter,
    });
    const divClose = getByText(user);
    expect(divClose.textContent).toContain(user);
  });
  test("call function logout", () => {
    const user = "gracee.hopper";

    const { getByTestId } = render(<Header user={user} logout={logout} />, {
      wrapper: MemoryRouter,
    });
    const logoutIcon = getByTestId("logout-icon");
    fireEvent.click(logoutIcon);
    expect(logout).toHaveBeenCalledWhith("/");
    expect(logout).toHaveBeenCalledTimes(1);
  });
});
