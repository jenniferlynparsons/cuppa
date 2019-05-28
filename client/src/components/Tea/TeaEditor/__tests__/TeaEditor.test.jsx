import React from "react";
import { shallow } from "enzyme";
import { TeaEditor } from "../TeaEditor";

const sampleStore = {
  teaTypes: ["Black", "Green", "White", "Herbal"]
};

const defaultProps = {};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<TeaEditor {...setupProps} />);
};

describe("teaEditor rendering", () => {
  test("teaEditor renders without error", () => {
    const wrapper = setup();
    expect(wrapper.exists()).toBe(true);
  });

  test("editor form renders all inputs and buttons", () => {
    // expect().toBeTruthy();
  });

  test("editor form renders pre-populates inputs when updating a tea", () => {
    // expect().toBeTruthy();
  });
});

describe("teaEditor form submit", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  test("editor form submit succesfully adds tea", () => {
    // expect().toBeTruthy();
  });

  test("editor form submit shows success flash message on new tea with correct name", () => {
    // expect().toBeTruthy();
  });

  test("editor form succesfully updates tea", () => {
    // expect().toBeTruthy();
  });

  test("editor form redirects to detail view on update", () => {
    // expect().toBeTruthy();
  });
});

describe("teaEditor interactions", () => {
  test("servings count should not be allowed to have a negative value", () => {
    // expect().toBeTruthy();
  });
});
