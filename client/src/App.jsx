import { Routes,Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedBikes from "./components/FeaturedBikes";
import Footer from "./components/Footer";
import BikesPage from "./pages/BikesPage";
import BikeDetailsPage from "./pages/BikeDetailsPage";

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
    </Routes>
    <Footer />
    </>
  )
}

export default App;