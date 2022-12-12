/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    serviceSpy.mockImplementation(async (args) => {
      return generatePagination({
        currentPage: 1,
        lastPage: 1,
        data: createMoviePayload(10),
      });
    });

    render(<App />);

    const loadingIcon = await screen.findByTestId("loading-icon");

    expect(loadingIcon).toBeInTheDocument();

    const cards = await waitFor(async () =>
      screen.findAllByTestId("movie-card")
    );

    expect(cards).toHaveLength(10);
  });

  test("Render movies of next page", async () => {
    const serviceSpy = jest.spyOn(MovieService, "getMovies");

    const pagesData = [
      createMoviePayload(10),
      createMoviePayload(10),
      createMoviePayload(5),
    ];

    serviceSpy.mockImplementation(async (page) => {
      const data = page ? page - 1 : 0;

      return generatePagination({
        currentPage: page || 1,
        lastPage: 3,
        data: pagesData[data],
      });
    });

    render(<App />);

    const cards = await waitFor(async () =>
      screen.findAllByTestId("movie-card")
    );

    expect(cards).toHaveLength(10);

    const [firstPageButton] = screen.getAllByLabelText("page 1", {
      selector: "button",
    });
    const [secondPageButon] = screen.getAllByLabelText(/.page 2/, {
      selector: "button",
    });
    const [thirdPageButon] = screen.getAllByLabelText(/.page 3/, {
      selector: "button",
    });

    const firstPageCards = await waitFor(async () =>
      screen.findAllByTestId("movie-card")
    );

    expect(firstPageButton).toBeInTheDocument();
    expect(secondPageButon).toBeInTheDocument();
    expect(thirdPageButon).toBeInTheDocument();

    await userEvent.click(secondPageButon);

    const secondPageCards = await waitFor(async () =>
      screen.findAllByTestId("movie-card")
    );

    expect(secondPageCards).toHaveLength(10);
    expect(firstPageCards).not.toEqual(secondPageCards);

    await userEvent.click(thirdPageButon);

    const thirdPageCards = await waitFor(async () =>
      screen.findAllByTestId("movie-card")
    );

    expect(thirdPageCards).toHaveLength(5);
  });
});
