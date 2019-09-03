import storeFixture from "../../test/__fixtures__/storeFixture";
import teaFixture from "../../test/__fixtures__/teaFixture";
import {
  teaIDsSelector,
  allTeasSelector,
  selectBrands,
  selectTimerTea
} from "../teaSelectors";

describe("teaIDsSelector", () => {
  test("returns expected array of tea IDs", () => {
    expect(teaIDsSelector(storeFixture.basicStore)).toEqual(
      storeFixture.basicStore.teas.teaIDs
    );
  });
});

describe("allTeasSelector", () => {
  test("returns expected object of teas", () => {
    expect(allTeasSelector(storeFixture.basicStore)).toEqual(
      storeFixture.basicStore.teas.allTeas
    );
  });
});

describe("selectBrands", () => {
  test("returns expected array of brands", () => {
    expect(selectBrands(storeFixture.basicStore)).toEqual(teaFixture.teaBrands);
  });
});

describe("selectTimerTea", () => {
  test("returns expected tea", () => {
    const mockProps = { timerID: teaFixture.matchTeaID.match.params.id };
    expect(selectTimerTea(storeFixture.basicStore, mockProps)).toEqual(
      teaFixture.basicTea
    );
  });
});
