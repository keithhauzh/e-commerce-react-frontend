// mui imports
import { Container } from "@mui/material";
import { Paper } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from "@mui/material";
import { Button } from "@mui/material";

// toast imports
import { toast } from "sonner";

// component imports
import Header from "../../components/Header";

// api imports
import { getOrders, updateOrder, deleteOrder } from "../../utils/api_orders";

// react imports
import { useEffect, useState } from "react";
import * as React from "react";

// react-router-imports
import { useNavigate } from "react-router-dom";

export default function Orders() {
  // calling useNavigate inside of a variable
  const navigate = useNavigate();

  // initialize states
  const [orders, setOrders] = useState([]);

  // then is needed because function needs to wait for the data to come back and only then set the state
  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
      console.log(orders);
    });
  }, []);

  // onChange for select
  const onChangeHandler = async (event, orderId) => {
    // convert to lowercase because status is lowercase in database
    let value = event.target.value.toLowerCase();

    // trigger api
    const updatedOrder = await updateOrder(orderId, value);

    if (updatedOrder) {
      const latestOrders = await getOrders();
      setOrders(latestOrders);
      toast.success("Order status has been updated successfully");
      navigate("/orders");
    }
  };

  // handleDelete for deleting Order
  const handleDelete = async (id) => {
    console.log(id);
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      const deleted = await deleteOrder(id);
      if (deleted) {
        // get the latest products data from the API again so that it shows on frontend side
        const latestOrders = await getOrders();
        setOrders(latestOrders);
        toast.success("Order deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    }
  };

  return (
    <>
      <Container>
        <Header title="My Orders" />

        {/* table for displaying orders */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell align="left">Products</TableCell>
                <TableCell align="right">Total Amount</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Payment Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {order.customerName}
                  </TableCell>
                  <TableCell align="left">
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      sx={{ flexDirection: "column" }}
                    >
                      {order.products.map((product) => (
                        <Grid>{product.name}</Grid>
                      ))}
                    </Grid>
                  </TableCell>
                  <TableCell align="right">{order.totalPrices}</TableCell>
                  <TableCell align="left">
                    <FormControl fullWidth>
                      {order.status !== "pending" ? (
                        <>
                          <InputLabel id="demo-simple-select-label">
                            Status
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={order.status}
                            label="Status"
                            onChange={(event) =>
                              onChangeHandler(event, order._id)
                            }
                          >
                            <MenuItem value="failed">Failed</MenuItem>
                            <MenuItem value="paid">Paid</MenuItem>
                            {order.status === "paid" || "failed" ? (
                              <MenuItem disabled value="pending">
                                Pending
                              </MenuItem>
                            ) : (
                              <MenuItem value="pending">Pending</MenuItem>
                            )}
                          </Select>
                        </>
                      ) : (
                        <TextField
                          id="outlined-basic"
                          label="Pending"
                          variant="outlined"
                          disabled
                        >
                          Pending
                        </TextField>
                      )}
                    </FormControl>
                  </TableCell>
                  <TableCell align="right">
                    {order.paid_at
                      ? order.paid_at
                      : "Owed RM" + order.totalPrices}
                  </TableCell>
                  {order.status === "pending" ? (
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          handleDelete(order._id);
                        }}
                        color="warning"
                        variant="outlined"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  ) : null}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
