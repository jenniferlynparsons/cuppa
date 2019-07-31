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

beforeEach(() => {
  mockFunc = jest.fn();
  mockAdd = jest.fn(() => Promise.resolve(storeFixture.addedStore));
  mockEdit = jest.fn(() => Promise.resolve(storeFixture.updatedStore));
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

describe("teaEditor form success", () => {
  test("editor form submit succesfully adds tea", () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <TeaEditorContainerClass
        teaTypes={teaFixture.teaTypes}
        userID={dataFixture.mockUserID}
        currentTea={""}
        getTeas={mockFunc}
        getTeaTypes={mockFunc}
        addTea={mockAdd}
      />
    );

    fireEvent.change(getByTestId("name"), {
      target: { value: teaFixture.basicTea.name }
    });
    fireEvent.change(getByTestId("brand"), {
      target: { value: teaFixture.basicTea.brand }
    });
    fireEvent.change(getByTestId("teaType"), {
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
        edit={true}
        getTeas={mockFunc}
        getTeaTypes={mockFunc}
        editTea={mockEdit}
        editFlash={mockFunc}
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

describe("teaEditor form failure", () => {
  describe("editor onSubmit returns an error message if data is invalid", () => {
    test("missing information for new tea", () => {
      const { getByTestId, queryByTestId, queryAllByTestId } = renderWithRouter(
        <TeaEditorContainerClass
          teaTypes={teaFixture.teaTypes}
          userID={dataFixture.mockUserID}
          currentTea={""}
          getTeas={mockFunc}
          getTeaTypes={mockFunc}
          editTea={mockEdit}
          editFlash={mockFunc}
          history={dataFixture.history}
        />
      );

      expect(queryByTestId("duplicatenotice")).toBeFalsy();

      fireEvent.click(getByTestId("submit"));
      expect(queryByTestId("incompletenotice")).toBeTruthy();
      expect(queryAllByTestId("inputerror").length).toEqual(4);
    });

    test("missing information for existing tea", () => {
      const { getByTestId, queryByTestId, queryAllByTestId } = renderWithRouter(
        <TeaEditorContainerClass
          teaTypes={teaFixture.teaTypes}
          userID={dataFixture.mockUserID}
          currentTea={teaFixture.missingDataTea}
          getTeas={mockFunc}
          getTeaTypes={mockFunc}
          editTea={mockEdit}
          editFlash={mockFunc}
          history={dataFixture.history}
        />
      );

      expect(queryByTestId("duplicatenotice")).toBeFalsy();

      fireEvent.click(getByTestId("submit"));
      expect(queryByTestId("incompletenotice")).toBeTruthy();
      expect(queryAllByTestId("inputerror").length).toEqual(1);
    });

    test("duplicate tea", () => {
      const { queryByTestId } = renderWithRouter(
        <TeaEditorContainerClass
          teaTypes={teaFixture.teaTypes}
          userID={dataFixture.mockUserID}
          currentTea={teaFixture.basicTea}
          getTeas={mockFunc}
          getTeaTypes={mockFunc}
          editTea={mockEdit}
          editFlash={mockFunc}
          history={dataFixture.history}
          serverErrors={{ duplicate: "This tea already exists" }}
        />
      );
      expect(queryByTestId("duplicatenotice")).toBeTruthy();
    });
  });
});
