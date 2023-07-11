/**
 * @jest-environment jsdom
 */

import { render , screen, fireEvent, waitFor, cleanup} from "@testing-library/react";
import Home from "./Home";
import { getLogin } from "../../lib/api";
import { useNavigate } from "react-router-dom";


jest.mock("../../images.js", () => ({
    bannerBurger: "banner-opacity.png",
  }));
  jest.mock("../Home/Home.css", () => ({
    banner: {},
  }));
jest.mock("../Banner/Banner.css", () => ({
    banner: {},
  }));
  jest.mock("../Title/Title.css", () => ({
    banner: {},
  }));
  jest.mock("../Input/Input.css", () => ({
    banner: {},
  }));
  jest.mock("../Button/Button.css", () => ({
    banner: {},
  }));
  jest.mock("../Footer/Footer.css", () => ({
    banner: {},
  }));
  jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
  }));
  jest.mock("../../lib/api", () => ({
    ...jest.requireActual("../../lib/api"),
    getLogin: jest.fn(() => Promise.resolve(  { 
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY4ODE1NzY3NiwiZXhwIjoxNjg4MTYxMjc2LCJzdWIiOiIyIn0.UwuxM_XLj2nXJpH_ChWwwkmpyRlmdG6uY-ujAU91Lro",
      user: {
        dateEntry: "2023-06-19T18:39:45.269Z",
        email: "grace.hopper@systers.xyz",
        id: 2,
        role: "admin"
      }}))
  })
  );

  describe('Home component', () =>{
    test('show a text error when the credential"s isn"t valid', async () => {
        const {container} = render(<Home/>);
        const inputEmail = screen.getByLabelText('Correo Electrónico');
        const inputPass = screen.getByLabelText('Contraseña');
        const form = container.querySelector('#btnLogin');
        fireEvent.change(inputEmail, {target: {value:'alan@falso.com'}});
        fireEvent.change(inputPass, {target:{value:''}});
        await waitFor(() => {
          fireEvent.submit(form);
        }) 
        await waitFor(() => {
          expect(container.querySelector('.failLogin')).toBeInTheDocument();
        }) 
        cleanup();
    })
    test('navigete to admin when the rol it"s admin', async () => {
      const navigate = jest.fn();
      useNavigate.mockReturnValue(navigate);
      const {container} = render(<Home/>);
      const inputEmail = screen.getByLabelText('Correo Electrónico');
      const inputPass = screen.getByLabelText('Contraseña');
      const button = container.querySelector('#btnLogin');
      fireEvent.change(inputEmail, {target: {value:'grace.hopper@systers.xyz'}});
      fireEvent.change(inputPass, {target:{value:'123456'}});
      
      await waitFor(() => {
        fireEvent.click(button);
      })
      await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith('/admin/employees');
      })
      cleanup();
    })
    });
