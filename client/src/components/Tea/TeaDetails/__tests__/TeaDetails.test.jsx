import React from "react";
import { shallow } from "enzyme";
import { TeaDetails } from "../TeaDetails";

const sampleStore = {
  teas: [
    {
      flash: { name: "", id: "" },
      touched: { name: false, servings: false },
      id: "7c596196-8f8a-4649-9df6-35054928489f",
      name: "Sleepytime",
      brand: "Celestial Seasonings",
      teaType: "Herbal",
      servings: "2",
      edit: false
    },
    {
      flash: { name: "", id: "" },
      touched: { name: false, servings: false },
      id: "5d7eab7e-6c3a-453d-9794-848b97c93330",
      name: "Lapsang Souchang",
      brand: "McNulty's",
      teaType: "Black",
      servings: "8",
      edit: false
    }
  ],
  tea: {
    flash: { name: "", id: "" },
    touched: { name: false, servings: false },
    id: "5d7eab7e-6c3a-453d-9794-848b97c93330",
    name: "Lapsang Souchang",
    brand: "McNulty's",
    teaType: "Black",
    servings: "8",
    edit: false
  },
  teaTypes: ["Black", "Green", "White", "Herbal"]
};

describe("tea details", () => {
  it("set sample state", () => {
    const wrap = shallow(<TeaDetails {...sampleStore} />);
    // console.log(wrap.debug());
  });
});
