// React imports
import { useState, useEffect } from "react";

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
  Select,
  MenuItem,
} from "@mui/material";

// import cookies for the token
import { useCookies } from "react-cookie";

// component imports
import Header from "../../components/Header";
import ButtonUpload from "../../components/ButtonUpload";

// API imports
import { addNewProduct } from "../../utils/api_products";
import { getUserToken, isAdmin } from "../../utils/api_auth";
import { uploadImage } from "../../utils/api_image";
import { getCategories } from "../../utils/api_categories";

// import api route from constant
import { API_URL } from "../../constants";

export default function ProductAddNew() {
  // to get the current user as well as their token for authentication purposes
  const [cookie] = useCookies(["currentUser"]);
  const token = getUserToken(cookie);

  const navigate = useNavigate();

  // states for input fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  // state for image
  const [image, setImage] = useState("");

  // state for categories
  const [categories, setCategories] = useState([]);

  // useEffect for rendering categories
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, [category]);

  // check if admin is logged in or not
  useEffect(() => {
    if (!isAdmin(cookie)) {
      navigate("/");
    }
  }, [cookie, navigate]);

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
      category,
      image,
      token
    );

    if (newProductData) {
      // show success message
      toast.success("Product has been added succesffuly");
      // redirect to home page
      navigate("/");
    }
  };

  const handleImageUpload = async (files) => {
    // trigger the upload API
    const { image_url = "" } = await uploadImage(files[0]); //destructuring
    setImage(image_url);
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
            <Select
              label="Category"
              required
              fullWidth
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((category) => {
                return (
                  <MenuItem value={category._id}>{category.name}</MenuItem>
                );
              })}
            </Select>
          </Box>
          <Box
            mb={2}
            sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
          >
            <Box>
              <ButtonUpload
                onFileUpload={(files) => {
                  if (files && files[0]) {
                    console.log(files);
                    handleImageUpload(files);
                  }
                }}
              />
            </Box>

            {image !== "" ? (
              <img
                src={`${API_URL}/${image}`}
                style={{
                  width: "100%",
                  maxWidth: "300px",
                }}
              />
            ) : null}
          </Box>
          <Button
            sx={{ marginBottom: "15px" }}
            variant="contained"
            color="warning"
            onClick={() => {
              setImage("");
            }}
          >
            Remove
          </Button>
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
