import React from "react";
import "jest-dom/extend-expect";
import { cleanup, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtil";
import { makeMockStore } from "../../../../test/testUtils";
import dataFixture from "../../../../test/__fixtures__/dataFixture";
import TeaCollectionTableContainer from "../TeaCollectionTableContainer";
import { TeaCollectionTableContainerClass } from "../TeaCollectionTableContainer";

let mockGetTeas;
let mockDeleteTea;
let mockDefaultProps;

beforeEach(() => {
  mockGetTeas = jest.fn(() => {
    return dataFixture.basicStore;
  });
  mockDeleteTea = jest.fn(() => {
    return dataFixture.deletedStore;
  });
  mockDefaultProps = {
    getTeas: mockGetTeas,
    deleteTea: mockDeleteTea,
    teaTypes: dataFixture.teaTypes,
    teas: dataFixture.basicStore.teas,
    userID: dataFixture.userID
  };
});

afterEach(cleanup);

describe("TeaCollectionTableContainer rendering", () => {
  test("renders the component with redux without errors", () => {
    let store = makeMockStore(dataFixture.basicStore);
    const { queryByTestId } = renderWithRouter(
      <TeaCollectionTableContainer store={store} />
    );
    expect(queryByTestId("teacollection")).toBeTruthy();
  });
});

describe("TeaCollectionTableContainerClass interactions", () => {
  describe("individual tea interactions", () => {
    test("user clicks delete removes the tea from list", () => {
      const { getAllByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      fireEvent.click(getAllByTestId("deletelink")[2]);
      expect(mockDeleteTea).toHaveBeenCalled();
    });
    test("user clicks name link redirects to detail page", () => {
      const { getAllByTestId, history } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      fireEvent.click(getAllByTestId("detailslink")[2]);
      expect(history.entries[1].pathname).toEqual(
        "/tea/dc8a7690-de4a-47e8-8225-5548c0f51669"
      );
    });
    test("user clicks edit link redirects to tea editor", () => {
      const { getAllByTestId, history } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      fireEvent.click(getAllByTestId("editlink")[2]);
      expect(history.entries[1].pathname).toEqual(
        "/update-tea/dc8a7690-de4a-47e8-8225-5548c0f51669"
      );
    });
  });

  describe("sorting", () => {
    test("user clicks sort arrow sorts by that category", () => {
      const { getByTestId, queryAllByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      fireEvent.click(getByTestId("name"));
      // expect "Green Dragon" to be the first tea
      expect(queryAllByTestId("detailslink")[0].textContent).toEqual(
        "Green Dragon"
      );
    });
    test("user clicks sort arrow a second time reverses sort order", () => {
      const { getByTestId, queryAllByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      fireEvent.click(getByTestId("name"));
      fireEvent.click(getByTestId("name"));
      // expect "Sleepytime" to be the first tea
      expect(queryAllByTestId("detailslink")[0].textContent).toEqual(
        "Sleepytime"
      );
    });
    test("user clicks a different arrow on sorted table re-sorts to new sort order", () => {
      const { getByTestId, queryAllByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      fireEvent.click(getByTestId("teaType"));
      // expect "Lapsang Souchang" to be the first tea
      expect(queryAllByTestId("detailslink")[0].textContent).toEqual(
        "Lapsang Souchang"
      );
    });
  });

  describe("filtering", () => {
    test.only("user can filter by name", () => {
      const { queryAllByTestId, getByTestId, debug } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      // debug();
      fireEvent.change(getByTestId("filterbrand"), {
        target: {
          value: "brand"
        }
      });
      fireEvent.change(getByTestId("filterinput"), {
        target: {
          value: "Celestial Seasonings"
        }
      });
      fireEvent.click(getByTestId("filterbutton"));
      // expect "Green Dragon" to not be listed
      // console.log(queryAllByTestId("detailslink"));
      expect(queryAllByTestId("detailslink").length).toEqual(2);
    });
    test("user can clear filter", () => {
      const { getByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      // expect "Green Dragon" to be listed
    });
    test("if user does not choose filter category, filter does not work", () => {
      const { getByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      // expect "Green Dragon" to be listed
    });
    test("if user does not enter filter criteria, filter does not work", () => {
      const { getByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      // expect "Green Dragon" to be listed
    });
  });
});
