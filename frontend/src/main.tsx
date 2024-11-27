import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/context/context.tsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";

axios.defaults.baseURL = "https://chatify-ai-api.onrender.com/api/v1";
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: {
    fontFamily: "fira sans, serif",
    allVariants: { color: "white" },
  },
});

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Toaster position="top-center" />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>
);
