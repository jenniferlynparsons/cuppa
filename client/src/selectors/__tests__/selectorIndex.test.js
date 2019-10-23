import storeFixture from "../../test/__fixtures__/storeFixture";
import teaFixture from "../../test/__fixtures__/teaFixture";
import teaTypeFixture from "../../test/__fixtures__/teaTypeFixture";
import { selectSingleTeaType } from "../../selectors";

describe("selectSingleTeaType", () => {
  test("returns expected tea type", () => {
    expect(
      selectSingleTeaType(storeFixture.basicStore, teaFixture.matchTeaID)
    ).toEqual(teaTypeFixture.singleTeaType);

    expect(
      selectSingleTeaType(storeFixture.basicStore, teaFixture.matchTimerID)
    ).toEqual(teaTypeFixture.singleTeaType);
  });
});
