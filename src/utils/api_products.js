import axios from "axios";

// toast sonner
import { toast } from "sonner";

// constant API_URL import
import { API_URL } from "../constants";

// get products (public data)
export const getProducts = async (category = "", page = 1) => {
  try {
    const response = await axios.get(
      API_URL + "/products?page=" + page + "&category=" + category
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// get product (public data)
export const getProduct = async (id) => {
  try {
    const response = await axios.get(API_URL + "/products/" + id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// add new product (admin)
export const addNewProduct = async (
  name,
  description,
  price,
  category,
  image,
  token
) => {
  try {
    const response = await axios.post(
      API_URL + "/products",
      {
        name: name,
        description: description,
        price: price,
        category: category,
        image: image,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// update product (admin)
export const editProduct = async (
  id,
  name,
  description,
  price,
  category,
  token
) => {
  try {
    const response = await axios.put(
      API_URL + "/products/" + id,
      {
        name: name,
        description: description,
        price: price,
        category: category,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// delete product (admin)
export const deleteProduct = async (id, token) => {
  try {
    const response = await axios.delete(API_URL + "/products/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
