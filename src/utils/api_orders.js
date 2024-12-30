import axios from "axios";

// sonner import
import { toast } from "sonner";

// api route from constants
import { API_URL } from "../constants";

// create order api
export const createOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrices
) => {
  try {
    const response = await axios.post(API_URL + "/orders", {
      customerName,
      customerEmail,
      products,
      totalPrices,
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

// get all orders api
export const getOrders = async () => {
  try {
    const response = await axios.get(API_URL + "/orders");
    console.log(response);
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

// api to update status of order
export const updateOrder = async (id, orderStatus) => {
  try {
    const response = await axios.put(API_URL + "/orders/" + id, {
      status: orderStatus,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

// api to delete order
export const deleteOrder = async (id) => {
  try {
    const response = await axios.delete(API_URL + "/orders/" + id);
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};
