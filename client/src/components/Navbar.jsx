import { HomeIcon, HouseIcon, LoaderCircleIcon, LockIcon, LogInIcon, LogOutIcon, ShoppingCartIcon, UserPlusIcon, } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/AuthStore";
import { useCartStore } from "../store/CartStore";

export default function Navbar() {
    const { isLoggingOut, logoutFunc, user } = useAuthStore();
    const isAdmin = user?.role === "admin";
    const { cartItems } = useCartStore();

    return (
    <div className="relative z-50">
        <nav className='flex justify-between items-center p-1.5 fixed top-0 left-0 w-full bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-b-blue-900'>
                <Link to="/">
                    <div className='flex items-center'>
                        <h2 className='font-bold text-2xl'>MCollections</h2>
                        <i className="size-5"><ShoppingCartIcon /></i>
                    </div>
                </Link>
            <div className='flex flex-wrap items-center gap-5'>
                {
                    isAdmin && (
                        <>
                            <Link to="/admin-dashboard">
                                <button className="btn btn-primary btn-square w-full flex items-center gap-0">
                                    <i><LockIcon /></i>
                                    <span>DashBoard</span>
                                </button>
                            </Link>
                        </>
                    )
                }
                <Link to='/' className="flex flex-col items-center">
                    <button className="btn btn-square btn-accent">
                        <i ><HomeIcon /></i>
                        <span>Home</span>
                    </button>
                </Link>
                {
                    user &&(
                    <>
                        <Link to='/cart' className="flex flex-col items-center">
                            <button className="btn btn-square btn-accent relative">
                                <i><ShoppingCartIcon /></i>
                                <i className="text-white absolute top-0 right-0">{cartItems.length}</i>
                                <span>Cart</span>
                            </button>
                        </Link>
                        
                    </>
                    )
                }
                {
                    user ? (
                        <Link to='/cart' className="flex flex-col items-center">
                            <button className="btn btn-square btn-accent" onClick={logoutFunc}>
                                {
                                    !isLoggingOut ? (
                                        <>
                                            <i><LogOutIcon /></i>
                                            <span>Logout</span>
                                        </>
                                    ) : (
                                        <>
                                            <i><LoaderCircleIcon /></i>
                                            <span>LoggingOut</span>
                                        </>
                                    )
                                }
                                
                            </button>
                        </Link>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="btn btn-square">
                                    <i><LogInIcon /></i>
                                    <span>Login</span>
                                </button>
                            </Link>
                            <Link to="signup">
                                <button className="btn btn-square">
                                    <i><UserPlusIcon /></i>
                                    <span>Signup</span>
                                </button>
                            </Link>
                        </>
                    )
                }
            </div>
        </nav>
    </div>
    )
}
