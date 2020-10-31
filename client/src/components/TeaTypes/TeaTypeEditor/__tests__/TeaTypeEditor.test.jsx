import React from "react";
import "jest-dom/extend-expect";
import { fireEvent } from "@testing-library/react";
import { renderWithRedux } from "../../../../test/routerTestUtils";
import dataFixture from "../../../../test/__fixtures__/dataFixture";
import storeFixture from "../../../../test/__fixtures__/storeFixture";
import teaTypeFixture from "../../../../test/__fixtures__/teaTypeFixture";
import TeaTypeEditor from "../TeaTypeEditor";

let mockDefaultProps;

beforeEach(() => {
  mockDefaultProps = {
    userID: dataFixture.mockUserID,
    teaTypes: teaTypeFixture.teaTypes,
    teaTypeID: teaTypeFixture.basicTeaType.id
  };
});

describe("teaTypeEditor form success", () => {
  test("editor form submits succesfully", async () => {
    const { getByTestId, queryByText } = renderWithRedux(
      <TeaTypeEditor {...mockDefaultProps} />,
      storeFixture.basicStore
    );

    await Promise.resolve();

    fireEvent.change(getByTestId("name"), {
      target: { value: teaTypeFixture.basicTeaTypeFormValues.name }
    });
    fireEvent.change(getByTestId("brewtimemin"), {
      target: { value: teaTypeFixture.basicTeaTypeFormValues.brewTimeMin }
    });
    fireEvent.change(getByTestId("brewtimesec"), {
      target: { value: teaTypeFixture.basicTeaTypeFormValues.brewTimeSec }
    });
    expect(getByTestId("teatypeeditorform")).toHaveFormValues({
      name: teaTypeFixture.basicTeaTypeFormValues.name,
      brewTimeMin: teaTypeFixture.basicTeaTypeFormValues.brewTimeMin,
      brewTimeSec: teaTypeFixture.basicTeaTypeFormValues.brewTimeSec
    });

    fireEvent.click(getByTestId("submit"));

    expect(queryByText("Please enter a tea type name")).toBeFalsy();
    expect(queryByText("Please enter a tea brew time")).toBeFalsy();
  });

  test("editor form succesfully updates tea type", async () => {
    const { getByTestId, queryByText } = renderWithRedux(
      <TeaTypeEditor {...mockDefaultProps} />,
      storeFixture.basicStore
    );
    await Promise.resolve();

    fireEvent.change(getByTestId("name"), {
      target: { value: teaTypeFixture.updatedTeaTypeFormValues.name }
    });

    expect(getByTestId("teatypeeditorform")).toHaveFormValues({
      name: teaTypeFixture.updatedTeaType.name
    });

    fireEvent.click(getByTestId("submit"));
    expect(queryByText("Please enter a tea type name")).toBeFalsy();
    expect(queryByText("Please enter a tea brew time")).toBeFalsy();
  });
});

describe("teaTypeEditor form failure", () => {
  describe("editor onSubmit returns an error message if data is invalid", () => {
    test("missing information for new tea type", async () => {
      const { getByTestId, queryByTestId, queryAllByTestId } = renderWithRedux(
        <TeaTypeEditor {...mockDefaultProps} />,
        storeFixture.basicStore
      );
      await Promise.resolve();

      expect(queryByTestId("duplicatenotice")).toBeFalsy();

      fireEvent.click(getByTestId("submit"));
      expect(queryByTestId("incompletenotice")).toBeTruthy();
      expect(queryAllByTestId("inputerror").length).toEqual(2);
    });

    test("missing information for existing tea type", async () => {
      const { getByTestId, queryByTestId, queryAllByTestId } = renderWithRedux(
        <TeaTypeEditor {...mockDefaultProps} />,
        storeFixture.basicStore
      );
      await Promise.resolve();

      expect(queryByTestId("duplicatenotice")).toBeFalsy();

      fireEvent.click(getByTestId("submit"));
      expect(queryByTestId("incompletenotice")).toBeTruthy();
      expect(queryAllByTestId("inputerror").length).toEqual(1);
    });

    test("duplicate tea type", async () => {
      const { queryByTestId } = renderWithRedux(
        <TeaTypeEditor {...mockDefaultProps} />,
        storeFixture.duplicateErrorStore
      );
      await Promise.resolve();

      expect(queryByTestId("duplicatenotice")).toBeTruthy();
    });
  });
});
