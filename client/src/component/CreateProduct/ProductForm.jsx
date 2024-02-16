import React, { useState, useEffect } from "react";
import DefaultNavbar from "../Default_Navbar";
import Footer from "../Footer";
import { useDispatch } from "react-redux";
import { createProductThunk } from "../../redux/productSlice";
import FormData from "form-data";
import { ToastContainer, toast } from "react-toastify";
import { getAllCategoryThunk } from "../../redux/categorySlice";

const ProductForm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [sendImages, setSendImages] = useState(Array(5).fill(null));
  const [sendImagesDesc, setSendImagesDesc] = useState(Array(2).fill(null));
  const [imagePreviews, setImagePreviews] = useState(Array(5).fill(null));
  const [imagePreviewsDesc, setImagePreviewsDesc] = useState(Array(5).fill(null));
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [rent, setRent] = useState(Array(3).fill(null));
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [stealDeal, setStealDeal] = useState("");
  const [combo, setCombo] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");

  const handleSendImage = (e, index) => {
    const newSendImages = [...sendImages];
    newSendImages[index] = e.target.files[0];
    setSendImages(newSendImages);

    const newImagePreviews = [...imagePreviews];
    newImagePreviews[index] = URL.createObjectURL(e.target.files[0]);
    setImagePreviews(newImagePreviews);
  };

  const handleSendImageDesc = (e, index) => {
    const newSendImages = [...sendImagesDesc];
    newSendImages[index] = e.target.files[0];
    setSendImagesDesc(newSendImages);

    const newImagePreviews = [...imagePreviewsDesc];
    newImagePreviews[index] = URL.createObjectURL(e.target.files[0]);
    setImagePreviewsDesc(newImagePreviews);
  };

  const handleRentChange = (e, index) => {
    const newRentArray = [...rent]
    newRentArray[index] = e.target.value
    setRent(newRentArray)
  }

  // Fetching Categories
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    dispatch(getAllCategoryThunk())
      .then((res) => {
        if (res.payload.data.success) {
          let filteredArray = []
          res.payload.data.allCategories.map((category, index) => {
            filteredArray.push(category.name)
          })
          setAllCategories(filteredArray);
          setLoading(false);
        }
        return res;
      })
      .catch((err) => {
        return err.response;
      });

  }, []);

  console.log("allCategoirs", allCategories)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sendImages.some((image) => image === null)) {
      toast.error("Please select all five images.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (sendImagesDesc.some((image) => image === null)) {
      toast.error("Please select all 2 images.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if (rent.some((image) => image === null)) {
      toast.error("Please enter all months rent.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const fd = new FormData();
    fd.append("name", name);
    fd.append("category", category);
    fd.append("price", price);
    fd.append("stock", stock);
    fd.append("description", description);
    fd.append("stealDeal", stealDeal);
    fd.append("combo", combo);
    fd.append("tag", tag);

    sendImages.forEach((image, index) => {
      if (image) {
        fd.append("productImages", image);
      }
    });
    console.log(fd);

    sendImagesDesc.forEach((image, index) => {
      if (image) {
        fd.append("productImagesDesc", image);
      }
    });
    console.log(fd);

    rent.forEach((singleRent, index) => {
      if (singleRent) {
        fd.append("rent", singleRent);
      }
    });
    console.log(fd);

    dispatch(createProductThunk(fd))
      .then((res) => {
        if (res.payload.data.success) {
          toast.success(`${res.payload.data.msg}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          // Reset form fields
          setName("");
          setCategory("");
          setStock("");
          setPrice("");
          setDescription("");
          setSendImages("");
          setSendImagesDesc("");
          setCombo("")
          setTag("")
        } else {
          toast.error(`${res.payload.data.msg}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  };
  return (
    <>
      <DefaultNavbar />
      <div className=" w-auto mx-auto p-7 bg-white shadow-md mt-40  rounded">
        <h2 className="text-2xl font-bold text-center mb-4">Add Product</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 gap-2">
            <div className=" mb-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Product Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input mt-1 block w-full"
                required
              />
            </div>

            <div className="flex-1 mb-3">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-600"
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea mt-1 block w-full"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="photos"
                className="block text-sm font-medium text-gray-600"
              >
                Upload Description Images of Product (2 images):
              </label>

              <div className="flex flex-wrap">
                {sendImagesDesc &&
                  sendImagesDesc.map((image, index) => (
                    <div key={index} className="mb-3">
                      {imagePreviewsDesc[index] && (
                        <img
                          src={imagePreviewsDesc[index]}
                          alt={`Preview ${index}`}
                          className="mb-2 w-60 h-60"
                        />
                      )}
                      <input
                        type="file"
                        name={`file${index}`}
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={(e) => handleSendImageDesc(e, index)}
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div className=" mb-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-600"
              >
                Category:
              </label>
              <select type="text" id="category" name="category" value={category} className="form-input mt-1 block w-full" required onChange={(e) => setCategory(e.target.value)}>
                <option value={""}>Select Option</option>
                {
                  allCategories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))
                }
              </select>
            </div>

            <div className=" mb-3">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-600"
              >
                Price:
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-input mt-1 block w-full"
                required
              />
            </div>

            <div className=" mb-3">
              <label
                htmlFor="rent"
                className="text-sm font-medium text-gray-600"
              >
                Rent:
              </label>
              {rent &&
                rent.map((rent, index) => (
                  <div key={index} className="mb-3 inline">
                    <label htmlFor="rent" className="mx-2 ml-4 text-sm font-medium text-gray-600">For {index == 0 ? ("1") : index == 1 ? ("6") : ("12")} Months :</label>
                    <input
                      type="number"
                      id="rent"
                      name="rent"
                      value={rent}
                      onChange={(e) => handleRentChange(e, index)}
                      className="form-input mt-1 w-[10%]"
                      required
                    />
                  </div>
                ))}
            </div>

            <div className=" mb-3">
              <label
                htmlFor="tag"
                className="block text-sm font-medium text-gray-600"
              >
                Tag :
              </label>
              <input
                type="text"
                id="tag"
                name="tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="form-input mt-1 block w-[40%]"
              />
            </div>

            <div className=" mb-3">
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-600"
              >
                Stock:
              </label>
              <input
                type="text"
                id="stock"
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="form-input mt-1 block w-full"
                required
              />
            </div>
            <div className=" mb-3">
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-600"
              >
                Featured for Steal Deal ?
              </label>
              <select onChange={(e) => setStealDeal(e.target.value)} className="form-input mt-1 block w-[50%]" id="stealDeal" name="stealDeal" value={stealDeal} required>
                <option value={""}>Select Option</option>
                <option value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
              </select>

            </div>

            <div className=" mb-3">
              <label
                htmlFor="combo"
                className="block text-sm font-medium text-gray-600"
              >
                Is this a Combo Product?
              </label>
              <select onChange={(e) => setCombo(e.target.value)} className="form-input mt-1 block w-[50%]" id="combo" name="combo" value={combo} required>
                <option value={""}>Select Option</option>
                <option value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
              </select>

            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="photos"
              className="block text-sm font-medium text-gray-600"
            >
              Upload Photos of Product (up to 5 images):
            </label>

            <div className="flex flex-wrap">
              {sendImages &&
                sendImages.map((image, index) => (
                  <div key={index} className="mb-3">
                    {imagePreviews[index] && (
                      <img
                        src={imagePreviews[index]}
                        alt={`Preview ${index}`}
                        className="mb-2 w-60 h-60"
                      />
                    )}
                    <input
                      type="file"
                      name={`file${index}`}
                      accept="image/png, image/jpg, image/jpeg"
                      onChange={(e) => handleSendImage(e, index)}
                    />
                  </div>
                ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full p-4 border rounded-lg bg-primary  hover:bg-gray-700 hover:text-white"
          >
            Add Product
          </button>
        </form>
      </div>

      <ToastContainer />
      <Footer />
    </>
  );
};

export default ProductForm;
