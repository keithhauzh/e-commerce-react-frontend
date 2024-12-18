// React imports
import { useState } from "react";

// react-router imports
import { useNavigate } from "react-router-dom";

// toaster sonner
import { toast } from "sonner";

// MUI imports
import {
  Box,
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";

// component imports
import Header from "../../components/Header";

// API imports
import { addNewProduct } from "../../utils/api_products";

export default function ProductAddNew() {
  const navigate = useNavigate();
  // states for input fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  // button handler for the fields
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for error
    if (!name || !price || !category) {
      toast.error("Please fill out all the required fields");
    }

    // trigger the add new product API
    const newProductData = await addNewProduct(
      name,
      description,
      price,
      category
    );

    if (newProductData) {
      // show success message
      toast.success("Product has been added succesffuly");
      // redirect to home page
      navigate("/");
    }
  };

  return (
    <Container>
      <Header />
      <Card>
        <CardContent>
          <Typography variant="h4" align="center">
            Add New Product
          </Typography>
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
              label="Description"
              fullWidth
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="number"
              label="Price"
              required
              fullWidth
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Category"
              required
              fullWidth
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
