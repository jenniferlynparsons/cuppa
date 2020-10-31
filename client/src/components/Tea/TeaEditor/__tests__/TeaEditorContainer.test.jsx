import React from "react";
import "jest-dom/extend-expect";
import { fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import dataFixture from "../../../../test/__fixtures__/dataFixture";
import storeFixture from "../../../../test/__fixtures__/storeFixture";
import teaFixture from "../../../../test/__fixtures__/teaFixture";
import teaTypeFixture from "../../../../test/__fixtures__/teaTypeFixture";
import { TeaEditorContainerClass } from "../TeaEditorContainer";

let mockFunc;
let mockAdd;
let mockEdit;

beforeEach(() => {
  mockFunc = jest.fn(() => Promise.resolve(storeFixture.basicStore));
  mockAdd = jest.fn(() => Promise.resolve(storeFixture.addedStore));
  mockEdit = jest.fn(() => Promise.resolve(storeFixture.updatedStore));
});

describe("teaEditor form success", () => {
  test("editor form submit succesfully adds tea", async () => {
    const { getByTestId } = renderWithRouter(
      <TeaEditorContainerClass
        teaTypes={teaTypeFixture.allTeaTypesArray}
        userID={dataFixture.mockUserID}
        currentTea={""}
        getTeas={mockFunc}
        getTeaTypes={mockFunc}
        addTea={mockAdd}
      />
    );
    await Promise.resolve();

    fireEvent.change(getByTestId("name"), {
      target: { value: teaFixture.basicTea.name }
    });
    fireEvent.change(getByTestId("brand"), {
      target: { value: teaFixture.basicTea.brand }
    });
    fireEvent.change(getByTestId("teaType"), {
      target: { value: "5c63123a4c318b298b23d4" }
    });
    fireEvent.change(getByTestId("servings"), {
      target: { value: 22 }
    });
    fireEvent.click(getByTestId("starfour"));

    expect(getByTestId("teaeditorform")).toHaveFormValues({
      name: teaFixture.basicTea.name,
      brand: teaFixture.basicTea.brand,
      servings: 22,
      rating: "4",
      type: teaFixture.basicTea.teaType
    });

    fireEvent.click(getByTestId("submit"));

    expect(mockAdd).toHaveBeenCalledWith(
      storeFixture.loggedInStore.auth.user.id,
      teaFixture.basicDataTea
    );
  });

  test("editor form succesfully updates tea", async () => {
    const { getByTestId } = renderWithRouter(
      <TeaEditorContainerClass
        teaTypes={teaTypeFixture.allTeaTypesArray}
        userID={dataFixture.mockUserID}
        currentTea={teaFixture.basicTea}
        edit={true}
        getTeas={mockFunc}
        getTeaTypes={mockFunc}
        editTea={mockEdit}
        editFlash={mockFunc}
        clearFlash={mockFunc}
        history={dataFixture.history}
      />
    );
    await Promise.resolve();

    fireEvent.change(getByTestId("brand"), {
      target: { value: teaFixture.updatedTea.brand }
    });

    expect(getByTestId("teaeditorform")).toHaveFormValues({
      brand: teaFixture.updatedTea.brand
    });

    fireEvent.click(getByTestId("submit"));
    expect(mockEdit).toHaveBeenCalled();
  });
});

describe("teaEditor form failure", () => {
  describe("editor onSubmit returns an error message if data is invalid", () => {
    test("missing information for new tea", async () => {
      const { getByTestId, queryByTestId, queryAllByTestId } = renderWithRouter(
        <TeaEditorContainerClass
          teaTypes={teaTypeFixture.allTeaTypesArray}
          userID={dataFixture.mockUserID}
          currentTea={""}
          getTeas={mockFunc}
          getTeaTypes={mockFunc}
          editTea={mockEdit}
          editFlash={mockFunc}
          clearFlash={mockFunc}
          history={dataFixture.history}
        />
      );
      await Promise.resolve();

      expect(queryByTestId("duplicatenotice")).toBeFalsy();

      fireEvent.click(getByTestId("submit"));
      expect(queryByTestId("incompletenotice")).toBeTruthy();
      expect(queryAllByTestId("inputerror").length).toEqual(4);
    });

    test("missing information for existing tea", async () => {
      const { getByTestId, queryByTestId, queryAllByTestId } = renderWithRouter(
        <TeaEditorContainerClass
          teaTypes={teaTypeFixture.allTeaTypesArray}
          userID={dataFixture.mockUserID}
          currentTea={teaFixture.missingDataTea}
          getTeas={mockFunc}
          getTeaTypes={mockFunc}
          editTea={mockEdit}
          editFlash={mockFunc}
          clearFlash={mockFunc}
          history={dataFixture.history}
        />
      );
      await Promise.resolve();

      expect(queryByTestId("duplicatenotice")).toBeFalsy();

      fireEvent.click(getByTestId("submit"));
      expect(queryByTestId("incompletenotice")).toBeTruthy();
      expect(queryAllByTestId("inputerror").length).toEqual(1);
    });
  });
});
