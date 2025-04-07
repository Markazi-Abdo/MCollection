import { LockIcon, User2Icon, UserPenIcon, Mail, EyeIcon, EyeClosedIcon, UserPlusIcon, LoaderCircleIcon } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/AuthStore';

export default function Signup() {
  const navigate = useNavigate();
  const { isSigningUp, signUpFunc } = useAuthStore();
  const [ showPass, setShowPass ] = useState(false);
  const [ formData, setFormData ] = useState({fullname:"" ,username:"", email:"", password:"" });

  const handleChange = function(e){
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]:value
    }))
  }

  const validateData = function(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d@$!%*?&/]{8,}$/;

    if(!formData.fullname.trim() || !formData.username.trim() || !formData.email.trim() || !formData.password.trim()){
        toast.error("All fields should be filled");
        return false;
    }
    if(formData.password.length < 8){
        toast.error("Password should be at least 8 characters long"); 
        return false;
    }
    if(!emailRegex.test(formData.email)){
        toast.error("Invalid email format");
        return false;
    }
    if(!passwordRegex.test(formData.password)){
        toast.error("Invalid password format");
        return false;
    }

    return true;
  }

  const signUpUser = function(e){
    if(validateData()){
        signUpFunc(formData);
        toast.success("Succesfully signed in");
        setFormData({fullname:"", username:"", email:"", password:""})
        navigate("/");
    }
    e.preventDefault();
  }


  return (
    <div className='flex flex-col justify-center items-center gap-2 mt-20'>
        <motion.div
        initial={{ opacity:0, y:-20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:1 }}
        >
            <div className='text-center mb-4'>
                <h1 className='text-blue-200 font-extrabold text-2xl uppercase'>Create your account</h1>
            </div>
        </motion.div>
        <form 
        onSubmit={signUpUser}
        className='border-2 border-blue-600 rounded-md w-[750px] form-control p-9 gap-5 bg-slate-900 shadow-primary shadow-md'>
            <label className='input input-bordered border rounded-md flex justify-start items-center gap-4 p-1.5'>
                <i><UserPenIcon /></i>
                <input 
                type="text" 
                className='w-full'
                placeholder='FULLNAME'
                name='fullname'
                value={formData.fullname}
                onChange={handleChange}
                />
            </label>
            <label className='input input-bordered border rounded-md flex justify-start items-center gap-4 p-1.5'>
                <i><User2Icon /></i>
                <input 
                type="text" 
                className='w-full'
                placeholder='Type ur username'
                name='username'
                value={formData.username}
                onChange={handleChange}
                />
            </label>
            <label className='input input-bordered border rounded-md flex justify-start items-center gap-4 p-1.5'>
                <i><Mail/></i>
                <input 
                type="email" 
                className='w-full'
                placeholder='Type you email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                />
            </label>
            <label className='input input-bordered border rounded-md flex justify-between items-center gap-4 p-1.5'>
                <div className='flex items-center gap-4 w-full'>
                    {
                        !showPass ? (
                            <>
                                <i><LockIcon /></i>
                                <input 
                                type="password" 
                                className='w-full'
                                placeholder='Type your password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                />
                            </>
                        ) : (
                            <>
                                <i><LockIcon /></i>
                                <input 
                                type="text" 
                                className='w-full'
                                placeholder='Type your password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                />
                            </>
                        )
                    }
                </div>
                <div>
                    {
                        !showPass ? (
                            <button type="button"
                            onClick={()=>setShowPass(!showPass)}
                            className='flex justify-center items-center'
                            >
                                <i><EyeIcon /></i>
                            </button>
                        ) : (
                            <button type="button"
                            onClick={()=>setShowPass(!showPass)}
                            className='flex justify-center items-center'
                            >
                                <i><EyeClosedIcon /></i>
                            </button>
                        )
                    }
                </div>
            </label>
            <button className='btn btn-square btn-primary w-full rounded-md'>
                {
                    !isSigningUp ? (
                        <>
                            <i><UserPlusIcon /></i>
                            <span>Signup</span>
                        </>
                    ) : (
                        <>
                            <i className='animate-spin'><LoaderCircleIcon /></i>
                            <span>Signup</span>
                        </>
                    )
                }
            </button>
        </form>
        <div className='mt-5 flex items-center gap-1.5'>
            <p>Already got an account,</p>
            <Link to="/login">
                <span className='text-primary transition-all duration-200 hover:underline'>Login</span>
            </Link>
        </div>
    </div>
  )
}
