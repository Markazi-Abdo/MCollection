import Coupon from "../../model/coupon.model.js";
import User from "../../model/user.model.js";
import { serverLogger } from "../../logs/server/logger.js"

export const getCouponForUser = async function(req, res){
    try {
        const user = req.user._id;
        const findUser = await User.findById(user);
        console.log(findUser)
        if(!findUser){
            return res.status(404).json({ success:false, message:"User wasn't found, maybe you should refresh, or you're not authneticated" });
        }

        const userCoupon = await Coupon.findOne({ userId:findUser._id, isActive:true });
        if(!userCoupon){
            return res.status(404).json({ success:false, message:"Couon not found", coupon:null })
        }

        console.log(userCoupon)
        return res.status(200).json({ success:true, message:"Succesfully got coupon", coupon:userCoupon });
    } catch (error) {
        serverLogger.info(error.message);
        return res.status(500).json({ success:false, message:error.message }); 
    }
}

export const validateCoupon = async function(req, res){
    try {
        const { code  } = req.params;
        const userId = req.user._id;
        if(!code){
            return res.status(400).json({ success:false, message:"Token wasn't provided properly by client" });
        }

        const coupon = await Coupon.findOne({ code, isActive:true , userId });
        if(!coupon){
            return res.status(404).json({ success:false, message:"Couldn't find coupon" });
        }

        if(coupon.expirationDate < new Date()){
            coupon.isActive = false;
            await coupon.save();
            return res.status(404).json({ success:false, message:"Token expired" });
        }
        return res.status(200).json({ success:true, message:"Coupon retirevd succesfully "})
    } catch (error) {
        serverLogger.info(error.message);
        return res.status(500).json({ success:false, message:error.message });
    }
}