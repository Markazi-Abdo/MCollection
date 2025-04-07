import React from 'react'
import { useRef, useState } from 'react';
import { useAdminStore } from '../store/AdminStore';
import toast from 'react-hot-toast';
import categories from '../constants/categories';
import { LoaderCircleIcon, PlusCircleIcon, UploadIcon } from 'lucide-react';

export default function UpdateProductModal({ product, }) {
    const inputRef = useRef(null);
    const { isLoading, updateProductFunc } = useAdminStore();
    const [ updateProduct, setUpdateProduct ] = useState({ title:product?.title, description:product?.description, quantity:product?.quantity, price:product?.quanity, category:product?.quantity, image:product?.image });

    const handleChange = function(e){
        const { name, value } = e.target;
        setUpdateProduct((data) => ({
            ...data,
            [name]:value
        }))
    }

    const handleImageInput = function(e){
        const file = e.target.files[0];
        if(file){
            const imageHandler = new FileReader;
        
            imageHandler.onload = () => {
                setUpdateProduct({ ...updateProduct, image:imageHandler.result });
            }
            imageHandler.readAsDataURL(file);
        }
    }

    const handleInputClick = function(){
        inputRef.current.click();
    }

    // const validateConditions = function(){
    //     const isValid = Object.values(updateProduct).every(value => typeof value === "number" ? value > 0 : value.trim() !== "");
    //     if(!isValid){
    //         toast.error("All fields must be filled");
    //         return false;
    //     }

    //     return true;
    // }

    const CREATE_PRODUCT = function(e){
        e.preventDefault();
        updateProductFunc(product._id, updateProduct);
        console.log(updateProduct)
    }  
    return (
        <dialog id='modal' className='modal'>
            <div className='modal-box bg-slate-900'>
            <form onSubmit={CREATE_PRODUCT} className="form-control">
                <label className="input input-bordered rounded-box flex items-center gap-5">
                    <span>Title</span>
                    <input 
                    type="text" 
                    placeholder="Product's Name"
                    name="title"
                    value={updateProduct.title}
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
                value={updateProduct.description}
                onChange={handleChange}
                disabled={isLoading}
                />
                <label htmlFor="">Quantity stock</label>
                <input 
                type="number" 
                className="input input-bordered"
                placeholder="Product's quantity"
                name="quantity"
                value={updateProduct.quantity}
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
                        value={updateProduct.price}
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
                value={updateProduct.category}
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
                                <span>Updating Product.....</span>
                            </>
                        ) : (
                            <>
                                <i><PlusCircleIcon/></i>
                                <span>Update Product</span>
                            </>
                        )
                    }
                    
                </button>
            </form>
                    <div className='modal-action'>
                        <form method='dialog'>
                            <button className='btn btn-square w-32 bg-slate-950'>Close Update Form</button>
                        </form>
                    </div>
                </div>
        </dialog>
    )
}
