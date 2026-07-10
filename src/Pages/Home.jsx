import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import FeaturedProducts from "../Components/FeaturedProducts";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";


const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Footer />
    </div>
  );
};

export default Home;
