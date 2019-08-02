import React from "react";
import { fireEvent } from "@testing-library/react";
import "jest-dom/extend-expect";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import { makeMockStore } from "../../../../test/testUtils";
import teaFixture from "../../../../test/__fixtures__/teaFixture";
import storeFixture from "../../../../test/__fixtures__/storeFixture";
import TeaDetailsContainer from "../TeaDetailsContainer";
import { TeaDetailsContainerClass } from "../TeaDetailsContainer";

let mockFunc;
beforeEach(() => {
  mockFunc = jest.fn();
});

describe("TeaDetailsContainer rendering", () => {
  test("renders the component with redux without errors", () => {
    let store = makeMockStore(storeFixture.basicStore);
    const { queryByTestId } = renderWithRouter(
      <TeaDetailsContainer
        store={store}
        match={{
          params: { id: "25070e52-e635-4883-ae9b-583113573b9f" }
        }}
      />
    );

    expect(queryByTestId("teadetails")).toBeTruthy();
  });
});

describe("TeaDetailsContainer flash", () => {
  test("tea detail renders with flash message after update", () => {
    const { queryByTestId } = renderWithRouter(
      <TeaDetailsContainerClass
        tea={teaFixture.basicTea}
        teaTypes={teaFixture.teaTypes}
        flash={"success"}
        getTeas={mockFunc}
        getTeaTypes={mockFunc}
        editFlash={mockFunc}
        clearFlash={mockFunc}
      />
    );

    expect(queryByTestId("flash")).toBeTruthy();
  });

  test("user clicks on delete flash fires click handler", () => {
    const { getByTestId } = renderWithRouter(
      <TeaDetailsContainerClass
        tea={teaFixture.basicTea}
        teaTypes={teaFixture.teaTypes}
        flash={"success"}
        getTeas={mockFunc}
        getTeaTypes={mockFunc}
        editFlash={mockFunc}
        clearFlash={mockFunc}
      />
    );

    fireEvent.click(getByTestId("flash"), "off");
    expect(mockFunc).toBeCalledWith("off");
  });
});

describe("teaDetails interactions", () => {
  test("user clicks edit to update tea", () => {
    const { getByTestId, history } = renderWithRouter(
      <TeaDetailsContainerClass
        tea={teaFixture.basicTea}
        teaTypes={teaFixture.teaTypes}
        flash={"success"}
        getTeas={mockFunc}
        getTeaTypes={mockFunc}
        editFlash={mockFunc}
        clearFlash={mockFunc}
      />
    );

    fireEvent.click(getByTestId("teaeditlink"));
    expect(history.entries[1].pathname).toMatch("/update-tea/");
  });
});

describe("tea timer interactions", () => {
  test("user can display timer modal", () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <TeaDetailsContainerClass
        tea={teaFixture.basicTea}
        teaTypes={teaFixture.teaTypes}
        flash={"off"}
        getTeas={mockFunc}
        getTeaTypes={mockFunc}
        editFlash={mockFunc}
        clearFlash={mockFunc}
      />
    );

    fireEvent.click(getByTestId("makecuppalink"));
    expect(queryByTestId("timermodal")).toHaveClass("is-active");
  });

  test("user can hide timer modal", () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <TeaDetailsContainerClass
        tea={teaFixture.basicTea}
        teaTypes={teaFixture.teaTypes}
        flash={"off"}
        getTeas={mockFunc}
        getTeaTypes={mockFunc}
        editFlash={mockFunc}
        clearFlash={mockFunc}
      />
    );

    fireEvent.click(getByTestId("makecuppalink"));
    fireEvent.click(getByTestId("canceltimer"));
    expect(queryByTestId("timermodal")).not.toHaveClass("is-active");
  });

  test("completed timer updates quantity on hand", () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <TeaDetailsContainerClass
        tea={teaFixture.basicTea}
        teaTypes={teaFixture.teaTypes}
        flash={"off"}
        getTeas={mockFunc}
        getTeaTypes={mockFunc}
        editFlash={mockFunc}
        clearFlash={mockFunc}
        editTea={mockFunc}
      />
    );

    fireEvent.click(getByTestId("makecuppalink"));
    fireEvent.click(getByTestId("starttimer"));
    setTimeout(function() {
      expect(queryByTestId("donetimer")).toHaveClass("button");
      fireEvent.click(getByTestId("donetimer"));
      expect(queryByTestId("timermodal")).not.toHaveClass("is-active");
      expect(mockFunc).toHaveBeenCalledWith(teaFixture.servingsUpdatedTea);
    }, 2500);
  });
});
