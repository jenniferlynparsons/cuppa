// Component mock data
const basicTeaTypeFormValues = {
  id: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
  name: "Black",
  brewTimeMin: 3,
  brewTimeSec: 30
};

const basicTeaType = {
  id: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
  name: "Black",
  brewTime: 12360000
};

const updatedTeaTypeFormValues = {
  id: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
  name: "Green",
  brewTimeMin: 3,
  brewTimeSec: 30
};

const updatedTeaType = {
  id: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
  name: "Green",
  brewTime: 12360000
};

const missingDataTeaTypeFormValues = {
  id: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
  name: "",
  brewTimeMin: 3,
  brewTimeSec: 30
};

const missingDataTeaType = {
  id: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
  name: "",
  brewTime: 12360000
};

const teaTypes = {
  allTeaTypes: {
    "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe": {
      id: "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
      name: "Black",
      brewTime: 12360000
    },
    "69fb326d-b76a-4198-a4a1-eaf0785752c6": {
      id: "69fb326d-b76a-4198-a4a1-eaf0785752c6",
      name: "Green",
      brewTime: 10800000
    },
    "425ba4a6-fc19-4a53-813c-7957e72aa0ad": {
      id: "425ba4a6-fc19-4a53-813c-7957e72aa0ad",
      name: "White",
      brewTime: 7800000
    },
    "8a4c0f27-3778-49b3-9d46-a272e372da2e": {
      id: "8a4c0f27-3778-49b3-9d46-a272e372da2e",
      name: "Herbal",
      brewTime: 14400000
    }
  },
  teaTypeIDs: [
    "9d6ed94b-d7b1-4ff9-912e-6bcef4d2eafe",
    "69fb326d-b76a-4198-a4a1-eaf0785752c6",
    "425ba4a6-fc19-4a53-813c-7957e72aa0ad",
    "8a4c0f27-3778-49b3-9d46-a272e372da2e"
  ]
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
  },
  {
    id: "425ba4a6-fc19-4a53-813c-7957e72aa0ad",
    name: "White",
    brewTime: 7800000
  },
  {
    id: "8a4c0f27-3778-49b3-9d46-a272e372da2e",
    name: "Herbal",
    brewTime: 14400000
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
  basicTeaTypeFormValues,
  basicTeaType,
  updatedTeaTypeFormValues,
  updatedTeaType,
  missingDataTeaTypeFormValues,
  missingDataTeaType,
  teaTypes,
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
