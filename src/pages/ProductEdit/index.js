// component imports
import Header from "../../components/Header";

// MUI imports
import {
  Box,
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Backdrop,
  CircularProgress,
} from "@mui/material";

// react imports
import { useState, useEffect } from "react";

// toast sonner imports
import { toast } from "sonner";

// react-router-imports
import { useParams, useNavigate } from "react-router-dom";

// API imports
import { editProduct, getProduct } from "../../utils/api_products";

export default function ProductEdit() {
  // calling useNavigate inside of a variable
  const navigate = useNavigate();

  // id for editing by id
  const { id } = useParams();

  // states for input fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  // state for loader
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(id).then((productData) => {
      setLoading(false);
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category);
    });
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for error
    if (!name || !price || !category) {
      toast.error("Please fill out all the required fields");
    }

    const updatedProduct = await editProduct(
      id,
      name,
      description,
      price,
      category
    );

    if (updatedProduct) {
      toast.success("Product has been edited successfully");
      navigate("/");
    }
  };

  return (
    <>
      <Container>
        <Header />
        <Card>
          <CardContent>
            <Typography variant="h4" align="center" mb={4}>
              Edit Product
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
              Update
            </Button>
          </CardContent>
        </Card>
      </Container>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
