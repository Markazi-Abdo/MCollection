import { motion } from "framer-motion"
import { LoaderCircleIcon, PlusCircleIcon, UploadIcon } from "lucide-react"
import { useRef, useState } from "react"
import categories from "../constants/categories";
import toast from "react-hot-toast";
import { useAdminStore } from "../store/AdminStore";

export default function CreateProductView() {
  const inputRef = useRef(null);
  const { isLoading, createProduct } = useAdminStore();
  const [ product, setProduct ] = useState({ title:"", description:"", quantity:1, price:0, category:"Jeans", image:"" });

  const handleChange = function(e){
    const { name, value } = e.target;
    setProduct((data) => ({
        ...data,
        [name]:value
    }))
  }

  const handleImageInput = function(e){
    const file = e.target.files[0];
    if(file){
        const imageHandler = new FileReader;
    
        imageHandler.onload = () => {
            setProduct({ ...product, image:imageHandler.result });
        }
        imageHandler.readAsDataURL(file);
    }
  }

  const handleInputClick = function(){
    inputRef.current.click();
  }

  const validateConditions = function(){
    const isValid = Object.values(product).every(value => typeof value === "number" ? value > 0 : value.trim() !== "");
    if(!isValid){
        toast.error("All fields must be filled");
        return false;
    }

    return true;
  }

  const CREATE_PRODUCT = function(e){
    e.preventDefault();
    if(validateConditions()){
        createProduct(product);
    }
    console.log(product)
  }


  return (
    <motion.div
    initial={{ opacity:0.5, x:10 }}
    animate={{ opacity:1, x:0 }}
    transition={{ duration:0.7, ease:"linear" }}
    >
        <form onSubmit={CREATE_PRODUCT} className="form-control w-[500px] text-center border-blue-600 rounded-md p-2 shadow-accent shadow-md">
            <h1 className="w-full">Create Product</h1>
            <label className="input input-bordered rounded-box flex items-center gap-5">
                <span>Title</span>
                <input 
                type="text" 
                placeholder="Product's Name"
                name="title"
                value={product.title}
                onChange={handleChange}
                disabled={isLoading}
                />
            </label>
            <label>
                <span>Description</span>
            </label>
            <textarea
            type="text" 
            className="textarea textarea-bordered"
            placeholder="Product's description"
            name="description"
            value={product.description}
            onChange={handleChange}
            disabled={isLoading}
            />
            <label htmlFor="">Quantity stock</label>
            <input 
            type="number" 
            className="input input-bordered"
            placeholder="Product's quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            disabled={isLoading}
            />
            <label className="input input-bordered flex items-center justify-between gap-4 mt-5">
                <div className="flex items-center gap-4 w-full">
                    <span>Price</span>
                    <input 
                    type="number" 
                    placeholder="Product's Price"
                    name="price"
                    className="w-full"
                    value={product.price}
                    onChange={handleChange}
                    disabled={isLoading}
                    />
                </div>
                <div>
                    <span>DH</span>
                </div>
            </label>
            <label htmlFor="">Category</label>
            <select 
            className="select select-bordered w-full"
            name="category"
            value={product.category}
            onChange={handleChange}
            disabled={isLoading}
            >
                <option disabled selected>Choose Category</option>
                {
                    categories.map(ct => (
                        <option value={ct.title}>{ct.title}</option>
                    ))
                }
            </select>
            <button 
            type="button"
            className="flex items-center gap-3 btn btn-square mt-5 w-full"
            onClick={handleInputClick}
            >
                <i><UploadIcon /></i>
                <span>Upload Image</span>
            </button>
            <input 
            type="file"
            className="hidden"
            ref={inputRef}
            accept="image/*"
            name="image"
            disabled={isLoading}
            onChange={handleImageInput}
            />
            <button type="submit" className="flex items-center gap-3 btn btn-square btn-accent mt-5 w-full">
                {
                    isLoading ? (
                        <>
                            <i className="animate-spin"><LoaderCircleIcon /></i>
                            <span>Saving Product.....</span>
                        </>
                    ) : (
                        <>
                            <i><PlusCircleIcon/></i>
                            <span>Save Product</span>
                        </>
                    )
                }
                
            </button>
        </form>
    </motion.div>
  )
}
