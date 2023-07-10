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

describe("test forHeader component", () => {
  test("show the title", () => {
    const { container } = render(
      <Header user=' Grace Hopper' text='Administrador' />,
      {
        wrapper: MemoryRouter,
      }
    );
    const res = `Administrador Grace Hopper `;
    expect(container.textContent).toBe(res);
  });

  test("show user in line", () => {
    const user = "gracee.hopper";
    const { container } = render(<Header user={user} />, {
      wrapper: MemoryRouter,
    });
    expect(container.textContent).toContain(user);
  });
  test("call function logout", () => {
    const user = "gracee.hopper";
    const logout = jest.fn();
    const { getByTestId, container } = render(
      <Header user={user} onClick={logout} />,
      {
        wrapper: MemoryRouter,
      }
    );
    const logoutIcon = getByTestId("logout-icon");
    fireEvent.click(logoutIcon);
    expect(fireEvent.click(logoutIcon)).toBeTruthy();
  });
});
