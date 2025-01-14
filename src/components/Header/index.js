import { Typography, Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

// cookies library import
import { useCookies } from "react-cookie";

// api imports
import { isUserLoggedin, isAdmin } from "../../utils/api_auth";

// clear cart function import
import { clearCart } from "../../utils/api_cart";

export default function Header(props) {
  const handleLogout = () => {
    // clear the cookies
    removeCookie("currentUser");
    // clear the cart before logout
    clearCart();
    // redirect the user back to login page
    navigate("/login");
  };

  // cookies
  const [cookie, removeCookie] = useCookies(["currentUser"]);

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
        {isUserLoggedin(cookie) ? (
          <>
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
              variant={
                location.pathname === "/orders" ? "contained" : "outlined"
              }
              onClick={() => {
                navigate("/orders");
              }}
              sx={{ marginRight: "10px" }}
            >
              My Orders
            </Button>
          </>
        ) : null}

        {/* login, signup, logout buttons */}
        {isUserLoggedin(cookie) ? (
          <Button
            variant={location.pathname === "/login" ? "contained" : "outlined"}
            onClick={handleLogout}
            sx={{ marginRight: "10px" }}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              variant={
                location.pathname === "/login" ? "contained" : "outlined"
              }
              onClick={() => {
                navigate("/login");
              }}
              sx={{ marginRight: "10px" }}
            >
              Login
            </Button>
            <Button
              variant={
                location.pathname === "/signup" ? "contained" : "outlined"
              }
              onClick={() => {
                navigate("/signup");
              }}
              sx={{ marginRight: "10px" }}
            >
              Signup
            </Button>
          </>
        )}

        {/* category button */}
        {isAdmin(cookie) ? (
          <>
            <Button
              variant={
                location.pathname === "/categories" ? "contained" : "outlined"
              }
              onClick={() => {
                navigate("/categories");
              }}
            >
              Categories
            </Button>
          </>
        ) : null}
      </Box>
    </Box>
  );
}
