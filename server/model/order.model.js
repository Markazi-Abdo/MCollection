import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[{
        product:{
            type:mongoose.Types.ObjectId,
            ref:"Product",
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            min:1
        },
        price:{
            type:Number,
            required:true,
            min:0
        }
    }],
    totalamount:{
        type:Number,
        required:true,
        min:0
    },
    stripeSessionId:{
        type:String,
        required:true
    }
} , { timestamps:true });

const Order = mongoose.model("Order", orderSchema);
export default Order;

