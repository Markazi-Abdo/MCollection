import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Product name is required"]
    },
    description:{
        type:String,
        required:[true, "Product description is mandatory for the sake of the platform"]
    },
    image:{
        type:String,
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    isFeatured:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;

