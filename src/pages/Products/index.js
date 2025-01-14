import * as React from "react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// component imports
import ProductGrid from "../../components/ProductGrid";
import Header from "../../components/Header";

// cookies import
import { useCookies } from "react-cookie";

// mui imports
import { Typography, Button, Container, Box } from "@mui/material";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { ArrowRight, ArrowLeft } from "@mui/icons-material";

// api imports
import { getProducts } from "../../utils/api_products";
import { getCategories } from "../../utils/api_categories";
import { isAdmin } from "../../utils/api_auth";

export default function Product() {
  // states
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  // variable for the cookie
  const [cookie] = useCookies(["currentUser"]);

  useEffect(() => {
    getProducts(category, page).then((data) => {
      setProducts(data);
    });
  }, [category, page]); // only when page first loaded

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, [category]);

  return (
    <Box>
      <Container>
        {/* Header Component */}
        <Header title="Welcome to my Store" />

        {/* Main */}
        <Box
          sx={{
            pt: 2,
            pb: 5,
          }}
        >
          <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5">Products</Typography>
            {isAdmin(cookie) ? (
              <Button
                LinkComponent={Link}
                to="/products/new"
                variant="contained"
                color="success"
              >
                Add New
              </Button>
            ) : null}
          </Box>
          <Box>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="category"
                onChange={(event) => {
                  setCategory(event.target.value);
                  setPage(1);
                }}
              >
                <MenuItem value="all">All</MenuItem>;
                {categories.map((category) => {
                  return (
                    <MenuItem value={category._id}>{category.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Box>
        {/* Card */}
        <ProductGrid
          products={products}
          setProducts={setProducts}
          category={category}
          page={page}
        />

        {/* pagination section */}
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            padding: "20px 0 40px 0",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            disabled={page === 1 ? true : false}
            onClick={() => setPage(page - 1)}
          >
            <ArrowLeft />
            Prev
          </Button>
          <span>Page {page}</span>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setPage(page + 1)}
          >
            Next
            <ArrowRight />
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
