const loggedOutStore = {
  auth: {
    isAuthenticated: false,
    user: {},
    loading: false
  },
  errors: { serverErrors: {} }
};

const loggedErrorStore = {
  auth: {
    isAuthenticated: false,
    user: {},
    loading: false
  },
  errors: { serverErrors: { emailNotFound: "Email not found" } }
};

const loggedInStore = {
  auth: {
    isAuthenticated: true,
    loading: false,
    user: {
      exp: 1589933753,
      iat: 1558376827,
      id: "5c63123a4c318b298b23d4",
      name: "Jennifer"
    }
  },
  errors: { serverErrors: "" }
};

const basicStore = {
  auth: {
    isAuthenticated: true,
    loading: false,
    user: {
      id: "5c63123a4c318b298b23d4",
      name: "Jennifer",
      iat: 1560457432,
      exp: 1592014358
    }
  },
  errors: { serverErrors: "" },
  teas: {
    allTeas: {
      "25070e52-e635-4883-ae9b-583113573b9f": {
        id: "25070e52-e635-4883-ae9b-583113573b9f",
        name: "Sleepytime",
        brand: "Celestial Seasonings",
        teaType: "5c63123a4c318b298b23d4",
        servings: 22,
        rating: "4"
      },
      "044cf8ea-bc71-4d89-a2f6-fa499d43e20d": {
        id: "044cf8ea-bc71-4d89-a2f6-fa499d43e20d",
        name: "Green Dragon",
        brand: "Celestial Seasonings",
        teaType: "5d48277169b3160191797d14",
        servings: 21,
        rating: "4"
      },
      "dc8a7690-de4a-47e8-8225-5548c0f51669": {
        id: "dc8a7690-de4a-47e8-8225-5548c0f51669",
        name: "Lapsang Souchang",
        brand: "McNulty's",
        teaType: "5d39dd1f0487d1116140bac1",
        servings: 12,
        rating: "4"
      }
    },
    teaIDs: [
      "25070e52-e635-4883-ae9b-583113573b9f",
      "044cf8ea-bc71-4d89-a2f6-fa499d43e20d",
      "dc8a7690-de4a-47e8-8225-5548c0f51669"
    ]
  },
  teaTypes: {
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
      "5c63123a4c318b298b23d4": {
        id: "5c63123a4c318b298b23d4",
        name: "Herbal",
        brewTime: 14400000
      }
    },
    teaTypeIDs: [
      "5d39dd1f0487d1116140bac1",
      "5d48277169b3160191797d14",
      "425ba4a6-fc19-4a53-813c-7957e72aa0ad",
      "5c63123a4c318b298b23d4"
    ]
  },
  flash: "off",
  modal: {
    modalID: "5d39dd1f0487d1116140bac1"
  }
};

