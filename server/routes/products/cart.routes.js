import express from "express"
import { deleteItemsFromCart, getCart, putInCart, removeFromCart, updateQuantity } from "../../controllers/products/cart.controller.js";
import { authCheck } from "../../middleware/authCheck.middleware.js";
const cartRoutes = express.Router();

cartRoutes.put("/put", authCheck, putInCart);
cartRoutes.put("/update/:id", authCheck, updateQuantity);
cartRoutes.get("/all", authCheck, getCart);
cartRoutes.delete("/remove/:productId", authCheck, removeFromCart);
cartRoutes.delete("/remove", authCheck, deleteItemsFromCart);

export default cartRoutes;