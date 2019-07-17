import React from "react";
import "jest-dom/extend-expect";
import { fireEvent, wait } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import { makeMockStore } from "../../../../test/testUtils";
import dataFixture from "../../../../test/__fixtures__/dataFixture";
import storeFixture from "../../../../test/__fixtures__/storeFixture";
import teaFixture from "../../../../test/__fixtures__/teaFixture";
import TeaCollectionTableContainer from "../TeaTypeCollectionTableContainer";
import { TeaCollectionTableContainerClass } from "../TeaTypeCollectionTableContainer";

let mockGetTeas;
let mockDeleteTea;
let mockDefaultProps;

beforeEach(() => {
  mockGetTeas = jest.fn(() => {
    return storeFixture.basicStore;
  });
  mockDeleteTea = jest.fn(() => {
    return storeFixture.deletedStore;
  });
  mockDefaultProps = {
    getTeas: mockGetTeas,
    deleteTea: mockDeleteTea,
    teaTypes: teaFixture.teaTypes,
    teas: storeFixture.basicStore.teas,
    userID: dataFixture.mockUserID
  };
});

describe("TeaCollectionTableContainer rendering", () => {
  test("renders the component with redux without errors", () => {
    let store = makeMockStore(storeFixture.basicStore);
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
    test("user can filter by alpha character criteria", async () => {
      const { queryAllByTestId, getByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );

      fireEvent.blur(getByTestId("filterselect"), {
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
      await wait(() => {
        expect(queryAllByTestId("detailslink").length).toEqual(2);
      });
    });

    test("user can filter by number criteria", () => {
      const { queryAllByTestId, getByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );

      fireEvent.blur(getByTestId("filterselect"), {
        target: {
          value: "servings"
        }
      });
      fireEvent.change(getByTestId("filterinput"), {
        target: {
          value: 22
        }
      });
      fireEvent.click(getByTestId("filterbutton"));
      expect(queryAllByTestId("detailslink").length).toEqual(1);
    });

    test("user can clear filter", () => {
      const { queryAllByTestId, getByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );

      fireEvent.blur(getByTestId("filterselect"), {
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
      expect(queryAllByTestId("detailslink").length).toEqual(2);
      fireEvent.click(getByTestId("clearfilterbutton"));
      expect(queryAllByTestId("detailslink").length).toEqual(3);
    });

    test("if user does not choose filter category, filter does not work", () => {
      const { queryAllByTestId, getByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );

      fireEvent.change(getByTestId("filterinput"), {
        target: {
          value: "Celestial Seasonings"
        }
      });
      fireEvent.click(getByTestId("filterbutton"));
      expect(queryAllByTestId("detailslink").length).toEqual(3);
      expect(queryAllByTestId("inputerror").length).toEqual(1);
    });

    test("if user does not enter filter criteria, filter does not work", () => {
      const { queryAllByTestId, getByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );

      fireEvent.change(getByTestId("filterselect"), {
        target: {
          value: "brand"
        }
      });
      fireEvent.click(getByTestId("filterbutton"));
      expect(queryAllByTestId("detailslink").length).toEqual(3);
      expect(queryAllByTestId("inputerror").length).toEqual(1);
    });
  });
});
