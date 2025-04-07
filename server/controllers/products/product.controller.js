import cloudinary from "../../config/cloudinary.js";
import { redis } from "../../libs/redis.js";
import { dbLogger } from "../../logs/database/database.js";
import Product from "../../model/product.model.js"

export const getProducts = async function(req, res){
    try {
        const products = await Product.find({});
        if(!products){
            return res.status(404).json({ success:false, message:"Couldn't get products" });
        }
        if(products.length === 0){
            return res.status(200).json({ success:true, message:"Products database is empty", products:[] });
        }

        return res.status(200).json({ success:true, message:"Succesfully got products", products });
    } catch (error) {
        return res.status(500).json({ success:false, message:error.message, products:[]})
    }
}

export const createOne = async function(req, res){
    try {
        const { title, description, price, category  } = req.body;
        let { image } = req.body;
        if(!title || !description || !price || !category || !image){
            return res.status(400).json({ success:false, message:"All fields shoud be filled" });
        }

        const findProduct = await Product.findOne({ title });
        if(findProduct){
            return res.status(400).json({ success:false, message:"Can't create product due to existing title, use a different title" });
        }

        if(image){
            const uploadImage = await cloudinary.uploader.upload(image, { folder:"products" });
            image = uploadImage?.secure_url;
        }

        const newProduct = await Product.create({ title, description, price, category, image });
        return res.status(201).json({ success:false, message:`${title} was saved duccefully`, product: newProduct });
    } catch (error) {
        return res.status(500).json({ success:false, message:error.message });
    }
}

export const updateProduct = async function(req, res){
    try {
        const { id:product } = req.params;
        const { title, description, price, category } = req.body;
        let { image } = req.body;
        if(!product){
            return res.status(404).json({ success:false, message:"No identifier was passed", product:null});
        }

        if(image){
            const uploaded = await cloudinary.uploader.upload(image);
            image = uploaded.secure_url;
        }
        const findUpdate = await Product.findByIdAndUpdate(product, req.body, { new: true });
        if(!findUpdate){
            return res.status(404).json({ success: false, message:"Couldn't update due to missing product", product:null})
        }

        return res.status(200).json({ success:true, message:"Product updated succesfully", product:findUpdate })
    } catch (error) {
        return res.status(500).json({ success:false, message:error.message });
    }
}

export const deleteProduct = async function(req, res){
    try {
        const { id:product } = req.params;
        if(!product){
            return res.status(404).json({ success:false, message: "Id wasn't provided" });
        }

        const findDelete = await Product.findByIdAndDelete(product);
        if(!findDelete){
            return res.status(404).json({ success:false, message:"Couldn't proceed due to missing product" });
        }

        if(findDelete.image){
            const imgId = findDelete.image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }
        return res.status(200).json({ success:true, message: `${findDelete.title} was deleted succesfully` });
    } catch (error) {
        return res.status(500).json({ success:false, message:error.message });
    }
}

export const featureProduct = async function(req, res){
    try {
        const { id:product } = req.params;
        if(!product){
            return res.status(400).json({ success:false, message:"Couldn't find product" });
        }

        const pro = await Product.findById(product);
        if(pro){
            pro.isFeatured = !pro.isFeatured;
            await pro.save();
            await updateFeaturedProductsCache();
            return res.status(201).json({ success:true, message:`${pro.title} was featured at ${pro.updatedAt}`, product:pro });
        }
       
    } catch (error) {
        dbLogger.info("Error: " +error.name + " was found at " + error.trace);
        return res.status(500).json({ success:false, message:error.message });
    }
}

export const getFeaturedProducts = async function(req, res){
    try {
        let cachedFeautred = await redis.get("featured_products")
        if(cachedFeautred){
            return res.status(200).json({ success:true, message:"Retrieval was succesfull", products: JSON.parse(cachedFeautred) });
        }
        
        const getFeatProd = await Product.find({ isFeatured:true }).lean();
        if(!getFeatProd){
            return res.status(400).json({ success:false, message:"Couldn't get products" });
        }
        if(getFeatProd.length === 0){
            return res.status(200).json({ success:true, message:"There's no featured products", products: [] });
        }

        await redis.set("featured_products", JSON.stringify(getFeatProd));
        return res.status(200).json({ success:true, message:"Retrieval was succesfull", products: getFeatProd });
    } catch (error) {
        dbLogger.info("Error: " +error.name + " was found at " + error.trace);
        return res.status(500).json({ success:false, message:error.message });
    }
}

export const getSuggestions = async function(req, res){
    try {
        const recommendations = await Product.aggregate([
            {
                $sample: { size:3 }
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    description:1,
                    image:1,
                    price:1
                }
            }
        ])

        if(recommendations.length === 0){
            return res.status(200).json({ success:true, message:"Got suggestions succesfully, but ther's no products", products: [] });
        }
        
        return res.status(200).json({ success:true, message:"Got suggestions succesfully", products: recommendations });
    } catch (error) {
        dbLogger.info("Error: " +error.name + " was found at " + error.trace);
        return res.status(500).json({ success:false, message:error.message });
    }
}

export const getProductsCategory = async function(req, res){
    try {
        const { category } = req.params;
        if(!category){
            return res.status(400).json({ success:false, message:"Couldn't get products, problem with catagory unprovided", products:null });
        }

        const products = await Product.find({ category });
        if(!products){
            return res.status(400).json({ success:false, message:"Couldn't get products", products:null });
        }
        if(products.length === 0){
            return res.status(200).json({ success:true, message:"No products in this category", products:[] });
        }

        return res.status(200).json({ success:true, message:"Products retireved succesfully", products });
    } catch (error) {
        dbLogger.info("Error: " +error.name + " was found at " + error.trace);
        return res.status(500).json({ success:false, message:error.message });
    }
}

export const updateFeaturedProductsCache = async function(req, res){
    try {
        const featuredProducts = await Product.find({ isFeatured:true }).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        dbLogger.info("Error: " +error.name + " was found at " + error.trace);
        return res.status(500).json({ success:false, message:error.message });
    }
}