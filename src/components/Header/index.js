import { Typography, Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { title = "Welcome To My Store" } = props;
  return (
    <Box
      sx={{
        padding: "40px 0 30px 0",
        marginBottom: "30px",
        borderBottom: "1px solid #000",
      }}
    >
      <Typography
        variant="h1"
        align="center"
        sx={{
          fontSize: "36px",
          fontWeight: "bold",
        }}
        mt={3}
      >
        {title}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }} mt={2}>
        <Button
          variant={location.pathname === "/" ? "contained" : "outlined"}
          onClick={() => {
            navigate("/");
          }}
          sx={{ marginRight: "10px" }}
        >
          Home
        </Button>
        <Button
          variant={location.pathname === "/cart" ? "contained" : "outlined"}
          onClick={() => {
            navigate("/cart");
          }}
          sx={{ marginRight: "10px" }}
        >
          Cart
        </Button>
        <Button
          variant={location.pathname === "/orders" ? "contained" : "outlined"}
          onClick={() => {
            navigate("/orders");
          }}
          sx={{ marginRight: "10px" }}
        >
          My Orders
        </Button>
        <Button
          variant={location.pathname === "/login" ? "contained" : "outlined"}
          onClick={() => {
            navigate("/login");
          }}
          sx={{ marginRight: "10px" }}
        >
          Login
        </Button>
        <Button
          variant={location.pathname === "/signup" ? "contained" : "outlined"}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Signup
        </Button>
      </Box>
    </Box>
  );
}
