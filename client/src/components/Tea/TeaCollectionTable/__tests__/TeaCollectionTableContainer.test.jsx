import React from "react";
import "jest-dom/extend-expect";
import { cleanup, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtil";
import { makeMockStore } from "../../../../test/testUtils";
import dataFixture from "../../../../test/__fixtures__/dataFixture";
import TeaCollectionTableContainer from "../TeaCollectionTableContainer";
import { TeaCollectionTableContainerClass } from "../TeaCollectionTableContainer";

const mockHistory = {
  length: 10,
  action: "PUSH",
  location: { pathname: "/", search: "", hash: "", key: "zh4boo" },
  push: jest.fn()
};

let mockGetTeas;
let mockDeleteTea;

beforeEach(() => {
  mockGetTeas = jest.fn(() => {
    return dataFixture.basicStore;
  });
  mockDeleteTea = jest.fn(() => {
    console.log("hello");
    return dataFixture.deletedStore;
  });
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
  let mockDefaultProps;
  beforeEach(() => {
    mockDefaultProps = {
      getTeas: mockGetTeas,
      deleteTea: mockDeleteTea,
      teaTypes: dataFixture.teaTypes,
      teas: dataFixture.basicStore.teas,
      userID: dataFixture.userID,
      history: mockHistory
    };
  });
  describe("filtering", () => {
    test("user can filter by name", () => {
      const { queryByTestId, getByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );
      // expect "Green Dragon" to not be listed
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

  // describe("sorting", () => {
  //   test("user clicks sort arrow sorts by that category", () => {
  //     const { getByTestId } = renderWithRouter(
  //       <TeaCollectionTableContainerClass {...mockDefaultProps} />
  //     );
  //     // expect "Green Dragon" to be the first tea
  //     // expect("")
  //   });
  //   test("user clicks sort arrow a second time reverses sort order", () => {
  //     const { getByTestId } = renderWithRouter(
  //       <TeaCollectionTableContainerClass {...mockDefaultProps} />
  //     );
  //     // expect "Sleepytime" to be the first tea
  //   });
  //   test("user clicks a different arrow on sorted table re-sorts to new sort order", () => {
  //     const { getByTestId } = renderWithRouter(
  //       <TeaCollectionTableContainerClass {...mockDefaultProps} />
  //     );
  //     // expect "Lapsang Souchang" to be the first tea
  //   });
  // });

  describe("individual tea interactions", () => {
    test("user clicks delete removes the tea from list", () => {
      const { getAllByTestId } = renderWithRouter(
        <TeaCollectionTableContainerClass {...mockDefaultProps} />
      );

      fireEvent.click(getAllByTestId("deletelink")[2]);
      // console.log(store);
      // debug();
      expect(getAllByTestId("deletelink").length).toEqual(2);
      // expect "Lapsang Souchang" to not be listed
    });
    // test("user clicks name link redirects to detail page", () => {
    //   const { getAllByTestId } = renderWithRouter(
    //     <TeaCollectionTableContainerClass {...mockDefaultProps} />
    //   );
    //   // expect history to include the tea detail
    // });
    // test("user clicks edit link redirects to tea editor", () => {
    //   const { getAllByTestId } = renderWithRouter(
    //     <TeaCollectionTableContainerClass {...mockDefaultProps} />
    //   );
    //   // expect history to include the tea editor
    // });
  });
});
