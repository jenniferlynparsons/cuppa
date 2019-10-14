import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "jest-dom/extend-expect";
import teaFixture from "../../../test/__fixtures__/teaFixture";
import { TimerContainerClass } from "../TimerContainer";

let mockFunc;
let mockHandleCloseTimer;
let mockDefaultProps;

beforeEach(() => {
  mockFunc = jest.fn();
  mockHandleCloseTimer = jest.fn();
  mockDefaultProps = {
    tea: teaFixture.basicTea,
    brewTime: 16200000,
    onHandleCloseTimer: mockHandleCloseTimer,
    onHandleTimerUpdateQty: mockFunc,
    editTea: mockFunc
  };
});

describe("Timer interactions", () => {
  test("Clicking the start button starts the timer", () => {
    const { getByTestId, queryByTestId } = render(
      <TimerContainerClass {...mockDefaultProps} />
    );

    expect(queryByTestId("starttimer")).toHaveClass("button");

    fireEvent.click(getByTestId("starttimer"));

    expect(queryByTestId("starttimer")).not.toHaveClass("button");
    expect(queryByTestId("pausetimer")).toHaveClass("button");
  });

  test("Clicking the pause button stops the timer", () => {
    const { getByTestId, queryByTestId } = render(
      <TimerContainerClass {...mockDefaultProps} />
    );

    fireEvent.click(getByTestId("starttimer"));
    fireEvent.click(getByTestId("pausetimer"));

    expect(queryByTestId("pausetimer")).not.toHaveClass("button");
    setTimeout(function() {
      expect(queryByTestId("resumetimer")).toHaveClass("button");
    }, 100);
  });

  test("Clicking the resume button starts the timer", () => {
    const { getByTestId, queryByTestId } = render(
      <TimerContainerClass {...mockDefaultProps} />
    );

    fireEvent.click(getByTestId("starttimer"));
    fireEvent.click(getByTestId("pausetimer"));

    setTimeout(function() {
      expect(queryByTestId("resumetimer")).toHaveClass("button");
    }, 100);

    fireEvent.click(getByTestId("resumetimer"));

    expect(queryByTestId("resumetimer")).not.toHaveClass("button");
    expect(queryByTestId("pausetimer")).toHaveClass("button");
  });

  test("Clicking the done button updates the servings quantity", () => {
    const { getByTestId, queryByTestId } = render(
      <TimerContainerClass {...mockDefaultProps} />
    );

    fireEvent.click(getByTestId("starttimer"));

    setTimeout(function() {
      expect(queryByTestId("donetimer")).toHaveClass("button");
    }, 3000);

    fireEvent.click(getByTestId("donetimer"));

    expect(mockFunc).toHaveBeenCalledWith(teaFixture.servingsUpdatedTea);
  });

  test("Clicking the cancel button resets the timer", () => {
    const { getByTestId, queryByTestId } = render(
      <TimerContainerClass {...mockDefaultProps} />
    );

    fireEvent.click(getByTestId("starttimer"));
    fireEvent.click(getByTestId("pausetimer"));

    expect(queryByTestId("pausetimer")).not.toHaveClass("button");

    setTimeout(function() {
      expect(queryByTestId("resumetimer")).not.toHaveClass("button");
    }, 100);

    fireEvent.click(getByTestId("canceltimer"));
    expect(mockHandleCloseTimer).toHaveBeenCalled();
  });
});
