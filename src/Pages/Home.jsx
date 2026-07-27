import React from "react";
import Hero from "../Components/Hero";
import FeaturedProducts from "../Components/FeaturedProducts";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";


const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Footer />
    </div>
  );
};

export default Home;
