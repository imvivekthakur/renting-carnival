import axios from "axios";

// export const BASE_URL =  "https://renting-carnival.onrender.com/"

// export const BASE_URL = "https://renting-carnival-api.onrender.com"

export const BASE_URL = "http://localhost:4000"

export default axios.create({
  baseURL: BASE_URL
});

export const ProductAPI = {
  editProduct: BASE_URL + '/product/edit',
  getSingleProduct: BASE_URL + '/product'
}

export const CouponAPI = {
  deleteCoupen: BASE_URL + "/coupen/delete",
  getSingleCoupen: BASE_URL + "/coupen/getSingle"
}

export const ContactAPI = {
  deleteContact: BASE_URL + "/contact/delete"
}

export const PackageAPI = {
  deletePackage : BASE_URL + "/package/delete",
  editPackage : BASE_URL + "/package/edit",
  getSinglePackage : BASE_URL + "/package/get"
}