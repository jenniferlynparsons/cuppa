import storeFixture from "../../test/__fixtures__/storeFixture";
import teaTypeFixture from "../../test/__fixtures__/teaTypeFixture";
import {
  teaTypeIDsSelector,
  allTeaTypesSelector,
  selectTeaTypes
} from "../../selectors/teaTypeSelectors";

describe("teaTypeIDsSelector", () => {
  test("returns expected array of tea type IDs", () => {
    expect(teaTypeIDsSelector(storeFixture.basicStore)).toEqual(
      teaTypeFixture.teaTypes.teaTypeIDs
    );
  });
});

describe("allTeaTypesSelector", () => {
  test("returns expected object of tea types", () => {
    expect(allTeaTypesSelector(storeFixture.basicStore)).toEqual(
      teaTypeFixture.teaTypes.allTeaTypes
    );
  });
});

describe("selectTeaTypes", () => {
  test("returns expected array of brands", () => {
    expect(selectTeaTypes(storeFixture.basicStore)).toEqual(
      teaTypeFixture.allTeaTypesArray
    );
  });
});
