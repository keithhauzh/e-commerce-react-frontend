// import react-router-ddom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// toaster sonner
import { Toaster } from "sonner";

// import routes
import Product from "./pages/Products";
import ProductAddNew from "./pages/ProductAddNew";
import ProductEdit from "./pages/ProductEdit";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentVerify from "./pages/PaymentVerify";
import Orders from "./pages/Orders";

export default function App() {
  return (
    <div className="App">
      {/* setup the react routers */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Product />}></Route>
          <Route path="/products/new" element={<ProductAddNew />}></Route>
          <Route path="/products/:id/edit" element={<ProductEdit />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/verify-payment" element={<PaymentVerify />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </div>
  );
}
