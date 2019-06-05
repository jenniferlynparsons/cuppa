import { makeMockStore } from "../../test/testUtils";
import teaActions from "../teaActions";
import API from "../../lib/api";

const store = makeMockStore({
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
      },
      "1b1db861-0537-4b69-83d5-d9ee033530f8": {
        id: "1b1db861-0537-4b69-83d5-d9ee033530f8",
        name: "Basic Tea",
        brand: "Lipton",
        teaType: "Black",
        servings: 12
      }
    },
    teaIDs: [
      "25070e52-e635-4883-ae9b-583113573b9f",
      "044cf8ea-bc71-4d89-a2f6-fa499d43e20d",
      "1b1db861-0537-4b69-83d5-d9ee033530f8"
    ]
  },
  userID: "5c6313a4c318bb62298b23d4",
  teaTypes: ["Black", "Green", "White", "Herbal"]
});

const mockListOwner = "5cf18ae7d39d81638810de09";

const mockDeleteTeaID = "25070e52-e635-4883-ae9b-583113573b9f";

const mockAddTea = {
  userID: "5cf18ae7d39d81638810de09",
  teaID: "3d4a3605-4368-4ee1-abe4-318d7982e491",
  name: "Lapsang Souchang",
  brand: "McNulty's",
  teaType: "Black",
  servings: "12",
  id: "3d4a3605-4368-4ee1-abe4-318d7982e491"
};

const mockEditTea = {
  flash: { name: "", teaID: "" },
  touched: { name: false, servings: true },
  userID: "5cf18ae7d39d81638810de09",
  currentTea: {
    id: "3d4a3605-4368-4ee1-abe4-318d7982e491",
    name: "Lapsang Souchang",
    brand: "McNulty's",
    teaType: "Black",
    servings: 12
  },
  teaID: "3d4a3605-4368-4ee1-abe4-318d7982e491",
  name: "Lapsang Souchang",
  brand: "McNulty's",
  teaType: "Black",
  servings: "14",
  edit: true,
  brands: [],
  brandsDataList: [],
  id: "3d4a3605-4368-4ee1-abe4-318d7982e491"
};

const mockPostResponse = {
  type: "ADD_TEA",
  payload: {
    id: "3d4a3605-4368-4ee1-abe4-318d7982e491",
    name: "Lapsang Souchang",
    brand: "McNulty's",
    teaType: "Black",
    servings: 12
  }
};

const mockPutResponse = {
  type: "EDIT_TEA",
  payload: {
    id: "3d4a3605-4368-4ee1-abe4-318d7982e491",
    name: "Lapsang Souchang",
    brand: "McNulty's",
    teaType: "Black",
    servings: 14
  }
};

const mockGetResponse = {
  type: "GET_TEAS",
  payload: [
    {
      id: "63f48407-a224-49a9-80b9-3257b383d8e8",
      name: "Sleepytime",
      brand: "Celestial Seasonings",
      teaType: "Herbal",
      servings: 12
    },
    {
      id: "3d4a3605-4368-4ee1-abe4-318d7982e491",
      name: "Lapsang Souchang",
      brand: "McNulty's",
      teaType: "Black",
      servings: 12
    }
  ]
};

let addTea = teaActions.addTea;
let editTea = teaActions.editTea;
let deleteTea = teaActions.deleteTea;
let getTeas = teaActions.getTeas;

jest.mock("../../lib/api", () => ({
  post: jest.fn(() => Promise.resolve(mockPostResponse)),
  put: jest.fn(() => Promise.resolve(mockPutResponse)),
  delete: jest.fn(() => Promise.resolve()),
  get: jest.fn(() => Promise.resolve(mockGetResponse))
}));

beforeEach(() => {
  store.clearActions();
});

describe("addTea", () => {
  test("returns a function", () => {
    expect(addTea(mockAddTea)).toBeInstanceOf(Function);
  });
  test("it calls 'post' on the API with the correct path and the tea data", () => {
    store.dispatch(addTea(mockAddTea));
    expect(API.post).toHaveBeenCalledWith("/teas/new-tea", mockAddTea);
  });
  test("it returns the ADD_TEA action type and payload", async () => {
    await store.dispatch(addTea(mockAddTea));
    expect(store.getActions()[0].payload).toEqual(mockPostResponse);
    expect(store.getActions()[0].type).toEqual("ADD_TEA");
  });
});

describe("editTea", () => {
  test("returns a function", () => {
    expect(editTea(mockEditTea)).toBeInstanceOf(Function);
  });
  test("it calls 'put' on the API with the correct path and the tea data", () => {
    store.dispatch(editTea(mockEditTea));
    expect(API.put).toHaveBeenCalledWith("/teas/update-tea", mockEditTea);
  });
  test("it returns the EDIT_TEA action type and payload", async () => {
    await store.dispatch(editTea(mockEditTea));
    expect(store.getActions()[0].payload).toEqual(mockPutResponse);
    expect(store.getActions()[0].type).toEqual("EDIT_TEA");
  });
});

describe("deleteTea", () => {
  test("returns a function", () => {
    expect(deleteTea(mockDeleteTeaID)).toBeInstanceOf(Function);
  });
  test("it calls 'post' on the API with the correct path and the tea data", () => {
    store.dispatch(deleteTea(mockDeleteTeaID));
    expect(API.delete).toHaveBeenCalledWith(
      `/teas/delete-tea/${mockDeleteTeaID}`
    );
  });
  test("it returns the DELETE_TEA action type and payload", async () => {
    await store.dispatch(deleteTea(mockDeleteTeaID));
    expect(store.getActions()[0].payload).toEqual(mockDeleteTeaID);
    expect(store.getActions()[0].type).toEqual("DELETE_TEA");
  });
});

describe("getTeas", () => {
  test("returns a function", () => {
    expect(getTeas(mockListOwner)).toBeInstanceOf(Function);
  });
  test("it calls 'post' on the API with the correct path and the tea data", () => {
    store.dispatch(getTeas(mockListOwner));
    expect(API.get).toHaveBeenCalledWith(`/teas/teasList/${mockListOwner}`);
  });
  test("it returns the GET_TEAS action type and payload", async () => {
    await store.dispatch(getTeas(mockListOwner));
    expect(store.getActions()[0].payload).toEqual(mockGetResponse);
    expect(store.getActions()[0].type).toEqual("GET_TEAS");
  });
});
