import { Box } from "@mui/material";
import Footer from "../components/footer/Footer";

import { Typography, Button, Grid, Paper } from "@mui/material";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BiCheckCircle } from "react-icons/bi";
import virtualAiAssistant from "../../public/Virtual-AI-assistant.png";
import { Link } from "react-router-dom";

const appFeatures = [
  {
    title: "AI-Powered Conversations",
    description:
      "Interact with an AI assistant that understands your queries and provides intelligent responses.",
  },
  {
    title: "Customizable Chat Experience",
    description:
      "Tailor the application to your needs with a user-friendly interface and flexible settings.",
  },
  {
    title: "Secure Authentication",
    description:
      "Your data is safe with us. Experience secure login and sign-up options.",
  },
  {
    title: "Seamless Integration",
    description:
      "Access your chats and settings on multiple devices with seamless synchronization.",
  },
];

const Home = () => {
  return (
    <Box
      width="100%"
      minHeight="100vh"
      bgcolor="#f5f7fa"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        width="90%"
        maxWidth="1200px"
        paddingY={6}
        textAlign={{ xs: "center", md: "left" }}
      >
        <Box flex={1} mb={{ xs: 4, md: 0 }}>
          <Typography
            variant="h3"
            fontWeight="700"
            color="#1976d2"
            gutterBottom
          >
            Chatify - Your Personal AI Assistant
          </Typography>
          <Typography variant="h6" color="textSecondary" mb={4}>
            Experience the power of AI with our cutting-edge application. Chat,
            learn, and explore new possibilities with ease!
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#1976d2",
              color: "#fff",
              ":hover": { bgcolor: "#115293" },
              textTransform: "capitalize",
              px: 4,
              py: 1.5,
            }}
            startIcon={<IoChatbubbleEllipsesOutline />}
          >
            <Link to="/signup">Get Started</Link>
          </Button>
        </Box>
        <Box flex={1}>
          <Link to="/signup">
            <img
              src={virtualAiAssistant}
              alt="AI Assistant"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Link>
        </Box>
      </Box>

      <Box
        width="90%"
        maxWidth="1200px"
        marginTop={6}
        paddingY={4}
        textAlign="center"
      >
        <Typography variant="h4" fontWeight="600" color="#1976d2" gutterBottom>
          Key Features
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={6}>
          Explore what makes this application unique and powerful.
        </Typography>
        <Grid container spacing={4}>
          {appFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={6}
                sx={{
                  padding: 3,
                  borderRadius: 3,
                  textAlign: "center",
                  bgcolor: "#fff",
                  minHeight: "200px",
                }}
              >
                <BiCheckCircle
                  size={40}
                  color="#1976d2"
                  style={{ marginBottom: "10px" }}
                />
                <Typography variant="h6" fontWeight="600" color="#1976d2">
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  mt={1}
                  lineHeight={1.6}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;
