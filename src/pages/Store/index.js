import * as React from "react";

import { useEffect, useState } from "react";

// component imports
import ProductGrid from "../../components/Card";
import { Typography, Divider, Button, Container, Box } from "@mui/material";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

import { getProducts } from "../../utils/api";
import { getCategories } from "../../utils/api";

export default function Store() {
  // states
  const [list, setList] = useState([]);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProducts(category).then((data) => {
      setList(data);
    });
  }, [category]); // only when page first loaded

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, [category]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  console.log(list);

  return (
    <Box>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Welcome to my Store!
          </Typography>
          <Divider sx={{ pt: 5, borderBottomWidth: 5 }}></Divider>
        </Box>
        <Box
          sx={{
            pt: 2,
            pb: 5,
          }}
        >
          <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5">Products</Typography>
            <Button variant="contained" color="success">
              Add New
            </Button>
          </Box>
          <Box>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="category"
                onChange={handleChange}
              >
                {categories.map((category) => {
                  return <MenuItem value={category}>{category}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <ProductGrid list={list} />
      </Container>
    </Box>
  );
}
