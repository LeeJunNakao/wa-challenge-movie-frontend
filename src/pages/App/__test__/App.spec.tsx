/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import * as MovieService from "src/services/movie";
import { createMoviePayload, generatePagination } from "./utils";
import App from "..";

describe("Movies Hook", () => {
  test("Render no items message if no items is loaded", async () => {
    const serviceSpy = jest.spyOn(MovieService, "getMovies");

    serviceSpy.mockImplementation(async () =>
      generatePagination({
        currentPage: 1,
        lastPage: 1,
        data: [],
      })
    );

    render(<App />);

    const loadingIcon = await screen.findByTestId("loading-icon");

    expect(loadingIcon).toBeInTheDocument();

    const noItemMessage = await waitFor(async () =>
      screen.findByText(/No items/i)
    );

    expect(noItemMessage).toBeInTheDocument();
  });

  test("Render movie cards after movies data is loaded", async () => {
    const serviceSpy = jest.spyOn(MovieService, "getMovies");

    serviceSpy.mockImplementation(async () =>
      generatePagination({
        currentPage: 1,
        lastPage: 1,
        data: createMoviePayload(10),
      })
    );

    render(<App />);

    const loadingIcon = await screen.findByTestId("loading-icon");

    expect(loadingIcon).toBeInTheDocument();

    const cards = await waitFor(async () =>
      screen.findAllByTestId("movie-card")
    );

    expect(cards).toHaveLength(10);
  });
});
