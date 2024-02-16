import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import ProductCard from "./DynamicProducts/ProductCard";
import "react-multi-carousel/lib/styles.css";
import "../App.css";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Deals = ({ allProducts }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      let filteredArray = []
      allProducts.map((product, index) => {
        if (product.stealDeal === "Yes") {
          filteredArray.push(product)
        } else { }
      })
      setProducts(filteredArray);
      setLoading(true);
    }
  }, [allProducts]);

  return (
    <>
      <div className="text-center text-primary text-4xl font-bold my-10">
        Steal Deals on Rental Items
      </div>
      <div className="mb-8">
        {!loading ? (
          <div className="loader-container w-[10%] mx-auto flex items-center justify-center">
            <ColorRing
              visible={true}
              height="40"
              width="40"
              ariaLabel="color-ring-loading"
              wrapperStyle={{
                display: "flex",
                alignItems: "center",
              }}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        ) : (
          <Carousel
            autoPlay={true}
            autoPlaySpeed={2000}
            rewind={true}
            rewindWithAnimation={true}
            responsive={responsive}
            containerClass="carousel-container"
            className="w-[90%] mx-auto"
          >
            {products.map((card) => (
              <div key={card._id}>
                <ProductCard
                  img={card.productImages}
                  title={card.name}
                  desc={card.description}
                  price={card.price}
                  stock={card.stock}
                  category={card.category}
                  seller={card.owner.name}
                  productId={card._id}
                  tag = {card.tag}
                />
              </div>
            ))}
          </Carousel>
        )}
      </div>
      {/* <Link to={'/allProducts'}>
        <p className="text-center w-fit mx-auto flex bg-gray-600 text-white py-2 px-4 rounded-lg hover:scale-[1.05] duration-200 transition-all">Show More</p>
      </Link> */}
    </>
  );
};

export default Deals;
