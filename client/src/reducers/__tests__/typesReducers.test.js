import { typesTypes } from "../../lib/actionTypes";
import typesReducer from "../typesReducers";

describe("types reducer", () => {
  test("returns default state when there is no action type", () => {
    const reducer = typesReducer(undefined);
    expect(reducer).toEqual(["Black", "Green", "White", "Herbal"]);
  });
});
