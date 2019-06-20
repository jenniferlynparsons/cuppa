import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtil";
import { makeMockStore } from "../../../../test/testUtils";
import TeaDetailsContainer from "../TeaDetailsContainer";
import { TeaDetailsContainerClass } from "../TeaDetailsContainer";

const detailsStore = {
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

const tea = {
  id: "25070e52-e635-4883-ae9b-583113573b9f",
  name: "Sleepytime",
  brand: "Celestial Seasonings",
  teaType: "Herbal",
  servings: 22
};

let mockFunc;
let mockTeaFlash;
beforeEach(() => {
  mockFunc = jest.fn();
  mockTeaFlash = jest.fn();
});
afterEach(cleanup);

describe("TeaDetailsContainer rendering", () => {
  test("renders the component with redux without errors", () => {
    let store = makeMockStore(detailsStore);
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

describe("TeaDetailsContainer flash", () => {
  test("tea detail renders with flash message after update", () => {
    const { getByTestId } = renderWithRouter(
      <TeaDetailsContainerClass
        getTeas={mockFunc}
        editTeaFlash={mockTeaFlash}
        tea={tea}
        flash={"on"}
      />
    );
    expect(getByTestId("flash")).toBeTruthy();
  });

  test("user clicks on delete flash fires click handler", () => {
    const { getByTestId, debug } = renderWithRouter(
      <TeaDetailsContainerClass
        getTeas={mockFunc}
        editTeaFlash={mockTeaFlash}
        tea={tea}
        flash={"on"}
      />
    );
    fireEvent.click(getByTestId("flash"), "off");
    expect(mockTeaFlash).toBeCalledWith("off");
  });
});

describe("teaDetails interactions", () => {
  test("user clicks edit to update tea", () => {
    const { getByTestId, history } = renderWithRouter(
      <TeaDetailsContainerClass
        getTeas={mockFunc}
        editTeaFlash={mockTeaFlash}
        tea={tea}
        flash={"on"}
      />
    );
    fireEvent.click(getByTestId("teaeditlink"));
    expect(history.entries[1].pathname).toMatch("/update-tea/");
  });
});
