import { useState } from "react";
import { SnackbarContext } from "../Context/SnackbarContext";
import CustomSnackbar from "../Components/CustomSnackbar";

const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      <CustomSnackbar
        open={snackbar.open}
        handleClose={handleClose}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;