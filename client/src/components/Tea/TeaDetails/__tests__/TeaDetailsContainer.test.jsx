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
let mockSetModalID;
let mockDefaultProps;

beforeEach(() => {
  mockFunc = jest.fn();
  mockGetTeas = jest.fn(() => Promise.resolve(storeFixture.basicStore));
  mockGetTeaTypes = jest.fn(() => Promise.resolve(storeFixture.basicStore));
  mockSetModalID = jest.fn();

  mockDefaultProps = {
    userID: teaFixture.basicTea.userID,
    tea: teaFixture.basicTea,
    teaTypes: storeFixture.basicStore.teaTypes,
    teaType: teaFixture.basicTea.teaType,
    timerID: "",
    setModalID: mockSetModalID,
    flash: "off",
    getTeas: mockGetTeas,
    getTeaTypes: mockGetTeaTypes,
    editTea: mockFunc,
    editFlash: mockFunc,
    clearFlash: mockFunc,
    match: { params: { id: "25070e52-e635-4883-ae9b-583113573b9f" } }
  };
});

describe("teaDetails render", () => {
  test("tea detail renders", async () => {
    const { queryByTestId } = renderWithRouter(
      <TeaDetailsContainerClass {...mockDefaultProps} />
    );
    expect(queryByTestId("loadingmessage")).toBeTruthy();
    await Promise.resolve();
    expect(queryByTestId("teadetails")).toBeTruthy();
  });
});

describe("teaDetails flash", () => {
  test("tea detail renders with flash message after update", async () => {
    const { queryByTestId } = renderWithRouter(
      <TeaDetailsContainerClass {...mockDefaultProps} flash="success" />
    );
    expect(queryByTestId("loadingmessage")).toBeTruthy();
    await Promise.resolve();

    expect(queryByTestId("flash")).toBeTruthy();
  });

  test("user clicks on delete flash fires click handler", async () => {
    const { queryByTestId, getByTestId } = renderWithRouter(
      <TeaDetailsContainerClass {...mockDefaultProps} flash="success" />
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
      <TeaDetailsContainerClass {...mockDefaultProps} />
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
      <TeaDetailsContainerClass {...mockDefaultProps} flash={"off"} />
    );
    expect(queryByTestId("loadingmessage")).toBeTruthy();
    await Promise.resolve();

    fireEvent.click(getByTestId("makecuppalink"));
    expect(mockSetModalID).toHaveBeenCalled();
  });
});
