// Component mock data
const basicTeaTypeFormValues = {
  id: "5d39dd1f0487d1116140bac1",
  name: "Black",
  brewTimeMin: 3,
  brewTimeSec: 30
};

const basicTeaType = {
  id: "5d39dd1f0487d1116140bac1",
  name: "Black",
  brewTime: 12360000
};

const updatedTeaTypeFormValues = {
  id: "5d39dd1f0487d1116140bac1",
  name: "Green",
  brewTimeMin: 3,
  brewTimeSec: 30
};

const updatedTeaType = {
  id: "5d39dd1f0487d1116140bac1",
  name: "Green",
  brewTime: 12360000
};

const missingDataTeaTypeFormValues = {
  id: "5d39dd1f0487d1116140bac1",
  name: "",
  brewTimeMin: 3,
  brewTimeSec: 30
};

const missingDataTeaType = {
  id: "5d39dd1f0487d1116140bac1",
  name: "",
  brewTime: 12360000
};

const teaTypes = {
  allTeaTypes: {
    "5d39dd1f0487d1116140bac1": {
      id: "5d39dd1f0487d1116140bac1",
      name: "Black",
      brewTime: 12360000
    },
    "5d48277169b3160191797d14": {
      id: "5d48277169b3160191797d14",
      name: "Green",
      brewTime: 10800000
    },
    "425ba4a6-fc19-4a53-813c-7957e72aa0ad": {
      id: "425ba4a6-fc19-4a53-813c-7957e72aa0ad",
      name: "White",
      brewTime: 7800000
    },
    "5d40b6871f88450253bdbf40": {
      id: "5d40b6871f88450253bdbf40",
      name: "Herbal",
      brewTime: 14400000
    }
  },
  teaTypeIDs: [
    "5d39dd1f0487d1116140bac1",
    "5d48277169b3160191797d14",
    "425ba4a6-fc19-4a53-813c-7957e72aa0ad",
    "5d40b6871f88450253bdbf40"
  ],
  flash: "off"
};

const duplicateTeaTypes = {
  allTeaTypes: {
    "5d39dd1f0487d1116140bac1": {
      id: "5d39dd1f0487d1116140bac1",
      name: "Black",
      brewTime: 12360000
    },
    "5d48277169b3160191797d14": {
      id: "5d48277169b3160191797d14",
      name: "Green",
      brewTime: 10800000
    },
    "425ba4a6-fc19-4a53-813c-7957e72aa0ad": {
      id: "425ba4a6-fc19-4a53-813c-7957e72aa0ad",
      name: "White",
      brewTime: 7800000
    },
    "5d40b6871f88450253bdbf40": {
      id: "5d40b6871f88450253bdbf40",
      name: "Herbal",
      brewTime: 14400000
    }
  },
  teaTypeIDs: [
    "5d39dd1f0487d1116140bac1",
    "5d48277169b3160191797d14",
    "425ba4a6-fc19-4a53-813c-7957e72aa0ad",
    "5d40b6871f88450253bdbf40"
  ],
  errors: { serverErrors: { duplicate: "This tea type already exists" } }
};

const allTeaTypesArray = [
  {
    id: "5d39dd1f0487d1116140bac1",
    userID: "5ceffe255c871902244da0d1",
    name: "Black",
    brewTime: 181
  },
  {
    id: "5d3a23e3c5f99259856fe3aa",
    userID: "5ceffe255c871902244da0d1",
    name: "White",
    brewTime: 120
  },
  {
    id: "5d40b6871f88450253bdbf40",
    userID: "5ceffe255c871902244da0d1",
    name: "Herbal",
    brewTime: 63
  }
];

// Reducer mock data

const reducerAddTeaType = {
  userID: "5cf18ae7d39d81638810de09",
  teaTypeID: "5d39dd1f0487d1116140bac1",
  id: "5d39dd1f0487d1116140bac1",
  name: "Black",
  brewTime: 12360000
};

const reducerEditTeaType = {
  userID: "5cf18ae7d39d81638810de09",
  teaTypeID: "5d39dd1f0487d1116140bac1",
  id: "5d39dd1f0487d1116140bac1",
  name: "Green",
  brewTime: 12360000
};

const teaTypePostResponse = {
  type: "ADD_TEATYPE",
  payload: {
    id: "5d39dd1f0487d1116140bac1",
    name: "Black",
    brewTime: 12360000
  }
};

const teaTypePatchResponse = {
  type: "EDIT_TEATYPE",
  payload: {
    id: "5d39dd1f0487d1116140bac1",
    name: "Green",
    brewTime: 12360000
  }
};

const teaTypeGetResponse = {
  type: "GET_TEATYPES",
  payload: [
    {
      id: "5d39dd1f0487d1116140bac1",
      name: "Black",
      brewTime: 12360000
    },
    {
      id: "5d48277169b3160191797d14",
      name: "Green",
      brewTime: 10800000
    }
  ]
};

const getTeaTypesPayload = [
  {
    id: "5d39dd1f0487d1116140bac1",
    name: "Black",
    brewTime: 12360000
  },
  {
    id: "5d48277169b3160191797d14",
    name: "Green",
    brewTime: 10800000
  },
  {
    id: "425ba4a6-fc19-4a53-813c-7957e72aa0ad",
    name: "White",
    brewTime: 7800000
  },
  {
    id: "5d40b6871f88450253bdbf40",
    name: "Herbal",
    brewTime: 14400000
  }
];

const addTeaTypePayload = {
  id: "5d39dd1f0487d1116140bac1",
  name: "Black",
  brewTime: 12360000
};

const editTeaTypePayload = {
  id: "5d39dd1f0487d1116140bac1",
  name: "Green",
  brewTime: 12360000
};

const deleteTeaTypePayload = "5d48277169b3160191797d14";

const singleTeaType = {
  id: "5d40b6871f88450253bdbf40",
  name: "Herbal",
  brewTime: 14400000
};

const emptyState = { allTeaTypes: {}, teaTypeIDs: [] };

const teaTypeFixture = {
  basicTeaTypeFormValues,
  basicTeaType,
  updatedTeaTypeFormValues,
  updatedTeaType,
  missingDataTeaTypeFormValues,
  missingDataTeaType,
  teaTypes,
  duplicateTeaTypes,
  allTeaTypesArray,
  reducerAddTeaType,
  reducerEditTeaType,
  teaTypePostResponse,
  teaTypePatchResponse,
  teaTypeGetResponse,
  getTeaTypesPayload,
  addTeaTypePayload,
  editTeaTypePayload,
  deleteTeaTypePayload,
  singleTeaType,
  emptyState
};

export default teaTypeFixture;
