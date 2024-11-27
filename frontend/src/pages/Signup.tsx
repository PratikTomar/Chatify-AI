import { Box, Button, Typography, Paper } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { IoIosLogIn } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useAuth } from "../components/context/context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isValidEmail, isValidPassword } from "../utils/utils";

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name) {
      toast.error("Name cannot be empty");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!isValidPassword(password)) {
      toast.error("Password must contain max 12 characters, 1 uppercase, 1 lowercase, 1 special character");
      return;
    }


    try {
      toast.loading("Signing up...", { id: "signup" });
      const data: any = await auth?.signUp(name, email, password);
      toast.success(data.message, { id: "signup" });
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message, { id: "signup" });
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
          Signup
        </Typography>
        <form onSubmit={handleSubmit}>
          <CustomizedInput type="text" name="name" label="Name" />
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
            Signup
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;
