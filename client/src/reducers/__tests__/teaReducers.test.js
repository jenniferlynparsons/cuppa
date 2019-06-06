import { teaTypes } from "../../lib/actionTypes";
import teaReducer from "../teaReducers";

const teaIDs = [
  "25070e52-e635-4883-ae9b-583113573b9f",
  "044cf8ea-bc71-4d89-a2f6-fa499d43e20d",
  "1b1db861-0537-4b69-83d5-d9ee033530f8"
];

const teaList = {
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
  },
  "1b1db861-0537-4b69-83d5-d9ee033530f8": {
    id: "1b1db861-0537-4b69-83d5-d9ee033530f8",
    name: "Basic Tea",
    brand: "Lipton",
    teaType: "Black",
    servings: 12
  }
};

const getTeasPayload = [
  {
    id: "25070e52-e635-4883-ae9b-583113573b9f",
    name: "Sleepytime",
    brand: "Celestial Seasonings",
    teaType: "Herbal",
    servings: 22
  },
  {
    id: "044cf8ea-bc71-4d89-a2f6-fa499d43e20d",
    name: "Green Dragon",
    brand: "Celestial Seasonings",
    teaType: "Green",
    servings: 21
  },
  {
    id: "1b1db861-0537-4b69-83d5-d9ee033530f8",
    name: "Basic Tea",
    brand: "Lipton",
    teaType: "Black",
    servings: 12
  }
];

const addTeaPayload = {
  id: "77ed291c-ac63-4f0d-8eb0-22faf371d05d",
  name: "Basic Tea",
  brand: "Lipton",
  teaType: "Black",
  servings: 22
};

const editTeaPayload = {
  id: "1b1db861-0537-4b69-83d5-d9ee033530f8",
  name: "Basic Tea",
  brand: "Lipton",
  teaType: "Black",
  servings: 16
};

const deleteTeaPayload = "1b1db861-0537-4b69-83d5-d9ee033530f8";

const teaListAdded = {
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
  },
  "1b1db861-0537-4b69-83d5-d9ee033530f8": {
    id: "1b1db861-0537-4b69-83d5-d9ee033530f8",
    name: "Basic Tea",
    brand: "Lipton",
    teaType: "Black",
    servings: 12
  },
  "77ed291c-ac63-4f0d-8eb0-22faf371d05d": {
    id: "77ed291c-ac63-4f0d-8eb0-22faf371d05d",
    name: "Basic Tea",
    brand: "Lipton",
    teaType: "Black",
    servings: 22
  }
};
const teaIDsAdded = [
  "25070e52-e635-4883-ae9b-583113573b9f",
  "044cf8ea-bc71-4d89-a2f6-fa499d43e20d",
  "1b1db861-0537-4b69-83d5-d9ee033530f8",
  "77ed291c-ac63-4f0d-8eb0-22faf371d05d"
];

const teaListUpdated = {
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
  },
  "1b1db861-0537-4b69-83d5-d9ee033530f8": {
    id: "1b1db861-0537-4b69-83d5-d9ee033530f8",
    name: "Basic Tea",
    brand: "Lipton",
    teaType: "Black",
    servings: 16
  }
};

const teaIDsDeleted = [
  "25070e52-e635-4883-ae9b-583113573b9f",
  "044cf8ea-bc71-4d89-a2f6-fa499d43e20d"
];

const emptyState = { allTeas: {}, teaIDs: [] };

const initialState = { allTeas: teaList, teaIDs: teaIDs };

const addedState = { allTeas: teaListAdded, teaIDs: teaIDsAdded };

const updatedState = { allTeas: teaListUpdated, teaIDs: teaIDs };

const deletedState = { allTeas: teaList, teaIDs: teaIDsDeleted };

describe("tea reducer", () => {
  test("returns default state when there is no action type", () => {
    const reducer = teaReducer(undefined);
    expect(reducer).toEqual(emptyState);
  });

  test("returns default state when the action type is 'GET_TEAS'", () => {
    const reducer = teaReducer(undefined, {
      type: "GET_TEAS",
      payload: getTeasPayload
    });
    expect(reducer).toEqual(initialState);
  });

  test("returns a state with a new tea when the action type is 'ADD_TEA'", () => {
    const reducer = teaReducer(initialState, {
      type: "ADD_TEA",
      payload: addTeaPayload
    });
    expect(reducer).toEqual(addedState);
  });

  test("returns a state with an updated tea when the action type is 'EDIT_TEA'", () => {
    const reducer = teaReducer(initialState, {
      type: "EDIT_TEA",
      payload: editTeaPayload
    });
    expect(reducer).toEqual(updatedState);
  });

  test("returns a state with an updated teaIDs array when the action type is 'DELETE_TEA'", () => {
    const reducer = teaReducer(initialState, {
      type: "DELETE_TEA",
      payload: deleteTeaPayload
    });
    expect(reducer).toEqual(deletedState);
  });
});
