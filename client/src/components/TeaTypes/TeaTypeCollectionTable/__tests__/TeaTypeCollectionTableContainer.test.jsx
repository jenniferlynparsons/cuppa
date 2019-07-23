import React from "react";
import "jest-dom/extend-expect";
import { fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import { makeMockStore } from "../../../../test/testUtils";
import dataFixture from "../../../../test/__fixtures__/dataFixture";
import storeFixture from "../../../../test/__fixtures__/storeFixture";
import teaFixture from "../../../../test/__fixtures__/teaFixture";
import TeaTypeCollectionContainer from "../TeaTypeCollectionTableContainer";
import { TeaTypeCollectionTableContainerClass } from "../TeaTypeCollectionTableContainer";

let mockGetTeaTypes;
let mockDeleteTeaType;
let mockDefaultProps;

beforeEach(() => {
  mockGetTeaTypes = jest.fn(() => {
    return storeFixture.basicStore;
  });
  mockDeleteTeaType = jest.fn(() => {
    return storeFixture.deletedStore;
  });
  mockDefaultProps = {
    allTeaTypes: teaFixture.teaTypes.allTeaTypes,
    teaTypeIDs: teaFixture.teaTypes.teaTypeIDs,
    userID: dataFixture.mockUserID,
    getTeaTypes: mockGetTeaTypes,
    deleteTeaType: mockDeleteTeaType
  };
});

describe("TeaTypeCollectionContainer rendering", () => {
  test("renders the component with redux without errors", () => {
    let store = makeMockStore(storeFixture.basicStore);
    const { queryByTestId } = renderWithRouter(
      <TeaTypeCollectionContainer store={store} />
    );

    expect(queryByTestId("teatypecollection")).toBeTruthy();
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

    test("user clicks edit link redirects to tea type editor", () => {
      const { getAllByTestId, history } = renderWithRouter(
        <TeaTypeCollectionTableContainerClass {...mockDefaultProps} />
      );

      fireEvent.click(getAllByTestId("editlink")[2]);
      expect(history.entries[1].pathname).toEqual(
        "/update-tea-type/425ba4a6-fc19-4a53-813c-7957e72aa0ad"
      );
    });
  });
});