/**
 * @jest-environment jsdom
 */

import Employees from "./Employees";
import React from 'react'
import { fireEvent, getByText, render, waitFor, screen } from "@testing-library/react";
// import { renderHook } from '@testing-library/react-hooks';
import { getEmployees } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { act } from "react-dom/test-utils";

jest.mock("../../images.js", () => ({
  bannerBurger: "banner-opacity.png",
}));
jest.mock("../Modal/Modal.css", () => ({
  banner: {},
}));
jest.mock("../ModalDelete/ModalDelete.css", () => ({
  banner: {},
}));
jest.mock("../ModalEdit/ModalEdit.css", () => ({
  banner: {},
}));
jest.mock("../Input/Input.css", () => ({
  banner: {},
}));
jest.mock("../Header/Header.css", () => ({
  banner: {},
}));
jest.mock("../Title/Title.css", () => ({
  banner: {},
}));
jest.mock("../Employees/Employees.css", () => ({
  banner: {},
}));
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("../../lib/api", () => ({
  getEmployees: jest.fn(() =>
    Promise.resolve([
      {
        email: "maria@falso.com",
        password:
          "$2a$10$nbW9si8FeEHUCYhXa690s.i4zLC.pBsUA/r5f9T8FLLkqGOMUlfPm",
        role: "chef",
        id: 5,
      },
      {
        email: "fer.hopper@systers.xyz",
        password:
          "$2a$10$4W5E3SrKQH4w.WU4Z46aD.rxFfbqHum8/LB8eG8M8xsESH0l6NGDS",
        role: "admin",
        id: 1,
      },
    ])
  ),
}));


describe("Employees component", () => {
  test("have a button and navigate products", () => {
    getEmployees.mockResolvedValue();
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const { container } = render(<Employees />);
    const navigateProduct = container.querySelector("#btnProduct");
    fireEvent.click(navigateProduct);
    expect(navigate).toHaveBeenCalledWith("/admin/products");
  });
  // test("to have container id", () => {
  //   const { container } = render(<Employees />);
  //   const div = container.querySelector(".containerId");
  //   expect(div).toBeInTheDocument();
  // });
  test.only("have a function toggleModal", () => {
    const { container } = render(<Employees />);
    const div = container.querySelector(".addUser");
    expect(container.querySelector("#modalCreateUser")).not.toBeTruthy();
    fireEvent.click(div);
    expect(container.querySelector("#modalCreateUser")).toBeTruthy();
    screen.debug();
  });
  test("have icon for delete employee", () => {
    const {container }= render(<Employees/>);
    expect(container.querySelector('#deleteModal')).toBeInTheDocument();
    screen.debug();
  })
});


