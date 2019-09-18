import storeFixture from "../../test/__fixtures__/storeFixture";
import teaFixture from "../../test/__fixtures__/teaFixture";
import { selectBrands, selectTimerTea } from "../teaSelectors";

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
