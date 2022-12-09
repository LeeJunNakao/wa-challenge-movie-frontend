import React from "react";
import PaginationMui from "@mui/material/Pagination";

type Props = {
  totalPage: number;
  currentPage: number;
  setPage: (page: number) => void;
};

const Pagination = (props: Props) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    props.setPage(value);
  };

  return (
    <PaginationMui
      variant="outlined"
      page={props.currentPage}
      count={props.totalPage}
      onChange={handleChange}
    />
  );
};

export default Pagination;
