/**
 * @jest-environment jsdom
 */

import Admin from "./Admin";
import { fireEvent, render, screen } from "@testing-library/react";
import { cutEmail } from "../../lib/api";
import { useNavigate } from "react-router-dom";

jest.mock("../../images.js", () => ({
  bannerBurger: "banner-opacity.png",
}));
jest.mock("../Banner/Banner.css", () => ({
  banner: {},
}));
jest.mock("../Button/Button.css", () => ({
  banner: {},
}));
jest.mock("../Footer/Footer.css", () => ({
  banner: {},
}));
jest.mock("../Title/Title.css", () => ({
  banner: {},
}));
jest.mock("../Header/Header.css", () => ({
  banner: {},
}));
jest.mock("../Admin/Admin.css", () => ({
  banner: {},
}));
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("../../lib/api", () => ({
  cutEmail: jest.fn(),
}));

describe("Admin component", () => {
  test("should navigate to Trabajadores if the button is clicked ", () => {
    const email = "grace@falso.com";
    cutEmail(email);
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const { container } = render(<Admin />);

    const btnEmployees = container.querySelector("#btnEmployees");

    fireEvent.click(btnEmployees);

    expect(navigate).toHaveBeenCalledWith("/admin/employees");
  });
  test("should navigate to Productos if the button is clicked", () => {
    const email = "grace@falso.com";
    cutEmail(email);
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const { container } = render(<Admin />);

    const btnEmployees = container.querySelector("#btnProducts");

    fireEvent.click(btnEmployees);

    expect(navigate).toHaveBeenCalledWith("/admin/products");
  });
});
