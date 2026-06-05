import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DealerDashboard from "./components/DealerDashboard";
import DealerPage from "./pages/DealerPage";
import ProductUpload from "./components/productUpload";
import ProductList from "./components/ProductList";
import { Toaster } from "react-hot-toast";

function Home() {
  return (
    <div>
      <h1>Project Demo</h1>

      <p><Link to="/dealer-dashboard">Dealer Dashboard</Link></p>
      <p><Link to="/dealer-page">Dealer Page</Link></p>
      <p><Link to="/product-upload">product Upload</Link></p>
      <p><Link to="/product-list">product List</Link></p>
    </div>
  );
}

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dealer-dashboard" element={<DealerDashboard />} />
          <Route path="/dealer-page" element={<DealerPage />} />
          <Route path="/product-upload" element={<ProductUpload />} />
          <Route path="/product-list" element={<ProductList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;