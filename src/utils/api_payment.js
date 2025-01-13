import axios from "axios";

// sonner import
import { toast } from "sonner";

// api route from constants
import { API_URL } from "../constants";

// public API
export const verifyPayment = async (
  billplz_id,
  billplz_paid,
  billplz_paid_at,
  billplz_x_signature
) => {
  try {
    const response = await axios.post(API_URL + "/payment", {
      billplz_id,
      billplz_paid,
      billplz_paid_at,
      billplz_x_signature,
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};
