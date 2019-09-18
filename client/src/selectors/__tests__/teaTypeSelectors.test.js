import storeFixture from "../../test/__fixtures__/storeFixture";
import teaTypeFixture from "../../test/__fixtures__/teaTypeFixture";
import { selectTeaTypes } from "../../selectors/teaTypeSelectors";

describe("selectTeaTypes", () => {
  test("returns expected array of brands", () => {
    expect(selectTeaTypes(storeFixture.basicStore)).toEqual(
      teaTypeFixture.allTeaTypesArray
    );
  });
});
