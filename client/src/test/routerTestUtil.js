import React from "react";
import { Router } from "react-router-dom";
import { render, wait } from "@testing-library/react";
import { createMemoryHistory } from "history";

function renderWithRouter(ui, { route = "/", ...renderOptions } = {}) {
  const history = createMemoryHistory({ initialEntries: [route] });
  const utils = render(<Router history={history}>{ui}</Router>, renderOptions);
  const finishLoading = () =>
    wait(() => expect(utils.queryByText("Loading")).toBeNull());
  return {
    ...utils,
    finishLoading,
    history,
    rerender: (ui, options) =>
      renderWithRouter(ui, { container: utils.container, ...options })
  };
}

export { renderWithRouter };
