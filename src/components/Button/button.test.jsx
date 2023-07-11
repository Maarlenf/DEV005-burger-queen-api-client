/**
 * @jest-environment jsdom
 */
import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  test("to have a text", () => {
    const mockText = "button";
    const { container } = render(<Button text={mockText} />);
    expect(container.textContent).toBe(mockText);
  });
  test("calls onClick function when clicked", () => {
    const onClickMock = jest.fn();

    const { getByText } = render(
      <Button
        id='my-button'
        type='button'
        onClick={onClickMock}
        text='Click Me'
      />
    );

    const button = getByText("Click Me");

    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });
});
