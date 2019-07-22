const loggedOutStore = {
  auth: {
    isAuthenticated: false,
    user: {},
    loading: false
  }
};

const loggedErrorStore = {
  auth: {
    isAuthenticated: false,
    user: {},
    loading: false,
    errors: { emailNotFound: "Email not found" }
  }
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
  }
};

const basicStore = {
  auth: {
    isAuthenticated: true,
    user: {
      id: "5c6313a4c318bb62298b23d4",
      name: "Jennifer",
      iat: 1560457432,
      exp: 1592014358
    },
    loading: false
  },
  errors: {},
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
      "dc8a7690-de4a-47e8-8225-5548c0f51669": {
        id: "dc8a7690-de4a-47e8-8225-5548c0f51669",
        name: "Lapsang Souchang",
        brand: "McNulty's",
        teaType: "Black",
        servings: 12
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
  },
  flash: "off"
};

const addedStore = {
  auth: {
    isAuthenticated: true,
    user: {
      id: "5c6313a4c318bb62298b23d4",
      name: "Jennifer",
      iat: 1560457432,
      exp: 1592014358
    },
    loading: false
  },
  errors: {},
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
      "dc8a7690-de4a-47e8-8225-5548c0f51669": {
        id: "dc8a7690-de4a-47e8-8225-5548c0f51669",
        name: "Lapsang Souchang",
        brand: "McNulty's",
        teaType: "Black",
        servings: 12
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
      "dc8a7690-de4a-47e8-8225-5548c0f51669",
      "1b1db861-0537-4b69-83d5-d9ee033530f8"
    ]
  },
  teaTypes: {
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
  },
  flash: "on"
};

const updatedStore = {
  auth: {
    isAuthenticated: true,
    user: {
      id: "5c6313a4c318bb62298b23d4",
      name: "Jennifer",
      iat: 1560457432,
      exp: 1592014358
    },
    loading: false
  },
  errors: {},
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
      "dc8a7690-de4a-47e8-8225-5548c0f51669": {
        id: "dc8a7690-de4a-47e8-8225-5548c0f51669",
        name: "Lapsang Souchang",
        brand: "McNulty's",
        teaType: "Black",
        servings: 12
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
  },
  flash: "off"
};

const deletedStore = {
  auth: {
    isAuthenticated: true,
    user: {
      id: "5c6313a4c318bb62298b23d4",
      name: "Jennifer",
      iat: 1560457432,
      exp: 1592014358
    },
    loading: false
  },
  errors: {},
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
      "dc8a7690-de4a-47e8-8225-5548c0f51669": {
        id: "dc8a7690-de4a-47e8-8225-5548c0f51669",
        name: "Lapsang Souchang",
        brand: "McNulty's",
        teaType: "Black",
        servings: 12
      }
    },
    teaIDs: [
      "25070e52-e635-4883-ae9b-583113573b9f",
      "044cf8ea-bc71-4d89-a2f6-fa499d43e20d"
    ]
  },
  teaTypes: {
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
  },
  flash: "off"
};

const storeFixture = {
  loggedOutStore,
  loggedErrorStore,
  loggedInStore,
  basicStore,
  addedStore,
  updatedStore,
  deletedStore
};

export default storeFixture;
