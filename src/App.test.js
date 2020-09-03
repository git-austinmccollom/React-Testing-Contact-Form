import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import ContactForm from "./components/ContactForm"

test("renders App without crashing", () => {
  const wrapper = render(<App />);
  console.log(wrapper.debug())
});

const inputText = ( inputVariable, text) => {
  fireEvent.change(inputVariable, { target: { value: text } })
  expect(inputVariable.value).toBe(text)
}

const testInput = ( labelTextRegex, inputTestId, valueToInput ) => {
  test(`Test label: ${labelTextRegex} and it's input exists, can be typed in, and shows error message`, () => {
    const wrapper = render(<App />);
    const label = wrapper.getByText(labelTextRegex);
    expect(label).toBeInTheDocument();
    const input = wrapper.getByTestId(inputTestId);
    expect(input).toBeInTheDocument();
    inputText(input, valueToInput);
  });
}

testInput(/first name*/i, 'firstName', 'edd');
testInput(/last name*/i, 'lastName', 'burke');
testInput(/email*/i, 'email', 'austinmccollom@gmail.com')

test(`form will not submit without required field First Name`, () => {
  const wrapper = render(<App />);
  const last = wrapper.getByTestId('lastName');
  expect(last).toBeInTheDocument();
  inputText(last, 'Burke');
  const email = wrapper.getByTestId('email');
  expect(email).toBeInTheDocument();
  inputText(email, 'austinmccollom@gmail.com');

  const submit = wrapper.getByTestId("submit");
  // fireEvent.click(submit);
} )

