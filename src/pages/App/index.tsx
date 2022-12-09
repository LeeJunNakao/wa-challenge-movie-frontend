import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "src/components/Card";
import Pagination from "src/components/Pagination";
import { useMovies } from "./hooks";

import * as S from "./styles";

function App() {
  const {
    getMovies,
    currentPageMovies,
    setPage,
    currentPage,
    lastPage,
    loading,
  } = useMovies();

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <S.Page>
      <Typography variant="h2" sx={{ display: "flex", alignItems: "center" }}>
        W.A.{" "}
        <img
          height={80}
          src="http://stitchplease.weebly.com/uploads/3/8/4/4/3844953/6561830.jpg?420"
          alt="W.A. Moves - Studio Ghibli"
        ></img>{" "}
        Movies
      </Typography>

      <S.PaginationWrapper>
        <Pagination
          currentPage={currentPage}
          setPage={setPage}
          totalPage={lastPage}
        />
      </S.PaginationWrapper>
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <S.MoviesDisplay>
          {currentPageMovies.map((m) => (
            <Card key={m.externalId} image={m.banner} {...m} />
          ))}
        </S.MoviesDisplay>
      )}

      <S.PaginationWrapper>
        <Pagination
          currentPage={currentPage}
          setPage={setPage}
          totalPage={lastPage}
        />
      </S.PaginationWrapper>
    </S.Page>
  );
}

export default App;
