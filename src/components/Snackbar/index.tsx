import React from "react";
import SnackbarMui from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

type Props = {
  show: boolean;
  handleClose: () => void;
  message: string;
  severity: "success" | "warning" | "info" | "error";
};

const Snackbar = (props: Props) => {
  return (
    <SnackbarMui
      open={props.show}
      autoHideDuration={6000}
      onClose={props.handleClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={props.handleClose}
        severity={props.severity}
        sx={{ width: "100%" }}
      >
        {props.message}
      </MuiAlert>
    </SnackbarMui>
  );
};

export default Snackbar;
