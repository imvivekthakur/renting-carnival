const Cart = require("../models/cartModel");
const { ErrorHandler } = require("../middleware/errorHandler");
const Product = require("../models/productModel");
const Package = require("../models/packageModel");
const PackageCart = require("../models/packageCartModel");
const { populate } = require("../models/otpModel");

const addToCart = async (req, res, next) => {
    try {

        console.log("Entering in Package Cart")
        const user = req.user;
        const userId = user._id;

        // packageId
        // const packageId = req.query.params

        if (!user) {
            return next(new ErrorHandler(400, "Login or signup to continue"));
        }

        const { productId, packageId } = req.body;

        if (!productId) {
            return next(new ErrorHandler(400, "select any product to continue"));
        }

        const product = await Product.findOne({
            _id: productId,
        });
        console.log("product", product);

        if (!product) {
            return next(new ErrorHandler(400, "Product not found"));
        }

        let cart = await PackageCart.findOne({ user: userId }).populate({
            path: "items.product",
            populate: {
                path: "owner",
                select: "name",
            },
        });
        console.log("cart ", cart);

        const cartItem = cart?.items.find(
            (item) => item.product && item.product.equals(product._id)
        );
        console.log("cartItem ", cartItem);

        const userPackage = await Package.findById({ _id: packageId, });
        const maxItemsAllowed = userPackage?.limitProduct;
        const maxPriceLimit = userPackage?.totalProductsCost;

        console.log(maxItemsAllowed, "maxItemsAllowed");
        console.log(maxPriceLimit, "maxPriceLimit");

        // Check if adding this product exceeds the maximum number of items allowed
        if (cart?.items?.length > maxItemsAllowed) {
            return next(
                new ErrorHandler(400, "Exceeded maximum number of items allowed")
            );
        }

        let totalPriceInCart = 0;

        cart?.items?.map((item) => {
            totalPriceInCart += item.product.price * item.quantity;
        })
        console.log("totalPriceInCart", totalPriceInCart)


        if (cartItem) {
            // let totalPriceInCart = 0;

            if (cart?.items?.length > 0) {
                cart?.items?.map((item) => {
                    console.log("item", item)
                    // totalPriceInCart = totalPriceInCart +  item.product.price * item.quantity
                    totalPriceInCart += item.product.price * item.quantity;
                })
                console.log("totalPriceInCart", totalPriceInCart)
            }

            if (totalPriceInCart <= maxPriceLimit && product.price <= maxPriceLimit && cart?.items?.length <= maxItemsAllowed) {
                await PackageCart.populate(cartItem, { path: "product" });
                // Product already in cart, increase quantity
                cartItem.quantity++;
            }
            else {
                return next(
                    new ErrorHandler(400, "Adding this product exceeds price limit")
                );
            }

        } else {

            console.log("came in this else part")

            if (cart?.items?.length > maxItemsAllowed) {
                return next(
                    new ErrorHandler(400, "Exceeded maximum number of items allowed")
                );
            }

            cart?.items?.map((item) => {
                totalPriceInCart += item.product.price * item.quantity;
            })
            console.log("totalPriceInCart", totalPriceInCart)

            if (cart?.items.length === 0 && product.price < maxPriceLimit) {
                cart?.items.push({ product: product._id, quantity: 1, price: product.price })
                console.log("cart.item", cart?.items)
                // cart.item increases
            } else if(product.price < maxPriceLimit && cart?.items.length < maxItemsAllowed){
                cart?.items.push({ product: product._id, quantity: 1, price: product.price })
                console.log("cart.item", cart?.items)
            }
            else {
                return next(
                    new ErrorHandler(400, "Adding this product exceeds price limit")
                );
            }
            console.log("cart", cart)
        }

        // let newCart = await PackageCart.findOne({ user: userId }).populate('items.product');
        // console.log("new Cart ", newCart);

        // Calculate the total price in the cart
        // const totalPriceInCart = cart.items.reduce(
        //     (total, item) => total + item.product.price * item.quantity,
        //     0
        // );

        // console.log("totalPriceinCart", totalPriceInCart)

        // const productPrice = product.price;

        // if (totalPriceInCart > maxPriceLimit) {
        //     return next(
        //         new ErrorHandler(400, "Adding this product exceeds price limit")
        //     );
        // }
        await cart.save();

        return res.status(200).json({
            success: true,
            cart,
            msg: "Product added to cart",
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

// .populate("name", "description", "productImage", "price", "stock")

const removeFromCart = async (req, res, next) => {
    try {
        const user = req.user;
        const userId = user._id;

        console.log(user);
        if (!user) {
            return next(new ErrorHandler(400, "Login or signup to continue"));
        }

        const { productId } = req.body;

        if (!productId) {
            return next(new ErrorHandler(400, "Select any product to continue"));
        }

        const product = await Product.findOne({
            _id: productId,
        });

        if (!product) {
            return next(new ErrorHandler(400, "Product not found"));
        }

        let cart = await PackageCart.findOne({ user: userId }).populate({
            path: "items.product",
            populate: {
                path: "owner",
                select: "name",
            },
        });

        if (!cart) {
            return next(new ErrorHandler(400, "Cart not found"));
        }

        // Find the index of the item in the cart
        const cartItemIndex = cart.items.findIndex((item) =>
            item.product.equals(product._id)
        );

        if (cartItemIndex !== -1) {
            const cartItem = cart.items[cartItemIndex];

            if (cartItem.quantity > 1) {
                // Decrease the quantity if greater than 1
                cartItem.quantity--;
            } else {
                // Remove the item from the cart if quantity is 1 or 0
                cart.items.splice(cartItemIndex, 1);
            }

            await cart.save();
        }

        return res.status(200).json({
            success: true,
            cart,
            msg: "Product removed from cart",
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        const user = req.user;
        const userId = user._id;

        if (!user) {
            return next(new ErrorHandler(400, "Login or signup to continue"));
        }

        const cart = await PackageCart.findOne({
            user: userId,
        }).populate({
            path: "items.product",
            model: "Product",
            select: "name price owner category productImages",
        });
        if (!cart) {
            return res.status(200).json({
                success: true,
                cart: [],
                total: 0,
                msg: "Cart is empty",
            });
        }
        console.log(cart);

        const detailedCartItems = [];

        let total = 0;

        cart.items.forEach((item) => {
            const product = item.product;
            const itemTotal = product.price * item.quantity;

            // Add the detailed item information to the array
            detailedCartItems.push({
                product: {
                    _id: product._id,
                    name: product.productName,
                    price: product.price,
                },
                quantity: item.quantity,
                itemTotal: itemTotal,
            });

            total += itemTotal;
        });

        return res.status(200).json({
            success: true,
            cart: cart.items,
            total: total,
            cartId: cart._id,
            msg: "Products in the cart",
            detailedCartItems: detailedCartItems,
        });
    } catch (error) {
        console.log(error);
        return error;
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const user = req.user;
        const userId = user._id;

        if (!user) {
            return next(new ErrorHandler(400, "Login or signup to continue"));
        }
        const cart = await PackageCart.findOne({
            user: userId,
        });

        if (!cart) {
            next(new ErrorHandler(400, "Cart not found"));
        }
        const { productId } = req.body;
        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({ error: "Product not found in the cart" });
        }

        // Remove the item from the items array
        cart.items.splice(itemIndex, 1);

        // Save the updated cart
        await cart.save();
        await cart.populate({
            path: "items.product",
            populate: {
                path: "owner",
                select: "name",
            },
        });

        return res.status(200).json({
            success: true,
            msg: "Product removed",
            cart,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const deleteCart = async (req, res, next) => {
    try {
        const cartId = req.params.cartId;

        const cart = await PackageCart.findById(cartId);
        if (!cart) {
            next(new ErrorHandler(404, "Cart not found"));
        }

        await PackageCart.findByIdAndDelete(cartId);

        return res.status(200).json({
            success: true,
            msg: "Cart deleted",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    addToCart,
    removeFromCart,
    getAllProducts,
    deleteProduct,
    deleteCart,
};
