import React from "react";
import "jest-dom/extend-expect";
import { fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import { makeMockStore } from "../../../../test/testUtils";
import dataFixture from "../../../../test/__fixtures__/dataFixture";
import storeFixture from "../../../../test/__fixtures__/storeFixture";
import teaFixture from "../../../../test/__fixtures__/teaFixture";
import TeaEditorContainer from "../TeaEditorContainer";
import { TeaEditorContainerClass } from "../TeaEditorContainer";

let mockFunc;
let mockAdd;
let mockEdit;
let mockEditTeaFlash;

beforeEach(() => {
  mockFunc = jest.fn();
  mockEditTeaFlash = jest.fn();
  mockAdd = jest.fn(() => {
    return storeFixture.addedStore;
  });
  mockEdit = jest.fn(() => {
    return storeFixture.updatedStore;
  });
});

describe("TeaEditorContainer rendering", () => {
  test("renders the component with redux without errors", () => {
    let store = makeMockStore(storeFixture.basicStore);
    const { queryByTestId } = renderWithRouter(
      <TeaEditorContainer
        store={store}
        match={{
          params: { id: dataFixture.mockUserID }
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
        teaTypes={teaFixture.teaTypes}
        userID={dataFixture.mockUserID}
        currentTea={""}
        getTeas={mockFunc}
        addTea={mockAdd}
      />
    );

    fireEvent.change(getByTestId("name"), {
      target: { value: teaFixture.basicTea.name }
    });
    fireEvent.change(getByTestId("brand"), {
      target: { value: teaFixture.basicTea.brand }
    });
    fireEvent.change(getByTestId("type"), {
      target: { value: teaFixture.basicTea.teaType }
    });
    fireEvent.change(getByTestId("servings"), {
      target: { value: 12 }
    });
    expect(getByTestId("teaeditorform")).toHaveFormValues({
      name: teaFixture.basicTea.name,
      brand: teaFixture.basicTea.brand,
      servings: 12,
      type: teaFixture.basicTea.teaType
    });

    fireEvent.click(getByTestId("submit"));
    expect(queryByTestId("flash")).toHaveTextContent(/Basic Tea/);
  });

  test("editor form succesfully updates tea", () => {
    const { getByTestId } = renderWithRouter(
      <TeaEditorContainerClass
        teaTypes={teaFixture.teaTypes}
        userID={dataFixture.mockUserID}
        currentTea={teaFixture.basicTea}
        getTeas={mockFunc}
        editTea={mockEdit}
        editTeaFlash={mockEditTeaFlash}
        history={dataFixture.history}
      />
    );

    fireEvent.change(getByTestId("brand"), {
      target: { value: teaFixture.updatedTea.brand }
    });

    expect(getByTestId("teaeditorform")).toHaveFormValues({
      brand: teaFixture.updatedTea.brand
    });

    fireEvent.click(getByTestId("submit"));
    expect(dataFixture.history.push).toHaveBeenCalledWith(
      "/tea/1b1db861-0537-4b69-83d5-d9ee033530f8"
    );
  });
});
