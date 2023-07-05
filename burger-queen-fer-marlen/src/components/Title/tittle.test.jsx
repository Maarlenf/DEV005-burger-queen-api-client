/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import Title from "./Title";

describe("Title component", () => {
  test("to be should text on h1", () => {
    const title = "Hi, i am title";
    const { getByText, container } = render(<Title title={title} />);
    expect(getByText(title)).toBeTruthy();

    const h1 = container.querySelector("h1");

    expect(h1.innerHTML).toBe(title);
    expect(h1.textContent).toContain(title);
    // test para saber que existe...
    // expect(getByTestId("Pruebas en title")).toBeTruthy();

    //# getByTestId obtiene el elemento por data attribute
    //# toBe se asegura que todo sea igual
    //# toContain se asegura que solo contenga lo especificado
  });
});
