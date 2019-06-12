import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Landing from "../";

afterEach(cleanup);

describe("Landing rendering", () => {
  test("Landing renders without error", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/landing"]}>
        <Landing />
      </MemoryRouter>
    );
    expect(getByTestId("landing")).toBeTruthy();
  });
});
