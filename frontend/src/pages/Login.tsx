import { Box, Button, Typography, Paper } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { IoIosLogIn } from "react-icons/io";
import { useAuth } from "../components/context/context";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../utils/utils";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!isValidEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!isValidPassword(password)) {
      toast.error(
        "Password must contain max 12 characters, 1 uppercase, 1 lowercase, 1 special character"
      );
      return;
    }

    try {
      toast.loading("Signing in...", { id: "login" });
      const data: any = await auth?.login(email, password);
      console.log(data);

      toast.success(data.message, { id: "login" });
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message, {
        id: "login",
      });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      navigate("/chat");
    }
  }, [auth]);

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f5f7fa"
    >
      <Paper
        elevation={8}
        sx={{
          width: { xs: "90%", sm: "400px" },
          padding: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="600" color="#1976d2" mb={2}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <CustomizedInput type="email" name="email" label="Email" />
          <CustomizedInput type="password" name="password" label="Password" />
          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: "#1976d2",
              color: "#fff",
              ":hover": { bgcolor: "#115293" },
              textTransform: "capitalize",
            }}
            variant="contained"
            endIcon={<IoIosLogIn />}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
