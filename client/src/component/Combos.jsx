import React, { useEffect, useState } from "react";
import Deals from "./Deals";
import DefaultNavbar from "./Default_Navbar";
import Footer from "./Footer";
import ProductCard from "./DynamicProducts/ProductCard";
import { useDispatch } from "react-redux";
import { getAllProductThunk } from "../redux/productSlice";

const Combos = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    dispatch(getAllProductThunk())
      .then((res) => {
        if (res.payload.data.success) {
          let array = res.payload.data.products;
          let filteredArray = [];
          array.map((product, index) => {
            if (product.combo === "Yes") {
              filteredArray.push(product)
            }
          })
          setAllProducts(filteredArray);
          setLoading(false);
        }
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  }, []);


  return (
    <>
      <DefaultNavbar />
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHN0b3JlfGVufDB8fDB8fHww"
          alt="shop"
          className="w-screen h-80 blur-sm object-cover"
        />
        <h1 className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-opacity-70 p-4">
          <span className="text-white drop-shadow text-4xl font-bold">
            Combos
          </span>
        </h1>
      </div>
      {/* <Deals allProducts={allProducts}/> */}

      <div className="my-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-[90%] mx-auto">
        {allProducts.map((card) => (
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
              tag = {card?.tag}
              tagBgColor={card?.tagBgColor}
            />
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default Combos;
