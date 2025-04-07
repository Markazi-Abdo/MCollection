import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Navbar from "./components/Navbar"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/AuthStore"
import { useEffect } from "react"
import LoadingSpinner from "./components/LoadingSpinner"
import Category from "./pages/Category"
import AdminDashboard from "./pages/AdminDashboard"
import NotFoundError from "./pages/NotFoundError"
import Cart from "./pages/Cart"
import { useCartStore } from "./store/CartStore"
import PurchaseSuccess from "./pages/PurchaseSuccess"
import PurchaseCancelled from "./pages/PurchaseCancelled"

function App() {
  const { isChecking, user, checkAuth } = useAuthStore();
  const { cartItems, getCartItems } = useCartStore();
  const isAdmin = user?.role === "admin";
  
  useEffect(()=>{
    checkAuth();
  }, [ checkAuth ])

  useEffect(()=>{
    getCartItems();
  }, [ getCartItems ]);
  console.log(cartItems)
  if(isChecking){
    return <LoadingSpinner />
  }
  
  return(
    <main className="text-white relative overflow-hidden min-h-screen">
      <div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.3)_0%,rgba(37,99,235,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
				</div>
			</div>
      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>}></Route>
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>}></Route>
            <Route path="/category/:category" element={<Category />}></Route>
            <Route path="/cart" element={user ? <Cart /> : <Navigate to="/" />}></Route>
            <Route path="/success" element={<PurchaseSuccess/>}></Route>
            <Route path="/purchase-cancel" element={<PurchaseCancelled />}></Route>
            <Route path="/admin-dashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />}></Route>
            <Route path="/*" element={<NotFoundError />}></Route>
        </Routes>
      </div>
      <Toaster 
      reverseOrder={true}
      position="bottom-center"
      />
    </main>
  )
}

export default App
