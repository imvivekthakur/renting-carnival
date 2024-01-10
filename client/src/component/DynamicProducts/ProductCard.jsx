import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCartThunk, removeFromCartThunk } from "../../redux/cartSlice";
import {
  addToWishlistThunk,
  getWishlistThunk,
} from "../../redux/wishlistSlice";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const ProductCard = ({
  img,
  desc,
  price,
  title,
  stock,
  seller,
  category,
  productId,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    if (img && img.length > 0) {
      setSelectedImage(img[0]); // Set the first image as the selected image
    }
  }, [img]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const handleAddToCart = () => {
    setLoading(true);
    dispatch(addToCartThunk({ productId }))
      .then((res) => {
        if (res.payload.data.success) {
          setLoading(false);
          toast.success("Product added to cart successfully!");
        } else {
          setLoading(false);
          toast.error(`${res.payload.data.msg}`);
        }
        return res;
      })

      .catch((err) => {
        toast.error("Please Login to continue");
        return err.response;
      });
  };

  const addToWishlistF = () => {
    setLoading2(true);
    dispatch(addToWishlistThunk({ productId }))
      .then((res) => {
        setLoading2(false);
        if (res.payload.data.success) {
          toast.success("Product added to wishlist successfully!");
        } else {
          setLoading2(false);
          toast.error(`${res.payload.data.msg}`);
        }
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };

  // console.log("images ", img);
  return (
    <div className="product-card-link">
      <div className="rounded-lg overflow-hidden bg-gray-100 product-card">
        <NavLink to={`/product/${productId}`}>
          <img
            src={selectedImage}
            alt="Bikes"
            className="object-cover h-64 w-full"
          />
        </NavLink>
        <div className="p-4">
          <h1 className="text-lg font-bold p-1">{title}</h1>
          <h2 className="text-md font-semibold p-1">
            <span>Seller: </span>
            {seller}
          </h2>

          <p className="text-sm p-1">{desc}</p>
          <p className="text-md font-medium p-1">
            <span>Category: </span>
            {category}
          </p>

          <p className="font-bold p-1">Rs: {price}</p>
          <p className="font-md p-1">
            <span>Stocks Left: </span>
            {stock}
          </p>
        </div>

        <div className="flex">
          {loading ? (
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
            <button
              onClick={handleAddToCart}
              className="bg-primary p-3 rounded-lg hover:bg-gray-500 hover:text-white hover:no-underline text-white text-center m-4"
            >
              Add To Cart
            </button>
          )}
          {loading2 ? (
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
            <button
              className="bg-gray-500 p-3 rounded-lg hover:bg-primary hover:text-white hover:no-underline text-white text-center m-4"
              onClick={addToWishlistF}
            >
              Add To Wishlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
