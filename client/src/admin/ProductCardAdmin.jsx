import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { ProductAPI } from "../redux/API";

const ProductCardAdmin = ({
  img,
  desc,
  price,
  title,
  stock,
  seller,
  category,
  productId,
  stealDeal,
  rent,
  combo,
  tag
}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    // Initialize with existing data
    name: title,
    description: desc,
    price: price,
    stock: stock,
    category: category,
    seller: seller,
    stealDeal: stealDeal,
    tag : tag
  });

  const [saveButtonText, setSaveButtonText] = useState("Edit");

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const headers = {
    Authorization: `Bearer ${user.accessToken}`,
    "Content-Type": "application/json",
  };

  const handleEdit = async () => {
    try {
      // const response = await axios.put(
      //   `https://renting-carnival-api.onrender.com/admin/edit/${productId}`,

      //   editedData,
      //   {
      //     headers: headers,
      //   }
      // );
      const response = await axios.put(
        `${ProductAPI.editProduct}/${productId}`,

        editedData,
        {
          headers: headers,
        }
      );
      // console.log("edit response , ", response)

      if (response.data.success) {
        toast.success(response.data.msg);

        const updatedProductResponse = await axios.get(
          `https://renting-carnival.onrender.com/product/get/${productId}`
        );

        // console.log("updatedProductResponse", updatedProductResponse);

        if (updatedProductResponse.data.success) {
          const updatedProduct = updatedProductResponse.data.product;
          window.location.reload();
          setEditedData((prevData) => ({
            ...prevData,
            name: updatedProduct.name || prevData.name,
            description: updatedProduct.description || prevData.description,
            price: updatedProduct.price || prevData.price,
            stock: updatedProduct.stock || prevData.stock,
            category: updatedProduct.category || prevData.category,
            stealDeal: updatedProduct.stealDeal || prevData.stealDeal,
            tag: updatedProduct.tag || prevData.tag,
            seller: updatedProduct.owner
              ? updatedProduct.owner.name || prevData.seller
              : prevData.seller,
          }));
        }
        setIsEditing(false);
        setSaveButtonText("Edit");

        // dispatch(getAllProductThunk());
      } else {
        // Notify failure
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error("Error editing product:", error);
      // Handle error, notify user, etc.
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://renting-carnival.onrender.com/admin/delete/${productId}`,
        { headers: headers }
      );

      if (response.data.success) {
        toast.success(response.data.msg);
        setIsEditing(false);
        window.location.reload();
        // dispatch(getAllProductThunk());
      } else {
        // Notify failure
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error, notify user, etc.
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("value changes", name, value)
  };

  return (
    <div className="product-card-link">
      <div className="rounded-lg overflow-hidden bg-gray-100 product-card">
        <NavLink to={`/product/${productId}`}>
          <img src={img[0]} alt="Bikes" className="object-cover h-64 w-full" />
        </NavLink>
        <div className="p-4">
          <h1 className="text-lg font-bold p-1">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editedData.name}
                onChange={handleInputChange}
              />
            ) : (
              title
            )}
          </h1>
          <h2 className="text-md font-semibold p-1">
            <span>Seller: </span>
            {isEditing ? (
              <input
                type="text"
                name="seller"
                value={editedData.seller}
                onChange={handleInputChange}
              />
            ) : (
              seller
            )}
          </h2>

          <p className="text-sm p-1">
            {isEditing ? (
              <textarea
                className="form-textarea mt-1 block w-full"
                type="text"
                name="description"
                value={editedData.description}
                onChange={handleInputChange}
              />
            ) : (
              desc
            )}
          </p>
          <p className="text-md font-medium p-1">
            <span>Category: </span>
            {isEditing ? (
              <input
                type="text"
                name="category"
                value={editedData.category}
                onChange={handleInputChange}
              />
            ) : (
              category
            )}
          </p>

          <p className="font-bold p-1">
            Rs :
            {isEditing ? (
              <input
                type="text"
                name="price"
                value={editedData.price}
                onChange={handleInputChange}
              />
            ) : (
              price
            )}
          </p>
          <div className="font-bold p-1">
            <p>Rent : </p>
            <div className="ml-4 text-sm">
              <div className="flex gap-2 items-center">
                <p>For 1 Month : </p>
                <p>Rs {rent[0]}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p>For 6 Month</p>
                <p>Rs {rent[1]}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p>For 12 Month</p>
                <p>Rs {rent[2]}</p>
              </div>
            </div>
          </div>

          <p className="font-md p-1">
            <span>Stocks Left: </span>
            {isEditing ? (
              <input
                type="text"
                name="stock"
                value={editedData.stock}
                onChange={handleInputChange}
              />
            ) : (
              stock
            )}
          </p>

          <p className="font-md p-1">
            <span>Tag : </span>
            {isEditing ? (
              <input
                type="text"
                name="tag"
                value={editedData.tag}
                onChange={handleInputChange}
              />
            ) : (
              <p className="inline text-green-600 font-bold">{tag}</p>
            )}
          </p>

          <p className="font-md p-1">
            <span>Featured : </span>
            {isEditing ? (
              // <input
              //   type="text"
              //   name="stealDeal"
              //   value={editedData.stealDeal}
              //   onChange={handleInputChange}
              // />
              <select value={editedData.stealDeal} name="stealDeal" onChange={handleInputChange}>
                <option value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
              </select>
            ) : (
              stealDeal
            )}
          </p>

          <p className="font-md p-1">
            <span>Combo Product : </span>
            {combo}
          </p>

          <div className="flex">
            {isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-primary p-3 rounded-lg hover:bg-gray-500 hover:text-white hover:no-underline text-white text-center m-4"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-primary p-3 rounded-lg hover:bg-gray-500 hover:text-white hover:no-underline text-white text-center m-4"
              >
                Edit
              </button>
            )}
            <button
              className="bg-gray-500 p-3 rounded-lg hover:bg-primary hover:text-white hover:no-underline text-white text-center m-4"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductCardAdmin;
