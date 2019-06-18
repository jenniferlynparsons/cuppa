import React from "react";
import { cleanup, fireEvent, wait } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtil";
import { makeMockStore } from "../../../../test/testUtils";
import TeaDetailsContainer from "../TeaDetailsContainer";

const basicTea = {
  auth: {
    isAuthenticated: true,
    user: {
      id: "5c6313a4c318bb62298b23d4",
      name: "Jennifer",
      iat: 1560457432,
      exp: 1592014358
    },
    loading: false
  },
  errors: {},
  teas: {
    allTeas: {
      "25070e52-e635-4883-ae9b-583113573b9f": {
        id: "25070e52-e635-4883-ae9b-583113573b9f",
        name: "Sleepytime",
        brand: "Celestial Seasonings",
        teaType: "Herbal",
        servings: 22
      },
      "044cf8ea-bc71-4d89-a2f6-fa499d43e20d": {
        id: "044cf8ea-bc71-4d89-a2f6-fa499d43e20d",
        name: "Green Dragon",
        brand: "Celestial Seasonings",
        teaType: "Green",
        servings: 21
      }
    },
    teaIDs: [
      "25070e52-e635-4883-ae9b-583113573b9f",
      "044cf8ea-bc71-4d89-a2f6-fa499d43e20d"
    ]
  },
  teaTypes: ["Black", "Green", "White", "Herbal"],
  flash: "off"
};

const flashTea = { ...basicTea, flash: "on" };

afterEach(cleanup);

describe("TeaDetailsContainer rendering", () => {
  test("renders the component without errors", () => {
    let store = makeMockStore(basicTea);
    const { getByTestId } = renderWithRouter(
      <TeaDetailsContainer
        store={store}
        match={{
          params: { id: "25070e52-e635-4883-ae9b-583113573b9f" }
        }}
      />
    );
    expect(getByTestId("teadetails")).toBeTruthy();
  });
});

describe("teaDetailsContainer flash", () => {
  let store;
  beforeEach(() => {
    store = makeMockStore(flashTea);
  });

  test("tea detail renders with flash message after update", () => {
    const { getByTestId } = renderWithRouter(
      <TeaDetailsContainer
        store={store}
        match={{
          params: { id: "25070e52-e635-4883-ae9b-583113573b9f" }
        }}
      />
    );
    expect(getByTestId("flash")).toBeTruthy();
  });

  // TODO find a way to mock the updateFlash function that is inside the TeaDetailsContainer class
  // test("user clicks on delete flash fires click handler", async () => {
  //   const updateFlash = jest.fn();
  //   const { getByTestId } = renderWithRouter(
  //     <TeaDetailsContainer
  //       store={store}
  //       match={{
  //         params: { id: "25070e52-e635-4883-ae9b-583113573b9f" }
  //       }}
  //     />
  //   );
  //   expect(getByTestId("flash")).toBeTruthy();
  //   fireEvent.click(getByTestId("flash"));
  //   await expect(updateFlash).toHaveBeenCalled();
  // });
});

describe("teaDetailsContainer interactions", () => {
  test("user clicks edit to update tea", () => {
    let store = makeMockStore(basicTea);
    const { getByTestId, history } = renderWithRouter(
      <TeaDetailsContainer
        store={store}
        match={{
          params: { id: "25070e52-e635-4883-ae9b-583113573b9f" }
        }}
      />
    );
    fireEvent.click(getByTestId("teaeditlink"));
    expect(history.entries[1].pathname).toEqual(
      "/update-tea/25070e52-e635-4883-ae9b-583113573b9f"
    );
  });
});
