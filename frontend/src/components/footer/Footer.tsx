import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      width="100%"
      bgcolor="#1976d2"
      paddingY={3}
      textAlign="center"
      mt={6}
      color="#fff"
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Chatify - Your Personal AI Assistant. All
        Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
