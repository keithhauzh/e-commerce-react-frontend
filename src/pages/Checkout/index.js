// API imports
import { getCart, getTotalCartPrices } from "../../utils/api_cart";
import { createOrder } from "../../utils/api_orders";

// sonner imports
import { toast } from "sonner";

// MUI imports
import {
  Container,
  Typography,
  TextField,
  Box,
  Button,
  Backdrop,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

// react imports
import { useState } from "react";

// component imports
import Header from "../../components/Header";

// validate email
import { validateEmail } from "../../utils/email";

export default function Checkout() {
  // state for loader
  const [loading, setLoading] = useState(false);

  //   states for input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // api functions' variable declarations to use in functions and handlers
  const cart = getCart();
  const totalPrices = getTotalCartPrices();

  // handler for the checkout button
  const doCheckout = async () => {
    // 1. make sure the name and email fields are filled
    if (name === "" || email === "") {
      toast.error("Please fill up all the fields");
    } else if (!validateEmail(email)) {
      // check if is a valid email
      toast.error("Please insert a valid email address");
    } else {
      // show loader
      setLoading(true);
      // 2. trigger the createOrder function
      const response = await createOrder(name, email, cart, totalPrices);
      // 3. get the billplz url
      const billplz_url = response.billplz_url;
      // 4. redirect the user to billplz payment page
      window.location.href = billplz_url;
    }
  };

  return (
    <Container>
      <Header title="Checkout" />
      <Grid container spacing={4} sx={{ width: "100%", display: "flex" }}>
        {/* Contact Information */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <Box elevation={3} sx={{ p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Contact Information
            </Typography>

            {/* input field */}
            <Box mb={2}>
              <TextField
                label="Name"
                required
                fullWidth
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Box>

            {/* Checkout Button */}
            <Box mb={2} sx={{ display: "flex" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ textTransform: "none", width: "100%" }}
                onClick={() => {
                  doCheckout();
                }}
              >
                Pay ${totalPrices} Now
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Order Summary */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom display>
              Your Order Summary
            </Typography>
            <Table>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ fontWeight: "bold" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Total:</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    ${getTotalCartPrices()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>

      {/* loading */}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
