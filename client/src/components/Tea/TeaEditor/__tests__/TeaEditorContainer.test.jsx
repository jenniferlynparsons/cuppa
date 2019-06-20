import React from "react";
import "jest-dom/extend-expect";
import { cleanup, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtil";
import { makeMockStore } from "../../../../test/testUtils";
import dataFixture from "../../../../test/__fixtures__/dataFixture";
import TeaEditorContainer from "../TeaEditorContainer";
import { TeaEditorContainerClass } from "../TeaEditorContainer";

const mockHistory = {
  length: 10,
  action: "PUSH",
  location: { pathname: "/", search: "", hash: "", key: "zh4boo" },
  push: jest.fn()
};

let mockFunc;
let mockAdd;
let mockEdit;
let mockEditTeaFlash;

beforeEach(() => {
  mockFunc = jest.fn();
  mockEditTeaFlash = jest.fn();
  mockAdd = jest.fn(() => {
    return dataFixture.addedStore;
  });
  mockEdit = jest.fn(() => {
    return dataFixture.updatedStore;
  });
});
afterEach(cleanup);

describe("TeaEditorContainer rendering", () => {
  test("renders the component with redux without errors", () => {
    let store = makeMockStore(dataFixture.basicStore);
    const { queryByTestId } = renderWithRouter(
      <TeaEditorContainer
        store={store}
        match={{
          params: { id: dataFixture.userID }
        }}
      />
    );
    expect(queryByTestId("teaeditor")).toBeTruthy();
  });
});

describe("teaEditor form submit", () => {
  test("editor form submit succesfully adds tea", () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <TeaEditorContainerClass
        getTeas={mockFunc}
        teaTypes={dataFixture.teaTypes}
        userID={dataFixture.userID}
        currentTea={""}
        addTea={mockAdd}
      />
    );
    fireEvent.change(getByTestId("name"), {
      target: { value: dataFixture.basicTea.name }
    });

    fireEvent.change(getByTestId("brand"), {
      target: { value: dataFixture.basicTea.brand }
    });

    fireEvent.change(getByTestId("type"), {
      target: { value: dataFixture.basicTea.teaType }
    });

    fireEvent.change(getByTestId("servings"), {
      target: { value: 12 }
    });

    expect(getByTestId("teaeditorform")).toHaveFormValues({
      name: dataFixture.basicTea.name,
      brand: dataFixture.basicTea.brand,
      servings: 12,
      type: dataFixture.basicTea.teaType
    });

    fireEvent.click(getByTestId("submit"));

    expect(queryByTestId("flash")).toHaveTextContent(/Basic Tea/);
  });

  test("editor form succesfully updates tea", () => {
    const { getByTestId } = renderWithRouter(
      <TeaEditorContainerClass
        getTeas={mockFunc}
        teaTypes={dataFixture.teaTypes}
        userID={dataFixture.userID}
        currentTea={dataFixture.basicTea}
        editTea={mockEdit}
        editTeaFlash={mockEditTeaFlash}
        history={mockHistory}
      />
    );
    fireEvent.change(getByTestId("brand"), {
      target: { value: dataFixture.updatedTea.brand }
    });

    expect(getByTestId("teaeditorform")).toHaveFormValues({
      brand: dataFixture.updatedTea.brand
    });

    fireEvent.click(getByTestId("submit"));
    expect(mockHistory.push).toHaveBeenCalledWith(
      "/tea/1b1db861-0537-4b69-83d5-d9ee033530f8"
    );
  });
});
