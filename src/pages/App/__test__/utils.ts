import { faker } from "@faker-js/faker";
import { Movie } from "src/entities/Movie";
import * as MovieService from "src/services/movie";

export const createMoviePayload = (quantity: number) => {
  const arr = Array.from(new Array(quantity).keys());
  const movies = arr.map(() => ({
    id: faker.datatype.number({ min: 1, max: 1000 }),
    externalId: faker.database.mongodbObjectId(),
    title: faker.name.fullName(),
    description: faker.lorem.text(),
    director: faker.name.fullName(),
    producer: faker.name.fullName(),
    banner: faker.internet.domainName(),
    releaseDate: faker.datatype.number({ min: 1960, max: 2020 }),
    score: faker.datatype.number({ min: 70, max: 100 }),
  }));
  return movies;
};

export const generatePagination = ({
  currentPage,
  lastPage,
  data,
}: {
  currentPage: number;
  lastPage: number;
  data: Movie[];
}) => {
  const pagination: MovieService.Pagination<Movie> = {
    meta: {
      currentPage,
      lastPage,
      firstPage: 0,
      firstPageUrl: "",
      perPage: 10,
      lastPageUrl: "",
      nextPageUrl: "",
    },
    data,
  };

  return pagination;
};
