/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from "@testing-library/react";
import Header from "./Header";
import * as router from 'react-router';
import { BrowserRouter, MemoryRouter } from "react-router-dom";

jest.mock("../../images.js", () => ({
 logo: "logo.png",
}));

jest.mock("../Title/Title.css", () => 
    { h1:{}}
    )



describe("Header component", () => {
  test('show view user in line', () => {
    const user = "gracee.hopper";
    const {getByText} = render(<Header user={user} />, {
        wrapper: MemoryRouter,
    })
    const divClose = getByText(user); 
    expect(divClose.textContent).toContain(user);
})
});
// test("call function logout", () => {
//     const navigate = jest.fn();
//     const mockLogout = jest.fn();
//     const user = "gracee.hopper";

//     const { getByTestId } = render(<Header user={user} logout={mockLogout} />, {
//       wrapper: MemoryRouter,
//     });
//     const logoutIcon = getByTestId("logout-icon");
//     const path = '/';
//     fireEvent.click(logoutIcon);
//     // expect(mockLogout).toHaveBeenCalledWhith(path);
//     expect(mockLogout).toHaveBeenCalledTimes(0);
//   });
// test('call function logout', () => {
//     const navigate = jest.fn(); 

//     jest.spyOn(router, 'useNavigate').mockImplementation(() => {
//        navigate,
//     });
//     const { getByTestId } =render(<Header user={'grace.hopper'}/>,  {
//         wrapper: MemoryRouter
//     } )
//      const logout = getByTestId('logout-icon');
//      fireEvent.click(logout);
//      expect(navigate).toHaveBeenCalled();
// })


