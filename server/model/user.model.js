import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    username:{
        type:String,
        lowercase:true,
        trim:true,
        required:true,
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minLength: 6
    },
    cartItems:[
        {
            quantity:{
                type:Number,
                default: 1
            },
            product:{
                type:mongoose.Types.ObjectId,
                ref:"Product"
            }
        }
    ],
    role:{
        type:String,
        enum:[ "user", "admin" ],
        default:"user"
    }
}, { timestamps: true });

//Pre-save hook
//Amiddleware that executes a function or a procedure before saving to the database
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
        next(error)
    }
});


//Method for comparing passwords
userSchema.methods.validatePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;