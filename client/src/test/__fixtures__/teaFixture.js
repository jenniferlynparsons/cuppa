// Component mock data
const basicTea = {
  id: "25070e52-e635-4883-ae9b-583113573b9f",
  name: "Sleepytime",
  brand: "Celestial Seasonings",
  teaType: "5d40b6871f88450253bdbf40",
  servings: 22,
  rating: "4"
};

const updatedTea = {
  id: "044cf8ea-bc71-4d89-a2f6-fa499d43e20d",
  name: "Green Dragon",
  brand: "Twinnings",
  teaType: "5d48277169b3160191797d14",
  servings: 23,
  rating: "4"
};

const basicDataTea = {
  userID: "5c63123a4c318b298b23d4",
  id: "",
  name: "Sleepytime",
  brand: "Celestial Seasonings",
  teaType: "5d40b6871f88450253bdbf40",
  servings: 22,
  rating: "4"
};

const missingDataTea = {
  name: "",
  brand: "Twinnings",
  teaType: "5d48277169b3160191797d14",
  servings: 23,
  rating: "4"
};

const servingsUpdatedTea = {
  id: "25070e52-e635-4883-ae9b-583113573b9f",
  name: "Sleepytime",
  brand: "Celestial Seasonings",
  teaType: "5d40b6871f88450253bdbf40",
  servings: 21,
  rating: "4"
};

// Reducer mock data

const reducerAddTea = {
  userID: "5cf18ae7d39d81638810de09",
  name: "Lapsang Souchang",
  brand: "McNulty's",
  teaType: "5d40b6871f88450253bdbf40",
  servings: 12,
  rating: "4",
  id: "3d4a3605-4368-4ee1-abe4-318d7982e491"
};

const reducerEditTea = {
  flash: { name: "" },
  touched: { name: false, servings: true },
  userID: "5cf18ae7d39d81638810de09",
  currentTea: {
    id: "3d4a3605-4368-4ee1-abe4-318d7982e491",
    name: "Lapsang Souchang",
    brand: "McNulty's",
    teaType: "5d39dd1f0487d1116140bac1",
    servings: 12,
    rating: "4"
  },
  name: "Lapsang Souchang",
  brand: "McNulty's",
  teaType: "5d39dd1f0487d1116140bac1",
  servings: 14,
  rating: "4",
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
    teaType: "5d39dd1f0487d1116140bac1",
    servings: 12,
    rating: "4"
  }
};

const teaPatchResponse = {
  type: "EDIT_TEA",
  payload: {
    id: "3d4a3605-4368-4ee1-abe4-318d7982e491",
    name: "Lapsang Souchang",
    brand: "McNulty's",
    teaType: "5d39dd1f0487d1116140bac1",
    servings: 14,
    rating: "4"
  }
};

const teaGetResponse = {
  type: "GET_TEAS",
  payload: [
    {
      id: "63f48407-a224-49a9-80b9-3257b383d8e8",
      name: "Sleepytime",
      brand: "Celestial Seasonings",
      teaType: "5d40b6871f88450253bdbf40",
      servings: 22,
      rating: "4"
    },
    {
      id: "3d4a3605-4368-4ee1-abe4-318d7982e491",
      name: "Lapsang Souchang",
      brand: "McNulty's",
      teaType: "5d39dd1f0487d1116140bac1",
      servings: 12,
      rating: "4"
    }
  ]
};

const getTeasPayload = [
  {
    id: "25070e52-e635-4883-ae9b-583113573b9f",
    name: "Sleepytime",
    brand: "Celestial Seasonings",
    teaType: "5d40b6871f88450253bdbf40",
    servings: 22,
    rating: "4"
  },
  {
    id: "044cf8ea-bc71-4d89-a2f6-fa499d43e20d",
    name: "Green Dragon",
    brand: "Celestial Seasonings",
    teaType: "5d48277169b3160191797d14",
    servings: 21,
    rating: "4"
  },
  {
    id: "dc8a7690-de4a-47e8-8225-5548c0f51669",
    name: "Lapsang Souchang",
    brand: "McNulty's",
    teaType: "5d39dd1f0487d1116140bac1",
    servings: 12,
    rating: "4"
  }
];

const addTeaPayload = {
  id: "1b1db861-0537-4b69-83d5-d9ee033530f8",
  name: "Basic Tea",
  brand: "Lipton",
  teaType: "5d39dd1f0487d1116140bac1",
  servings: 12,
  rating: "4"
};

const editTeaPayload = {
  id: "25070e52-e635-4883-ae9b-583113573b9f",
  name: "Sleepytime",
  brand: "Celestial Seasonings",
  teaType: "5d40b6871f88450253bdbf40",
  servings: 22,
  rating: "4"
};

const deleteTeaPayload = "dc8a7690-de4a-47e8-8225-5548c0f51669";

const matchTeaID = {
  match: { params: { id: "25070e52-e635-4883-ae9b-583113573b9f" } }
};

const matchTimerID = {
  timerID: "25070e52-e635-4883-ae9b-583113573b9f"
};

const teaBrands = ["Celestial Seasonings", "Celestial Seasonings", "McNulty's"];

const emptyState = { allTeas: {}, teaIDs: [] };

const teaFixture = {
  basicTea,
  updatedTea,
  basicDataTea,
  missingDataTea,
  servingsUpdatedTea,
  reducerAddTea,
  reducerEditTea,
  teaPostResponse,
  teaPatchResponse,
  teaGetResponse,
  getTeasPayload,
  addTeaPayload,
  editTeaPayload,
  deleteTeaPayload,
  matchTeaID,
  matchTimerID,
  teaBrands,
  emptyState
};

export default teaFixture;
