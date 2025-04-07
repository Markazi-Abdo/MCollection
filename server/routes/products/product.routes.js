import express from "express";
import { 
    createOne, 
    deleteProduct,
    featureProduct, 
    getFeaturedProducts,
    getProducts, 
    getProductsCategory, 
    getSuggestions, 
    updateProduct } from "../../controllers/products/product.controller.js";
import { authCheck, adminCheck } from "../../middleware/authCheck.middleware.js";
const productRoutes = express.Router();

//authorized routes
productRoutes.get("/all", authCheck, adminCheck, getProducts);
productRoutes.post("/save", authCheck, adminCheck, createOne);
productRoutes.put("/modify/:id", authCheck, adminCheck, updateProduct);
productRoutes.put("/feature/:id", authCheck, adminCheck, featureProduct);
productRoutes.delete("/delete/:id", authCheck, adminCheck, deleteProduct);

//unauthorized
productRoutes.get("/featured", getFeaturedProducts);
productRoutes.get("/suggestions", getSuggestions);
productRoutes.get("/category/:category", getProductsCategory);

export default productRoutes;