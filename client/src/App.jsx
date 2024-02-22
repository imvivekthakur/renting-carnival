import "./App.css";
import Home from "./component/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Contact from "./component/Contact";
import Shop from "./component/Shop";
import Blog from "./component/Blog";
import Product from "./component/Product";
import Cart from "./component/Cart";
import Checkout from "./component/Checkout";
import TogglePack from "./component/Toggle_Pack";
import DefaultNavbar from "./component/Default_Navbar";
import CityPreference from "./component/City_Preference";
import ShowUser from "./admin/ShowUser";
import ForgotPassword from "./component/FogotPassword";
import ResetPassword from "./component/ResetPassword";
import EmailVerification from "./component/EmailVerification";
import OTPVerification from "./component/OTPVerification";
import UserProfile from "./Users/UserProfile";
import DynamicProducts from "./component/DynamicProducts/DynamicProducts";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProductThunk } from "./redux/productSlice";
import Review from "./component/Review";
import Wishlist from "./component/Wishlist";
import Category from "./component/Category";
import Success from "./component/Success";
import Failure from "./component/Failure";
import AllUsers from "./admin/AllUsers";
import AllProductsAdmin from "./admin/AllProductsAdmin";
import AllOrders from "./admin/AllOrders";
import ShowPackages from "./admin/ShowPackage";
import ProductForm from "./component/CreateProduct/ProductForm";
import { Toaster } from "react-hot-toast";
import Vehicle from "./component/Vehicle";
import Combos from "./component/Combos";
import RentalSubscription from "./component/RentalSubscription";
import BlogForm from "./component/CreateBlog/BlogForm";
import AllBlog from "./component/AllBlog";
import { getAllBlogThunk } from "./redux/blogSlice";
import AllBlogsAdmin from "./admin/AllBlogsAdmin";
import CategoryForm from "./component/CreateCategory/CategoryForm";
import AllComboProductsAdmin from "./admin/AllComboProductsAdmin";
import CoupenForm from "./component/CreateCoupen/CoupenForm";
import AllCoupenAdmin from "./admin/AllCoupenAdmin";
import AllContactAdmin from "./admin/AllContactAdmin";
import PackageForm from "./component/CreatePackage/PackageForm";
import AllPackageAdmin from "./admin/AllPackageAdmin";
import AllProductPackage from "./component/PackagePage/AllProductPackage";
import PackageCartView from "./component/PackagePage/PackageCartView";
import PackageCartCheckout from "./component/PackagePage/PackageCartCheckout";
import RoomForm from "./component/CreateRoom/RoomForm";
import AllRoomAdmin from "./admin/AllRoomAdmin";
import AllRooms from "./component/AllRooms";
import TestimonialForm from "./component/CreateTestimonial/TestimonialForm";
import AllTestimonialAdmin from "./admin/AllTestimonialAdmin";
// import ProductForm from "./component/ProductForm";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    dispatch(getAllProductThunk())
      .then((res) => {
        if (res.payload.data.success) {
          setAllProducts(res.payload.data.products);
          setLoading(false);
        }
        return res;
      })
      .catch((err) => {
        return err.response;
      });

    dispatch(getAllBlogThunk())
      .then((res) => {
        if (res.payload.data.success) {
          setAllBlogs(res.payload.data.blogs);
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home allProducts={allProducts} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop allProducts={allProducts} />} />
          <Route path="/allBlogs" element={<AllBlog allBlogs={allBlogs} />} />
          <Route path="/allRooms" element={<AllRooms />} />
          <Route path="/admin/allBlogs" element={<AllBlogsAdmin allBlogs={allBlogs} />} />

          <Route path="/blog/:dbId" element={<Blog />} />
          {/* <Route path="/blog" element={<Blog />} /> */}
          <Route
            path="/product/:productId"
            element={<Product allProducts={allProducts} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/package/cart" element={<PackageCartView />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/package/checkout" element={<PackageCartCheckout />} />
          <Route path="/toggle" element={<TogglePack />} />
          <Route path="/admin" element={<ShowUser />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/forget" element={<ForgotPassword />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/email-verify" element={<EmailVerification />} />
          <Route path="/otp-verify" element={<OTPVerification />} />
          <Route path="/allProducts" element={<DynamicProducts />} />
          <Route path="/admin/allProducts" element={<AllProductsAdmin />} />
          <Route path="/admin/allComboProducts" element={<AllComboProductsAdmin />} />
          <Route path="/admin/allCoupen" element={<AllCoupenAdmin />} />
          <Route path="/admin/allContact" element={<AllContactAdmin />} />
          <Route path="/admin/allPackages" element={<AllPackageAdmin />} />
          <Route path="/combos" element={<Combos allProducts={allProducts} />} />
          <Route path="/browse/packageProducts" element={<AllProductPackage />} />
          <Route path="/admin/allRooms" element={<AllRoomAdmin />} />
          <Route path="/admin/allTestimonials" element={<AllTestimonialAdmin />} />

          <Route path="/review" element={<Review />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
          <Route path="/orders" element={<AllOrders />} />
          <Route path="/user/package" element={<ShowPackages />} />
          <Route path="/vehicle" element={<Vehicle />} />
          <Route path="/rentalsubscription" element={<RentalSubscription />} />

          {/* <Route path="/furniture" element={<Furniture filteredProduct={allProducts}/>} /> */}
          <Route
            path="/category/:categoryName"
            element={<Category allProducts={allProducts} />}
          />
          <Route path="/allUsers" element={<AllUsers />} />

          <Route path="/product/create" element={<ProductForm />} />
          <Route path="/blog/create" element={<BlogForm />} />
          <Route path="/category/create" element={<CategoryForm />} />
          <Route path="/coupen/create" element={<CoupenForm />} />
          <Route path="/package/create" element={<PackageForm />} />
          <Route path="/room/create" element={<RoomForm />} />
          <Route path="/testimonial/create" element={<TestimonialForm />} />

        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
