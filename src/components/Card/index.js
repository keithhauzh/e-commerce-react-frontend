import React from "react";

// react-router imports
import { Link } from "react-router-dom";

// MUI imports
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Stack,
  Chip,
} from "@mui/material";
import { red } from "@mui/material/colors";
import Grid from "@mui/material/Grid2";

// toast sonner
import { toast } from "sonner";

// API imports
import { deleteProduct, getProducts } from "../../utils/api_products";

export default function ProductGrid(props) {
  const { products, setProducts, category, page } = props;

  // Color for chip
  const redColor = red[700];

  const cardHeight = 250;

  // delete item handler (HANDLER)
  const handleDelete = async (id) => {
    console.log(id);
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      const deleted = await deleteProduct(id);
      if (deleted) {
        // get the latest products data from the API again so that it shows on frontend side
        const latestProducts = await getProducts(category, page);
        setProducts(latestProducts);
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    }
  };

  // add item to local storage (HANDLER)
  const addToCartHandler = async (item) => {
    const stringProducts = localStorage.getItem("cart");
    let cart = JSON.parse(stringProducts);
    if (!cart) {
      // if cart is inoccupied, set cart to empty array
      cart = [];
    }

    const duplicateProduct = cart.find((product) => {
      return item._id === product._id;
    });

    if (duplicateProduct) {
      duplicateProduct.quantity += 1;
    } else {
      cart.push({
        _id: item._id,
        name: item.name,
        price: item.price,
        description: item.description,
        category: item.category,
        quantity: 1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Product added to cart successfully!");
  };

  return (
    <Grid container spacing={2} sx={{ width: "100%" }}>
      {products.length > 0 ? (
        products.map((item) => (
          <Grid key={item._id} size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <Card
              variant="outlined"
              sx={{
                height: cardHeight,
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <CardContent
                sx={{
                  height: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {item.name}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ justifyContent: "space-between" }}
                  mt={1}
                >
                  <Chip label={`$${item.price}`} color="success" />
                  <Chip
                    label={item.category}
                    sx={{ backgroundColor: redColor, color: "white" }}
                  />
                </Stack>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "50%",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "white",
                    fontWeight: "bold",
                  }}
                >
                  <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                    onClick={() => addToCartHandler(item)}
                  >
                    Add to Cart
                  </Button>
                </Box>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    justifyContent: "space-between",
                    width: "100%",
                    mx: 1,
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ textTransform: "none", marginRight: "8px" }}
                    LinkComponent={Link}
                    to={`/products/` + item._id + `/edit`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{ textTransform: "none" }}
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardActions>  
            </Card>
          </Grid>
        ))
      ) : (
        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="body1" align="center">
                No product found.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}
