// Component mock data
const basicTeaType = {
  id: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
  name: "Black",
  brewTime: 12360000
};

const updatedTeaType = {
  id: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
  name: "Green",
  brewTime: 12360000
};

const missingDataTeaType = {
  id: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
  name: "",
  brewTime: 12360000
};

// Reducer mock data

const reducerAddTeaType = {
  userID: "5cf18ae7d39d81638810de09",
  teaTypeID: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
  id: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
  name: "Black",
  brewTime: 12360000
};

const reducerEditTeaType = {
  userID: "5cf18ae7d39d81638810de09",
  teaTypeID: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
  id: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
  name: "Green",
  brewTime: 12360000
};

const teaTypePostResponse = {
  type: "ADD_TEATYPE",
  payload: {
    id: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
    name: "Black",
    brewTime: 12360000
  }
};

const teaTypePutResponse = {
  type: "EDIT_TEATYPE",
  payload: {
    id: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
    name: "Green",
    brewTime: 12360000
  }
};

const teaTypeGetResponse = {
  type: "GET_TEATYPES",
  payload: [
    {
      id: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
      name: "Black",
      brewTime: 12360000
    },
    {
      id: "69fb326d-b76a-4198-a4a1-eaf0785752c6",
      name: "Green",
      brewTime: 10800000
    }
  ]
};

const getTeaTypesPayload = [
  {
    id: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
    name: "Black",
    brewTime: 12360000
  },
  {
    id: "69fb326d-b76a-4198-a4a1-eaf0785752c6",
    name: "Green",
    brewTime: 10800000
  }
];

const addTeaTypePayload = {
  id: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
  name: "Black",
  brewTime: 12360000
};

const editTeaTypePayload = {
  id: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
  name: "Green",
  brewTime: 12360000
};

const deleteTeaTypePayload = "69fb326d-b76a-4198-a4a1-eaf0785752c6";

const emptyState = { allTeaTypes: {}, teaTypeIDs: [] };

const teaTypeFixture = {
  basicTeaType,
  updatedTeaType,
  missingDataTeaType,
  reducerAddTeaType,
  reducerEditTeaType,
  teaTypePostResponse,
  teaTypePutResponse,
  teaTypeGetResponse,
  getTeaTypesPayload,
  addTeaTypePayload,
  editTeaTypePayload,
  deleteTeaTypePayload,
  emptyState
};

export default teaTypeFixture;
