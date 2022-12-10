import styled from "styled-components";

import CardContent from "@mui/material/CardContent";

export const Description = styled(CardContent)`
  height: 150px;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 20px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
