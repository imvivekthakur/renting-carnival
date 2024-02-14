import axios from "axios";

// const BASE_URL =  "https://renting-carnival.onrender.com/"

const BASE_URL = "https://renting-carnival-api.onrender.com"

// const BASE_URL = "http://localhost:4000"

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