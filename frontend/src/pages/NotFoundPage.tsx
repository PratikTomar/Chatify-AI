import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "#121212",
        color: "white",
        textAlign: "center",
        p: 3,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: "#f44336", mb: 2 }} />
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Oops! The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{
          px: 4,
          py: 1,
          fontSize: "16px",
          bgcolor: "#1976d2",
          ":hover": { bgcolor: "#1565c0" },
        }}
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default NotFoundPage;
