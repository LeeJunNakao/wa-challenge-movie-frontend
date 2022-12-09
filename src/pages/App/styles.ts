import styled from "styled-components";

export const Page = styled.div`
  width: 97vw;
  align-items: center;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
`;

export const PaginationWrapper = styled.div`
  margin: 20px 0;
`;
export const MoviesDisplay = styled.div`
  width: 100vw;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(auto-fill, 345px);
  column-gap: 20px;
  row-gap: 30px;
  justify-content: center;
`;
