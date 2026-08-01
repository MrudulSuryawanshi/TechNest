import React from "react";
import Hero from "./Hero";
import FeaturedProducts from "./FeaturedProducts";
import Categories from "./Categories";
import Footer from "../../Components/Layout/Footer";

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
