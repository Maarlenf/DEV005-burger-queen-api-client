/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import Footer from "./Footer";

describe("test for Footer component", () => {
  it("render the footer text", () => {
    const { container } = render(<Footer />);
    const footerText = container.querySelector("p");
    expect(footerText).toBeTruthy();
    expect(footerText.textContent).toBe("Creado por @marlen & @fer");
  });
});
