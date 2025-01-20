// react import
import React from "react";

// react-router imports
import { Link, useNavigate } from "react-router-dom";

// cookies import
import { useCookies } from "react-cookie";

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
  CardMedia,
} from "@mui/material";
import { red } from "@mui/material/colors";
import Grid from "@mui/material/Grid2";

// toast sonner
import { toast } from "sonner";

// API imports
import { deleteProduct, getProducts } from "../../utils/api_products";
import { isAdmin, isUserLoggedin, getUserToken } from "../../utils/api_auth";

// constants import
import { API_URL } from "../../constants";

export default function ProductGrid(props) {
  // useNavigate
  const navigate = useNavigate();

  // cookies
  const [cookie] = useCookies(["currentUser"]);
  const token = getUserToken(cookie);

  const { products, setProducts, category, page } = props;

  // Color for chip
  const redColor = red[700];

  // delete item handler (HANDLER)
  const handleDelete = async (id) => {
    console.log(id);
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      const deleted = await deleteProduct(id, token);
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
    if (isUserLoggedin(cookie)) {
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
    } else {
      navigate("/login");
      toast.info("Please login first");
    }
  };

  return (
    <Grid container spacing={2} sx={{ width: "100%" }}>
      {products.length > 0 ? (
        products.map((item) => (
          <Grid key={item._id} size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <Card
              variant="outlined"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
              }}
            >
              {item.image ? (
                <CardMedia
                  sx={{ objectFit: "cover", height: "70%" }}
                  component="img"
                  image={`${API_URL}/${item.image}`}
                />
              ) : (
                <CardMedia
                  sx={{
                    height: "70%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  No Image
                </CardMedia>
              )}
              <CardContent
                sx={{
                  height: "30%",
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
                    label={item.category ? item.category.name : null}
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
                {isUserLoggedin(cookie) ? (
                  <>
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
                  </>
                ) : null}

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    justifyContent: "space-between",
                    width: "100%",
                    mx: 1,
                    my: 2,
                  }}
                >
                  {isAdmin(cookie) ? (
                    <>
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
                    </>
                  ) : null}
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
