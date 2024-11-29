import { AppBar, Box, Typography } from "@mui/material";
import { Toolbar } from "@mui/material";
import NavigationLink from "./NavigationLink";
import { useAuth } from "../context/context";
import { GiArtificialIntelligence } from "react-icons/gi";
import { Link } from "react-router-dom";

const Header = () => {
  const auth = useAuth();

  return (
    <AppBar
      position="static"
      sx={{
        color: "white",
        bgcolor: "#1976d2",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: { sm: "0", md: "0 20px" }
        }}
      >
        <Link to="/">
          {" "}
          <GiArtificialIntelligence size={"56px"} />
        </Link>

        <Link to="/">
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Chatify
          </Typography>
        </Link>

        <Box>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#3498db"
                to="/chat"
                text="Chat"
                textColor="white"
              />
              <NavigationLink
                bg="#d32f2f"
                textColor="white"
                to="/"
                text="Log Out"
                onClick={auth.logOff}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#f39c12"
                to="/login"
                text="Login"
                textColor="white"
              />
              <NavigationLink
                bg="#4caf50"
                textColor="white"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;