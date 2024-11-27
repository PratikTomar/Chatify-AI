import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const ApplicationLoader = () => {
  return (

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <CircularProgress color="primary" size={88} />
    </Box>

  );
}

export default ApplicationLoader;