const addedStore = {
  auth: {
    isAuthenticated: true,
    user: {
      id: "5c63123a4c318b298b23d4",
      name: "Jennifer",
      iat: 1560457432,
      exp: 1592014358
    },
    loading: false
  },
  errors: { serverErrors: "" },
  teas: {
    allTeas: {
      "25070e52-e635-4883-ae9b-583113573b9f": {
        id: "25070e52-e635-4883-ae9b-583113573b9f",
        name: "Sleepytime",
        brand: "Celestial Seasonings",
        teaType: "5c63123a4c318b298b23d4",
        servings: 22,
        rating: "4"
      },
      "044cf8ea-bc71-4d89-a2f6-fa499d43e20d": {
        id: "044cf8ea-bc71-4d89-a2f6-fa499d43e20d",
        name: "Green Dragon",
        brand: "Celestial Seasonings",
        teaType: "5d48277169b3160191797d14",
        servings: 21,
        rating: "4"
      },
      "dc8a7690-de4a-47e8-8225-5548c0f51669": {
        id: "dc8a7690-de4a-47e8-8225-5548c0f51669",
        name: "Lapsang Souchang",
        brand: "McNulty's",
        teaType: "5d39dd1f0487d1116140bac1",
        servings: 12,
        rating: "4"
      },
      "1b1db861-0537-4b69-83d5-d9ee033530f8": {
        id: "1b1db861-0537-4b69-83d5-d9ee033530f8",
        name: "Basic Tea",
        brand: "Lipton",
        teaType: "5d39dd1f0487d1116140bac1",
        servings: 12,
        rating: "4"
      }
    },
    teaIDs: [
      "25070e52-e635-4883-ae9b-583113573b9f",
      "044cf8ea-bc71-4d89-a2f6-fa499d43e20d",
      "dc8a7690-de4a-47e8-8225-5548c0f51669",
      "1b1db861-0537-4b69-83d5-d9ee033530f8"
    ],
    updatedTea: {
      brand: "Lipton",
      id: "1b1db861-0537-4b69-83d5-d9ee033530f8",
      name: "Basic Tea",
      servings: 12,
      rating: "4",
      teaType: "5d39dd1f0487d1116140bac1"
    }
  },
  teaTypes: {
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
      "5c63123a4c318b298b23d4": {
        id: "5c63123a4c318b298b23d4",
        name: "Herbal",
        brewTime: 14400000
      }
    },
    teaTypeIDs: [
      "5d39dd1f0487d1116140bac1",
      "5d48277169b3160191797d14",
      "425ba4a6-fc19-4a53-813c-7957e72aa0ad",
      "5c63123a4c318b298b23d4"
    ]
  },
  flash: "success"
};

const updatedStore = {
  auth: {
    isAuthenticated: true,
    user: {
      id: "5c63123a4c318b298b23d4",
      name: "Jennifer",
      iat: 1560457432,
      exp: 1592014358
    },
    loading: false
  },
  errors: { serverErrors: "" },
  teas: {
    allTeas: {
      "25070e52-e635-4883-ae9b-583113573b9f": {
        id: "25070e52-e635-4883-ae9b-583113573b9f",
        name: "Sleepytime",
        brand: "Celestial Seasonings",
        teaType: "5c63123a4c318b298b23d4",
        servings: 22,
        rating: "4"
      },
      "044cf8ea-bc71-4d89-a2f6-fa499d43e20d": {
        id: "044cf8ea-bc71-4d89-a2f6-fa499d43e20d",
        name: "Green Dragon",
        brand: "Celestial Seasonings",
        teaType: "5d48277169b3160191797d14",
        servings: 21,
        rating: "4"
      },
      "dc8a7690-de4a-47e8-8225-5548c0f51669": {
        id: "dc8a7690-de4a-47e8-8225-5548c0f51669",
        name: "Lapsang Souchang",
        brand: "McNulty's",
        teaType: "5d39dd1f0487d1116140bac1",
        servings: 12,
        rating: "4"
      }
    },
    teaIDs: [
      "25070e52-e635-4883-ae9b-583113573b9f",
      "044cf8ea-bc71-4d89-a2f6-fa499d43e20d",
      "dc8a7690-de4a-47e8-8225-5548c0f51669"
    ],
    updatedTea: {
      brand: "Celestial Seasonings",
      id: "25070e52-e635-4883-ae9b-583113573b9f",
      name: "Sleepytime",
      servings: 22,
      rating: "4",
      teaType: "5c63123a4c318b298b23d4"
    }
  },
  teaTypes: {
    allTeaTypes: {
      "5d39dd1f0487d1116140bac1": {
        id: "5d39dd1f0487d1116140bac1",
        name: "Green",
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
      "5c63123a4c318b298b23d4": {
        id: "5c63123a4c318b298b23d4",
        name: "Herbal",
        brewTime: 14400000
      }
    },
    teaTypeIDs: [
      "5d39dd1f0487d1116140bac1",
      "5d48277169b3160191797d14",
      "425ba4a6-fc19-4a53-813c-7957e72aa0ad",
      "5c63123a4c318b298b23d4"
    ]
  },
  flash: "off"
};

const deletedStore = {
  auth: {
    isAuthenticated: true,
    user: {
      id: "5c63123a4c318b298b23d4",
      name: "Jennifer",
      iat: 1560457432,
      exp: 1592014358
    },
    loading: false
  },
  errors: { serverErrors: "" },
  teas: {
    allTeas: {
      "25070e52-e635-4883-ae9b-583113573b9f": {
        id: "25070e52-e635-4883-ae9b-583113573b9f",
        name: "Sleepytime",
        brand: "Celestial Seasonings",
        teaType: "5c63123a4c318b298b23d4",
        servings: 22,
        rating: "4"
      },
      "044cf8ea-bc71-4d89-a2f6-fa499d43e20d": {
        id: "044cf8ea-bc71-4d89-a2f6-fa499d43e20d",
        name: "Green Dragon",
        brand: "Celestial Seasonings",
        teaType: "5d48277169b3160191797d14",
        servings: 21,
        rating: "4"
      },
      "dc8a7690-de4a-47e8-8225-5548c0f51669": {
        id: "dc8a7690-de4a-47e8-8225-5548c0f51669",
        name: "Lapsang Souchang",
        brand: "McNulty's",
        teaType: "5d39dd1f0487d1116140bac1",
        servings: 12,
        rating: "4"
      }
    },
    teaIDs: [
      "25070e52-e635-4883-ae9b-583113573b9f",
      "044cf8ea-bc71-4d89-a2f6-fa499d43e20d"
    ],
    updatedTea: "dc8a7690-de4a-47e8-8225-5548c0f51669"
  },
  teaTypes: {
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
      "5c63123a4c318b298b23d4": {
        id: "5c63123a4c318b298b23d4",
        name: "Herbal",
        brewTime: 14400000
      }
    },
    teaTypeIDs: [
      "5d39dd1f0487d1116140bac1",
      "425ba4a6-fc19-4a53-813c-7957e72aa0ad",
      "5c63123a4c318b298b23d4"
    ]
  },
  flash: "off"
};

