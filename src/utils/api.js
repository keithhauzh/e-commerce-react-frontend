import axios from "axios";

// static data
const API_URL = "http://localhost:5554";

export const getProducts = async (category = "") => {
  try {
    const response = await axios.get(
      API_URL + "/products?category=" + category
    );
    return response.data;
  } catch (error) {
    console.log({ error: error._messaage });
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL + "/categories");
    return response.data;
  } catch (error) {
    console.log({ error: error._message });
  }
};
