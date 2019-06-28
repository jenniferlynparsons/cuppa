// Component mock data
const basicTea = {
  id: "1b1db861-0537-4b69-83d5-d9ee033530f8",
  name: "Basic Tea",
  brand: "Lipton",
  teaType: "Black",
  servings: 12
};

const updatedTea = {
  id: "044cf8ea-bc71-4d89-a2f6-fa499d43e20d",
  name: "Green Dragon",
  brand: "Twinnings",
  teaType: "Green",
  servings: 21
};

const teaTypes = ["Black", "Green", "White", "Herbal"];

// Reducer mock data

const reducerAddTea = {
  userID: "5cf18ae7d39d81638810de09",
  teaID: "3d4a3605-4368-4ee1-abe4-318d7982e491",
  name: "Lapsang Souchang",
  brand: "McNulty's",
  teaType: "Black",
  servings: "12",
  id: "3d4a3605-4368-4ee1-abe4-318d7982e491"
};

const reducerEditTea = {
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

const teaPostResponse = {
  type: "ADD_TEA",
  payload: {
    id: "3d4a3605-4368-4ee1-abe4-318d7982e491",
    name: "Lapsang Souchang",
    brand: "McNulty's",
    teaType: "Black",
    servings: 12
  }
};

const teaPutResponse = {
  type: "EDIT_TEA",
  payload: {
    id: "3d4a3605-4368-4ee1-abe4-318d7982e491",
    name: "Lapsang Souchang",
    brand: "McNulty's",
    teaType: "Black",
    servings: 14
  }
};

const teaGetResponse = {
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
    id: "dc8a7690-de4a-47e8-8225-5548c0f51669",
    name: "Lapsang Souchang",
    brand: "McNulty's",
    teaType: "Black",
    servings: 12
  }
];

const addTeaPayload = {
  id: "1b1db861-0537-4b69-83d5-d9ee033530f8",
  name: "Basic Tea",
  brand: "Lipton",
  teaType: "Black",
  servings: 12
};

const editTeaPayload = {
  id: "25070e52-e635-4883-ae9b-583113573b9f",
  name: "Sleepytime",
  brand: "Celestial Seasonings",
  teaType: "Herbal",
  servings: 22
};

const deleteTeaPayload = "dc8a7690-de4a-47e8-8225-5548c0f51669";

const emptyState = { allTeas: {}, teaIDs: [] };

const teaFixture = {
  basicTea,
  updatedTea,
  teaTypes,
  reducerAddTea,
  reducerEditTea,
  teaPostResponse,
  teaPutResponse,
  teaGetResponse,
  getTeasPayload,
  addTeaPayload,
  editTeaPayload,
  deleteTeaPayload,
  emptyState
};

export default teaFixture;
