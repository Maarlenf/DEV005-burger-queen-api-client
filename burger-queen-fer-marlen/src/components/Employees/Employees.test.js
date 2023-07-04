/**
 * @jest-environment jsdom
 */

import Employees from "./Employees";
import React from "react";
import {
  fireEvent,
  render,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import { useNavigate } from "react-router-dom";

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
  ...jest.requireActual("../../lib/api"),
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
  test("have a icon for delete employee", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const { container } = render(<Employees />);
    await waitFor(() => {
      screen.getByTestId("employeesTable");
    });
    expect(container.querySelector("#modalDelete")).not.toBeTruthy();
    expect(container.querySelector("#deleteModal")).toBeInTheDocument();
    const clickModalDelete = container.querySelector("#deleteModal");
    fireEvent.click(clickModalDelete);
    expect(container.querySelector("#modalDelete")).toBeTruthy();
    cleanup();
  });
  test("have a button to navigate to products", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const { container } = render(<Employees />);
    await waitFor(() => {
      screen.getByTestId("employeesTable");
    });
    const navigateProduct = container.querySelector("#btnProduct");
    fireEvent.click(navigateProduct);
    expect(navigate).toHaveBeenCalledWith("/admin/products");
    cleanup();
  });
  test("have a button for edit employee", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const { container } = render(<Employees />);
    await waitFor(() => {
      screen.getByTestId("employeesTable");
    });
    expect(container.querySelector("#modalEdit")).not.toBeTruthy();
    const clickModalEdit = container.querySelector("#editModal");
    fireEvent.click(clickModalEdit);
    expect(container.querySelector("#modalEdit")).toBeTruthy();
    cleanup();
  });
  test("have a button for add employee", async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const { container } = render(<Employees />);
    await waitFor(() => {
      screen.getByTestId("employeesTable");
    });
    expect(container.querySelector("#modalCreateUser")).not.toBeTruthy();
    const div = container.querySelector(".addUser");
    fireEvent.click(div);
    expect(container.querySelector("#modalCreateUser")).toBeTruthy();
    cleanup();
  });
});

// describe("Employees component", () => {
//   test("have icon for delete employee", async () => {
//     const navigate = jest.fn();
//     useNavigate.mockReturnValue(navigate);
//     const { container } = render(<Employees />);
//     expect(container.querySelector("#modalDelete")).not.toBeTruthy();
//     expect(container.querySelector("#modalCreateUser")).not.toBeTruthy();
//     expect(container.querySelector("#modalEdit")).not.toBeTruthy();
//     const navigateProduct = container.querySelector("#btnProduct");
//     fireEvent.click(navigateProduct);
//     expect(navigate).toHaveBeenCalledWith("/admin/products");
//     await waitFor(() => {
//       screen.getByTestId("employeesTable");
//     });
//     expect(container.querySelector("#deleteModal")).toBeInTheDocument();
//     const clickModalDelete = container.querySelector("#deleteModal");
//     fireEvent.click(clickModalDelete);
//     expect(container.querySelector("#modalDelete")).toBeTruthy();

//     const div = container.querySelector(".addUser");
//     fireEvent.click(div);
//     expect(container.querySelector("#modalCreateUser")).toBeTruthy();

//     const clickModalEdit = container.querySelector("#editModal");
//     fireEvent.click(clickModalEdit);
//     expect(container.querySelector("#modalEdit")).toBeTruthy();
//   });
//   // test("something it's bad", async () => {
//   //   const {container}=render(<Employees/>);
//   //   if(getEmployees('123456')){
//   //       screen.getAllByTestId('employeesError');
//   //   }
//   //     expect(container).toHaveTextContent('Ha ocurrido un error');
//   // })
// });
