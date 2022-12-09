import { Movie } from "../entities/Movie";
import { toCamelCaseObject } from "../utils/parse";
import { client } from "./client";

export type Pagination<M> = {
  meta: {
    currentPage: number;
    firstPage: number;
    firstPageUrl: string;
    lastPage: number;
    perPage: number;
    lastPageUrl: string;
    nextPageUrl: string;
  };
  data: M[];
};

export const getMovies = async (page: number = 1) => {
  const response = await client.get<Pagination<Movie>>("/movies", {
    params: {
      page,
    },
  });

  return toCamelCaseObject<Pagination<Movie>>(response.data);
};
