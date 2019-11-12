import React from "react";
import "jest-dom/extend-expect";
import { fireEvent, wait } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import dataFixture from "../../../../test/__fixtures__/dataFixture";
import storeFixture from "../../../../test/__fixtures__/storeFixture";
import { TeaCollectionTableContainerClass } from "../TeaCollectionTableContainer";

let mockGetTeas;
let mockDeleteTea;
let mockGetTeaTypes;
let mockSetModalID;
let mockDefaultProps;

beforeEach(() => {
  mockGetTeas = jest.fn(() => Promise.resolve(storeFixture.basicStore));
  mockDeleteTea = jest.fn(() => {
    return storeFixture.deletedStore;
  });
  mockGetTeaTypes = jest.fn(() => Promise.resolve(storeFixture.basicStore));
  mockSetModalID = jest.fn();

  mockDefaultProps = {
    userID: dataFixture.mockUserID,
    teas: storeFixture.basicStore.teas,
    teaTypes: storeFixture.basicStore.teaTypes,
    setModalID: mockSetModalID,
    getTeas: mockGetTeas,
    deleteTea: mockDeleteTea,
    getTeaTypes: mockGetTeaTypes
  };
});

describe("TeaCollectionTableContainerClass interactions", () => {
  describe("individual tea interactions", () => {
    test("user clicks delete removes the tea from list", async () => {
      const { getAllByTestId, queryByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      expect(queryByTestId("loadingmessage")).toBeTruthy();
      await Promise.resolve();

      fireEvent.click(getAllByTestId("deletelink")[2]);
      expect(mockDeleteTea).toHaveBeenCalled();
    });

    test("user clicks name link redirects to detail page", async () => {
      const { getAllByTestId, queryByTestId, history } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      expect(queryByTestId("loadingmessage")).toBeTruthy();
      await Promise.resolve();

      fireEvent.click(getAllByTestId("detailslink")[2]);
      expect(history.entries[1].pathname).toEqual(
        "/tea/dc8a7690-de4a-47e8-8225-5548c0f51669"
      );
    });

    test("user clicks edit link redirects to tea editor", async () => {
      const { getAllByTestId, queryByTestId, history } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      expect(queryByTestId("loadingmessage")).toBeTruthy();
      await Promise.resolve();

      fireEvent.click(getAllByTestId("editlink")[2]);
      expect(history.entries[1].pathname).toEqual(
        "/update-tea/dc8a7690-de4a-47e8-8225-5548c0f51669"
      );
    });
  });

  describe("sorting", () => {
    test("user clicks sort arrow sorts by that category", async () => {
      const { getByTestId, queryByTestId, queryAllByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      expect(queryByTestId("loadingmessage")).toBeTruthy();
      await Promise.resolve();

      fireEvent.click(getByTestId("name"));
      expect(queryAllByTestId("detailslink")[0].textContent).toEqual(
        "Green Dragon"
      );
    });

    test("user clicks sort arrow a second time reverses sort order", async () => {
      const { getByTestId, queryByTestId, queryAllByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      expect(queryByTestId("loadingmessage")).toBeTruthy();
      await Promise.resolve();

      fireEvent.click(getByTestId("name"));
      fireEvent.click(getByTestId("name"));
      expect(queryAllByTestId("detailslink")[0].textContent).toEqual(
        "Sleepytime"
      );
    });

    test("user clicks a different arrow on sorted table re-sorts to new sort order", async () => {
      const { getByTestId, queryByTestId, queryAllByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      expect(queryByTestId("loadingmessage")).toBeTruthy();
      await Promise.resolve();

      fireEvent.click(getByTestId("teaType"));
      // expect "Lapsang Souchang" to be the first tea
      expect(queryAllByTestId("detailslink")[0].textContent).toEqual(
        "Lapsang Souchang"
      );
    });
  });

  describe("filtering", () => {
    test("user can filter by alpha character criteria", async () => {
      const { queryByTestId, queryAllByTestId, getByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      expect(queryByTestId("loadingmessage")).toBeTruthy();
      await Promise.resolve();

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

    test("user can filter by number criteria", async () => {
      const { queryByTestId, queryAllByTestId, getByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      expect(queryByTestId("loadingmessage")).toBeTruthy();
      await Promise.resolve();

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

    test("user can clear filter", async () => {
      const { queryByTestId, queryAllByTestId, getByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      expect(queryByTestId("loadingmessage")).toBeTruthy();
      await Promise.resolve();

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

    test("if user does not choose filter category, filter does not work", async () => {
      const { queryByTestId, queryAllByTestId, getByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      expect(queryByTestId("loadingmessage")).toBeTruthy();
      await Promise.resolve();

      fireEvent.change(getByTestId("filterinput"), {
        target: {
          value: "Celestial Seasonings"
        }
      });
      fireEvent.click(getByTestId("filterbutton"));
      expect(queryAllByTestId("detailslink").length).toEqual(3);
      expect(queryAllByTestId("inputerror").length).toEqual(1);
    });

    test("if user does not enter filter criteria, filter does not work", async () => {
      const { queryByTestId, queryAllByTestId, getByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      expect(queryByTestId("loadingmessage")).toBeTruthy();
      await Promise.resolve();

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

  describe("tea timer interactions", () => {
    test("user can display timer modal", async () => {
      const { queryByTestId, getAllByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      expect(queryByTestId("loadingmessage")).toBeTruthy();
      await Promise.resolve();

      fireEvent.click(getAllByTestId("makecuppalink")[0]);
      expect(mockSetModalID).toHaveBeenCalled();
    });
  });
});
