import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import ContactForm from "./components/ContactForm"

test("renders App without crashing", () => {
  const wrapper = render(<App />);
  console.log(wrapper.debug())
});

const testInput = ( labelTextRegex, inputTestId, valueToInput ) => {
  test(`Test label: ${labelTextRegex} and it's input exists, can be typed in, and shows error message`, () => {
    const wrapper = render(<App />);
    const firstNameLabel = wrapper.getByText(labelTextRegex)
    expect(firstNameLabel).toBeInTheDocument();
    const firstNameInput = wrapper.getByTestId(inputTestId)
    expect(firstNameInput).toBeInTheDocument();
    fireEvent.change(firstNameInput, { target: { value: valueToInput } })
    expect(firstNameInput.value).toBe(valueToInput)
  });
}

testInput(/first name*/i, 'firstName', 'edd');
testInput(/last name*/i, 'lastName', 'burke');
testInput(/email*/i, 'email', 'austinmccollom@gmail.com')

// test("First Name is labeled, can be typed in, and error message shows", () => {
//   const wrapper = render(<App />);
//   const firstNameLabel = wrapper.getByText(/first name*/i)
//   expect(firstNameLabel).toBeInTheDocument();
//   const firstNameInput = wrapper.getByPlaceholderText(/edd/i)
//   expect(firstNameInput).toBeInTheDocument();
//   fireEvent.change(firstNameInput, { target: { value: 'Edd' } })
//   expect(firstNameInput.value).toBe('Edd')
// });
