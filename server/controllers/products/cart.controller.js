import mongoose  from "mongoose";
import { serverLogger } from "../../logs/server/logger.js";
import Product from "../../model/product.model.js";
import User from "../../model/user.model.js";

export const putInCart = async function(req, res){
    try {
        const { productId } = req.body;
        const user = req.user._id;

        const findUser = await User.findById(user).select("-password");
        const findProduct = await Product.findOne({ _id:productId });
        if(!findUser){
            return res.status(404).json({ success:false, message:"Couldn't find user" });
        }
        if(!findProduct){
            return res.status(404).json({ success:false, message:"Couldn't find product" });
        }
        
        const existInCart = findUser.cartItems.find(pro => pro?.id.toString() === productId.toString());
        if(existInCart){
            existInCart.quantity += 1;
            await findUser.save();
        } else {
            findUser.cartItems.push(productId);
        }

        await findUser.save();
        return res.status(200).json({ success:true, message:"Cart functioning properly", cart:findUser });
    } catch (error) {
        serverLogger.info(error.stack);
        return res.status(500).json({ success:false, message:error.message, trace:error.stack });
    }
}


export const removeFromCart = async function(req, res){
    try {
        const { productId } = req.params;
        const user = req.user._id;

        if(!productId){
            console.log(productId);
            return res.status(404).json({ success:false, message:"Didnt provide id" });
        }
        
        const findUser = await User.findById(user).select("-password");
        const findProduct = await Product.findById(productId);
        if(!findUser){
            return res.status(404).json({ success:false, message:"Couldn't find user" });
        }
        if(!findProduct){
            return res.status(404).json({ success:false, message:"Couldn't find product" });
        }

        const existingInCart = findUser.cartItems.find(item => item?.id.toString() === productId.toString());
        if(existingInCart){
            findUser.cartItems.pull(productId);
        } else {
            return res.status(404).json({ sucess:false, message:"Product doesnt exist exits in user's cart" });
        }

        await findUser.save();
        return res.status(200).json({ success:true, message:"Removed succesfully", cart:findUser.cartItems} );
    } catch (error) {
        serverLogger.info(error.message);
        return res.status(500).json({ success:false, message:error.message });
    }
}

export const getCart = async function(req, res){
    try {
        const user = req.user._id;

        const findUser = await User.findById(user);
        if(!findUser){
            return res.status(404).json({ success:false, message:"Couldn't find user" });
        }

        const getProducts = await Product.find({ _id: { $in: findUser.cartItems } });
        if(!getProducts){
            return res.status(404).json({ success:false, message:"Couldn't get products" });
        }

        const cart = getProducts.map(product => {
            const item = findUser.cartItems.find(item => item?.id.toString() === product?._id.toString());
            return {...product.toJSON(), quantity:item?.quantity};
        });
        console.log(cart);
        return res.status(200).json({ success:false, message:"Found items succesfully", cart });
    } catch (error) {
        serverLogger.info(error.message);
        return res.status(500).json({ success:false, message:error.message });
    }
}

export const updateQuantity = async function(req, res){
    try {
        const { id:productId } = req.params;
        const { quantity } = req.body;
        const user = req.user._id;

        const findUser = await User.findById(user);
        if(!findUser){
            return res.status(404).json({ success:false, message:"Couldn't find user" });
        }
        const findProduct = await Product.findById(productId);
        if(!findUser){
            return res.status(404).json({ success:false, message:"Couldn't find user" });
        }

        const existInCart = findUser.cartItems.find(item => item?.id.toString() === findProduct?._id.toString());
        if (existInCart) {
            if(existInCart.quantity === 0){
                findUser.cartItems.pull(findProduct._id);
                await findUser.save();
                return res.status(200).json({ success:true, message:"Updated cart" });
            }

            existInCart.quantity = quantity;
            await findUser.save();
            return res.status(200).json({ success:true, message:"Updated cart" });
        } else {
            return res.status(404).json({ success:false, message:"Product doesn't exist" });
        }

    } catch (error) {
        serverLogger.info(error.message);
        return res.status(500).json({ success:false, message:error.message });
    }
}

export const deleteItemsFromCart = async function(req, res){
    try {
        const user = req.user._id;

        const findUser = await User.findById(user).select("-password");
        if(!findUser){
            return res.status(404).json({ success:false, message:"Couldn't find user" });
        }

        await User.updateOne({ _id:user}, { $set: { cartItems:[] }});
        findUser.save();
        return res.status(200).json({ success:true, message:`${findUser.username}'s cart is now empty`, cart:[] });
    } catch (error) {
        return res.status(500).json({ success:false, message:error.message });
    }
}