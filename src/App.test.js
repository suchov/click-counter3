import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App from "./App";

Enzyme.configure({ adapter: new Adapter() });

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {StallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

test("should renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});
test("should renders increment button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});
test("should renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});
test("should counters starts at 0", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});
test("should clicking the button increments button", () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  //find button and simulate increment button click
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");
  wrapper.update();

  //find display and test value
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.text()).toContain(counter + 1);
});

// create a decrement button with resist to copy and paster

test("should renders decrement button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "decrement-button");
  expect(button.length).toBe(1);
});

test("should decrement the counter on click decrement button", () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  //simulate decrement button click
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");
  wrapper.update();

  //find display and test value
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.text()).toContain(counter - 1);
});

test("should not decrement the counter below 0", () => {
  const counter = 0;
  const wrapper = setup(null, { counter });

  //simulate decrement button click
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");
  wrapper.update();

  //find display and test the value
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.text()).toContain(counter);
});

test("should display message saying the the counter can't go bellos zero", () => {
  const counter = 0;
  const wrapper = setup(null, { counter });

  //simulate decrement button click
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");
  wrapper.update();

  //find display and test error message
  const errorMessage = findByTestAttr(wrapper, "error-message");
  expect(errorMessage.length).toBe(1);
});

test("should clear the error message on increment after showing it", () => {
  const counter = 0;
  const wrapper = setup(null, { counter });

  //simulate decrement button click
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");
  wrapper.update();

  //find display and test error message
  const errorMessage = findByTestAttr(wrapper, "error-message");
  expect(errorMessage.length).toBe(1);

  //find button and simulate increment button click
  const incrButton = findByTestAttr(wrapper, "increment-button");
  incrButton.simulate("click");
  wrapper.update();

  //should not show error message and should increment
  const errorMessage2 = findByTestAttr(wrapper, "error-message");
  expect(errorMessage2.length).toBe(0);
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.text()).toContain(counter + 1);
});
