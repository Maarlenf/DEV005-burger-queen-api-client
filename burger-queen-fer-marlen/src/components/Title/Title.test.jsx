/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import Title from "./Title";

describe("test on title component", () => {
  test("to be show the title on h1", () => {
    const title = "Hi, i´m a title";
    const { getByText, container } = render(<Title title={title} />);
    expect(getByText(title)).toBeTruthy();

    const h1 = container.querySelector("h1");
    // console.log(h1.innerHTML);
    expect(h1.innerHTML).toBe(title);
    expect(h1.textContent).toContain(title);

    //# getByTestId obtiene el elemento por data attribute
    //# toBe se asegura que todo sea igual
    //# toContain se asegura que solo contenga lo especificado
  });
});
