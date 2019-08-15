import React from "react";
import { fireEvent } from "@testing-library/react";
import "jest-dom/extend-expect";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import teaFixture from "../../../../test/__fixtures__/teaFixture";
import storeFixture from "../../../../test/__fixtures__/storeFixture";
import { TeaDetailsContainerClass } from "../TeaDetailsContainer";

let mockFunc;
let mockGetTeas;
let mockGetTeaTypes;

beforeEach(() => {
  mockFunc = jest.fn();
  mockGetTeas = jest.fn(() => Promise.resolve(storeFixture.basicStore));
  mockGetTeaTypes = jest.fn(() => Promise.resolve(storeFixture.basicStore));
});

describe("TeaDetailsContainer flash", () => {
  test("tea detail renders with flash message after update", async () => {
    const { queryByTestId } = renderWithRouter(
      <TeaDetailsContainerClass
        tea={teaFixture.basicTea}
        teaTypes={teaFixture.teaTypes}
        flash={"success"}
        getTeas={mockGetTeas}
        getTeaTypes={mockGetTeaTypes}
        editFlash={mockFunc}
        clearFlash={mockFunc}
      />
    );
    expect(queryByTestId("loadingmessage")).toBeTruthy();
    await Promise.resolve();

    expect(queryByTestId("flash")).toBeTruthy();
  });

  test("user clicks on delete flash fires click handler", async () => {
    const { queryByTestId, getByTestId } = renderWithRouter(
      <TeaDetailsContainerClass
        tea={teaFixture.basicTea}
        teaTypes={teaFixture.teaTypes}
        flash={"success"}
        getTeas={mockGetTeas}
        getTeaTypes={mockGetTeaTypes}
        editFlash={mockFunc}
        clearFlash={mockFunc}
      />
    );
    expect(queryByTestId("loadingmessage")).toBeTruthy();
    await Promise.resolve();

    fireEvent.click(getByTestId("flash"), "off");
    expect(mockFunc).toBeCalledWith("off");
  });
});

describe("teaDetails interactions", () => {
  test("user clicks edit to update tea", async () => {
    const { queryByTestId, getByTestId, history } = renderWithRouter(
      <TeaDetailsContainerClass
        tea={teaFixture.basicTea}
        teaTypes={teaFixture.teaTypes}
        flash={"success"}
        getTeas={mockGetTeas}
        getTeaTypes={mockGetTeaTypes}
        editFlash={mockFunc}
        clearFlash={mockFunc}
      />
    );
    expect(queryByTestId("loadingmessage")).toBeTruthy();
    await Promise.resolve();

    fireEvent.click(getByTestId("teaeditlink"));
    expect(history.entries[1].pathname).toMatch("/update-tea/");
  });
});

describe("tea timer interactions", () => {
  test("user can display timer modal", async () => {
    const { queryByTestId, getByTestId } = renderWithRouter(
      <TeaDetailsContainerClass
        tea={teaFixture.basicTea}
        teaTypes={teaFixture.teaTypes}
        flash={"off"}
        getTeas={mockGetTeas}
        getTeaTypes={mockGetTeaTypes}
        editFlash={mockFunc}
        clearFlash={mockFunc}
      />
    );
    expect(queryByTestId("loadingmessage")).toBeTruthy();
    await Promise.resolve();

    fireEvent.click(getByTestId("makecuppalink"));
    expect(queryByTestId("timermodal")).toHaveClass("is-active");
  });

  test("user can hide timer modal", async () => {
    const { queryByTestId, getByTestId } = renderWithRouter(
      <TeaDetailsContainerClass
        tea={teaFixture.basicTea}
        teaTypes={teaFixture.teaTypes}
        flash={"off"}
        getTeas={mockGetTeas}
        getTeaTypes={mockGetTeaTypes}
        editFlash={mockFunc}
        clearFlash={mockFunc}
      />
    );
    expect(queryByTestId("loadingmessage")).toBeTruthy();
    await Promise.resolve();

    fireEvent.click(getByTestId("makecuppalink"));
    fireEvent.click(getByTestId("canceltimer"));
    expect(queryByTestId("timermodal")).not.toHaveClass("is-active");
  });

  test("completed timer updates quantity on hand", async () => {
    const { queryByTestId, getByTestId } = renderWithRouter(
      <TeaDetailsContainerClass
        tea={teaFixture.basicTea}
        teaTypes={teaFixture.teaTypes}
        flash={"off"}
        getTeas={mockGetTeas}
        getTeaTypes={mockGetTeaTypes}
        editFlash={mockFunc}
        clearFlash={mockFunc}
        editTea={mockFunc}
      />
    );
    expect(queryByTestId("loadingmessage")).toBeTruthy();
    await Promise.resolve();

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
