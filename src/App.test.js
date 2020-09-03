import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import ContactForm from "./components/ContactForm"

test("renders App without crashing", () => {
  const wrapper = render(<App />);
  console.log(wrapper.debug())
});

const testInput = ( labelTextRegex, inputPlaceholderTextRegex, valueToInput ) => {
  test(`Test label: ${labelTextRegex} and it's input exists, can be typed in, and shows error message`, () => {
    const wrapper = render(<App />);
    const firstNameLabel = wrapper.getByText(labelTextRegex)
    expect(firstNameLabel).toBeInTheDocument();
    const firstNameInput = wrapper.getByPlaceholderText(inputPlaceholderTextRegex)
    expect(firstNameInput).toBeInTheDocument();
    fireEvent.change(firstNameInput, { target: { value: valueToInput } })
    expect(firstNameInput.value).toBe(valueToInput)
  });
}

testInput(/first name*/i, /edd/i, 'edd');

// test("First Name is labeled, can be typed in, and error message shows", () => {
//   const wrapper = render(<App />);
//   const firstNameLabel = wrapper.getByText(/first name*/i)
//   expect(firstNameLabel).toBeInTheDocument();
//   const firstNameInput = wrapper.getByPlaceholderText(/edd/i)
//   expect(firstNameInput).toBeInTheDocument();
//   fireEvent.change(firstNameInput, { target: { value: 'Edd' } })
//   expect(firstNameInput.value).toBe('Edd')
// });
