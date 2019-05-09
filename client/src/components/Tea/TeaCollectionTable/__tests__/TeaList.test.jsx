import React from "react";
import { shallow } from "enzyme";
import { TeaCollectionTable } from "../TeaCollectionTable";

function setup() {
  const props = {
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
    teaTypes: ["Black", "Green", "White", "Herbal"],
    handleDelete: jest.fn()
  };

  const mockDeleteClick = jest.fn();
  const enzymeWrapper = shallow(
    <TeaCollectionTable {...props} handleDeleteClick={mockDeleteClick} />
  );

  return {
    props,
    enzymeWrapper,
    mockDeleteClick
  };
}

describe("components", () => {
  describe("TeaCollectionTable", () => {
    it("should render self", () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find("table").hasClass("table")).toBe(true);
    });

    it("should call handleDelete if delete is clicked", () => {
      const { enzymeWrapper } = setup();
      const input = enzymeWrapper.find("button").first();
      // console.log(enzymeWrapper);
      expect(input.length).toBe(1);
      input.simulate("click");
      expect(enzymeWrapper.handleDeleteClick).toHaveBeenCalled();
    });
  });
});
