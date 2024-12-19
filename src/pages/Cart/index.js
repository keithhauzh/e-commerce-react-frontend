import * as React from "react";

// MUI imports
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

// react-router-dom
import { useState } from "react";

// toaster imports
import { toast } from "sonner";

// component imports
import Header from "../../components/Header";

export default function Cart() {
  // states for cart
  const [list, setList] = useState([]);

  // getting data from local storage
  const stringProducts = localStorage.getItem("cart");
  let cart = JSON.parse(stringProducts);
  if (!cart) {
    cart = [];
  }

  // delete from localStorage item by id
  const cartDeleteHandler = async (id) => {
    const newCart = cart.filter((item) => {
      return id !== item._id;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    setList(newCart);
    toast.success("Product deleted from cart successfully");
  };

  // to find total prices
  // start from 0
  let totalPrices = 0;
  for (const product of cart) {
    totalPrices += product.price * product.quantity;
  }

  return (
    <>
      <Container>
        {/* Header section */}
        <Header />

        {/* Table */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">
                    {row.price * row.quantity}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      color="error"
                      onClick={() => {
                        cartDeleteHandler(row._id);
                      }}
                    >
                      remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {/* row where total price is displayed */}
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">{totalPrices}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
