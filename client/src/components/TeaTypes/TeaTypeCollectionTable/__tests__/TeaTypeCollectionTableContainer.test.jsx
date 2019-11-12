import React from "react";
import "jest-dom/extend-expect";
import { fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import { makeMockStore } from "../../../../test/testUtils";
import dataFixture from "../../../../test/__fixtures__/dataFixture";
import storeFixture from "../../../../test/__fixtures__/storeFixture";
import teaTypeFixture from "../../../../test/__fixtures__/teaTypeFixture";
import TeaTypeCollectionContainer from "../TeaTypeCollectionTableContainer";
import { TeaTypeCollectionTableContainerClass } from "../TeaTypeCollectionTableContainer";

let mockGetTeaTypes;
let mockDeleteTeaType;
let mockSetModalID;
let mockDefaultProps;

beforeEach(() => {
  mockGetTeaTypes = jest.fn(() => Promise.resolve(storeFixture.basicStore));
  mockDeleteTeaType = jest.fn(() => {
    return storeFixture.deletedStore;
  });
  mockSetModalID = jest.fn();
  mockDefaultProps = {
    allTeaTypes: teaTypeFixture.teaTypes.allTeaTypes,
    teaTypeIDs: teaTypeFixture.teaTypes.teaTypeIDs,
    modal: teaTypeFixture.modalTeaType,
    userID: dataFixture.mockUserID,
    setModalID: mockSetModalID,
    getTeaTypes: mockGetTeaTypes,
    deleteTeaType: mockDeleteTeaType,
    flash: "success",
    clearFlash: jest.fn()
  };
});

describe("TeaTypeCollectionContainer rendering", () => {
  test("renders the component with flash message", () => {
    const { queryByTestId } = renderWithRouter(
      <TeaTypeCollectionTableContainerClass {...mockDefaultProps} />
    );

    expect(queryByTestId("flash")).toBeTruthy();
  });
});

describe("TeaTypeCollectionTableContainerClass interactions", () => {
  describe("individual tea type interactions", () => {
    test("user clicks delete removes the tea type from list", () => {
      const { getAllByTestId } = renderWithRouter(
        <TeaTypeCollectionTableContainerClass {...mockDefaultProps} />
      );

      fireEvent.click(getAllByTestId("deletelink")[2]);
      expect(mockDeleteTeaType).toHaveBeenCalled();
    });

    test("user can display teaType editor modal", async () => {
      const { queryByTestId, getAllByTestId } = renderWithRouter(
        <TeaTypeCollectionTableContainerClass {...mockDefaultProps} />
      );
      // expect(queryByTestId("loadingmessage")).toBeTruthy();
      // await Promise.resolve();

      fireEvent.click(getAllByTestId("editlink")[0]);
      expect(mockSetModalID).toHaveBeenCalled();
    });
  });
});
