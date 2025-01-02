// import react-router-ddom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// cookie library import
import { CookiesProvider } from "react-cookie";

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
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <div className="App">
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
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
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Routes>
        </BrowserRouter>
        <Toaster richColors position="top-right" />
      </CookiesProvider>
    </div>
  );
}
