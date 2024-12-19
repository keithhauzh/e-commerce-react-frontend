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
} from "@mui/material";

// component imports
import Header from "../../components/Header";

export default function Cart() {
  // getting data from local storage
  const stringProducts = localStorage.getItem("cart");
  let cart = JSON.parse(stringProducts);
  if (!cart) {
    cart = [];
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
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}