import axios from "axios";

// sonner import
import { toast } from "sonner";

// api route from constants
import { API_URL } from "../constants";

// user role API
// create order api
export const createOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrices,
  token
) => {
  try {
    const response = await axios.post(
      API_URL + "/orders",
      {
        customerName,
        customerEmail,
        products,
        totalPrices,
      },
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

// (role based API)
// get all orders api
export const getOrders = async (token) => {
  try {
    const response = await axios.get(API_URL + "/orders", {
      headers: { Authorization: "Bearer " + token },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

// admin api
// api to update status of order
export const updateOrder = async (id, orderStatus, token) => {
  try {
    const response = await axios.put(
      API_URL + "/orders/" + id,
      {
        status: orderStatus,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

// admin api
// api to delete order
export const deleteOrder = async (id, token) => {
  try {
    const response = await axios.delete(API_URL + "/orders/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};
