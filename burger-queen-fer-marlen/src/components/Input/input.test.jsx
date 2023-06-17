/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from "@testing-library/react";
import Input from "./Input";

describe("Input component", () => {
  test("to accept differents props", () => {
    const mockProps = {
      textLabel: "Nombre",
      type: "text",
      className: "input",
      id: "input",
      placeholder: "Por favor ingresa tu nombre",
      value: "",
      onChange: "",
    };
    const onChangeMock = jest.fn;
    const { getByLabelText, container } = render(
      <Input
        textLabel={mockProps.textLabel}
        type={mockProps.type}
        className={mockProps.className}
        id={mockProps.id}
        placeholder={mockProps.placeholder}
        onChange={onChangeMock}
        value='Hola'
      />
    );
    expect(container.textContent).toBe(mockProps.textLabel);
  });
  test("calls onChange when input value changes", () => {
    const textLabel = "Email";
    const onChange = jest.fn();

    const { getByLabelText } = render(
      <Input textLabel={textLabel} onChange={onChange} />
    );

    const inputElement = getByLabelText(textLabel);

    const testValue = "user@efalse.com";
    fireEvent.change(inputElement, { target: { value: testValue } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
