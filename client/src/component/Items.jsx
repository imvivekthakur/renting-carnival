import React, { useEffect, useState } from "react";
import Products from "./Products";
import DynamicProducts from "./DynamicProducts/DynamicProducts";
import Card from "./Card";
import ProductCard from "./DynamicProducts/ProductCard";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllCategoryThunk } from "../redux/categorySlice";

const Items = ({ allProducts }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    filterProducts(activeTab);
  }, [activeTab]);

  const handleClick = (index) => {
    setActiveTab(index);
  };

  const filterProducts = (index) => {
    // console.log("filtered products called !!", index);
    if (index === 1) {
      setFilteredProducts(allProducts); // Show all products for "Popular" tab
    } else {
      const filtered = allProducts.filter(
        (product) => product.category === getCategoryName(index)
      );
      // console.log("filtered ", filtered);
      setFilteredProducts(filtered);
    }
  };

  const [allCategories, setAllCategories] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategoryThunk())
      .then((res) => {
        if (res.payload.data.success) {
          setAllCategories(res.payload.data.allCategories);
          setLoading(false);
        }
        return res;
      })
      .catch((err) => {
        return err.response;
      });

  }, []);

  const getCategoryName = (index) => {
    let featuredArray = [];
    allCategories.map((category) => {
      if (category?.featured === "Yes") {
        featuredArray.push(category?.name)
      } else { }
    })

    console.log("featuredArray", featuredArray)

    switch (index) {
      case 1:
        return "Popular";
      case 2:
        return featuredArray[0];
      case 3:
        return featuredArray[1];
      case 4:
        return featuredArray[2];
      default:
        return "";
    }
  };

  let featuredArray = [];

  return (
    <>
      <div className="text-center m-8">
        <h1 className="text-4xl text-primary font-bold m-3">
          Most popular Rental Items
        </h1>
        <p>Lorem ipsum dolor sit amet. </p>
      </div>
      <div className="flex flex-wrap w-[90%] mx-auto">
        <div
          className={`text-center w-full lg:w-1/4 p-6 border-b-2 ${activeTab === 1
              ? "text-primary border-primary font-bold cursor-pointer"
              : ""
            }`}
          onClick={() => handleClick(1)}
        >
          Popular
        </div>
        {
          allCategories.map((category) => {
            if (category?.featured === "Yes") {
              featuredArray.push(category?.name)
            } else { }
          })
        }
        {
          featuredArray.length > 0 ? (
            featuredArray.map((feature, index) => {
              if (index < 3) {
                return (
                  <div
                    className={`text-center w-full lg:w-1/4 p-6 border-b-2 ${activeTab === index + 2
                      ? "text-primary border-primary font-bold cursor-pointer"
                      : ""
                      }`}
                    onClick={() => handleClick(index + 2)}
                  >
                    {feature}
                  </div>
                )
              } else {
              }
            })
          ) : (<p className="text-black">No Data Found</p>)
        }
      </div>
      {/* <Products/> */}
      {/* {console.log("filtered products ", filteredProducts)} */}
      {activeTab === 1 && <DynamicProducts />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 w-[90%] mx-auto mt-5 pt-5 mb-5 ">
        {activeTab !== 1 &&
          filteredProducts.map((card) => (
            <ProductCard
              img={card.productImages}
              desc={card.description}
              price={card.price}
              stock={card.stock}
              productId={card._id}
              seller={card.owner.name}
              name={card.name}
              category={card.category}
              tag={card.tag}
            />
          ))}
      </div>
      <div className="text-center my-6">
        <Link to="/shop">
          <button className="border-2 border-primary text-primary px-6 py-2 rounded-md">
            Show More
          </button>
        </Link>
      </div>
    </>
  );
};

export default Items;
