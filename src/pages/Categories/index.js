import Header from "../../components/Header";

import {
  Container,
  Box,
  TextField,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

import {
  getCategories,
  addNewCategory,
  deleteCategory,
} from "../../utils/api_categories";
import { isAdmin, getUserToken } from "../../utils/api_auth";

export default function Categories() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const [cookie] = useCookies(["currentUser"]);
  const token = getUserToken(cookie);

  useEffect(() => {
    if (!isAdmin(cookie)) {
      navigate("/login");
    }
  }, [cookie, navigate]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, [name]);

  const nameOnChange = (event) => {
    setName(event.target.value);
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    if (!name) {
      toast.error("Please fill out the required field");
    } else {
      const newCategory = await addNewCategory(name, token);
      if (newCategory) {
        toast.success("Category has been added successfully");
        setName("");
      }
    }
  };

  const handleDelete = async (id) => {
    // console.log("handle delete!");
    // console.log(id);
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmed) {
      const deleted = await deleteCategory(id, token);
      if (deleted) {
        const latestCategories = await getCategories();
        setCategories(latestCategories);
        toast.success("Category deleted successfully");
      } else {
        toast.error("Failed to delete category");
      }
    }
  };

  const handleEdit = async (id) => {
    // console.log("handle edit!");
    console.log(id);
  };

  return (
    <Container>
      <Header title="Categories" />
      <Box>
        <h1>Categories</h1>
        <Box
          sx={{
            border: 1,
            borderColor: "grey.500",
            padding: "15px",
            display: "flex",
            columnGap: "10px",
          }}
        >
          <TextField
            label="Input Name of Category Here"
            fullWidth
            onChange={nameOnChange}
            value={name}
          >
            {name}
          </TextField>
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((item) => (
              <TableRow key={item._id}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ marginRight: "10px" }}
                    onClick={() => handleEdit(item._id)}
                    LinkComponent={Link}
                    to={`/categories/` + item._id + `/edit`}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
