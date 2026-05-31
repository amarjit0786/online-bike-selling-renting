import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedBikes from "./components/FeaturedBikes";
import Footer from "./components/Footer";
import BikesPage from "./pages/BikesPage";
import BikeDetailsPage from "./pages/BikeDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

import DashboardPage from "./pages/DashboardPage";

import MyBookingsPage from "./pages/MyBookingsPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import SellerDashboard from "./pages/SellerDashboard";
import AddBikePage from "./pages/AddBikePage";
import MySellerBikes from "./pages/MySellerBikes";
import SellerRoute from "./routes/SellerRoute";
import EditBikePage from "./pages/EditBikePage";

import AdminDashboard from "./pages/AdminDashboard";

import AdminRoute from "./routes/AdminRoute";
import AdminUsersPage from "./pages/AdminUsersPage";

import AdminBikesPage from "./pages/AdminBikesPage";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedBikes />
    </>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bikes" element={<BikesPage />} />
        <Route path="/bikes/:id" element={<BikeDetailsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller"
          element={
            <ProtectedRoute>
              <SellerRoute>
                <SellerDashboard />{" "}
              </SellerRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/add-bike"
          element={
            <ProtectedRoute>
              <SellerRoute>
                <AddBikePage />{" "}
              </SellerRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/my-bikes"
          element={
            <ProtectedRoute>
              <SellerRoute>
                <MySellerBikes />{" "}
              </SellerRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/edit-bike/:id"
          element={
            <ProtectedRoute>
              <SellerRoute>
                <EditBikePage />{" "}
              </SellerRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminUsersPage />{" "}
              </AdminRoute>{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bikes"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminBikesPage />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
