// import react-router-ddom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// toaster sonner
import { Toaster } from "sonner";

// import routes
import Product from "./pages/Products";
import ProductAddNew from "./pages/ProductAddNew";
import ProductEdit from "./pages/ProductEdit";

export default function App() {
  return (
    <div className="App">
      {/* setup the react routers */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Product />}></Route>
          <Route path="/products/new" element={<ProductAddNew />}></Route>
          <Route path="/products/:id/edit" element={<ProductEdit />}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </div>
  );
}
