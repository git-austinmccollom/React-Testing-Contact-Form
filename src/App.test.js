import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
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

test(`form submits with required fields`, async () => {
  const wrapper = render(<App />);
  const first = wrapper.getByTestId('firstName');
  expect(first).toBeInTheDocument();
  inputText(first, 'Edd');
  const last = wrapper.getByTestId('lastName');
  expect(last).toBeInTheDocument();
  inputText(last, 'Burke');
  const email = wrapper.getByTestId('email');
  expect(email).toBeInTheDocument();
  inputText(email, 'austinmccollom@gmail.com');
  const message = wrapper.getByTestId('message');
  expect(message).toBeInTheDocument();
  inputText(message, 'hello world');

  //arrange
  const submitButton = wrapper.getByTestId("submit");
  //assert
  expect(submitButton).toBeInTheDocument();
  //act
  fireEvent.submit(submitButton)
  //assert
  // const output = wrapper.findByTestId('output')
  await waitFor( () => {expect( wrapper.getByTestId('output') ).toBeInTheDocument()} )
} )

