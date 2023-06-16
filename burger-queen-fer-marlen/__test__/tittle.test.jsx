/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import Tittle from "../src/components/Tittle/Tittle";

describe("Pruebas en Title", () => {
  test("Debe de mostrar el titulo en un h1", () => {
    const title = "Hola, soy Fernanda";
    const {  getByText } = render(
      <Tittle title={title} />
    );
    expect(getByText(title)).toBeTruthy();

    const h1 = container.querySelector("h1");
    console.log(h1.innerHTML);
    expect(h1.innerHTML).toBe(title);
    expect(h1.innerHMTL).toContain(title);
    // test para saber que existe...
    expect(getByTestId("test-title")).toBeTruthy();

    //# getByTestId obtiene el elemento por data attribute
    //# toBe se asegura que todo sea igual
    //# toContain se asegura que solo contenga lo especificado
  });
});
