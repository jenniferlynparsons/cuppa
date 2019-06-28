import React from "react";
import { fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import { makeMockStore } from "../../../../test/testUtils";
import teaFixture from "../../../../test/__fixtures__/teaFixture";
import storeFixture from "../../../../test/__fixtures__/storeFixture";
import TeaDetailsContainer from "../TeaDetailsContainer";
import { TeaDetailsContainerClass } from "../TeaDetailsContainer";

let mockFunc;
let mockTeaFlash;
beforeEach(() => {
  mockFunc = jest.fn();
  mockTeaFlash = jest.fn();
});

describe("TeaDetailsContainer rendering", () => {
  test("renders the component with redux without errors", () => {
    let store = makeMockStore(storeFixture.basicStore);
    const { queryByTestId } = renderWithRouter(
      <TeaDetailsContainer
        store={store}
        match={{
          params: { id: "25070e52-e635-4883-ae9b-583113573b9f" }
        }}
      />
    );

    expect(queryByTestId("teadetails")).toBeTruthy();
  });
});

describe("TeaDetailsContainer flash", () => {
  test("tea detail renders with flash message after update", () => {
    const { queryByTestId } = renderWithRouter(
      <TeaDetailsContainerClass
        tea={teaFixture.basicTea}
        flash={"on"}
        getTeas={mockFunc}
        editTeaFlash={mockTeaFlash}
      />
    );

    expect(queryByTestId("flash")).toBeTruthy();
  });

  test("user clicks on delete flash fires click handler", () => {
    const { getByTestId } = renderWithRouter(
      <TeaDetailsContainerClass
        tea={teaFixture.basicTea}
        flash={"on"}
        getTeas={mockFunc}
        editTeaFlash={mockTeaFlash}
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
        tea={teaFixture.basicTea}
        flash={"on"}
        getTeas={mockFunc}
        editTeaFlash={mockTeaFlash}
      />
    );

    fireEvent.click(getByTestId("teaeditlink"));
    expect(history.entries[1].pathname).toMatch("/update-tea/");
  });
});
