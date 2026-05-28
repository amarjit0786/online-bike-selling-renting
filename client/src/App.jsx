import { Routes,Route } from "react-router-dom";

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

function Home(){
  return(
    <>
    <Hero />
    <FeaturedBikes />
    </>
  )
}

function App(){
  return(
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bikes" element={ <BikesPage />} />
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
    </Routes>
    <Footer />
    </>
  )
}

export default App;