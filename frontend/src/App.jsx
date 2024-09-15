import { Navigate, Route, Routes } from "react-router-dom";
import AddCategoryPage from "./components/AddCategoryPage";
import AddProductPage from "./components/AddProductPage";
import EditCategoryPage from "./components/EditCategoryPage";
import EditProductPage from "./components/EditProductPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignUpPage from "./pages/SignUpPage";

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";

export default function App() {
  const { user, checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="flex">
      <Sidebar />
      <Navbar />
      <div className="flex-grow ml-64">
        <div className="mt-16 p-4">
          <Routes>
            <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUpPage />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />

            <Route path="/category" element={user ? <CategoryPage /> : <Navigate to="/login" />} />
            <Route path="/category/edit/:id" element={user ? <EditCategoryPage /> : <Navigate to="/login" />} />
            <Route path="/category/new" element={user ? <AddCategoryPage /> : <Navigate to="/login" />} />

            <Route path="/products" element={user ? <ProductsPage /> : <Navigate to="/login" />} />
            <Route path="product/edit/:id" element={user ? <EditProductPage /> : <Navigate to="/login" />} />
            <Route path="/product/new" element={user ? <AddProductPage /> : <Navigate to="/login" />} />

            <Route path="reset-password" element={user ? <ResetPasswordPage /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
