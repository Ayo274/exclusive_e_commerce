import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import OrderDetails from "./pages/OrderDetails";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SearchResults from "./pages/SearchResults";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* PROTECTED USER ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="order/:id" element={<OrderDetails />} />
          <Route path="account" element={<Account />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>

      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<AdminDashboard />}>
        <Route
          index
          element={
            <div className="text-2xl font-bold">Welcome to Admin Dashboard</div>
          }
        />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>
    </Routes>
  );
}

export default App;
