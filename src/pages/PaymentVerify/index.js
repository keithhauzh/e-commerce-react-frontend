import { useSearchParams } from "react-router-dom";

// react imports
import { useEffect } from "react";

// react-router-imports
import { useNavigate } from "react-router-dom";

// api imports
import { verifyPayment } from "../../utils/api_payment";
import { clearCart } from "../../utils/api_cart";

// toast imports
import { toast } from "sonner";

export default function PaymentVerify() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  // data from url parameters
  const billplz_id = searchParams.get("billplz[id]");
  const billplz_paid = searchParams.get("billplz[paid]");
  const billplz_paid_at = searchParams.get("billplz[paid_at]");
  const billplz_x_signature = searchParams.get("billplz[x_signature]");

  useEffect(() => {
    verifyPayment(
      billplz_id,
      billplz_paid,
      billplz_paid_at,
      billplz_x_signature
    ).then((updatedOrder) => {
      // check if the order is paid or not
      // if its paid, show the success message
      if (updatedOrder.status === "paid") {
        toast.success("Payment is successful");
      }
      // if its failed, show the failed message
      if (updatedOrder.status === "failed") {
        toast.error("Payment failed");
      }
      // clear the cart
      clearCart();

      // redirect the user to /orders page
      navigate("/orders");
    });
  }, []);

  return (
    <>
      We're verifying your payment. Please don't close the browser or go back.
    </>
  );
}
