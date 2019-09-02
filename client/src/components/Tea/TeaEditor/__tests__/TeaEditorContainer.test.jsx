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
let mockDefaultProps;

beforeEach(() => {
  mockFunc = jest.fn(() => Promise.resolve(storeFixture.basicStore));
  mockAdd = jest.fn(() => Promise.resolve(storeFixture.addedStore));
  mockEdit = jest.fn(() => Promise.resolve(storeFixture.updatedStore));
  mockDefaultProps = {
    teaTypes: teaTypeFixture.allTeaTypesArray,
    userID: dataFixture.mockUserID,
    currentTea: "",
    getTeas: mockFunc,
    getTeaTypes: mockFunc,
    addTea: mockAdd,
    editTea: mockEdit,
    editFlash: mockFunc,
    clearFlash: mockFunc,
    history: dataFixture.history
  };
});

describe("teaEditor form success", () => {
  test("editor form submit succesfully adds tea", async () => {
    const { getByTestId } = renderWithRouter(
      <TeaEditorContainerClass {...mockDefaultProps} />
    );
    await Promise.resolve();

    fireEvent.change(getByTestId("name"), {
      target: { value: teaFixture.basicTea.name }
    });
    fireEvent.change(getByTestId("brand"), {
      target: { value: teaFixture.basicTea.brand }
    });
    fireEvent.change(getByTestId("teaType"), {
      target: { value: "5d40b6871f88450253bdbf40" }
    });
    fireEvent.change(getByTestId("servings"), {
      target: { value: 22 }
    });
    expect(getByTestId("teaeditorform")).toHaveFormValues({
      name: teaFixture.basicTea.name,
      brand: teaFixture.basicTea.brand,
      servings: 22,
      type: teaFixture.basicTea.teaType
    });

    fireEvent.click(getByTestId("submit"));

    expect(mockAdd).toHaveBeenCalledWith(teaFixture.basicDataTea);
  });

  test("editor form succesfully updates tea", async () => {
    const { getByTestId } = renderWithRouter(
      <TeaEditorContainerClass
        {...mockDefaultProps}
        currentTea={teaFixture.basicTea}
        edit={true}
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
    expect(dataFixture.history.push).toHaveBeenCalledWith(
      "/tea/" + teaFixture.basicTea.id
    );
  });
});

describe("teaEditor form failure", () => {
  describe("editor onSubmit returns an error message if data is invalid", () => {
    test("missing information for new tea", async () => {
      const { getByTestId, queryByTestId, queryAllByTestId } = renderWithRouter(
        <TeaEditorContainerClass {...mockDefaultProps} />
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
          {...mockDefaultProps}
          currentTea={teaFixture.missingDataTea}
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
