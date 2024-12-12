// import react-router-ddom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import routes
import Store from "./pages/Store";

function App() {
  return (
    <div className="App">
      {/* setup the react routers */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Store />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