const duplicateErrorStore = {
  auth: {
    isAuthenticated: true,
    loading: false,
    user: {
      id: "5c63123a4c318b298b23d4",
      name: "Jennifer",
      iat: 1560457432,
      exp: 1592014358
    }
  },
  teas: {
    allTeas: {
      "25070e52-e635-4883-ae9b-583113573b9f": {
        id: "25070e52-e635-4883-ae9b-583113573b9f",
        name: "Sleepytime",
        brand: "Celestial Seasonings",
        teaType: "5c63123a4c318b298b23d4",
        servings: 22,
        rating: "4"
      },
      "044cf8ea-bc71-4d89-a2f6-fa499d43e20d": {
        id: "044cf8ea-bc71-4d89-a2f6-fa499d43e20d",
        name: "Green Dragon",
        brand: "Celestial Seasonings",
        teaType: "5d48277169b3160191797d14",
        servings: 21,
        rating: "4"
      },
      "dc8a7690-de4a-47e8-8225-5548c0f51669": {
        id: "dc8a7690-de4a-47e8-8225-5548c0f51669",
        name: "Lapsang Souchang",
        brand: "McNulty's",
        teaType: "5d39dd1f0487d1116140bac1",
        servings: 12,
        rating: "4"
      }
    },
    teaIDs: [
      "25070e52-e635-4883-ae9b-583113573b9f",
      "044cf8ea-bc71-4d89-a2f6-fa499d43e20d",
      "dc8a7690-de4a-47e8-8225-5548c0f51669"
    ]
  },
  teaTypes: {
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
      "5c63123a4c318b298b23d4": {
        id: "5c63123a4c318b298b23d4",
        name: "Herbal",
        brewTime: 14400000
      }
    },
    teaTypeIDs: [
      "5d39dd1f0487d1116140bac1",
      "5d48277169b3160191797d14",
      "425ba4a6-fc19-4a53-813c-7957e72aa0ad",
      "5c63123a4c318b298b23d4"
    ]
  },
  flash: "off",
  errors: { serverErrors: { duplicate: "This tea type already exists" } }
};

const storeFixture = {
  loggedOutStore,
  loggedErrorStore,
  loggedInStore,
  basicStore,
  addedStore,
  updatedStore,
  deletedStore,
  duplicateErrorStore
};

export default storeFixture;
