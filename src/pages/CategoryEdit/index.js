import Header from "../../components/Header";

import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { getUserToken } from "../../utils/api_auth";
import { getCategory, updateCategory } from "../../utils/api_categories";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";

export default function CategoryDelete() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [cookie] = useCookies(["currentUser"]);
  const token = getUserToken(cookie);

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    getCategory(id).then((categoryData) => {
      setName(categoryData.name);
      setLoading(false);
    });
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check for error
    if (!name) {
      toast.error("Please fill out the required field");
    } else {
      const updatedCategory = await updateCategory(id, name, token);
      if (updatedCategory) {
        toast.success("Category has been edited successfully");
        navigate("/categories");
      }
    }
  };

  return (
    <>
      <Container>
        <Header />
        <Card>
          <CardContent>
            <Typography variant="h4" align="center" mb={4}>
              Edit Category
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
