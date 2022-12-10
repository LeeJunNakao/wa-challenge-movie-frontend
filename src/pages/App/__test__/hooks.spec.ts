/**
 * @jest-environment jsdom
 */

import { renderHook } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import * as MovieService from "src/services/movie";
import { useMovies } from "../hooks";

import { createMoviePayload, generatePagination } from "./utils";

describe("Movies Hook", () => {
  test("Should not load more if try to set page bigger than last page value", async () => {
    const serviceSpy = jest.spyOn(MovieService, "getMovies");

    serviceSpy.mockImplementation(async () =>
      generatePagination({
        currentPage: 1,
        lastPage: 3,
        data: createMoviePayload(10),
      })
    );

    const { result } = renderHook(() => useMovies());

    expect(result.current.currentPage).toBe(1);

    await waitFor(async () => result.current.currentPageMovies);

    await waitFor(async () =>
      expect(result.current.currentPageMovies).toHaveLength(0)
    );

    await waitFor(async () => await result.current.getMovies());

    const payload2 = createMoviePayload(10);

    serviceSpy.mockImplementationOnce(async () =>
      generatePagination({
        currentPage: 1,
        lastPage: 5,
        data: payload2,
      })
    );

    await waitFor(async () => expect(result.current.lastPage).toEqual(3));

    await waitFor(async () =>
      expect(result.current.currentPageMovies).toHaveLength(10)
    );

    await waitFor(async () =>
      expect(result.current.paginatedMovies).toHaveLength(1)
    );

    await waitFor(async () => result.current.setPage(2));

    await waitFor(async () => expect(result.current.currentPage).toBe(2));

    await waitFor(async () =>
      expect(result.current.paginatedMovies).toHaveLength(2)
    );

    await waitFor(async () => result.current.setPage(3));

    await waitFor(async () => expect(result.current.currentPage).toBe(3));

    await waitFor(async () =>
      expect(result.current.paginatedMovies).toHaveLength(3)
    );

    await waitFor(async () => result.current.setPage(4));

    await waitFor(async () => expect(result.current.currentPage).toBe(4));

    await waitFor(async () =>
      expect(result.current.paginatedMovies).toHaveLength(3)
    );
  });
});
